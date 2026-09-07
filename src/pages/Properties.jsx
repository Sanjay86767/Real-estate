import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import PropertyCard from "../components/PropertyCard";
import Filter from "../components/Filter";
import InteractiveMap from "../components/InteractiveMap";
import BrochureHubModal from "../components/BrochureHubModal";
import PropertiesSidebarContent from "../components/PropertiesSidebarContent";
import IndiaStateExplorer from "../components/IndiaStateExplorer";
import sanjayPhoto from "../assets/sanjay-kumar.jpg";
import {
  LayoutGrid,
  List,
  Map as MapIcon,
  SlidersHorizontal,
  X,
  RefreshCw,
  Home,
  Phone,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  FileText,
  CheckCircle2,
  Crown,
  Compass,
  Building,
  ArrowRight,
  Calculator,
  ExternalLink
} from "lucide-react";

export const Properties = () => {
  const { properties, heroSearchFilters } = usePropertyContext();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States initialized from URL or Hero Context
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCity, setSelectedCity] = useState(
    searchParams.get("city") || searchParams.get("state") || heroSearchFilters.location || ""
  );
  const [selectedType, setSelectedType] = useState(
    searchParams.get("type") || heroSearchFilters.type || ""
  );
  const [priceRange, setPriceRange] = useState(
    searchParams.get("price") || heroSearchFilters.priceRange || ""
  );
  const [bedrooms, setBedrooms] = useState(
    searchParams.get("beds") || heroSearchFilters.bedrooms || ""
  );
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);
  const [showBrochureHub, setShowBrochureHub] = useState(false);

  // Sync state if URL searchParams change
  useEffect(() => {
    const qParam = searchParams.get("q");
    const cityParam = searchParams.get("city") || searchParams.get("state");
    const typeParam = searchParams.get("type");
    const priceParam = searchParams.get("price");
    const bedsParam = searchParams.get("beds");

    if (qParam !== null) setSearchQuery(qParam);
    if (cityParam !== null) setSelectedCity(cityParam);
    if (typeParam !== null) setSelectedType(typeParam);
    if (priceParam !== null) setPriceRange(priceParam);
    if (bedsParam !== null) setBedrooms(bedsParam);
  }, [searchParams]);

  // Reset page to 1 when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCity, selectedType, bedrooms, priceRange, selectedAmenities, sortBy]);

  // Dynamic BHK counts across the entire dataset
  const bhkCounts = useMemo(() => {
    return {
      all: properties.length,
      bhk1: properties.filter((p) => p.bedrooms === 1).length,
      bhk2: properties.filter((p) => p.bedrooms === 2).length,
      bhk3: properties.filter((p) => p.bedrooms === 3).length,
      bhk4: properties.filter((p) => p.bedrooms === 4).length,
      bhk5: properties.filter((p) => p.bedrooms >= 5).length,
      plots: properties.filter((p) => p.bedrooms === 0 || p.type === "Plot" || p.type === "Commercial").length
    };
  }, [properties]);

  // Reset Filters handler
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCity("");
    setSelectedType("");
    setPriceRange("");
    setBedrooms("");
    setSelectedAmenities([]);
    setSortBy("featured");
    setCurrentPage(1);
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return properties
      .filter((item) => {
        // Keyword Search (handles state, city, 1 BHK - 5 BHK, Vastu, RERA)
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase().trim();
          const bhkMatch = q.match(/([1-5])\s*bhk/);
          if (bhkMatch) {
            const num = parseInt(bhkMatch[1]);
            if (item.bedrooms === num) return true;
          }

          const matchTitle = item.title.toLowerCase().includes(q);
          const matchLoc = item.location.toLowerCase().includes(q);
          const matchCity = item.city.toLowerCase().includes(q);
          const matchState = item.state ? item.state.toLowerCase().includes(q) : false;
          const matchDesc = item.description.toLowerCase().includes(q);
          const matchType = item.type.toLowerCase().includes(q);
          const matchBhk = item.bhk ? item.bhk.toLowerCase().includes(q) : false;
          const matchRera = item.reraId ? item.reraId.toLowerCase().includes(q) : false;
          const matchVastu = item.vastuStatus ? item.vastuStatus.toLowerCase().includes(q) : false;
          if (!matchTitle && !matchLoc && !matchCity && !matchState && !matchDesc && !matchType && !matchBhk && !matchRera && !matchVastu) return false;
        }

        // City & State Filter
        if (selectedCity) {
          const sc = selectedCity.toLowerCase().trim();
          const matchCity = item.city && item.city.toLowerCase().includes(sc);
          const matchState = item.state && item.state.toLowerCase().includes(sc);
          const matchLoc = item.location && item.location.toLowerCase().includes(sc);
          if (!matchCity && !matchState && !matchLoc) return false;
        }

        // Property Type Filter
        if (selectedType && item.type.toLowerCase() !== selectedType.toLowerCase()) {
          return false;
        }

        // Bedrooms Filter (supports 1 BHK to 5+ BHK and Plots)
        if (bedrooms) {
          const cleanBed = bedrooms.toString().replace(/\s*bhk/i, "").trim().toLowerCase();
          if (cleanBed === "0" || cleanBed === "plot" || cleanBed === "plots") {
            if (item.bedrooms !== 0 && item.type.toLowerCase() !== "plot") return false;
          } else if (cleanBed === "1" && item.bedrooms !== 1) {
            return false;
          } else if (cleanBed === "2" && item.bedrooms !== 2) {
            return false;
          } else if (cleanBed === "3" && item.bedrooms !== 3) {
            return false;
          } else if (cleanBed === "4" && item.bedrooms !== 4) {
            return false;
          } else if ((cleanBed === "5" || cleanBed === "5+" || cleanBed === "4+") && item.bedrooms < 5) {
            return false;
          }
        }

        // Price Range Filter
        if (priceRange) {
          if (priceRange === "under-50l" && item.price >= 5000000) return false;
          if (priceRange === "50l-1cr" && (item.price < 5000000 || item.price > 10000000)) return false;
          if (priceRange === "1cr-2cr" && (item.price < 10000000 || item.price > 20000000)) return false;
          if (priceRange === "above-2cr" && item.price <= 20000000) return false;
        }

        // Amenities Filter (every checked amenity must be present)
        if (selectedAmenities.length > 0) {
          const hasAllAmenities = selectedAmenities.every((amenity) =>
            item.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
          );
          if (!hasAllAmenities) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "area-desc") return b.area - a.area;
        if (sortBy === "newest") return b.yearBuilt - a.yearBuilt;
        // Default: featured first
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [
    properties,
    searchQuery,
    selectedCity,
    selectedType,
    bedrooms,
    priceRange,
    selectedAmenities,
    sortBy
  ]);

  // Active filter count
  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    (selectedCity ? 1 : 0) +
    (selectedType ? 1 : 0) +
    (priceRange ? 1 : 0) +
    (bedrooms ? 1 : 0) +
    selectedAmenities.length;

  // Pagination calculation
  const totalPages = Math.ceil(filteredProperties.length / pageSize) || 1;
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProperties.slice(start, start + pageSize);
  }, [filteredProperties, currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  return (
    <div className="properties-page" style={{ padding: "40px 0 80px", minHeight: "85vh" }}>
      <div className="container">
        {/* Elite Page Header & Unique Real Estate Portfolio Showcase */}
        <div
          style={{
            marginBottom: "28px",
            padding: "32px 28px",
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)",
            border: "1px solid rgba(212, 175, 55, 0.4)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(212, 175, 55, 0.12)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Ambient Glow */}
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, transparent 70%)",
              pointerEvents: "none"
            }}
          />

          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 12px",
                  borderRadius: "var(--radius-full)",
                  background: "linear-gradient(135deg, #d4af37, #f59e0b)",
                  color: "#0f172a",
                  fontSize: "0.74rem",
                  fontWeight: 900,
                  letterSpacing: "0.5px"
                }}
              >
                <Crown size={13} />
                <span>ALL RESIDENCES & UNIQUE REAL ESTATE</span>
              </span>

              <span style={{ fontSize: "0.76rem", color: "#94a3b8", fontWeight: 700 }}>
                100% Freehold RERA Cleared • 28 Indian States & UTs
              </span>
            </div>

            <h1 style={{ fontSize: "2.4rem", margin: "6px 0 10px", color: "#ffffff", fontWeight: 900 }}>
              India's Premier Real Estate Portfolio
            </h1>

            <p style={{ color: "#cbd5e1", fontSize: "0.95rem", maxWidth: "850px", margin: "0 0 20px", lineHeight: 1.5 }}>
              From royal Mithila heritage kothis in Darbhanga to Arabian Sea horizon mansions in Mumbai, beachfront pool villas in Goa & DLF golf suites in NCR.
            </p>

            {/* Unique Architectural Style Badges (Instant Click Filters) */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#d4af37", textTransform: "uppercase", letterSpacing: "0.5px", marginRight: "4px" }}>
                Signature Themes:
              </span>

              {[
                { label: "🏰 Royal Heritage Kothis", query: "Kothi", state: "Bihar" },
                { label: "🌊 Worli Coastal Mansions", query: "Mansion", city: "Mumbai" },
                { label: "🏖️ Goa Beachfront Pool Villas", query: "Villa", state: "Goa" },
                { label: "🏌️ Golf Horizon Duplexes", query: "Penthouse", city: "Gurugram" },
                { label: "🌿 Net-Zero Eco Penthouses", query: "Villa", city: "Bangalore" },
                { label: "🛕 Temple Corridor Plots", query: "Plot", city: "Ayodhya" }
              ].map((theme, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    const p = new URLSearchParams();
                    if (theme.query) p.set("q", theme.query);
                    if (theme.city) p.set("city", theme.city);
                    if (theme.state) p.set("state", theme.state);
                    setSearchParams(p);
                  }}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "var(--radius-full)",
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    color: "#f8fafc",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#d4af37";
                    e.currentTarget.style.background = "rgba(212, 175, 55, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                  }}
                >
                  <span>{theme.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick BHK Navigation Bar with Live Counts */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "28px",
            overflowX: "auto",
            paddingBottom: "8px",
            scrollbarWidth: "none"
          }}
          className="bhk-quick-bar"
        >
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
            BHK Selection:
          </span>
          {[
            { label: "All Residences", val: "", count: bhkCounts.all },
            { label: "1 BHK", val: "1", count: bhkCounts.bhk1 },
            { label: "2 BHK", val: "2", count: bhkCounts.bhk2 },
            { label: "3 BHK", val: "3", count: bhkCounts.bhk3 },
            { label: "4 BHK", val: "4", count: bhkCounts.bhk4 },
            { label: "5+ BHK Sky Villas", val: "5", count: bhkCounts.bhk5 },
            { label: "Plots & Lands", val: "plot", count: bhkCounts.plots }
          ].map((item) => {
            const isActive = bedrooms === item.val || (item.val === "" && !bedrooms);
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setBedrooms(item.val);
                  const p = new URLSearchParams(searchParams);
                  if (item.val) p.set("beds", item.val);
                  else p.delete("beds");
                  setSearchParams(p);
                }}
                className={`chip-btn ${isActive ? "active" : ""}`}
                style={{
                  padding: "8px 16px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <span>{item.label}</span>
                <span
                  style={{
                    background: isActive ? "rgba(255,255,255,0.25)" : "var(--bg-secondary)",
                    padding: "2px 7px",
                    borderRadius: "12px",
                    fontSize: "0.74rem",
                    fontWeight: 800
                  }}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Catalog Layout: Sidebar + Listings */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "32px",
            alignItems: "start"
          }}
          className="properties-layout-grid"
        >
          {/* Desktop Filter Column */}
          <div className="desktop-filter-column">
            <Filter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              bedrooms={bedrooms}
              setBedrooms={setBedrooms}
              selectedAmenities={selectedAmenities}
              setSelectedAmenities={setSelectedAmenities}
              onResetFilters={handleResetFilters}
              totalResults={filteredProperties.length}
            />

            {/* Rich Interactive Sidebar Suite */}
            <PropertiesSidebarContent onOpenBrochures={() => setShowBrochureHub(true)} />
          </div>

          {/* Main Listings Column */}
          <div>
            {/* Control Bar: Active filters, Sorting, View Toggle, Mobile Filter Button */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-md)",
                marginBottom: "24px",
                flexWrap: "wrap",
                gap: "14px"
              }}
            >
              {/* Left: Mobile filter button & Results count */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="btn btn-secondary btn-sm mobile-filter-trigger"
                  style={{ display: "none" }}
                >
                  <SlidersHorizontal size={15} />
                  <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ""}</span>
                </button>

                <span style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                  Showing <strong style={{ color: "var(--accent-primary)" }}>{filteredProperties.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}–{Math.min(currentPage * pageSize, filteredProperties.length)}</strong> of {filteredProperties.length} verified residences (Page {currentPage} of {totalPages})
                </span>
              </div>

              {/* Right: Sort and View Mode */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <label htmlFor="sort-select" style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                    Sort by:
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-surface)",
                      color: "var(--text-primary)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      outline: "none"
                    }}
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="area-desc">Area: High to Low</option>
                    <option value="newest">Newest Built</option>
                  </select>
                </div>

                {/* Grid / List / Map Mode */}
                <div style={{ display: "flex", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", padding: "2px" }}>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`btn-icon ${viewMode === "grid" ? "active" : ""}`}
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "var(--radius-sm)",
                      background: viewMode === "grid" ? "var(--bg-surface)" : "transparent",
                      border: "none"
                    }}
                    title="Grid View"
                  >
                    <LayoutGrid size={17} color={viewMode === "grid" ? "var(--accent-primary)" : "var(--text-muted)"} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`btn-icon ${viewMode === "list" ? "active" : ""}`}
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "var(--radius-sm)",
                      background: viewMode === "list" ? "var(--bg-surface)" : "transparent",
                      border: "none"
                    }}
                    title="List View"
                  >
                    <List size={17} color={viewMode === "list" ? "var(--accent-primary)" : "var(--text-muted)"} />
                  </button>
                  <button
                    onClick={() => setViewMode("map")}
                    className={`btn-icon ${viewMode === "map" ? "active" : ""}`}
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "var(--radius-sm)",
                      background: viewMode === "map" ? "var(--bg-surface)" : "transparent",
                      border: "none"
                    }}
                    title="Interactive Map View"
                  >
                    <MapIcon size={17} color={viewMode === "map" ? "var(--accent-primary)" : "var(--text-muted)"} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Chips */}
            {activeFiltersCount > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
                  Active Filters:
                </span>
                {selectedCity && (
                  <span className="chip-btn" style={{ background: "var(--accent-primary-light)", color: "var(--accent-primary)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    City: {selectedCity}
                    <X size={14} style={{ cursor: "pointer" }} onClick={() => setSelectedCity("")} />
                  </span>
                )}
                {selectedType && (
                  <span className="chip-btn" style={{ background: "var(--accent-primary-light)", color: "var(--accent-primary)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    Type: {selectedType}
                    <X size={14} style={{ cursor: "pointer" }} onClick={() => setSelectedType("")} />
                  </span>
                )}
                {bedrooms && (
                  <span className="chip-btn" style={{ background: "var(--accent-primary-light)", color: "var(--accent-primary)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    {bedrooms} BHK
                    <X size={14} style={{ cursor: "pointer" }} onClick={() => setBedrooms("")} />
                  </span>
                )}
                {priceRange && (
                  <span className="chip-btn" style={{ background: "var(--accent-primary-light)", color: "var(--accent-primary)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    Budget Range
                    <X size={14} style={{ cursor: "pointer" }} onClick={() => setPriceRange("")} />
                  </span>
                )}
                {selectedAmenities.map((amenity) => (
                  <span key={amenity} className="chip-btn" style={{ background: "var(--accent-primary-light)", color: "var(--accent-primary)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    {amenity}
                    <X
                      size={14}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))}
                    />
                  </span>
                ))}
                <button
                  onClick={handleResetFilters}
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--accent-rose)",
                    fontWeight: 600,
                    cursor: "pointer",
                    textDecoration: "underline",
                    marginLeft: "8px"
                  }}
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Properties Grid / List / Interactive Map */}
            {filteredProperties.length > 0 ? (
              <>
                {viewMode === "map" ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <InteractiveMap properties={filteredProperties.slice(0, 48)} />
                    <div className="properties-grid">
                      {paginatedProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={viewMode === "grid" ? "properties-grid" : "properties-list"}>
                    {paginatedProperties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                )}

                {/* Pro-Level Pagination Controls */}
                {totalPages > 1 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "16px",
                      marginTop: "36px",
                      padding: "16px 20px",
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "var(--radius-md)",
                      boxShadow: "var(--shadow-sm)"
                    }}
                  >
                    {/* Page Size & Range */}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                        Showing <strong>{(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredProperties.length)}</strong> of {filteredProperties.length} listings
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>Show:</span>
                        {[12, 24, 48, 96].map((size) => (
                          <button
                            key={size}
                            onClick={() => {
                              setPageSize(size);
                              setCurrentPage(1);
                            }}
                            style={{
                              padding: "4px 8px",
                              borderRadius: "4px",
                              border: pageSize === size ? "1px solid var(--accent-primary)" : "1px solid var(--border-light)",
                              background: pageSize === size ? "var(--accent-primary)" : "var(--bg-surface)",
                              color: pageSize === size ? "#ffffff" : "var(--text-secondary)",
                              fontSize: "0.78rem",
                              fontWeight: 700,
                              cursor: "pointer"
                            }}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Numeric Pagination Buttons */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: "6px 12px", opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? "not-allowed" : "pointer", fontSize: "0.82rem" }}
                      >
                        Previous
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                        .map((p, idx, arr) => {
                          const prev = arr[idx - 1];
                          return (
                            <React.Fragment key={p}>
                              {prev && p - prev > 1 && (
                                <span style={{ padding: "0 4px", color: "var(--text-muted)", fontSize: "0.85rem" }}>...</span>
                              )}
                              <button
                                onClick={() => handlePageChange(p)}
                                style={{
                                  width: "34px",
                                  height: "34px",
                                  borderRadius: "6px",
                                  border: currentPage === p ? "1px solid var(--accent-primary)" : "1px solid var(--border-light)",
                                  background: currentPage === p ? "var(--accent-primary)" : "var(--bg-surface)",
                                  color: currentPage === p ? "#ffffff" : "var(--text-primary)",
                                  fontWeight: 700,
                                  fontSize: "0.85rem",
                                  cursor: "pointer"
                                }}
                              >
                                {p}
                              </button>
                            </React.Fragment>
                          );
                        })}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: "6px 12px", opacity: currentPage === totalPages ? 0.4 : 1, cursor: currentPage === totalPages ? "not-allowed" : "pointer", fontSize: "0.82rem" }}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div
                style={{
                  background: "var(--bg-surface)",
                  borderRadius: "var(--radius-lg)",
                  padding: "60px 24px",
                  textAlign: "center",
                  border: "1px dashed var(--border-light)",
                  margin: "20px 0"
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "var(--bg-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    color: "var(--text-muted)"
                  }}
                >
                  <Home size={30} />
                </div>
                <h3 style={{ fontSize: "1.4rem", marginBottom: "8px" }}>No matching properties found</h3>
                <p style={{ maxWidth: "450px", margin: "0 auto 24px", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                  We couldn't find any properties matching your current search criteria. Try relaxing some filters or resetting to view all available listings.
                </p>
                <button onClick={handleResetFilters} className="btn btn-primary btn-sm">
                  <RefreshCw size={15} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Pan-India 36 States & UTs Explorer Section */}
      <div style={{ marginTop: "40px" }}>
        <IndiaStateExplorer />
      </div>

      {/* 3. Founder Sanjay Kumar Institutional Advisory & VIP NRI Desk Banner */}
      <div className="container" style={{ marginTop: "40px" }}>
        <div
          style={{
            padding: "36px 32px",
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))",
            border: "1px solid rgba(212, 175, 55, 0.4)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 30px rgba(212, 175, 55, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <img
                src={sanjayPhoto}
                alt="Sanjay Kumar - Founder"
                style={{
                  width: "74px",
                  height: "74px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #d97706",
                  boxShadow: "0 0 20px rgba(217, 119, 6, 0.6)"
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: "3px",
                  right: "3px",
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                  background: "#10b981",
                  border: "2px solid #0f172a"
                }}
              />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <h3 style={{ margin: 0, fontSize: "1.3rem", color: "#ffffff", fontWeight: 800 }}>
                  Founder Advisory Desk: Sanjay Kumar
                </h3>
                <ShieldCheck size={18} color="#10b981" />
              </div>
              <p style={{ margin: 0, fontSize: "0.86rem", color: "#94a3b8", maxWidth: "620px", lineHeight: 1.45 }}>
                Principal Investment Consultant • Darbhanga, Bihar. Providing high-net-worth NRI portfolio allocations, off-market royal estates, ancestral land clearances & 100% legal RERA title verification.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <a
              href="tel:+918809604880"
              className="btn btn-gold"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 22px",
                fontWeight: 800,
                textDecoration: "none"
              }}
            >
              <Phone size={15} />
              <span>Call +91 8809604880</span>
            </a>

            <a
              href="https://wa.me/918809604880?text=Hello%20Sanjay%20ji,%20I%20am%20exploring%20properties%20on%20EstateHub%20and%20need%20custom%20advisory."
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 22px",
                background: "#25D366",
                color: "#ffffff",
                borderRadius: "var(--radius-md)",
                fontWeight: 800,
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(37, 211, 102, 0.4)"
              }}
            >
              <MessageSquare size={15} />
              <span>WhatsApp Founder</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Filter Slide Drawer */}
      {mobileFilterOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "flex-end"
          }}
          onClick={() => setMobileFilterOpen(false)}
        >
          <div
            style={{
              width: "85%",
              maxWidth: "360px",
              height: "100%",
              background: "var(--bg-surface)",
              overflowY: "auto",
              padding: "24px",
              boxShadow: "var(--shadow-lg)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0 }}>Filter Properties</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="btn-icon" style={{ width: "36px", height: "36px" }}>
                <X size={18} />
              </button>
            </div>

            <Filter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              bedrooms={bedrooms}
              setBedrooms={setBedrooms}
              selectedAmenities={selectedAmenities}
              setSelectedAmenities={setSelectedAmenities}
              onResetFilters={handleResetFilters}
              totalResults={filteredProperties.length}
            />

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "20px" }}
            >
              Apply Filters ({filteredProperties.length})
            </button>
          </div>
        </div>
      )}

      {/* Official PDF Brochure Hub Modal */}
      {showBrochureHub && (
        <BrochureHubModal
          isOpen={showBrochureHub}
          onClose={() => setShowBrochureHub(false)}
        />
      )}

      {/* CSS tweak for responsive layout and sticky sidebar */}
      <style>{`
        @media (min-width: 901px) {
          .desktop-filter-column {
            position: sticky;
            top: 85px;
            align-self: start;
            max-height: calc(100vh - 100px);
            overflow-y: auto;
            scrollbar-width: thin;
            padding-right: 6px;
          }
        }
        @media (max-width: 900px) {
          .properties-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .desktop-filter-column {
            display: none !important;
          }
          .mobile-filter-trigger {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Properties;
