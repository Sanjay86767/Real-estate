import React, { useState } from "react";
import { Sun, Moon, Sunrise, Sunset, Compass, Sparkles } from "lucide-react";

export const SunLightingSimulator = ({ property }) => {
  const [timeHour, setTimeHour] = useState(11); // 11 AM default

  // Format hour to 12h AM/PM
  const formatHour = (hour) => {
    const h = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour < 12 ? "AM" : "PM";
    return `${h}:00 ${ampm}`;
  };

  // Lighting parameters based on time
  const getLightingFilter = (hour) => {
    if (hour <= 6) {
      return {
        overlay: "rgba(15, 23, 42, 0.65)",
        warmth: "hue-rotate(200deg) brightness(0.65)",
        desc: "Dawn & Twilight: Soft ambient blue morning shadows.",
        sunAngle: 15
      };
    } else if (hour <= 9) {
      return {
        overlay: "rgba(251, 191, 36, 0.15)",
        warmth: "hue-rotate(15deg) brightness(1.05) saturate(1.2)",
        desc: "Golden Morning Sunrise: Direct natural sunlight illuminating master suites and front lawn.",
        sunAngle: 45
      };
    } else if (hour <= 14) {
      return {
        overlay: "rgba(255, 255, 255, 0.05)",
        warmth: "brightness(1.15) contrast(1.05)",
        desc: "High Noon: Maximum natural daylight across all living rooms and atrium sky-lights.",
        sunAngle: 90
      };
    } else if (hour <= 18) {
      return {
        overlay: "rgba(249, 115, 22, 0.22)",
        warmth: "hue-rotate(-20deg) brightness(0.95) saturate(1.4)",
        desc: "Golden Sunset Hour: Warm terracotta glow through western verandas and terrace pergolas.",
        sunAngle: 150
      };
    } else {
      return {
        overlay: "rgba(11, 17, 32, 0.75)",
        warmth: "brightness(0.55) contrast(1.2) hue-rotate(210deg)",
        desc: "Night Sky & Landscape Lighting: Architectural facade LED spotlights and garden bollards active.",
        sunAngle: 180
      };
    }
  };

  const lighting = getLightingFilter(timeHour);

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
              background: "var(--accent-gold-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent-gold)"
            }}
          >
            <Sun size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: "1.25rem", margin: 0 }}>Natural Sunlight & Shadow Simulator</h3>
            <p style={{ fontSize: "0.85rem", margin: 0, color: "var(--text-secondary)" }}>
              Inspect daylight illumination across the day based on {property.facing} orientation
            </p>
          </div>
        </div>

        <span
          style={{
            padding: "6px 14px",
            borderRadius: "var(--radius-full)",
            background: "var(--bg-secondary)",
            fontSize: "0.85rem",
            fontWeight: 800,
            color: "var(--accent-primary)"
          }}
        >
          ⏰ {formatHour(timeHour)}
        </span>
      </div>

      {/* Interactive Visual with Sunlight Filter */}
      <div
        style={{
          position: "relative",
          height: "320px",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          marginBottom: "20px",
          boxShadow: "var(--shadow-md)"
        }}
      >
        <img
          src={property.images[0]}
          alt={property.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: lighting.warmth,
            transition: "filter 0.4s ease"
          }}
        />

        {/* Ambient Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: lighting.overlay,
            transition: "background 0.4s ease",
            pointerEvents: "none"
          }}
        />

        {/* Sun/Moon Position Icon */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: `${(lighting.sunAngle / 180) * 85 + 5}%`,
            transform: "translateX(-50%)",
            transition: "left 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 10
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: timeHour >= 19 || timeHour <= 5 ? "#e2e8f0" : "#fbbf24",
              boxShadow: timeHour >= 19 || timeHour <= 5 ? "0 0 20px #e2e8f0" : "0 0 30px #f59e0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0f172a"
            }}
          >
            {timeHour >= 19 || timeHour <= 5 ? <Moon size={22} /> : <Sun size={24} />}
          </div>
        </div>

        {/* Real-Time Assessment Note Overlay */}
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            left: "16px",
            right: "16px",
            background: "rgba(15, 23, 42, 0.82)",
            backdropFilter: "blur(8px)",
            color: "#ffffff",
            padding: "10px 16px",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.85rem",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <Compass size={16} color="#60a5fa" />
          <span>{lighting.desc}</span>
        </div>
      </div>

      {/* Time Slider */}
      <div style={{ padding: "0 8px" }}>
        <input
          type="range"
          min="5"
          max="22"
          step="1"
          value={timeHour}
          onChange={(e) => setTimeHour(Number(e.target.value))}
          style={{ width: "100%", accentColor: "var(--accent-primary)", cursor: "pointer" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
          <span>5:00 AM (Dawn)</span>
          <span>9:00 AM (Morning)</span>
          <span>1:00 PM (Noon)</span>
          <span>5:00 PM (Sunset)</span>
          <span>10:00 PM (Night)</span>
        </div>
      </div>
    </div>
  );
};

export default SunLightingSimulator;
