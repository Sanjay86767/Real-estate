import React, { useState } from "react";
import { Layers, Maximize2, Check, Compass, Ruler } from "lucide-react";

export const FloorPlanViewer = ({ property }) => {
  const [selectedRoom, setSelectedRoom] = useState("living");

  const roomsData = {
    living: {
      name: "Living & Dining Hall",
      dimensions: "24' 0\" x 16' 6\"",
      area: "396 sq.ft",
      highlights: "Double-height Italian marble flooring, direct balcony access, floor-to-ceiling glass wall"
    },
    master: {
      name: "Master Suite & Dresser",
      dimensions: "18' 0\" x 14' 0\"",
      area: "252 sq.ft",
      highlights: "Wooden floor finish, private ensuite 4-fixture bath, walk-in dressing wardrobe"
    },
    bed2: {
      name: "Bedroom 2 (Guest / Kids)",
      dimensions: "15' 0\" x 12' 6\"",
      area: "187 sq.ft",
      highlights: "Corner window offering sunrise garden views, attached private bathroom"
    },
    kitchen: {
      name: "Modular Gourmet Kitchen",
      dimensions: "14' 0\" x 10' 0\"",
      area: "140 sq.ft",
      highlights: "Quartz breakfast counter, piped gas provisioning, dedicated utility wash balcony"
    },
    balcony: {
      name: "Wrap-around Deck & Terrace",
      dimensions: "22' 0\" x 7' 0\"",
      area: "154 sq.ft",
      highlights: "Toughened glass railing, anti-skid wooden-finish tiles, planters irrigation outlet"
    }
  };

  const active = roomsData[selectedRoom];

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-lg)",
        padding: "28px",
        boxShadow: "var(--shadow-sm)"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "var(--accent-primary-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent-primary)"
            }}
          >
            <Ruler size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: "1.25rem", margin: 0 }}>Interactive Architectural Floor Plan</h3>
            <p style={{ fontSize: "0.85rem", margin: 0, color: "var(--text-secondary)" }}>
              Click any room section on the blueprint or pills to view exact dimensions & layout
            </p>
          </div>
        </div>

        <span
          style={{
            padding: "4px 12px",
            borderRadius: "var(--radius-full)",
            background: "var(--bg-secondary)",
            fontSize: "0.78rem",
            fontWeight: 700,
            color: "var(--accent-primary)",
            border: "1px solid var(--border-light)"
          }}
        >
          Super Area: {property.area} sq.ft
        </span>
      </div>

      {/* Room Selector Chips */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
        {Object.entries(roomsData).map(([key, data]) => (
          <button
            key={key}
            onClick={() => setSelectedRoom(key)}
            className={`chip-btn ${selectedRoom === key ? "active" : ""}`}
            style={{ padding: "6px 14px", fontSize: "0.82rem" }}
          >
            {data.name.split(" ")[0]} ({data.area})
          </button>
        ))}
      </div>

      {/* Blueprint SVG Layout */}
      <div
        style={{
          position: "relative",
          background: "#0f172a",
          borderRadius: "var(--radius-md)",
          padding: "20px",
          border: "1px solid #334155",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px"
        }}
      >
        <svg viewBox="0 0 700 450" style={{ width: "100%", maxHeight: "380px" }}>
          {/* Background Blueprint Grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Living Room */}
          <rect
            x="40"
            y="40"
            width="360"
            height="240"
            fill={selectedRoom === "living" ? "rgba(37, 99, 235, 0.3)" : "rgba(30, 41, 59, 0.6)"}
            stroke={selectedRoom === "living" ? "#60a5fa" : "#475569"}
            strokeWidth={selectedRoom === "living" ? "3" : "1.5"}
            rx="6"
            style={{ cursor: "pointer", transition: "all 0.2s" }}
            onClick={() => setSelectedRoom("living")}
          />
          <text x="220" y="150" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="700">
            LIVING & DINING
          </text>
          <text x="220" y="175" textAnchor="middle" fill="#94a3b8" fontSize="12">
            24' 0" x 16' 6" • 396 sq.ft
          </text>

          {/* Master Bedroom */}
          <rect
            x="420"
            y="40"
            width="240"
            height="210"
            fill={selectedRoom === "master" ? "rgba(37, 99, 235, 0.3)" : "rgba(30, 41, 59, 0.6)"}
            stroke={selectedRoom === "master" ? "#60a5fa" : "#475569"}
            strokeWidth={selectedRoom === "master" ? "3" : "1.5"}
            rx="6"
            style={{ cursor: "pointer", transition: "all 0.2s" }}
            onClick={() => setSelectedRoom("master")}
          />
          <text x="540" y="140" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="700">
            MASTER SUITE
          </text>
          <text x="540" y="162" textAnchor="middle" fill="#94a3b8" fontSize="11">
            18' 0" x 14' 0" • 252 sq.ft
          </text>

          {/* Bedroom 2 */}
          <rect
            x="420"
            y="270"
            width="240"
            height="140"
            fill={selectedRoom === "bed2" ? "rgba(37, 99, 235, 0.3)" : "rgba(30, 41, 59, 0.6)"}
            stroke={selectedRoom === "bed2" ? "#60a5fa" : "#475569"}
            strokeWidth={selectedRoom === "bed2" ? "3" : "1.5"}
            rx="6"
            style={{ cursor: "pointer", transition: "all 0.2s" }}
            onClick={() => setSelectedRoom("bed2")}
          />
          <text x="540" y="335" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="700">
            BEDROOM 2
          </text>
          <text x="540" y="355" textAnchor="middle" fill="#94a3b8" fontSize="11">
            15' 0" x 12' 6" • 187 sq.ft
          </text>

          {/* Modular Kitchen */}
          <rect
            x="40"
            y="300"
            width="210"
            height="110"
            fill={selectedRoom === "kitchen" ? "rgba(37, 99, 235, 0.3)" : "rgba(30, 41, 59, 0.6)"}
            stroke={selectedRoom === "kitchen" ? "#60a5fa" : "#475569"}
            strokeWidth={selectedRoom === "kitchen" ? "3" : "1.5"}
            rx="6"
            style={{ cursor: "pointer", transition: "all 0.2s" }}
            onClick={() => setSelectedRoom("kitchen")}
          />
          <text x="145" y="350" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="700">
            KITCHEN
          </text>
          <text x="145" y="370" textAnchor="middle" fill="#94a3b8" fontSize="11">
            14' 0" x 10' 0"
          </text>

          {/* Balcony / Deck */}
          <rect
            x="270"
            y="300"
            width="130"
            height="110"
            fill={selectedRoom === "balcony" ? "rgba(37, 99, 235, 0.3)" : "rgba(30, 41, 59, 0.6)"}
            stroke={selectedRoom === "balcony" ? "#60a5fa" : "#475569"}
            strokeWidth={selectedRoom === "balcony" ? "3" : "1.5"}
            rx="6"
            style={{ cursor: "pointer", transition: "all 0.2s" }}
            onClick={() => setSelectedRoom("balcony")}
          />
          <text x="335" y="350" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="700">
            BALCONY
          </text>
          <text x="335" y="370" textAnchor="middle" fill="#94a3b8" fontSize="11">
            22' x 7'
          </text>
        </svg>
      </div>

      {/* Selected Room Details Card */}
      <div
        style={{
          background: "var(--bg-secondary)",
          padding: "16px 20px",
          borderRadius: "var(--radius-md)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px"
        }}
        className="animate-fade-in"
      >
        <div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
            Selected Room Section
          </span>
          <h4 style={{ fontSize: "1.1rem", margin: "2px 0 4px", color: "var(--text-primary)" }}>{active.name}</h4>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>{active.highlights}</p>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--accent-primary)" }}>
            {active.dimensions}
          </div>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
            Net Usable: {active.area}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FloorPlanViewer;
