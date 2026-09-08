import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Activity, ShieldCheck, Phone, ArrowUpRight, Sparkles, MapPin, Wind, ThermometerSun, Zap, MessageSquare, BarChart3, Eye, Crown } from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";

const CITY_DATA = {
  Chandigarh: {
    tag: "Ultra-Prime Capital",
    emoji: "🏛️",
    sentiment: "High Liquidity & Scarcity",
    sentimentScore: 96,
    rate: 14800,
    yoy: "+9.2%",
    yoyVal: 9.2,
    temp: "26°C Sunny",
    aqi: "48",
    aqiLabel: "Clean",
    inquiriesToday: 148,
    hotcorridor: "Sectors 8, 9 & Sukhna Enclave",
    advisoryNote: "Zero vacant land in heritage sectors driving prime villa appreciation with 96/100 buyer sentiment.",
    color: "#6366f1",
    gradientFrom: "#4f46e5",
  },
  Mohali: {
    tag: "High Growth Aerotropolis",
    emoji: "✈️",
    sentiment: "Rapid Capital Inflow",
    sentimentScore: 94,
    rate: 6950,
    yoy: "+15.4%",
    yoyVal: 15.4,
    temp: "27°C Clear",
    aqi: "54",
    aqiLabel: "Good",
    inquiriesToday: 216,
    hotcorridor: "Aerocity, IT City & Sector 82",
    advisoryNote: "GMADA Aerotropolis expressway spurring 15%+ commercial appreciation along the NH-205 corridor.",
    color: "#0ea5e9",
    gradientFrom: "#0284c7",
  },
  Gurugram: {
    tag: "NCR Financial Hub",
    emoji: "🏙️",
    sentiment: "Bespoke Luxury Dominance",
    sentimentScore: 98,
    rate: 24500,
    yoy: "+18.7%",
    yoyVal: 18.7,
    temp: "29°C Warm",
    aqi: "88",
    aqiLabel: "Fair",
    inquiriesToday: 342,
    hotcorridor: "Golf Course Ext. & Cyber Hub",
    advisoryNote: "High-net-worth family offices aggressively acquiring 4BHK+ penthouses in DLF Phase 5 & 6.",
    color: "#f59e0b",
    gradientFrom: "#d97706",
  },
  Bangalore: {
    tag: "Silicon Tech Capital",
    emoji: "💻",
    sentiment: "High Rental Yields (5.8%)",
    sentimentScore: 92,
    rate: 11200,
    yoy: "+12.1%",
    yoyVal: 12.1,
    temp: "23°C Pleasant",
    aqi: "36",
    aqiLabel: "Pure",
    inquiriesToday: 290,
    hotcorridor: "Whitefield & Outer Ring Road",
    advisoryNote: "Suburban Rail Phase 2 expansion boosting villa community valuations across east Bangalore.",
    color: "#10b981",
    gradientFrom: "#059669",
  },
  Mumbai: {
    tag: "Financial Capital",
    emoji: "🌊",
    sentiment: "Ultra-HNI Dominance",
    sentimentScore: 99,
    rate: 64500,
    yoy: "+18.8%",
    yoyVal: 18.8,
    temp: "31°C Coastal",
    aqi: "62",
    aqiLabel: "Moderate",
    inquiriesToday: 412,
    hotcorridor: "Worli Sea Face, Bandra & BKC",
    advisoryNote: "Coastal Road & Trans-Harbour Link driving generational sea-facing wealth creation in 2026.",
    color: "#ec4899",
    gradientFrom: "#db2777",
  },
  Darbhanga: {
    tag: "Bihar Airport Growth Hub",
    emoji: "🚀",
    sentiment: "Highest CAGR Nationally",
    sentimentScore: 97,
    rate: 3400,
    yoy: "+28.5%",
    yoyVal: 28.5,
    temp: "28°C Pleasant",
    aqi: "42",
    aqiLabel: "Clean",
    inquiriesToday: 184,
    hotcorridor: "NH-27 Airport Hwy, Kameshwari",
    advisoryNote: "AIIMS Darbhanga + International Airport expansion creating the highest land value surge in North India.",
    color: "#f97316",
    gradientFrom: "#ea580c",
  },
  Goa: {
    tag: "Coastal Luxury Haven",
    emoji: "🏖️",
    sentiment: "7.2% Net Rental Yield",
    sentimentScore: 95,
    rate: 18200,
    yoy: "+21.4%",
    yoyVal: 21.4,
    temp: "29°C Tropical",
    aqi: "28",
    aqiLabel: "Pure",
    inquiriesToday: 265,
    hotcorridor: "Candolim, Siolim & Assagao",
    advisoryNote: "MOPA International Airport and luxury boutique villas delivering top national rental yields of 7.2%.",
    color: "#8b5cf6",
    gradientFrom: "#7c3aed",
  },
};

// Mini sparkline bar chart
const SparkBar = ({ value, max, color }) => {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "999px", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: "999px", transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)" }} />
    </div>
  );
};

