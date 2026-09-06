import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus, ArrowRight, X, Sparkles, Activity } from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";

const MARKET_DATA = [
  { region: "Chandigarh Sec 8-11", rate: "₹14,800/sq.ft", change: "+9.2% YoY", trend: "up", volume: "High Demand" },
  { region: "Mohali Aerocity", rate: "₹6,950/sq.ft", change: "+15.4% YoY", trend: "up", volume: "Fast Moving" },
  { region: "Gurugram Golf Course", rate: "₹24,500/sq.ft", change: "+18.7% YoY", trend: "up", volume: "Ultra Luxury" },
  { region: "Delhi Greater Kailash", rate: "₹31,000/sq.ft", change: "+6.1% YoY", trend: "up", volume: "Prime Core" },
  { region: "Bangalore Whitefield", rate: "₹9,800/sq.ft", change: "+12.3% YoY", trend: "up", volume: "Tech Corridor" },
  { region: "RBI Repo Rate Benchmark", rate: "6.50%", change: "0.0% Unchanged", trend: "neutral", volume: "Rate Pause" },
  { region: "Prime Home Loan Rates", rate: "8.35% p.a.", change: "-15 bps QoQ", trend: "down", volume: "Attractive" },
  { region: "Luxury Rental Yields", rate: "4.8% - 6.2%", change: "+40 bps YoY", trend: "up", volume: "High ROI" },
  { region: "NRI Inward Inflow", rate: "$18.4 Billion", change: "+24.8% YoY", trend: "up", volume: "Record High" }
];

export const MarketTicker = () => {
  const [visible, setVisible] = useState(true);
  const [selectedTicker, setSelectedTicker] = useState(null);

  if (!visible) return null;

  return (
    <div className="market-ticker-wrapper">
      <div className="market-ticker-bar">
        {/* Live Indicator Badge */}
        <div className="market-ticker-badge">
          <span className="live-dot-pulse"></span>
          <Activity size={13} />
          <span>MARKET PULSE</span>
        </div>

        {/* Marquee Track */}
        <div className="market-marquee-container">
          <div className="market-marquee-content">
            {MARKET_DATA.concat(MARKET_DATA).map((item, idx) => (
              <button
                key={idx}
                className="ticker-item-btn"
                onClick={() => setSelectedTicker(item)}
                title="Click for market intelligence insights"
              >
                <span className="ticker-region">{item.region}:</span>
                <span className="ticker-rate">{item.rate}</span>
                <span className={`ticker-change ${item.trend}`}>
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
                <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Current Average Benchmark</span>
                <strong style={{ fontSize: "1.1rem", color: "var(--accent-primary)" }}>{selectedTicker.rate}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Annual Trajectory (YoY)</span>
                <span style={{ fontWeight: 700, color: selectedTicker.trend === "up" ? "var(--accent-emerald)" : "var(--accent-rose)" }}>
                  {selectedTicker.change}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Market Liquidity Status</span>
                <span style={{ background: "var(--bg-surface)", padding: "2px 8px", borderRadius: "var(--radius-full)", fontSize: "0.8rem", fontWeight: 600 }}>
                  {selectedTicker.volume}
                </span>
              </div>
            </div>

            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "20px" }}>
              EstateHub AI indexes daily registration deeds, live builder inventories, and secondary resale transactions to derive calibrated valuation benchmarks with 98.4% confidence intervals.
            </p>

            <button
              onClick={() => setSelectedTicker(null)}
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketTicker;
