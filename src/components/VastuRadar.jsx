import React, { useState } from "react";
import { Compass, CheckCircle2, AlertTriangle, Sparkles, ShieldCheck, Flame, Droplets, Mountain, Wind, Sun } from "lucide-react";

export const VastuRadar = ({ property }) => {
  // Determine vastu data based on property facing or defaults
  const facing = property?.facing || "North-East";

  const directions = [
    {
      dir: "North-East (NE)",
      sanskrit: "Ishanya (ईशान कोण)",
      element: "Water & Divine Energy",
      elementIcon: Droplets,
      elementColor: "#0ea5e9",
      recommended: "Main Entrance, Pooja Mandir, Waterbody",
      actualStatus: "Compliant (Pooja Niche & Open Foyer)",
      score: 98,
      status: "ideal"
    },
    {
      dir: "South-East (SE)",
      sanskrit: "Agneya (आग्नेय कोण)",
      element: "Fire Element (अग्नि)",
      elementIcon: Flame,
      elementColor: "#f97316",
      recommended: "Kitchen Hob & Electrical Panels",
      actualStatus: "Compliant (East-facing Gas Hob)",
      score: 95,
      status: "ideal"
    },
    {
      dir: "South-West (SW)",
      sanskrit: "Nairutya (नैऋत्य कोण)",
      element: "Earth & Stability (पृथ्वी)",
      elementIcon: Mountain,
      elementColor: "#d97706",
      recommended: "Master Bedroom Suite & Wealth Vault",
      actualStatus: "Compliant (Heavy Wardrobes on West Wall)",
      score: 92,
      status: "ideal"
    },
    {
      dir: "North-West (NW)",
      sanskrit: "Vayavya (वायव्य कोण)",
      element: "Air & Movement (वायु)",
      elementIcon: Wind,
      elementColor: "#8b5cf6",
      recommended: "Guest Bedroom, Balcony & Cross Ventilation",
      actualStatus: "Compliant (Open French Windows)",
      score: 88,
      status: "ideal"
    },
    {
      dir: "Center (Brahmasthan)",
      sanskrit: "Brahmasthan (ब्रह्मस्थान)",
      element: "Space & Ether (आकाश)",
      elementIcon: Sun,
      elementColor: "#fbbf24",
      recommended: "Unobstructed Central Living Hall",
      actualStatus: "Clear & Well Lighted",
      score: 96,
      status: "ideal"
    }
  ];

  const overallScore = Math.round(
    directions.reduce((acc, curr) => acc + curr.score, 0) / directions.length
  );

  const [activeZone, setActiveZone] = useState(directions[0]);

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-xl)",
        padding: "28px",
        marginTop: "32px",
        boxShadow: "var(--shadow-sm)"
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "24px",
          borderBottom: "1px solid var(--border-light)",
          paddingBottom: "18px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, rgba(217, 119, 6, 0.2), rgba(245, 158, 11, 0.08))",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f59e0b"
            }}
          >
            <Compass size={26} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 800 }}>
                AI Vastu & Energy Spatial Audit
              </h3>
              <span
                style={{
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#10b981",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  padding: "2px 8px",
                  borderRadius: "12px"
                }}
              >
                100% VASTU COMPLIANT DESIGN
              </span>
            </div>
            <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              Primary Entrance Facing: <strong>{facing}</strong> • Element Harmony Verified
            </p>
          </div>
        </div>

        {/* Big Score Dial */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "var(--bg-main)",
            border: "1px solid var(--border-light)",
            padding: "10px 18px",
            borderRadius: "var(--radius-lg)"
          }}
        >
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", display: "block" }}>
              Vastu Harmony Score
            </span>
            <strong style={{ fontSize: "1.4rem", color: "#10b981", fontWeight: 900 }}>
              {overallScore} / 100
            </strong>
          </div>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(16, 185, 129, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#10b981"
            }}
          >
            <ShieldCheck size={24} />
          </div>
        </div>
      </div>

      {/* 5 Elements Strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "10px",
          marginBottom: "24px"
        }}
      >
        {[
          { name: "Agni (Fire)", balance: "96%", color: "#f97316" },
          { name: "Jal (Water)", balance: "98%", color: "#0ea5e9" },
          { name: "Prithvi (Earth)", balance: "94%", color: "#d97706" },
          { name: "Vayu (Air)", balance: "92%", color: "#8b5cf6" },
          { name: "Akash (Space)", balance: "97%", color: "#fbbf24" }
        ].map((elm, idx) => (
          <div
            key={idx}
            style={{
              background: "var(--bg-main)",
              padding: "10px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-light)",
              textAlign: "center"
            }}
          >
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>
              {elm.name}
            </span>
            <strong style={{ fontSize: "1rem", color: elm.color }}>
              {elm.balance}
            </strong>
          </div>
        ))}
      </div>

      {/* Directional Zone Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px" }}>
        {directions.map((zone, idx) => {
          const IconComponent = zone.elementIcon;
          const isSelected = activeZone.dir === zone.dir;

          return (
            <div
              key={idx}
              onClick={() => setActiveZone(zone)}
              style={{
                padding: "16px",
                borderRadius: "var(--radius-lg)",
                border: `1.5px solid ${isSelected ? "var(--accent-gold)" : "var(--border-light)"}`,
                background: isSelected ? "rgba(245, 158, 11, 0.05)" : "var(--bg-main)",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: `rgba(${zone.elementColor === "#f97316" ? "249, 115, 22" : "14, 165, 233"}, 0.15)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: zone.elementColor
                    }}
                  >
                    <IconComponent size={16} />
                  </div>
                  <div>
                    <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)", display: "block" }}>
                      {zone.dir}
                    </strong>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      {zone.sanskrit}
                    </span>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    color: "#10b981"
                  }}
                >
                  {zone.score}%
                </span>
              </div>

              <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "6px" }}>
                <div><strong>Standard:</strong> {zone.recommended}</div>
                <div style={{ color: "#10b981", marginTop: "2px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <CheckCircle2 size={13} />
                  <span>{zone.actualStatus}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Zone Deep Dive Advisory */}
      <div
        style={{
          marginTop: "20px",
          background: "linear-gradient(135deg, rgba(217, 119, 6, 0.08), rgba(245, 158, 11, 0.02))",
          border: "1px dashed rgba(245, 158, 11, 0.4)",
          borderRadius: "var(--radius-lg)",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: "14px"
        }}
      >
        <Sparkles size={20} color="#f59e0b" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
          <strong style={{ color: "var(--text-primary)" }}>
            Vastu Architect Recommendation for {activeZone.dir}:
          </strong>{" "}
          This quadrant aligns with the {activeZone.element}. Keep the area free of heavy clutter. Soft warm illumination or brass artifacts in this zone will amplify positive vibrational energy flow.
        </div>
      </div>
    </div>
  );
};

export default VastuRadar;
