import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Bed, Bath, Maximize2, MapPin, Heart, ArrowRight, Scale, ShieldCheck, Sparkles, ChevronLeft, ChevronRight, Eye, FileText } from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";
import { playClickSound } from "../utils/effects";
import PropertyBrochureModal from "./PropertyBrochureModal";

export const PropertyCard = ({ property }) => {
  const { isFavorite, toggleFavorite, compareList, toggleCompare, formatPrice, formatArea } = usePropertyContext();
  const favoriteActive = isFavorite(property.id);
  const isCompared = compareList.includes(property.id);
  const [showBrochureModal, setShowBrochureModal] = useState(false);

  // Multi-image preview index
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const images = property.images && property.images.length > 0 ? property.images : [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
  ];

  // 3D Parallax Tilt state
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState("");

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    playClickSound();
    toggleFavorite(property.id);
  };

  const handleCompareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    playClickSound();
    toggleCompare(property.id);
  };

  const handleNextPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    playClickSound();
    setActiveImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    playClickSound();
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      ref={cardRef}
      className="property-card pro-tilt-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: transformStyle ? "transform 0.1s ease-out" : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease"
      }}
    >
      {/* Media Image & Badges */}
      <div className="card-media">
        <Link to={`/property/${property.id}`} tabIndex="-1">
          <img
            src={images[activeImgIndex] || images[0]}
            alt={`${property.title} - Photo ${activeImgIndex + 1}`}
            loading="lazy"
          />
        </Link>

        {/* Multi-Photo Carousel Controls (shown on hover) */}
        {images.length > 1 && (
          <div className="card-photo-nav-overlay">
            <button onClick={handlePrevPhoto} className="card-photo-arrow left" title="Previous photo" aria-label="Previous photo">
              <ChevronLeft size={16} />
            </button>
            <div className="card-photo-dots">
              {images.slice(0, 5).map((_, dotIdx) => (
                <span
                  key={dotIdx}
                  className={`card-dot ${activeImgIndex === dotIdx ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveImgIndex(dotIdx);
                  }}
                />
              ))}
            </div>
            <button onClick={handleNextPhoto} className="card-photo-arrow right" title="Next photo" aria-label="Next photo">
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Top Badges */}
        <div className="card-badges">
          {property.isCustom && (
            <span
              className="badge"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "#ffffff",
                fontWeight: 900,
                border: "1px solid #fbbf24",
                boxShadow: "0 0 12px rgba(245, 158, 11, 0.6)",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                letterSpacing: "0.3px"
              }}
            >
              <Sparkles size={11} color="#ffffff" />
              <span>Added By You</span>
            </span>
          )}
          <span className="badge badge-bhk" style={{ background: "rgba(15, 23, 42, 0.9)", color: "#38bdf8", fontWeight: 800, border: "1px solid rgba(56, 189, 248, 0.4)" }}>
            {property.bhk || (property.bedrooms > 0 ? `${property.bedrooms} BHK` : "Plot Land")}
          </span>
          {property.featured && !property.isCustom && (
            <span className="badge badge-featured">Featured</span>
          )}
          <span className="badge badge-type">{property.type}</span>
        </div>

        {/* Action Buttons: Compare & Favorite */}
        <div style={{ position: "absolute", top: "14px", right: "14px", zIndex: 3, display: "flex", gap: "8px" }}>
          <button
            className={`btn-favorite ${isCompared ? "active" : ""}`}
            onClick={handleCompareClick}
            title={isCompared ? "Remove from comparison" : "Add to comparison"}
            aria-label="Compare property"
            style={{ color: isCompared ? "var(--accent-primary)" : "inherit" }}
          >
            <Scale size={16} />
          </button>

          <button
            className={`btn-favorite ${favoriteActive ? "active" : ""}`}
            onClick={handleFavoriteClick}
            title={favoriteActive ? "Remove from Favorites" : "Add to Favorites"}
            aria-label="Toggle Favorite"
          >
            <Heart
              size={18}
              fill={favoriteActive ? "var(--accent-rose)" : "none"}
              color={favoriteActive ? "var(--accent-rose)" : "currentColor"}
            />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="card-body">
        {/* Price Row & AI Score */}
        <div className="card-price-row">
          <div>
            <span className="card-price">{formatPrice(property.price)}</span>
            <div style={{ display: "flex", gap: "6px", alignItems: "center", marginTop: "3px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.74rem", color: "var(--text-muted)", fontWeight: 600 }}>
                ₹{Math.round(property.price / property.area).toLocaleString("en-IN")}/sq.ft
              </span>
              <span style={{ fontSize: "0.7rem", color: "var(--accent-primary)", fontWeight: 800, background: "var(--accent-primary-light)", padding: "1px 6px", borderRadius: "4px" }}>
                EMI ~{property.price ? (property.price * 0.8 * (8.5 / 1200) * Math.pow(1 + 8.5 / 1200, 240) / (Math.pow(1 + 8.5 / 1200, 240) - 1) >= 100000 ? `₹${((property.price * 0.8 * (8.5 / 1200) * Math.pow(1 + 8.5 / 1200, 240) / (Math.pow(1 + 8.5 / 1200, 240) - 1)) / 100000).toFixed(1)}L/mo` : `₹${Math.round((property.price * 0.8 * (8.5 / 1200) * Math.pow(1 + 8.5 / 1200, 240) / (Math.pow(1 + 8.5 / 1200, 240) - 1)) / 1000)}k/mo`) : "₹25k/mo"}
              </span>
            </div>
            <span style={{ fontSize: "0.76rem", color: "var(--accent-emerald)", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", marginTop: "3px" }}>
              <ShieldCheck size={13} color="var(--accent-emerald)" />
              {property.reraId ? `RERA: ${property.reraId.split('-')[0]}` : "Clear Title"}
            </span>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 8px",
              borderRadius: "var(--radius-full)",
              background: "var(--accent-emerald-light)",
              color: "var(--accent-emerald)",
              fontSize: "0.72rem",
              fontWeight: 800
            }}
          >
            <Sparkles size={11} />
            <span>98% AI Match</span>
          </div>
        </div>

        {/* Real-Time Live Viewers & Vastu Status */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "6px 0 10px", paddingBottom: "6px", borderBottom: "1px dashed var(--border-light)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981", display: "inline-block" }}></span>
            <Eye size={12} color="#10b981" />
            <span>{8 + ((property.id * 7) % 15)} live viewers</span>
          </div>
          <span style={{ fontSize: "0.7rem", color: "var(--accent-gold)", fontWeight: 800, letterSpacing: "0.2px" }}>
            🧭 100% Vastu
          </span>
        </div>

        {/* Title */}
        <h3 className="card-title">
          <Link to={`/property/${property.id}`}>{property.title}</Link>
        </h3>

        {/* Location */}
        <div className="card-location">
          <MapPin size={15} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
          <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {property.location}
          </span>
        </div>

        {/* Features Row */}
        <div className="card-features">
          {property.bedrooms > 0 ? (
            <div className="card-feature-item" title={`${property.bedrooms} Bedrooms`}>
              <Bed size={16} color="var(--accent-primary)" />
              <span>{property.bedrooms} BHK</span>
            </div>
          ) : (
            <div className="card-feature-item" title="Open Plot">
              <span>Plot Land</span>
            </div>
          )}

          {property.bathrooms > 0 && (
            <div className="card-feature-item" title={`${property.bathrooms} Bathrooms`}>
              <Bath size={16} color="var(--accent-primary)" />
              <span>{property.bathrooms} Baths</span>
            </div>
          )}

          <div className="card-feature-item" title={`${property.area} Sq.Ft Super Built-Up`}>
            <Maximize2 size={15} color="var(--accent-primary)" />
            <span>{formatArea(property.area)}</span>
          </div>
        </div>

        {/* Luxury Amenities Highlight Strip */}
        <div style={{ display: "flex", gap: "6px", overflowX: "auto", padding: "6px 0", scrollbarWidth: "none", margin: "6px 0 10px", fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 700 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "var(--bg-secondary)", padding: "3px 8px", borderRadius: "var(--radius-full)", whiteSpace: "nowrap" }} title="Swimming Pool Available">
            🏊 Pool
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "var(--bg-secondary)", padding: "3px 8px", borderRadius: "var(--radius-full)", whiteSpace: "nowrap" }} title="Gym & Fitness Suite Available">
            🏋️ Gym
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "var(--bg-secondary)", padding: "3px 8px", borderRadius: "var(--radius-full)", whiteSpace: "nowrap" }} title="Private Garden Available">
            🌿 Garden
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "var(--bg-secondary)", padding: "3px 8px", borderRadius: "var(--radius-full)", whiteSpace: "nowrap" }} title="100% Power Backup Available">
            ⚡ Backup
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "var(--bg-secondary)", padding: "3px 8px", borderRadius: "var(--radius-full)", whiteSpace: "nowrap" }} title="24/7 Security Available">
            🛡️ Security
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "var(--bg-secondary)", padding: "3px 8px", borderRadius: "var(--radius-full)", whiteSpace: "nowrap" }} title="Smart Home Automation Available">
            🤖 Smart Home
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "var(--bg-secondary)", padding: "3px 8px", borderRadius: "var(--radius-full)", whiteSpace: "nowrap" }} title="Clubhouse Access Available">
            🏛️ Clubhouse
          </span>
        </div>

        {/* Footer Actions */}
        <div className="card-footer" style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <Link to={`/property/${property.id}`} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
            <span>Details</span>
            <ArrowRight size={14} />
          </Link>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              playClickSound();
              setShowBrochureModal(true);
            }}
            className="btn btn-outline btn-sm pro-brochure-card-btn"
            title="Instant PDF Brochure & RERA Prospectus"
            style={{ padding: "8px 10px", fontSize: "0.78rem", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px" }}
          >
            <FileText size={13} color="var(--accent-primary)" />
            <span>Brochure</span>
          </button>
          <a
            href={`https://wa.me/918809604880?text=${encodeURIComponent(`Hello Sanjay ji, I am interested in ${property.title} (${property.bhk || property.bedrooms + ' BHK'}, ${property.priceFormatted}) in ${property.city}, ${property.state}. Please share brochure and details.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm"
            title="Chat directly on WhatsApp with Sanjay Kumar Desk"
            style={{ padding: "8px 10px", background: "rgba(37, 211, 102, 0.1)", borderColor: "rgba(37, 211, 102, 0.3)", color: "#16a34a", textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
            onClick={(e) => e.stopPropagation()}
          >
            💬
          </a>
        </div>
      </div>

      {showBrochureModal && (
        <PropertyBrochureModal
          property={property}
          onClose={() => setShowBrochureModal(false)}
        />
      )}
    </div>
  );
};

export default PropertyCard;
