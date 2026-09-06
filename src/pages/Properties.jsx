import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import PropertyCard from "../components/PropertyCard";
import Filter from "../components/Filter";
import InteractiveMap from "../components/InteractiveMap";
import { LayoutGrid, List, Map as MapIcon, SlidersHorizontal, X, RefreshCw, Home } from "lucide-react";

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

  // Reset Filters handler
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCity("");
    setSelectedType("");
    setPriceRange("");
    setBedrooms("");
    setSelectedAmenities([]);
    setSortBy("featured");
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

  return (
    <div className="properties-page" style={{ padding: "40px 0 80px", minHeight: "85vh" }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent-primary)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
            <Home size={16} />
            <span>Prime Real Estate Catalog</span>
          </div>
          <h1 style={{ fontSize: "2.4rem", marginTop: "6px" }}>Explore Properties</h1>
          <p style={{ marginTop: "4px" }}>
            Discover verified 1 BHK, 2 BHK, 3 BHK, 4 BHK, 5 BHK luxury residences and plots across India with real-time price & Vastu filters.
          </p>
        </div>

        {/* Quick BHK Navigation Bar */}
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
            { label: "All BHKs", val: "" },
            { label: "1 BHK", val: "1" },
            { label: "2 BHK", val: "2" },
            { label: "3 BHK", val: "3" },
            { label: "4 BHK", val: "4" },
            { label: "5+ BHK", val: "5" },
            { label: "Plots", val: "plot" }
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
                  whiteSpace: "nowrap"
                }}
              >
                {item.label}
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
                  Showing <strong style={{ color: "var(--accent-primary)" }}>{filteredProperties.length}</strong> of {properties.length} properties
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
              viewMode === "map" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <InteractiveMap properties={filteredProperties} />
                  <div className="properties-grid">
                    {filteredProperties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className={viewMode === "grid" ? "properties-grid" : "properties-list"}>
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )
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

      {/* CSS tweak for responsive layout */}
      <style>{`
        @media (max-width: 900px) {
          .properties-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .desktop-filter-column {
            display: none;
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
