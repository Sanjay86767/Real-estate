import React from "react";
import { Filter as FilterIcon, RotateCcw, Search, MapPin, IndianRupee, Home, Check } from "lucide-react";

export const Filter = ({
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
  totalResults
}) => {
  const stateAndCityList = [
    { label: "Bihar (Darbhanga & Patna)", value: "Bihar" },
    { label: "Maharashtra (Mumbai & Pune)", value: "Maharashtra" },
    { label: "Delhi NCR / Gurugram", value: "Delhi" },
    { label: "Haryana (Gurugram & Faridabad)", value: "Haryana" },
    { label: "Punjab (Mohali & Amritsar)", value: "Punjab" },
    { label: "Chandigarh (UT)", value: "Chandigarh" },
    { label: "Karnataka (Bangalore)", value: "Karnataka" },
    { label: "Telangana (Hyderabad)", value: "Telangana" },
    { label: "Tamil Nadu (Chennai)", value: "Tamil Nadu" },
    { label: "Kerala (Kochi)", value: "Kerala" },
    { label: "Andhra Pradesh (Vizag)", value: "Andhra Pradesh" },
    { label: "Goa (Candolim Beach)", value: "Goa" },
    { label: "Rajasthan (Jaipur)", value: "Rajasthan" },
    { label: "Gujarat (GIFT City / Ahd)", value: "Gujarat" },
    { label: "Uttar Pradesh (Ayodhya & LKO)", value: "Uttar Pradesh" },
    { label: "Uttarakhand (Dehradun)", value: "Uttarakhand" },
    { label: "Himachal Pradesh (Shimla)", value: "Himachal Pradesh" },
    { label: "Madhya Pradesh (Indore)", value: "Madhya Pradesh" },
    { label: "Chhattisgarh (Raipur)", value: "Chhattisgarh" },
    { label: "West Bengal (Kolkata)", value: "West Bengal" },
    { label: "Odisha (Bhubaneswar)", value: "Odisha" },
    { label: "Jharkhand (Ranchi)", value: "Jharkhand" },
    { label: "Assam (Guwahati)", value: "Assam" },
    { label: "Meghalaya (Shillong)", value: "Meghalaya" },
    { label: "Sikkim (Gangtok)", value: "Sikkim" },
    { label: "Arunachal Pradesh (Itanagar)", value: "Arunachal Pradesh" },
    { label: "Nagaland (Kohima)", value: "Nagaland" },
    { label: "Manipur (Imphal)", value: "Manipur" },
    { label: "Mizoram (Aizawl)", value: "Mizoram" },
    { label: "Tripura (Agartala)", value: "Tripura" },
    { label: "Jammu & Kashmir (Srinagar)", value: "Jammu" },
    { label: "Ladakh (Leh)", value: "Ladakh" },
    { label: "Puducherry (Pondicherry)", value: "Puducherry" },
    { label: "Andaman & Nicobar Islands", value: "Andaman" },
    { label: "Lakshadweep (Kavaratti)", value: "Lakshadweep" },
    { label: "Dadra & NH & Daman & Diu", value: "Dadra" }
  ];
  const propertyTypes = ["Apartment", "Villa", "Penthouse", "House", "Plot"];
  const bedroomOptions = [
    { label: "All", value: "" },
    { label: "1 BHK", value: "1" },
    { label: "2 BHK", value: "2" },
    { label: "3 BHK", value: "3" },
    { label: "4 BHK", value: "4" },
    { label: "5+ BHK", value: "5" },
    { label: "Plots", value: "plot" }
  ];
  const amenitiesList = [
    "Swimming Pool",
    "Gym & Fitness Suite",
    "Private Garden",
    "Power Backup",
    "24/7 Security",
    "Smart Home Automation",
    "Clubhouse Access"
  ];

  const handleAmenityToggle = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  return (
    <aside className="filter-panel" aria-label="Property Filters">
      {/* Header */}
      <div className="filter-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FilterIcon size={18} color="var(--accent-primary)" />
          <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Filter Properties</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="btn btn-secondary btn-sm"
          style={{ padding: "4px 10px", fontSize: "0.8rem", gap: "4px" }}
          title="Reset all filters"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </div>

      {/* Keyword Search */}
      <div className="filter-section">
        <label className="filter-title" htmlFor="filter-search-input">
          <Search size={15} color="var(--accent-primary)" />
          <span>Search Keyword</span>
        </label>
        <input
          id="filter-search-input"
          type="text"
          placeholder="e.g. Luxury Villa, Sector 70..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-light)",
            background: "var(--bg-secondary)",
            color: "var(--text-primary)",
            fontSize: "0.9rem",
            outline: "none"
          }}
        />
      </div>

      {/* State / City / Location */}
      <div className="filter-section">
        <div className="filter-title">
          <MapPin size={15} color="var(--accent-primary)" />
          <span>State / City Destination</span>
        </div>
        <div className="filter-options-grid" style={{ maxHeight: "230px", overflowY: "auto", paddingRight: "4px" }}>
          <label className="checkbox-label">
            <input
              type="radio"
              name="city"
              checked={selectedCity === ""}
              onChange={() => setSelectedCity("")}
            />
            <span style={{ fontWeight: selectedCity === "" ? 700 : 500 }}>All India (36 States & UTs)</span>
          </label>
          {stateAndCityList.map((item) => (
            <label key={item.value} className="checkbox-label">
              <input
                type="radio"
                name="city"
                checked={selectedCity.toLowerCase() === item.value.toLowerCase()}
                onChange={() => setSelectedCity(item.value)}
              />
              <span style={{ fontWeight: selectedCity.toLowerCase() === item.value.toLowerCase() ? 700 : 400 }}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div className="filter-section">
        <div className="filter-title">
          <Home size={15} color="var(--accent-primary)" />
          <span>Property Type</span>
        </div>
        <div className="chip-group">
          <button
            type="button"
            className={`chip-btn ${selectedType === "" ? "active" : ""}`}
            onClick={() => setSelectedType("")}
          >
            All
          </button>
          {propertyTypes.map((type) => (
            <button
              key={type}
              type="button"
              className={`chip-btn ${selectedType === type ? "active" : ""}`}
              onClick={() => setSelectedType(selectedType === type ? "" : type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="filter-section">
        <div className="filter-title">
          <IndianRupee size={15} color="var(--accent-primary)" />
          <span>Price Budget</span>
        </div>
        <div className="filter-options-grid">
          <label className="checkbox-label">
            <input
              type="radio"
              name="price"
              checked={priceRange === ""}
              onChange={() => setPriceRange("")}
            />
            <span>Any Budget</span>
          </label>
          <label className="checkbox-label">
            <input
              type="radio"
              name="price"
              checked={priceRange === "under-50l"}
              onChange={() => setPriceRange("under-50l")}
            />
            <span>Under ₹50 Lakh</span>
          </label>
          <label className="checkbox-label">
            <input
              type="radio"
              name="price"
              checked={priceRange === "50l-1cr"}
              onChange={() => setPriceRange("50l-1cr")}
            />
            <span>₹50 Lakh – ₹1 Crore</span>
          </label>
          <label className="checkbox-label">
            <input
              type="radio"
              name="price"
              checked={priceRange === "1cr-2cr"}
              onChange={() => setPriceRange("1cr-2cr")}
            />
            <span>₹1 Crore – ₹2 Crore</span>
          </label>
          <label className="checkbox-label">
            <input
              type="radio"
              name="price"
              checked={priceRange === "above-2cr"}
              onChange={() => setPriceRange("above-2cr")}
            />
            <span>Above ₹2 Crore</span>
          </label>
        </div>
      </div>

      {/* Bedrooms */}
      <div className="filter-section">
        <div className="filter-title">
          <span>Bedrooms (BHK)</span>
        </div>
        <div className="chip-group">
          {bedroomOptions.map((opt) => (
            <button
              key={opt.label}
              type="button"
              className={`chip-btn ${bedrooms === opt.value || (opt.value === "" && !bedrooms) ? "active" : ""}`}
              onClick={() => setBedrooms(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="filter-section">
        <div className="filter-title">
          <span>Amenities</span>
        </div>
        <div className="filter-options-grid">
          {amenitiesList.map((amenity) => (
            <label key={amenity} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Results Count Banner */}
      <div
        style={{
          padding: "12px",
          background: "var(--bg-secondary)",
          borderRadius: "var(--radius-sm)",
          textAlign: "center",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: "var(--text-secondary)"
        }}
      >
        Found <strong>{totalResults}</strong> matching properties
      </div>
    </aside>
  );
};

export default Filter;
