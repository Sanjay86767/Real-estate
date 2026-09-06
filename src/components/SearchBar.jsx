import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, MapPin, Home, IndianRupee, Layers, ArrowRight, Sparkles, Mic, MicOff } from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";
import { sfx } from "../utils/effects";

export const SearchBar = () => {
  const navigate = useNavigate();
  const { properties, setHeroSearchFilters, formatPrice, addToast } = usePropertyContext();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [showLiveDropdown, setShowLiveDropdown] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const searchBoxRef = useRef(null);

  // Web Speech API Voice Search
  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      addToast("Voice recognition is not supported in this browser. Try Chrome/Edge.", "warning");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        sfx.playPop();
        addToast("Listening... Speak your dream home preference!", "info");
      };

      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setKeyword(transcript);
        setShowLiveDropdown(true);
        setIsListening(false);
        sfx.playSuccess();
        addToast(`Voice recognized: "${transcript}"`, "success");
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  };

  // Close live suggestions if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setShowLiveDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Real-time matched properties for autocomplete preview (supports 1 BHK - 5 BHK, Vastu, RERA, City)
  const liveMatches = properties.filter((p) => {
    if (!keyword.trim()) return false;
    const q = keyword.toLowerCase().trim();
    
    // Check BHK pattern e.g. "1bhk", "2 bhk", "3bhk"
    const bhkMatch = q.match(/([1-5])\s*bhk/);
    if (bhkMatch) {
      const num = parseInt(bhkMatch[1]);
      if (p.bedrooms === num) return true;
    }

    return (
      p.title.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q) ||
      (p.bhk && p.bhk.toLowerCase().includes(q)) ||
      (p.tagline && p.tagline.toLowerCase().includes(q)) ||
      (p.reraId && p.reraId.toLowerCase().includes(q)) ||
      (p.vastuStatus && p.vastuStatus.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }).slice(0, 5);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowLiveDropdown(false);

    setHeroSearchFilters({
      location,
      type: propertyType,
      priceRange,
      bedrooms
    });

    const params = new URLSearchParams();
    if (keyword) params.append("q", keyword);
    if (location) params.append("city", location);
    if (propertyType) params.append("type", propertyType);
    if (priceRange) params.append("price", priceRange);
    if (bedrooms) params.append("beds", bedrooms);

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="quick-search-box" ref={searchBoxRef} style={{ position: "relative" }}>
      {/* Top Instant Keyword Input */}
      <div style={{ marginBottom: "14px", position: "relative" }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <Search
            size={18}
            color="var(--accent-primary)"
            style={{ position: "absolute", top: "13px", left: "14px" }}
          />
          <input
            type="text"
            placeholder="Type city, project, luxury villa, penthouse (e.g. Mohali, Grand Regal)..."
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setShowLiveDropdown(e.target.value.trim().length > 0);
            }}
            onFocus={() => {
              if (keyword.trim().length > 0) setShowLiveDropdown(true);
            }}
            style={{
              width: "100%",
              padding: "12px 90px 12px 42px",
              borderRadius: "var(--radius-md)",
              border: "1.5px solid var(--border-light)",
              background: "var(--bg-surface)",
              color: "var(--text-primary)",
              fontSize: "0.95rem",
              fontWeight: 500,
              outline: "none"
            }}
          />

          {/* Voice Search Button */}
          <div style={{ position: "absolute", right: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
            <button
              type="button"
              onClick={handleVoiceSearch}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: isListening ? "var(--accent-rose)" : "var(--bg-secondary)",
                color: isListening ? "#ffffff" : "var(--accent-primary)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isListening ? "0 0 12px var(--accent-rose)" : "none",
                transition: "all 0.2s"
              }}
              title="Voice Search"
              aria-label="Voice Search"
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>

            {keyword && (
              <button
                type="button"
                onClick={() => {
                  setKeyword("");
                  setShowLiveDropdown(false);
                }}
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  padding: "4px 8px"
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Real-time Live Autocomplete Dropdown */}
        {showLiveDropdown && liveMatches.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "105%",
              left: 0,
              right: 0,
              zIndex: 1000,
              background: "var(--bg-surface-elevated)",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-lg)",
              border: "1px solid var(--border-light)",
              overflow: "hidden",
              textAlign: "left"
            }}
          >
            <div
              style={{
                padding: "8px 14px",
                background: "var(--bg-secondary)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <Sparkles size={13} color="var(--accent-primary)" />
              <span>Real-Time Matches ({liveMatches.length})</span>
            </div>

            {liveMatches.map((match) => (
              <Link
                key={match.id}
                to={`/property/${match.id}`}
                onClick={() => setShowLiveDropdown(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderBottom: "1px solid var(--border-light)",
                  textDecoration: "none",
                  transition: "background-color 0.15s"
                }}
                className="live-search-item"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <img
                    src={match.images[0]}
                    alt={match.title}
                    style={{ width: "48px", height: "40px", borderRadius: "6px", objectFit: "cover" }}
                  />
                  <div>
                    <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)", display: "block" }}>
                      {match.title}
                    </strong>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                      📍 {match.location} • {match.bedrooms > 0 ? `${match.bedrooms} BHK` : "Plot"}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--accent-primary)" }}>
                    {formatPrice(match.price)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick Instant BHK & Category Discovery Chips */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "16px",
          overflowX: "auto",
          paddingBottom: "4px",
          scrollbarWidth: "none"
        }}
      >
        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
          🔥 Quick Search:
        </span>
        {[
          { label: "1 BHK Flats", beds: "1" },
          { label: "2 BHK Flats", beds: "2" },
          { label: "3 BHK High-Rise", beds: "3" },
          { label: "4 BHK Luxury Kothis", beds: "4" },
          { label: "5 BHK Penthouses", beds: "5" },
          { label: "Villa Plots", type: "Plot" },
          { label: "🧭 100% Vastu", query: "vastu" }
        ].map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              if (chip.beds) {
                navigate(`/properties?beds=${chip.beds}`);
              } else if (chip.type) {
                navigate(`/properties?type=${chip.type}`);
              } else if (chip.query) {
                navigate(`/properties?q=${chip.query}`);
              }
            }}
            style={{
              padding: "5px 12px",
              borderRadius: "var(--radius-full)",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-light)",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              whiteSpace: "nowrap",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch}>
        <div className="search-grid">
          {/* Location Field */}
          <div className="search-field">
            <label htmlFor="search-location">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <MapPin size={13} color="var(--accent-primary)" />
                Location / City
              </span>
            </label>
            <select
              id="search-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Mohali">Mohali, Punjab</option>
              <option value="Amritsar">Amritsar, Punjab</option>
              <option value="Delhi">Delhi NCR / Gurgaon</option>
              <option value="Bangalore">Bangalore, Karnataka</option>
            </select>
          </div>

          {/* Property Type Field */}
          <div className="search-field">
            <label htmlFor="search-type">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <Home size={13} color="var(--accent-primary)" />
                Property Type
              </span>
            </label>
            <select
              id="search-type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="">All Property Types</option>
              <option value="Villa">Luxury Villa</option>
              <option value="Apartment">Modern Apartment</option>
              <option value="Penthouse">Penthouse Suite</option>
              <option value="House">Independent House</option>
              <option value="Plot">Residential Plot</option>
            </select>
          </div>

          {/* Price Range Field */}
          <div className="search-field">
            <label htmlFor="search-price">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <IndianRupee size={13} color="var(--accent-primary)" />
                Budget Range
              </span>
            </label>
            <select
              id="search-price"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="">Any Budget</option>
              <option value="under-50l">Under ₹50 Lakh</option>
              <option value="50l-1cr">₹50 Lakh – ₹1 Crore</option>
              <option value="1cr-2cr">₹1 Crore – ₹2 Crore</option>
              <option value="above-2cr">Above ₹2 Crore</option>
            </select>
          </div>

          {/* Bedrooms Field */}
          <div className="search-field">
            <label htmlFor="search-beds">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <Layers size={13} color="var(--accent-primary)" />
                Bedrooms (BHK)
              </span>
            </label>
            <select
              id="search-beds"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            >
              <option value="">Any Bedrooms / BHK</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
              <option value="5">5+ BHK</option>
            </select>
          </div>

          {/* Search Submit Button */}
          <div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%", height: "46px" }}>
              <Search size={18} />
              <span>Find Properties</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
