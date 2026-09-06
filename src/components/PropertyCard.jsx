import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Bed, Bath, Maximize2, MapPin, Heart, ArrowRight, Scale, ShieldCheck, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";
import { playClickSound } from "../utils/effects";

export const PropertyCard = ({ property }) => {
  const { isFavorite, toggleFavorite, compareList, toggleCompare, formatPrice, formatArea } = usePropertyContext();
  const favoriteActive = isFavorite(property.id);
  const isCompared = compareList.includes(property.id);

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
          {property.featured && (
            <span className="badge badge-featured">Featured</span>
          )}
          <span className="badge badge-type">{property.type}</span>
          <span className={`badge ${property.status === "For Rent" ? "badge-rent" : "badge-sale"}`}>
            {property.status}
          </span>
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
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600, display: "block" }}>
              {property.status === "For Rent" ? "/ month" : "Verified Clear Title"}
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
              <span>{property.bedrooms} Beds</span>
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

          <div className="card-feature-item" title={`${property.area} Square Feet`}>
            <Maximize2 size={15} color="var(--accent-primary)" />
            <span>{formatArea(property.area)}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="card-footer">
          <Link to={`/property/${property.id}`} className="btn btn-secondary btn-sm" style={{ width: "100%" }}>
            <span>View Details</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