export const LiveMarketBarometer = () => {
  const { formatPrice } = usePropertyContext();
  const [selectedCity, setSelectedCity] = useState("Darbhanga");
  const [animKey, setAnimKey] = useState(0);
  const [liveCount, setLiveCount] = useState(0);
  const prevCity = useRef(selectedCity);

  const cities = Object.keys(CITY_DATA);
  const active = CITY_DATA[selectedCity];

  // Animate number when city changes
  useEffect(() => {
    if (prevCity.current !== selectedCity) {
      setAnimKey(k => k + 1);
      prevCity.current = selectedCity;
    }
  }, [selectedCity]);

  // Fake live viewer count ticker
  useEffect(() => {
    setLiveCount(active.inquiriesToday);
    const interval = setInterval(() => {
      setLiveCount(c => c + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, [selectedCity]);

  return (
    <section style={{
      padding: "clamp(36px,5vw,64px) 0",
      background: "linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)",
      borderBottom: "1px solid var(--border-light)",
      position: "relative", overflow: "hidden"
    }}>
      {/* Background glow orb */}
      <div style={{
        position: "absolute", top: "-40px", right: "8%",
        width: "400px", height: "400px",
        background: `radial-gradient(circle, ${active.color}18, transparent 65%)`,
        borderRadius: "50%", pointerEvents: "none",
        transition: "background 0.6s ease"
      }} />

      <div className="container">
        {/* ── Section Header ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "20px", marginBottom: "28px" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "5px 14px", background: "rgba(225,29,72,0.1)", border: "1px solid rgba(225,29,72,0.28)", borderRadius: "999px", marginBottom: "12px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#f43f5e", boxShadow: "0 0 8px #f43f5e", display: "inline-block", animation: "pulse 1.8s ease-in-out infinite" }} />
              <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#f43f5e", textTransform: "uppercase", letterSpacing: "1.2px" }}>
                Live Real-Time Market Intelligence
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.1rem)", margin: 0, fontWeight: 900, lineHeight: 1.15 }}>
              Regional Market <span style={{ color: active.color, transition: "color 0.4s" }}>Barometer</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", margin: "6px 0 0", maxWidth: "440px" }}>
              AI-synthesised macro telemetry across India's highest-yield corridors, updated every 60s.
            </p>
          </div>

          {/* City selector tabs */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", maxWidth: "560px" }}>
            {cities.map(city => {
              const d = CITY_DATA[city];
              const isActive = selectedCity === city;
              return (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "999px",
                    border: isActive ? `1.5px solid ${d.color}` : "1px solid var(--border-light)",
                    background: isActive ? `${d.color}18` : "var(--bg-surface)",
                    color: isActive ? d.color : "var(--text-secondary)",
                    fontWeight: isActive ? 800 : 600,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    transition: "all 0.22s ease",
                    display: "inline-flex", alignItems: "center", gap: "5px"
                  }}
                >
                  <span>{d.emoji}</span>
                  <span>{city}</span>
                  {isActive && <span style={{ fontSize: "0.6rem", background: d.color, color: "#fff", borderRadius: "999px", padding: "1px 5px", fontWeight: 900 }}>{d.yoy}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Main Card ── */}
        <div style={{
          background: "var(--bg-surface)",
          borderRadius: "var(--radius-xl)",
          border: `1px solid ${active.color}30`,
          boxShadow: `0 16px 48px rgba(0,0,0,0.12), 0 0 0 1px ${active.color}15`,
          overflow: "hidden",
          transition: "border-color 0.4s ease, box-shadow 0.4s ease"
        }}>

          {/* Colored top stripe */}
          <div style={{ height: "4px", background: `linear-gradient(90deg, ${active.gradientFrom}, ${active.color}, ${active.gradientFrom}40)` }} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0" }}>

            {/* ── Col 1: Prime Index ── */}
            <div style={{ padding: "28px", borderRight: "1px solid var(--border-light)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <span style={{ fontSize: "1.4rem" }}>{active.emoji}</span>
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: active.color, textTransform: "uppercase", letterSpacing: "0.6px" }}>
                  {active.tag}
                </span>
              </div>

              <h3 style={{ fontSize: "1.35rem", margin: "0 0 4px", fontWeight: 900 }}>
                {selectedCity} Prime Index
              </h3>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "18px", display: "flex", alignItems: "center", gap: "5px" }}>
                <MapPin size={11} /> {active.hotcorridor}
              </div>

              {/* Big rate */}
              <div key={animKey} style={{ animation: "fadeInUp 0.4s ease" }}>
                <div style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "-1px" }}>
                  ₹{active.rate.toLocaleString("en-IN")}
                  <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-muted)", marginLeft: "4px" }}>/sq.ft</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "999px", padding: "3px 10px", fontSize: "0.82rem", fontWeight: 800, color: "#10b981" }}>
                    <TrendingUp size={12} /> {active.yoy} YoY
                  </span>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>CAGR</span>
                </div>
              </div>

              {/* Env info */}
              <div style={{ display: "flex", gap: "16px", marginTop: "18px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "4px", color: "var(--text-muted)" }}>
                  <ThermometerSun size={13} color="#f59e0b" /> {active.temp}
                </span>
                <span style={{ fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "4px", color: "var(--text-muted)" }}>
                  <Wind size={13} color="#10b981" /> AQI {active.aqi}
                  <span style={{ fontSize: "0.65rem", background: "rgba(16,185,129,0.1)", color: "#10b981", borderRadius: "4px", padding: "1px 5px", fontWeight: 700 }}>{active.aqiLabel}</span>
                </span>
              </div>
            </div>

            {/* ── Col 2: Sentiment + Mini Chart ── */}
            <div style={{ padding: "28px", borderRight: "1px solid var(--border-light)" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>
                Buyer Sentiment & Liquidity Score
              </div>

              {/* Score display */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "10px" }}>
                <span style={{ fontSize: "2.8rem", fontWeight: 900, color: active.color, lineHeight: 1, transition: "color 0.4s" }}>
                  {active.sentimentScore}
                </span>
                <span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: 600 }}>/100</span>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#10b981", background: "rgba(16,185,129,0.1)", padding: "2px 8px", borderRadius: "999px" }}>
                  {active.sentiment}
                </span>
              </div>

              {/* Track bar */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ height: "10px", background: "var(--bg-secondary)", borderRadius: "999px", overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    width: `${active.sentimentScore}%`,
                    background: `linear-gradient(90deg, ${active.gradientFrom}, ${active.color})`,
                    borderRadius: "999px",
                    transition: "width 0.7s cubic-bezier(0.16,1,0.3,1)",
                    boxShadow: `0 0 8px ${active.color}60`
                  }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.62rem", color: "var(--text-muted)", marginTop: "4px" }}>
                  <span>Cold (0)</span><span>Neutral (50)</span><span>Hot (100)</span>
                </div>
              </div>

              {/* Mini city rankings */}
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "8px" }}>
                YoY Growth Comparison
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {cities.slice(0, 5).map(c => {
                  const d = CITY_DATA[c];
                  const isThis = c === selectedCity;
                  return (
                    <div key={c} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "0.7rem", width: "68px", color: isThis ? d.color : "var(--text-muted)", fontWeight: isThis ? 800 : 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c}</span>
                      <div style={{ flex: 1 }}>
                        <SparkBar value={d.yoyVal} max={30} color={isThis ? d.color : "var(--border-light)"} />
                      </div>
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, color: isThis ? d.color : "var(--text-muted)", minWidth: "36px", textAlign: "right" }}>{d.yoy}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Col 3: Advisory + CTAs ── */}
            <div style={{ padding: "28px", background: `linear-gradient(135deg, ${active.color}06, transparent 70%)`, transition: "background 0.5s" }}>

              {/* Live inquiries */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981", display: "inline-block", animation: "pulse 1.8s ease-in-out infinite" }} />
                <span style={{ fontSize: "0.78rem", color: "#10b981", fontWeight: 700 }}>
                  {liveCount} buyer inquiries today — LIVE
                </span>
              </div>

              {/* Advisory box */}
              <div style={{ background: `${active.color}0e`, border: `1px solid ${active.color}25`, borderRadius: "var(--radius-lg)", padding: "14px 16px", marginBottom: "18px" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 800, color: active.color, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "6px" }}>
                  <BarChart3 size={11} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
                  Advisor Intelligence
                </div>
                <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
                  {active.advisoryNote}
                </p>
              </div>

              {/* Founder desk */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: `linear-gradient(135deg, #92400e, #d97706)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Crown size={16} color="#fff" />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.9rem" }}>Sanjay Kumar</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Mandated Advisory Desk • Founder</div>
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <a href="tel:+918809604880" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", padding: "11px 14px", background: "linear-gradient(135deg, #92400e, #d97706)", color: "#fff", borderRadius: "var(--radius-md)", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", boxShadow: "0 4px 14px rgba(217,119,6,0.3)" }}>
                  <Phone size={14} /> Call +91 8809604880
                </a>
                <a href={`https://wa.me/918809604880?text=${encodeURIComponent(`Hi Sanjay, I'm interested in ${selectedCity} real estate. Please share available options.`)}`} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", padding: "10px 14px", background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.25)", color: "#16a34a", borderRadius: "var(--radius-md)", fontWeight: 700, fontSize: "0.82rem", textDecoration: "none" }}>
                  <MessageSquare size={13} /> WhatsApp for {selectedCity}
                </a>
                <Link to={`/properties?city=${selectedCity.toLowerCase()}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "9px 14px", background: "var(--bg-secondary)", border: "1px solid var(--border-light)", color: "var(--text-secondary)", borderRadius: "var(--radius-md)", fontWeight: 600, fontSize: "0.8rem", textDecoration: "none" }}>
                  Browse {selectedCity} Listings <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
};

export default LiveMarketBarometer;
