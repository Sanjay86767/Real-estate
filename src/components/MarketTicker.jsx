import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus, ArrowRight, X, Sparkles, Activity, RefreshCw } from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";

const INITIAL_MARKET_DATA = [
  { region: "Mumbai Bandra-Worli", rate: "₹58,400/sq.ft", change: "+12.4% YoY", trend: "up", volume: "Ultra High Demand" },
  { region: "Bengaluru Whitefield", rate: "₹10,250/sq.ft", change: "+14.1% YoY", trend: "up", volume: "Tech Corridor" },
  { region: "Gurugram Golf Course Ext", rate: "₹26,800/sq.ft", change: "+18.9% YoY", trend: "up", volume: "Institutional Inflow" },
  { region: "Darbhanga / Patna VIP Zone", rate: "₹6,400/sq.ft", change: "+9.8% YoY", trend: "up", volume: "Founder Corridor" },
  { region: "Goa Beachfront Candolim", rate: "₹28,500/sq.ft", change: "+16.2% YoY", trend: "up", volume: "NRI Holiday Homes" },
  { region: "Delhi Greater Kailash", rate: "₹34,000/sq.ft", change: "+7.2% YoY", trend: "up", volume: "Prime Core" },
  { region: "RBI Benchmark Repo Rate", rate: "6.50%", change: "0.0% Unchanged", trend: "neutral", volume: "Rate Pause" },
  { region: "HDFC & SBI Home Loan Rate", rate: "8.35% p.a.", change: "-15 bps Live", trend: "down", volume: "Attractive Financing" },
  { region: "Luxury Capital Rental Yield", rate: "5.8% - 7.2%", change: "+60 bps YoY", trend: "up", volume: "High ROI" },
  { region: "NRI Direct Foreign Inflow", rate: "$21.6 Billion", change: "+28.4% YoY", trend: "up", volume: "Record High" }
];

export const MarketTicker = () => {
  const [visible, setVisible] = useState(true);
  const [selectedTicker, setSelectedTicker] = useState(null);
  const [marketData, setMarketData] = useState(INITIAL_MARKET_DATA);
  const [tickIndex, setTickIndex] = useState(0);
  const [lastTickMessage, setLastTickMessage] = useState("Market Stream Connected");

  // Real-Time Simulation Engine: updates random regional rates every 3.8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) => {
        const next = [...prev];
        const randomIdx = Math.floor(Math.random() * next.length);
        const item = next[randomIdx];

        if (item.region.includes("Benchmark") || item.region.includes("Inflow")) {
          return next;
        }

        const delta = (Math.random() * 0.4 - 0.18).toFixed(2);
        const isUp = parseFloat(delta) >= 0;
        next[randomIdx] = {
          ...item,
          change: `${isUp ? "+" : ""}${delta}% Live`,
          trend: isUp ? "up" : "down"
        };

        setTickIndex(randomIdx);
        setLastTickMessage(`${item.region}: ${isUp ? "▲" : "▼"} ${delta}%`);
        return next;
      });
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="market-ticker-wrapper market-ticker-premium">
      <div className="market-ticker-bar" style={{ background: "transparent", border: "none" }}>
        {/* Premium Live Label */}
        <div className="market-ticker-label">
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00D9A5", animation: "pulse-dot 1.5s ease-in-out infinite", display: "inline-block" }} />
          <Activity size={12} />
          <span>LIVE MARKET</span>
        </div>

        {/* Marquee Track */}
        <div className="market-marquee-container">
          <div className="market-marquee-content market-ticker-track">
            {marketData.concat(marketData).map((item, idx) => (
              <button
                key={idx}
                className="ticker-item-btn"
                onClick={() => setSelectedTicker(item)}
                title="Click for real-time market intelligence dossier"
                style={{
                  transition: "background 0.3s ease",
                  background: tickIndex === (idx % marketData.length) ? "rgba(16, 185, 129, 0.15)" : "transparent"
                }}
              >
                <span className="ticker-region" style={{ fontWeight: 700 }}>{item.region}:</span>
                <span className="ticker-rate" style={{ fontWeight: 800, color: "var(--text-primary)" }}>{item.rate}</span>
                <span className={`ticker-change ${item.trend}`} style={{ fontWeight: 800 }}>
                  {item.trend === "up" && <TrendingUp size={12} />}
                  {item.trend === "down" && <TrendingDown size={12} />}
                  {item.trend === "neutral" && <Minus size={12} />}
                  {item.change}
                </span>
                <span className="ticker-divider">•</span>
              </button>
            ))}
          </div>
        </div>

        {/* Real-time sync badge */}
        <div
          className="market-ticker-sync-tag"
          style={{
            padding: "0 12px",
            fontSize: "0.68rem",
            color: "#10b981",
            fontWeight: 800,
            display: "none",
            alignItems: "center",
            gap: "5px",
            whiteSpace: "nowrap"
          }}
        >
          <RefreshCw size={11} className="spin-slow" />
          <span>LIVE</span>
        </div>

        {/* Close / Minimize */}
        <button
          onClick={() => setVisible(false)}
          className="ticker-close-btn"
          title="Hide live market ticker"
          aria-label="Close live ticker"
        >
          <X size={14} />
        </button>
      </div>

      {/* Selected Market Insight Modal */}
      {selectedTicker && (
        <div className="modal-backdrop" onClick={() => setSelectedTicker(null)}>
          <div
            className="modal-container"
            style={{ maxWidth: "480px", padding: "28px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ padding: "8px", background: "var(--accent-primary-light)", borderRadius: "var(--radius-sm)", color: "var(--accent-primary)" }}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 700 }}>
                    Real-Time Micro Index
                  </span>
                  <h3 style={{ margin: 0, fontSize: "1.25rem" }}>{selectedTicker.region}</h3>
                </div>
              </div>
              <button onClick={() => setSelectedTicker(null)} className="btn-icon" style={{ width: "32px", height: "32px" }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ background: "var(--bg-secondary)", borderRadius: "var(--radius-md)", padding: "18px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Current Micro Benchmark</span>
                <strong style={{ fontSize: "1.1rem", color: "var(--accent-primary)" }}>{selectedTicker.rate}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Real-Time Live Momentum</span>
                <span style={{ fontWeight: 800, color: selectedTicker.trend === "up" ? "var(--accent-emerald)" : "var(--accent-rose)" }}>
                  {selectedTicker.change}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Market Liquidity Status</span>
                <span style={{ background: "var(--bg-surface)", padding: "2px 8px", borderRadius: "var(--radius-full)", fontSize: "0.8rem", fontWeight: 700, color: "#10b981" }}>
                  ● {selectedTicker.volume}
                </span>
              </div>
            </div>

            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "20px" }}>
              EstateHub AI indexes live registry records, builder sales velocity, and secondary trades to compute precision micro-market capital yields with real-time confidence scores.
            </p>

            <button
              onClick={() => setSelectedTicker(null)}
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              Close Market Intelligence
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketTicker;
