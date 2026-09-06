import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Navigation, ZoomIn, ZoomOut, Maximize2, ExternalLink, X } from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";

export const InteractiveMap = ({ properties }) => {
  const { formatPrice } = usePropertyContext();
  const [selectedProp, setSelectedProp] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Distribute properties aesthetically across an SVG grid
  const pinCoordinates = [
    { x: 38, y: 35 },
    { x: 52, y: 28 },
    { x: 22, y: 65 },
    { x: 68, y: 48 },
    { x: 44, y: 55 },
    { x: 75, y: 72 },
    { x: 58, y: 38 },
    { x: 32, y: 48 },
    { x: 80, y: 25 },
    { x: 18, y: 30 },
    { x: 62, y: 78 },
    { x: 48, y: 80 }
  ];

  return (
    <div
      style={{
        position: "relative",
        height: "650px",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        border: "1px solid var(--border-light)",
        background: "var(--bg-surface)",
        boxShadow: "var(--shadow-sm)"
      }}
      className="interactive-map-container"
    >
      {/* Map Header Overlay */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          zIndex: 10,
          background: "var(--bg-glass)",
          backdropFilter: "blur(12px)",
          padding: "8px 16px",
          borderRadius: "var(--radius-full)",
          border: "1px solid var(--border-light)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "0.85rem",
          fontWeight: 700
        }}
      >
        <Navigation size={15} color="var(--accent-primary)" />
        <span>Interactive Geo-Listing Map ({properties.length} Properties Located)</span>
      </div>

      {/* Map Zoom Controls */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "6px"
        }}
      >
        <button
          onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.6))}
          className="btn-icon"
          style={{ width: "36px", height: "36px" }}
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
          className="btn-icon"
          style={{ width: "36px", height: "36px" }}
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </button>
      </div>

      {/* Scalable Map Canvas */}
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${zoomLevel})`,
          transition: "transform 0.3s ease"
        }}
      >
        <svg
          viewBox="0 0 1000 650"
          style={{ width: "100%", height: "100%", background: "#e8eff7" }}
          className="map-svg-canvas"
        >
          {/* Water Bodies / Lakes */}
          <path
            d="M 150 50 Q 250 80 320 20 C 400 0 450 120 380 180 Q 280 240 200 180 Z"
            fill="#bae6fd"
            stroke="#7dd3fc"
            strokeWidth="2"
          />
          <path
            d="M 750 450 Q 880 500 920 600 Q 800 650 720 580 Z"
            fill="#bae6fd"
            stroke="#7dd3fc"
            strokeWidth="2"
          />

          {/* Green Belts / Parks */}
          <rect x="80" y="320" width="180" height="120" rx="16" fill="#dcfce7" stroke="#bbf7d0" strokeWidth="2" />
          <rect x="580" y="100" width="220" height="140" rx="20" fill="#dcfce7" stroke="#bbf7d0" strokeWidth="2" />
          <circle cx="500" cy="420" r="70" fill="#dcfce7" stroke="#bbf7d0" strokeWidth="2" />

          {/* Road Networks */}
          {/* Main Expressway */}
          <path d="M 0 325 Q 450 310 1000 325" fill="none" stroke="#cbd5e1" strokeWidth="14" />
          <path d="M 0 325 Q 450 310 1000 325" fill="none" stroke="#ffffff" strokeWidth="10" strokeDasharray="14 10" />

          {/* Vertical Ring Road */}
          <path d="M 500 0 Q 520 300 500 650" fill="none" stroke="#cbd5e1" strokeWidth="12" />
          <path d="M 500 0 Q 520 300 500 650" fill="none" stroke="#ffffff" strokeWidth="8" strokeDasharray="12 8" />

          {/* Diagonal Avenues */}
          <line x1="100" y1="50" x2="850" y2="580" stroke="#cbd5e1" strokeWidth="8" />
          <line x1="850" y1="80" x2="150" y2="600" stroke="#cbd5e1" strokeWidth="8" />

          {/* Sector Blocks */}
          <text x="260" y="270" fill="#94a3b8" fontSize="14" fontWeight="600" letterSpacing="1">SECTOR 17 HUB</text>
          <text x="70" y="290" fill="#94a3b8" fontSize="14" fontWeight="600" letterSpacing="1">GREENWOOD PARK</text>
          <text x="680" y="270" fill="#94a3b8" fontSize="14" fontWeight="600" letterSpacing="1">AIRPORT EXPRESSWAY</text>
          <text x="560" y="520" fill="#94a3b8" fontSize="14" fontWeight="600" letterSpacing="1">TECH CITY ZONE</text>
        </svg>

        {/* Dynamic Property Pins on Map */}
        {properties.map((prop, index) => {
          const coord = pinCoordinates[index % pinCoordinates.length];
          const isSelected = selectedProp?.id === prop.id;

          return (
            <div
              key={prop.id}
              onClick={() => setSelectedProp(prop)}
              style={{
                position: "absolute",
                top: `${coord.y}%`,
                left: `${coord.x}%`,
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                zIndex: isSelected ? 30 : 20,
                transition: "transform 0.2s"
              }}
            >
              <div
                style={{
                  background: isSelected ? "var(--accent-gold)" : "var(--accent-primary)",
                  color: "#ffffff",
                  padding: "4px 10px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                  border: "2px solid #ffffff",
                  whiteSpace: "nowrap"
                }}
              >
                <MapPin size={12} fill="#ffffff" />
                <span>{formatPrice(prop.price)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Property Floating Preview Card */}
      {selectedProp && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            right: "20px",
            maxWidth: "380px",
            background: "var(--bg-surface-elevated)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            padding: "16px",
            boxShadow: "var(--shadow-lg)",
            zIndex: 40,
            display: "flex",
            gap: "14px"
          }}
          className="animate-fade-in"
        >
          <img
            src={selectedProp.images[0]}
            alt={selectedProp.title}
            style={{ width: "90px", height: "90px", borderRadius: "var(--radius-sm)", objectFit: "cover", flexShrink: 0 }}
          />

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span className="badge badge-type" style={{ fontSize: "0.65rem", padding: "2px 8px" }}>
                {selectedProp.type}
              </span>
              <button
                onClick={() => setSelectedProp(null)}
                style={{ color: "var(--text-muted)", cursor: "pointer" }}
                aria-label="Close preview"
              >
                <X size={16} />
              </button>
            </div>

            <h4 style={{ fontSize: "0.95rem", margin: "4px 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {selectedProp.title}
            </h4>

            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--accent-primary)", marginBottom: "4px" }}>
              {formatPrice(selectedProp.price)}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                📍 {selectedProp.city} • {selectedProp.bedrooms > 0 ? `${selectedProp.bedrooms} BHK` : "Plot"}
              </span>
              <Link to={`/property/${selectedProp.id}`} className="btn btn-primary btn-sm" style={{ padding: "4px 10px", fontSize: "0.75rem" }}>
                <span>View</span>
                <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
