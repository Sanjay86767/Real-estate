import React, { useState, useEffect } from "react";
import {
  Maximize2,
  Sun,
  Moon,
  Compass,
  Plane,
  Train,
  GraduationCap,
  Sparkles,
  Layers,
  MapPin,
  X,
  Volume2,
  VolumeX,
  Eye,
  ShieldCheck
} from "lucide-react";

// Drone Panoramic views across floors and lighting modes
const SCENARIOS = [
  {
    floor: "Ground Level (Private Lawn & Infinity Pool)",
    height: "0m (Podium)",
    day: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    sunset: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    night: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    ambience: "Quiet poolside breeze, landscaped teakwood decks, private waterbody"
  },
  {
    floor: "18th Floor (Panoramic Cityline & Green Belt)",
    height: "65m Elevation",
    day: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    sunset: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    night: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    ambience: "Canopy line breeze, unobstructed morning sun, green park vistas"
  },
  {
    floor: "52nd Floor (Imperial Sky Penthouse Level)",
    height: "190m Elevation",
    day: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    sunset: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    night: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
    ambience: "360° Arabian Sea horizon, sunset cloud cover, zero noise pollution"
  }
];

const NEARBY_INFRASTRUCTURE = [
  { name: "International Airport", distance: "12 mins", icon: Plane, color: "#38bdf8" },
  { name: "Metro Line 3 Interchange", distance: "4 mins", icon: Train, color: "#10b981" },
  { name: "Top IB World Academy", distance: "6 mins", icon: GraduationCap, color: "#f59e0b" },
  { name: "Sovereign Championship Golf Course", distance: "9 mins", icon: Compass, color: "#ec4899" }
];

