import React, { useState } from "react";
import {
  Search,
  MapPin,
  Building,
  IndianRupee,
  SlidersHorizontal,
  RotateCcw,
  Check,
  X,
  Sparkles,
  ChevronDown
} from "lucide-react";
import { playClickSound } from "../utils/effects";

export const HorizontalFilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  selectedType,
  setSelectedType,
  priceRange,
  setPriceRange,
  bedrooms,
  setBedrooms,
  selectedAmenities,
  setSelectedAmenities,
  onResetFilters,
  totalResults,
  bhkCounts = {}
}) => {
  const [showAmenitiesDropdown, setShowAmenitiesDropdown] = useState(false);

  const statesAndCities = [
    { label: "All Indian Locations", value: "" },
    { label: "📍 Bihar (Darbhanga & Patna)", value: "Bihar" },
    { label: "📍 Maharashtra (Mumbai & Pune)", value: "Maharashtra" },
    { label: "📍 Goa Coastal Beachfront", value: "Goa" },
    { label: "📍 Delhi NCR / Gurugram", value: "Delhi" },
    { label: "📍 Karnataka (Bangalore)", value: "Karnataka" },
    { label: "📍 Punjab (Mohali & Amritsar)", value: "Punjab" },
    { label: "📍 Uttar Pradesh (Ayodhya & Noida)", value: "Uttar Pradesh" },
    { label: "📍 Telangana (Hyderabad)", value: "Telangana" },
    { label: "📍 Gujarat (GIFT City & Ahmedabad)", value: "Gujarat" },
    { label: "📍 Rajasthan (Jaipur & Udaipur)", value: "Rajasthan" },
    { label: "📍 West Bengal (Kolkata)", value: "West Bengal" },
    { label: "📍 Tamil Nadu (Chennai)", value: "Tamil Nadu" },
    { label: "📍 Kerala (Kochi)", value: "Kerala" }
  ];

  const propertyTypes = [
    { label: "All Property Types", value: "" },
    { label: "Apartment / Flats", value: "Apartment" },
    { label: "Luxury Villa", value: "Villa" },
    { label: "Sky Penthouse", value: "Penthouse" },
    { label: "Royal Kothi / House", value: "House" },
    { label: "Freehold Land / Plot", value: "Plot" }
  ];

  const priceRanges = [
    { label: "Any Budget", value: "" },
    { label: "Under ₹50 Lakh", value: "0-5000000" },
    { label: "₹50 Lakh – ₹1 Crore", value: "5000000-10000000" },
    { label: "₹1 Crore – ₹3 Crore", value: "10000000-30000000" },
    { label: "₹3 Crore – ₹5 Crore", value: "30000000-50000000" },
    { label: "Ultra Luxury Above ₹5 Crore", value: "50000000+" }
  ];

  const amenitiesList = [
    "Swimming Pool",
    "Fitness Gym",
    "Private Garden",
    "Covered Parking",
    "24/7 Security",
    "Power Backup",
    "Clubhouse",
    "Sea / Skyline View"
  ];

  const bhkOptions = [
    { label: "All Residences", val: "", count: bhkCounts.all || 0 },
    { label: "1 BHK", val: "1", count: bhkCounts.bhk1 || 0 },
    { label: "2 BHK", val: "2", count: bhkCounts.bhk2 || 0 },
    { label: "3 BHK", val: "3", count: bhkCounts.bhk3 || 0 },
    { label: "4 BHK", val: "4", count: bhkCounts.bhk4 || 0 },
    { label: "5+ BHK Sky Villas", val: "5", count: bhkCounts.bhk5 || 0 },
    { label: "Plots & Lands", val: "plot", count: bhkCounts.plots || 0 }
  ];

  const handleAmenityToggle = (amenity) => {
    playClickSound();
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCity ||
    selectedType ||
    priceRange ||
    bedrooms ||
    selectedAmenities.length > 0;

  return (
    <div
      className="horizontal-executive-filter-bar"
      style={{
        width: "100%",
        background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.92))",
        border: "1px solid rgba(212, 175, 55, 0.35)",
        borderRadius: "var(--radius-xl)",
        padding: "20px 24px",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.45), 0 0 25px rgba(212, 175, 55, 0.1)",
        marginBottom: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }}
    >
      {/* Row 1: High-Performance Dropdown Filters Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "12px",
          alignItems: "center"
        }}
      >
        {/* 1. Keyword Search */}
        <div style={{ position: "relative" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--accent-gold)",
              pointerEvents: "none"
            }}
          />
          <input
            type="text"
            placeholder="Search city, state, RERA..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px 12px 38px",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "var(--radius-md)",
              color: "#ffffff",
              fontSize: "0.85rem",
              fontWeight: 600,
              outline: "none"
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#94a3b8",
                cursor: "pointer"
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* 2. Location Select */}
        <div style={{ position: "relative" }}>
          <MapPin
            size={16}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#38bdf8",
              pointerEvents: "none"
            }}
          />
          <select
            value={selectedCity}
            onChange={(e) => {
              playClickSound();
              setSelectedCity(e.target.value);
            }}
            style={{
              width: "100%",
              padding: "12px 30px 12px 38px",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "var(--radius-md)",
              color: "#ffffff",
              fontSize: "0.85rem",
              fontWeight: 600,
              outline: "none",
              cursor: "pointer",
              appearance: "none",
              WebkitAppearance: "none"
            }}
          >
            {statesAndCities.map((loc) => (
              <option key={loc.value} value={loc.value} style={{ background: "#0f172a", color: "#ffffff" }}>
                {loc.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }}
          />
        </div>

        {/* 3. Property Type Select */}
        <div style={{ position: "relative" }}>
          <Building
            size={16}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#ec4899",
              pointerEvents: "none"
            }}
          />
          <select
            value={selectedType}
            onChange={(e) => {
              playClickSound();
              setSelectedType(e.target.value);
            }}
            style={{
              width: "100%",
              padding: "12px 30px 12px 38px",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "var(--radius-md)",
              color: "#ffffff",
              fontSize: "0.85rem",
              fontWeight: 600,
              outline: "none",
              cursor: "pointer",
              appearance: "none",
              WebkitAppearance: "none"
            }}
          >
            {propertyTypes.map((type) => (
              <option key={type.value} value={type.value} style={{ background: "#0f172a", color: "#ffffff" }}>
                {type.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }}
          />
        </div>

        {/* 4. Price Range Select */}
        <div style={{ position: "relative" }}>
          <IndianRupee
            size={16}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#10b981",
              pointerEvents: "none"
            }}
          />
          <select
            value={priceRange}
            onChange={(e) => {
              playClickSound();
              setPriceRange(e.target.value);
            }}
            style={{
              width: "100%",
              padding: "12px 30px 12px 38px",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "var(--radius-md)",
              color: "#ffffff",
              fontSize: "0.85rem",
              fontWeight: 600,
              outline: "none",
              cursor: "pointer",
              appearance: "none",
              WebkitAppearance: "none"
            }}
          >
            {priceRanges.map((p) => (
              <option key={p.value} value={p.value} style={{ background: "#0f172a", color: "#ffffff" }}>
                {p.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }}
          />
        </div>

        {/* 5. More Filters / Amenities Button & Reset */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setShowAmenitiesDropdown(!showAmenitiesDropdown);
            }}
            style={{
              flex: 1,
              padding: "12px 14px",
              borderRadius: "var(--radius-md)",
              background: showAmenitiesDropdown || selectedAmenities.length > 0
                ? "rgba(212, 175, 55, 0.25)"
                : "rgba(255, 255, 255, 0.06)",
              border: showAmenitiesDropdown || selectedAmenities.length > 0
                ? "1px solid #d4af37"
                : "1px solid rgba(255, 255, 255, 0.15)",
              color: showAmenitiesDropdown || selectedAmenities.length > 0 ? "#fbbf24" : "#ffffff",
              fontSize: "0.85rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px"
            }}
          >
            <SlidersHorizontal size={14} />
            <span>Amenities {selectedAmenities.length > 0 ? `(${selectedAmenities.length})` : ""}</span>
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onResetFilters();
              }}
              style={{
                padding: "12px 14px",
                borderRadius: "var(--radius-md)",
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.35)",
                color: "#f87171",
                fontSize: "0.85rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}
              title="Reset All Filters"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Row 2: BHK Quick Pills Strip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
          paddingTop: "6px",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px", overflowX: "auto", paddingBottom: "2px" }}>
          <span style={{ fontSize: "0.76rem", fontWeight: 800, color: "#d4af37", textTransform: "uppercase", letterSpacing: "0.5px", marginRight: "4px" }}>
            BHK Selection:
          </span>
          {bhkOptions.map((bhk) => {
            const isActive = bedrooms === bhk.val || (bhk.val === "" && !bedrooms);
            return (
              <button
                key={bhk.label}
                type="button"
                onClick={() => {
                  playClickSound();
                  setBedrooms(bhk.val);
                }}
                style={{
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  background: isActive ? "linear-gradient(135deg, #d4af37, #f59e0b)" : "rgba(255, 255, 255, 0.06)",
                  border: isActive ? "1px solid #fbbf24" : "1px solid rgba(255, 255, 255, 0.12)",
                  color: isActive ? "#0f172a" : "#cbd5e1",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease"
                }}
              >
                <span>{bhk.label}</span>
                <span
                  style={{
                    background: isActive ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.12)",
                    padding: "1px 6px",
                    borderRadius: "10px",
                    fontSize: "0.7rem",
                    fontWeight: 900
                  }}
                >
                  {bhk.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results Counter Badge */}
        <div style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "6px" }}>
          <Sparkles size={14} color="#d4af37" />
          <span>Showing <strong style={{ color: "#ffffff" }}>{totalResults}</strong> Verified Residences</span>
        </div>
      </div>

      {/* Row 3: Collapsible Amenities Dropdown Tray */}
      {showAmenitiesDropdown && (
        <div
          style={{
            padding: "14px",
            background: "rgba(11, 17, 32, 0.9)",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
            gap: "10px"
          }}
        >
          {amenitiesList.map((amenity) => {
            const isSelected = selectedAmenities.includes(amenity);
            return (
              <label
                key={amenity}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  borderRadius: "var(--radius-sm)",
                  background: isSelected ? "rgba(212, 175, 55, 0.18)" : "rgba(255, 255, 255, 0.04)",
                  border: isSelected ? "1px solid #d4af37" : "1px solid rgba(255, 255, 255, 0.08)",
                  color: isSelected ? "#fbbf24" : "#cbd5e1",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleAmenityToggle(amenity)}
                  style={{ accentColor: "#d4af37", cursor: "pointer" }}
                />
                <span>{amenity}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HorizontalFilterBar;
