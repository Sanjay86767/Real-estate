import React, { useState } from "react";
import {
  Wind,
  Footprints,
  Volume2,
  SunMedium,
  Zap,
  Wifi,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Award
} from "lucide-react";

export const EcoQualityMeter = ({ property }) => {
  const [expanded, setExpanded] = useState(false);

  // Generate deterministic eco stats based on property or city
  const cityLower = (property?.city || "chandigarh").toLowerCase();

  let aqi = 58;
  let walkScore = 88;
  let noiseLevel = 36;
  let solarPower = "8.6 kW";
  let solarSavings = "₹1,12,000 / yr";
  let evStations = "4 Superchargers (1.2 km)";
  let fiberSpeed = "Up to 1 Gbps (Jio & Airtel)";

  if (cityLower.includes("delhi") || cityLower.includes("gurugram")) {
    aqi = 112;
    walkScore = 94;
    noiseLevel = 48;
    solarPower = "9.2 kW";
    solarSavings = "₹1,25,000 / yr";
    evStations = "7 Superchargers (800m)";
  } else if (cityLower.includes("bangalore")) {
    aqi = 64;
    walkScore = 86;
    noiseLevel = 42;
    solarPower = "8.0 kW";
    solarSavings = "₹98,000 / yr";
    evStations = "5 Superchargers (1.0 km)";
  }

  const getAqiColor = (val) => {
    if (val <= 60) return { label: "Good (Clean Air)", color: "var(--accent-emerald)", bg: "var(--accent-emerald-light)" };
    if (val <= 120) return { label: "Moderate", color: "var(--accent-gold)", bg: "rgba(245, 158, 11, 0.15)" };
    return { label: "Unhealthy", color: "var(--accent-rose)", bg: "rgba(244, 63, 94, 0.15)" };
  };

  const aqiInfo = getAqiColor(aqi);

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-xl)",
        padding: "28px",
        boxShadow: "var(--shadow-sm)",
        marginBottom: "32px"
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "12px"
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "3px 8px",
                borderRadius: "var(--radius-full)",
                background: "var(--accent-emerald-light)",
                color: "var(--accent-emerald)",
                fontSize: "0.75rem",
                fontWeight: 800
              }}
            >
              <Award size={13} />
              ECO & CIVIC INTELLIGENCE
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>• Hyperlocal IoT Telemetry</span>
          </div>
          <h3 style={{ fontSize: "1.35rem", margin: 0 }}>Neighborhood Quality of Life & Eco Index</h3>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="btn btn-secondary btn-sm"
          style={{ gap: "4px" }}
        >
          <span>{expanded ? "Less Details" : "View Breakdown"}</span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Grid of Key Civic Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px"
        }}
      >
        {/* 1. AQI */}
        <div
          style={{
            background: "var(--bg-secondary)",
            borderRadius: "var(--radius-md)",
            padding: "16px",
            border: "1px solid var(--border-light)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: aqiInfo.color }}>
              <Wind size={18} />
              <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>Air Quality (AQI)</strong>
            </div>
            <span
              style={{
                background: aqiInfo.bg,
                color: aqiInfo.color,
                fontSize: "0.75rem",
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: "var(--radius-full)"
              }}
            >
              {aqi} AQI
            </span>
          </div>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: aqiInfo.color }}>
            {aqiInfo.label}
          </span>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "4px 0 0" }}>
            Verified low particulate matter & abundant tree canopy.
          </p>
        </div>

        {/* 2. WalkScore */}
        <div
          style={{
            background: "var(--bg-secondary)",
            borderRadius: "var(--radius-md)",
            padding: "16px",
            border: "1px solid var(--border-light)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent-primary)" }}>
              <Footprints size={18} />
              <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>WalkScore®</strong>
            </div>
            <span
              style={{
                background: "var(--accent-primary-light)",
                color: "var(--accent-primary)",
                fontSize: "0.75rem",
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: "var(--radius-full)"
              }}
            >
              {walkScore} / 100
            </span>
          </div>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent-primary)" }}>
            Walker's Paradise
          </span>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "4px 0 0" }}>
            Daily errands do not require an automobile.
          </p>
        </div>

        {/* 3. Noise Level */}
        <div
          style={{
            background: "var(--bg-secondary)",
            borderRadius: "var(--radius-md)",
            padding: "16px",
            border: "1px solid var(--border-light)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent-indigo)" }}>
              <Volume2 size={18} />
              <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>Sound Decibels</strong>
            </div>
            <span
              style={{
                background: "rgba(99, 102, 241, 0.15)",
                color: "var(--accent-indigo)",
                fontSize: "0.75rem",
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: "var(--radius-full)"
              }}
            >
              {noiseLevel} dB
            </span>
          </div>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent-indigo)" }}>
            Quiet Suburban Oasis
          </span>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "4px 0 0" }}>
            Double glazed acoustic insulation throughout.
          </p>
        </div>

        {/* 4. Rooftop Solar Yield */}
        <div
          style={{
            background: "var(--bg-secondary)",
            borderRadius: "var(--radius-md)",
            padding: "16px",
            border: "1px solid var(--border-light)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent-gold)" }}>
              <SunMedium size={18} />
              <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>Solar Potential</strong>
            </div>
            <span
              style={{
                background: "rgba(245, 158, 11, 0.15)",
                color: "var(--accent-gold)",
                fontSize: "0.75rem",
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: "var(--radius-full)"
              }}
            >
              {solarPower}
            </span>
          </div>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent-gold)" }}>
            {solarSavings}
          </span>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "4px 0 0" }}>
            High unshaded direct solar insolation angle.
          </p>
        </div>
      </div>

      {/* Expanded Technical Breakdown */}
      {expanded && (
        <div
          style={{
            marginTop: "20px",
            paddingTop: "20px",
            borderTop: "1px solid var(--border-light)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ padding: "8px", background: "var(--accent-emerald-light)", borderRadius: "var(--radius-sm)", color: "var(--accent-emerald)" }}>
              <Zap size={18} />
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>EV Fast Charging</span>
              <strong style={{ fontSize: "0.85rem" }}>{evStations}</strong>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ padding: "8px", background: "var(--accent-primary-light)", borderRadius: "var(--radius-sm)", color: "var(--accent-primary)" }}>
              <Wifi size={18} />
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Gigabit Broadband</span>
              <strong style={{ fontSize: "0.85rem" }}>{fiberSpeed}</strong>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ padding: "8px", background: "rgba(168, 85, 247, 0.15)", borderRadius: "var(--radius-sm)", color: "#a855f7" }}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Security Surveillance</span>
              <strong style={{ fontSize: "0.85rem" }}>24/7 RFID + AI Perimeter Detection</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EcoQualityMeter;