export const DroneAerialViewer = ({ isOpen, onClose, propertyTitle = "The Sovereign Sky Penthouse" }) => {
  const [floorIdx, setFloorIdx] = useState(2); // default Penthouse
  const [timeMode, setTimeMode] = useState("sunset"); // "day" | "sunset" | "night"
  const [isRotating, setIsRotating] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  // Simulated 360 panoramic rotation
  useEffect(() => {
    let anim;
    if (isRotating) {
      anim = setInterval(() => {
        setRotationAngle((prev) => (prev + 1) % 360);
      }, 50);
    }
    return () => clearInterval(anim);
  }, [isRotating]);

  if (!isOpen) return null;

  const currentScenario = SCENARIOS[floorIdx];
  const activeImage = currentScenario[timeMode];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(0, 0, 0, 0.92)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px"
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          height: "90vh",
          maxHeight: "750px",
          background: "#080d16",
          border: "1px solid rgba(245, 158, 11, 0.4)",
          borderRadius: "24px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(245, 158, 11, 0.15)",
          color: "#ffffff"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div
          style={{
            padding: "14px 24px",
            background: "rgba(15, 23, 42, 0.9)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "rgba(245, 158, 11, 0.2)",
                color: "#f59e0b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Eye size={18} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 900, margin: 0 }}>
                  3D Drone Elevation & Skyline Simulator
                </h3>
                <span style={{ background: "#10b981", color: "#000000", fontSize: "0.62rem", fontWeight: 900, padding: "2px 6px", borderRadius: "4px" }}>
                  4K SPATIAL
                </span>
              </div>
              <div style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                {propertyTitle} • Current Elevation: <strong style={{ color: "#f59e0b" }}>{currentScenario.height}</strong>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Time of Day Switcher */}
            <div
              style={{
                display: "flex",
                background: "rgba(255, 255, 255, 0.06)",
                padding: "3px",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
            >
              <button
                onClick={() => setTimeMode("day")}
                style={{
                  padding: "5px 12px",
                  borderRadius: "16px",
                  border: "none",
                  background: timeMode === "day" ? "rgba(255, 255, 255, 0.2)" : "transparent",
                  color: timeMode === "day" ? "#ffffff" : "#94a3b8",
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                ☀️ Noon
              </button>
              <button
                onClick={() => setTimeMode("sunset")}
                style={{
                  padding: "5px 12px",
                  borderRadius: "16px",
                  border: "none",
                  background: timeMode === "sunset" ? "linear-gradient(135deg, #f59e0b, #d97706)" : "transparent",
                  color: "#ffffff",
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                🌅 Golden Hour
              </button>
              <button
                onClick={() => setTimeMode("night")}
                style={{
                  padding: "5px 12px",
                  borderRadius: "16px",
                  border: "none",
                  background: timeMode === "night" ? "rgba(99, 102, 241, 0.3)" : "transparent",
                  color: timeMode === "night" ? "#a5b4fc" : "#94a3b8",
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                🌙 Cyber Night
              </button>
            </div>

            <button
              onClick={onClose}
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "none",
                borderRadius: "8px",
                color: "#ffffff",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Panoramic Viewer Stage */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <img
            src={activeImage}
            alt={currentScenario.floor}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: isRotating ? "brightness(1.05)" : "none",
              transition: "filter 0.3s ease"
            }}
          />

          {/* Vignette Overlay & Cyber Grid Lines */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at center, transparent 40%, rgba(8, 13, 22, 0.7) 100%)",
              pointerEvents: "none"
            }}
          />

          {/* Elevation Level HUD Overlay */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              background: "rgba(15, 23, 42, 0.85)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              borderRadius: "14px",
              padding: "12px 18px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)"
            }}
          >
            <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "#fbbf24", textTransform: "uppercase" }}>
              Active Elevation
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#ffffff" }}>
              {currentScenario.floor}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "2px" }}>
              {currentScenario.ambience}
            </div>
          </div>

          {/* Compass & Rotation Radar */}
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(15, 23, 42, 0.85)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "14px",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <button
              onClick={() => setIsRotating(!isRotating)}
              style={{
                background: isRotating ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.08)",
                border: isRotating ? "1px solid #10b981" : "1px solid rgba(255, 255, 255, 0.15)",
                color: isRotating ? "#34d399" : "#cbd5e1",
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              <Compass size={14} className={isRotating ? "animate-spin" : ""} />
              <span>{isRotating ? "Auto-Pan Active" : "360° Rotate View"}</span>
            </button>
          </div>

          {/* Surrounding Infrastructure HUD Badges */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              right: "20px",
              display: "flex",
              gap: "10px",
              overflowX: "auto",
              paddingBottom: "4px"
            }}
          >
            {NEARBY_INFRASTRUCTURE.map((infra, i) => {
              const Icon = infra.icon;
              return (
                <div
                  key={i}
                  style={{
                    background: "rgba(15, 23, 42, 0.88)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${infra.color}40`,
                    borderRadius: "12px",
                    padding: "8px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    whiteSpace: "nowrap"
                  }}
                >
                  <Icon size={16} color={infra.color} />
                  <div>
                    <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#ffffff" }}>{infra.name}</div>
                    <div style={{ fontSize: "0.68rem", color: infra.color, fontWeight: 700 }}>{infra.distance} drive</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floor Elevation Selector Bar */}
        <div
          style={{
            padding: "16px 24px",
            background: "rgba(15, 23, 42, 0.95)",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px"
          }}
        >
          <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase" }}>
            Select Floor Height Elevation:
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {SCENARIOS.map((scen, idx) => {
              const isSelected = idx === floorIdx;
              return (
                <button
                  key={idx}
                  onClick={() => setFloorIdx(idx)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "12px",
                    border: isSelected ? "2px solid #f59e0b" : "1px solid rgba(255, 255, 255, 0.1)",
                    background: isSelected ? "rgba(245, 158, 11, 0.2)" : "rgba(255, 255, 255, 0.04)",
                    color: isSelected ? "#fde047" : "#cbd5e1",
                    fontWeight: 800,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <Layers size={14} color={isSelected ? "#f59e0b" : "#94a3b8"} />
                  <span>{scen.floor.split("(")[0]}</span>
                  <span style={{ fontSize: "0.7rem", color: isSelected ? "#f59e0b" : "#64748b" }}>
                    ({scen.height})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DroneAerialViewer;
