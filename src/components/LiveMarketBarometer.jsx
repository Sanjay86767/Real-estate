import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Activity, ShieldCheck, Phone, ArrowUpRight, Sparkles, MapPin, Wind, ThermometerSun } from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";

export const LiveMarketBarometer = () => {
  const { formatPrice } = usePropertyContext();
  const [selectedCity, setSelectedCity] = useState("Chandigarh");

  const cityData = {
    Chandigarh: {
      tag: "Ultra-Prime Capital",
      sentiment: "High Liquidity & Scarcity",
      sentimentScore: 96,
      rate: 14800,
      yoy: "+9.2%",
      temp: "26°C Sunny",
      aqi: "48 (Clean)",
      inquiriesToday: 148,
      hotcorridor: "Sectors 8, 9 & Sukhna Enclave",
      advisoryNote: "Zero vacant land in heritage sectors driving prime villa appreciation."
    },
    Mohali: {
      tag: "High Growth Aerotropolis",
      sentiment: "Rapid Capital Inflow",
      sentimentScore: 94,
      rate: 6950,
      yoy: "+15.4%",
      temp: "27°C Clear",
      aqi: "54 (Good)",
      inquiriesToday: 216,
      hotcorridor: "Aerocity, IT City & Sector 82",
      advisoryNote: "Upcoming GMADA Aerotropolis expressway spurring 15%+ commercial appreciation."
    },
    Gurugram: {
      tag: "NCR Financial Hub",
      sentiment: "Bespoke Luxury Dominance",
      sentimentScore: 98,
      rate: 24500,
      yoy: "+18.7%",
      temp: "29°C Warm",
      aqi: "88 (Fair)",
      inquiriesToday: 342,
      hotcorridor: "Golf Course Ext. & Cyber Hub",
      advisoryNote: "High-net-worth family offices aggressively acquiring 4BHK+ penthouses."
    },
    Bangalore: {
      tag: "Silicon Technology Capital",
      sentiment: "High Rental Yields (5.8%)",
      sentimentScore: 92,
      rate: 11200,
      yoy: "+12.1%",
      temp: "23°C Pleasant",
      aqi: "36 (Pure)",
      inquiriesToday: 290,
      hotcorridor: "Whitefield & Outer Ring Road",
      advisoryNote: "Suburban Rail Phase 2 expansion boosting villa community valuations."
    },
    Mumbai: {
      tag: "Financial Capital of India",
      sentiment: "Ultra-High Net Worth Dominance",
      sentimentScore: 99,
      rate: 64500,
      yoy: "+18.8%",
      temp: "31°C Coastal Breeze",
      aqi: "62 (Moderate)",
      inquiriesToday: 412,
      hotcorridor: "Worli Sea Face, Bandra & BKC",
      advisoryNote: "Coastal Road & Trans-Harbour Link driving generational sea-facing wealth creation."
    },
    Darbhanga: {
      tag: "Mithila Economic & Airport Hub",
      sentiment: "Highest Growth Corridor (+28.5%)",
      sentimentScore: 97,
      rate: 3400,
      yoy: "+28.5%",
      temp: "28°C Pleasant",
      aqi: "42 (Clean)",
      inquiriesToday: 184,
      hotcorridor: "NH-27 Airport Highway, Kameshwari & Benta Chowk",
      advisoryNote: "AIIMS Darbhanga construction and International Airport expansion creating massive land value surge."
    },
    Goa: {
      tag: "Coastal Luxury & Holiday Haven",
      sentiment: "7.2% Net Rental Yield",
      sentimentScore: 95,
      rate: 18200,
      yoy: "+21.4%",
      temp: "29°C Tropical",
      aqi: "28 (Pure)",
      inquiriesToday: 265,
      hotcorridor: "Candolim, Siolim & Assagao",
      advisoryNote: "MOPA International Airport and luxury boutique villas delivering top national rental yields."
    }
  };

  const active = cityData[selectedCity];

  return (
    <section style={{ padding: "40px 0", background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-light)" }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "4px 12px", background: "rgba(225, 29, 72, 0.1)", border: "1px solid rgba(225, 29, 72, 0.3)", borderRadius: "var(--radius-full)", marginBottom: "10px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-rose)", boxShadow: "0 0 8px var(--accent-rose)" }}></span>
              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--accent-rose)", textTransform: "uppercase", letterSpacing: "1px" }}>
                Real-Time Macro Telemetry
              </span>
            </div>
            <h2 style={{ fontSize: "1.75rem", margin: 0, fontWeight: 800 }}>
              Live Regional Real Estate <span style={{ color: "var(--accent-primary)" }}>Barometer</span>
            </h2>
          </div>

          {/* City Tabs */}
          <div style={{ display: "flex", gap: "8px", background: "var(--bg-surface)", padding: "4px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", overflowX: "auto" }}>
            {Object.keys(cityData).map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "var(--radius-sm)",
                  border: "none",
                  background: selectedCity === city ? "var(--accent-primary)" : "transparent",
                  color: selectedCity === city ? "#ffffff" : "var(--text-secondary)",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Telemetry Dashboard Card */}
        <div
          style={{
            background: "var(--bg-surface)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-lg)",
            padding: "28px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Col 1: Capital Metrics */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <MapPin size={16} color="var(--accent-primary)" />
              <span style={{ fontSize: "0.8rem", color: "var(--accent-primary)", fontWeight: 800, textTransform: "uppercase" }}>
                {active.tag}
              </span>
            </div>
            <h3 style={{ fontSize: "1.5rem", margin: "0 0 6px", fontWeight: 800 }}>
              {selectedCity} Prime Index
            </h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px", margin: "14px 0" }}>
              <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)" }}>
                ₹{active.rate.toLocaleString()}<span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 500 }}>/sq.ft</span>
              </span>
              <span style={{ color: "var(--accent-emerald)", fontWeight: 800, fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "2px" }}>
                <TrendingUp size={16} /> {active.yoy} YoY
              </span>
            </div>

            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: "0 0 16px" }}>
              <strong>Prime Corridor:</strong> {active.hotcorridor}
            </p>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", fontSize: "0.82rem", color: "var(--text-muted)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <ThermometerSun size={14} color="var(--accent-gold)" /> {active.temp}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Wind size={14} color="var(--accent-emerald)" /> AQI: {active.aqi}
              </span>
            </div>
          </div>

          {/* Col 2: Real-time Sentiment Bar */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Buyer Sentiment & Liquidity:
              </span>
              <span style={{ color: "var(--accent-emerald)", fontWeight: 800, fontSize: "0.9rem" }}>
                {active.sentimentScore}/100
              </span>
            </div>

            {/* Progress Track */}
            <div style={{ width: "100%", height: "10px", background: "var(--bg-secondary)", borderRadius: "var(--radius-full)", overflow: "hidden", marginBottom: "16px" }}>
              <div
                style={{
                  width: `${active.sentimentScore}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-emerald) 100%)",
                  borderRadius: "var(--radius-full)",
                  transition: "width 0.5s ease"
                }}
              ></div>
            </div>

            <div style={{ background: "var(--bg-secondary)", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)", fontSize: "0.85rem", lineHeight: 1.5, color: "var(--text-secondary)" }}>
              <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                Advisor Intelligence:
              </div>
              {active.advisoryNote}
            </div>
          </div>

          {/* Col 3: Direct Lead Advisor Action */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", background: "linear-gradient(135deg, rgba(15, 23, 42, 0.05) 0%, rgba(217, 119, 6, 0.06) 100%)", padding: "20px", borderRadius: "var(--radius-lg)", border: "1px solid rgba(217, 119, 6, 0.25)" }}>
            <div>
              <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--accent-gold)", fontWeight: 800, marginBottom: "4px" }}>
                Mandated Advisory Desk
              </div>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)" }}>
                Sanjay Kumar
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "2px" }}>
                {active.inquiriesToday} buyer inquiries handled today
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
              <a
                href="tel:+918809604880"
                className="btn btn-gold btn-sm"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontWeight: 700 }}
              >
                <Phone size={14} />
                <span>Call +91 8809604880</span>
              </a>

              <Link
                to={`/properties?city=${selectedCity.toLowerCase()}`}
                className="btn btn-outline btn-sm"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
              >
                <span>Browse {selectedCity} Properties</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveMarketBarometer;
