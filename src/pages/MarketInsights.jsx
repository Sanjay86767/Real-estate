import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Building2,
  MapPin,
  Calendar,
  Download,
  Award,
  Sparkles,
  BarChart3,
  Percent,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";
import { playClickSound, playSuccessSound, triggerConfetti } from "../utils/effects";

const CITY_GROWTH_LEADERBOARD = [
  { city: "Mohali Aerocity & PR-7", avgPrice: "₹6,950/sq.ft", yoyGrowth: "+15.4%", rentalYield: "5.8%", demand: "Very High", driver: "Airport Expansion & IT City" },
  { city: "Gurugram Golf Course Ext.", avgPrice: "₹24,500/sq.ft", yoyGrowth: "+18.7%", rentalYield: "4.2%", demand: "Ultra Luxury", driver: "Corporate HQs & Metro Phase 2" },
  { city: "Chandigarh Sec 8-11", avgPrice: "₹14,800/sq.ft", yoyGrowth: "+9.2%", rentalYield: "3.6%", demand: "Heritage Core", driver: "Limited Freehold Inventory" },
  { city: "Bangalore Whitefield", avgPrice: "₹9,800/sq.ft", yoyGrowth: "+12.3%", rentalYield: "6.2%", demand: "Tech High", driver: "Purple Line Metro Connectivity" },
  { city: "Amritsar Airport Road", avgPrice: "₹4,200/sq.ft", yoyGrowth: "+8.5%", rentalYield: "4.8%", demand: "Emerging Hub", driver: "Tourism & Commercial Hubs" },
  { city: "Delhi Greater Kailash", avgPrice: "₹31,000/sq.ft", yoyGrowth: "+6.1%", rentalYield: "3.2%", demand: "Prime Capital", driver: "Bespoke Builder Floors" }
];

const INFRASTRUCTURE_CORRIDORS = [
  {
    name: "GMADA Aerotropolis Mega Township",
    location: "Mohali, Punjab (5,400 Acres)",
    completion: "Q4 2026",
    status: "Under Rapid Development",
    impact: "+22% - +28% Price Appreciation",
    desc: "Northern India's largest planned residential and commercial urban agglomeration adjacent to Chandigarh International Airport."
  },
  {
    name: "Gurugram Cyber City - Golf Course Metro Spur",
    location: "Gurugram, NCR",
    completion: "Q2 2027",
    status: "Civil Tenders Awarded",
    impact: "+18% - +24% Rental Spike",
    desc: "28 km elevated metro corridor connecting Huda City Centre to Cyber City via Golf Course Road."
  },
  {
    name: "Bangalore Suburban Rail Project (Corridor 2)",
    location: "Bangalore Tech Corridor",
    completion: "Q1 2027",
    status: "Track Laying Underway",
    impact: "+15% Commercial Inflow",
    desc: "Dedicated high-speed suburban transit eliminating road congestion across East and South IT corridors."
  }
];

export const MarketInsights = () => {
  const { addToast } = usePropertyContext();
  const [downloadedReport, setDownloadedReport] = useState(false);

  const handleDownloadWhitepaper = () => {
    playSuccessSound();
    triggerConfetti();
    setDownloadedReport(true);
    addToast("EstateHub Q1 2026 Real Estate Benchmark Report downloaded!", "success");
    setTimeout(() => window.print(), 400);
  };

  return (
    <div className="market-insights-page" style={{ padding: "40px 0 90px", background: "var(--bg-primary)" }}>
      <div className="container">
        {/* Page Hero Header */}
        <div style={{ textAlign: "center", maxWidth: "820px", margin: "0 auto 50px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 14px",
              borderRadius: "var(--radius-full)",
              background: "var(--accent-primary-light)",
              color: "var(--accent-primary)",
              fontSize: "0.85rem",
              fontWeight: 800,
              marginBottom: "14px"
            }}
          >
            <BarChart3 size={16} />
            REAL ESTATE MACRO INTELLIGENCE
          </div>
          <h1 style={{ fontSize: "2.6rem", marginBottom: "14px" }}>
            Real Estate Market Trends & Price Heatmap
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: "1.7" }}>
            Grounded in daily registry deed filings, builder inventory data, and secondary resale transactions across India's top residential micro-markets.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "20px" }}>
            <button onClick={handleDownloadWhitepaper} className="btn btn-primary" style={{ gap: "8px" }}>
              <Download size={18} />
              <span>{downloadedReport ? "Downloaded Report" : "Download Q1 Market Report (PDF)"}</span>
            </button>
          </div>
        </div>

        {/* 1. Macro Economic Key Performance Indicators */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "40px"
          }}
        >
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-lg)", padding: "22px", boxShadow: "var(--shadow-sm)" }}>
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
              RBI Repo Rate
            </span>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-primary)", margin: "4px 0" }}>6.50%</div>
            <span style={{ fontSize: "0.8rem", color: "var(--accent-emerald)", fontWeight: 600 }}>● Steady (Rate Pause Mode)</span>
          </div>

          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-lg)", padding: "22px", boxShadow: "var(--shadow-sm)" }}>
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
              Prime Home Loan APR
            </span>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-emerald)", margin: "4px 0" }}>8.35%</div>
            <span style={{ fontSize: "0.8rem", color: "var(--accent-emerald)", fontWeight: 600 }}>▼ -15 bps QoQ Decline</span>
          </div>

          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-lg)", padding: "22px", boxShadow: "var(--shadow-sm)" }}>
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
              Annual Sales Volume
            </span>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent-gold)", margin: "4px 0" }}>₹450 Cr+</div>
            <span style={{ fontSize: "0.8rem", color: "var(--accent-emerald)", fontWeight: 600 }}>▲ +18.4% YoY Inflow</span>
          </div>

          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-lg)", padding: "22px", boxShadow: "var(--shadow-sm)" }}>
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
              NRI Capital Influx
            </span>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#a855f7", margin: "4px 0" }}>$18.4 B</div>
            <span style={{ fontSize: "0.8rem", color: "var(--accent-emerald)", fontWeight: 600 }}>▲ All-Time High</span>
          </div>
        </div>

        {/* 2. Micro-Market Price Appreciation Leaderboard */}
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-xl)",
            padding: "32px",
            boxShadow: "var(--shadow-md)",
            marginBottom: "40px"
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "1.4rem", margin: 0 }}>Regional Capital Growth & Rental Yield Leaderboard</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: "4px 0 0" }}>
              Audited quarterly transactional metrics across premier corridors.
            </p>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.92rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border-light)", color: "var(--text-muted)" }}>
                  <th style={{ padding: "14px 16px" }}>Micro-Market Region</th>
                  <th style={{ padding: "14px 16px" }}>Avg. Capital Rate</th>
                  <th style={{ padding: "14px 16px" }}>YoY Price Growth</th>
                  <th style={{ padding: "14px 16px" }}>Gross Rental Yield</th>
                  <th style={{ padding: "14px 16px" }}>Key Demand Catalyst</th>
                </tr>
              </thead>
              <tbody>
                {CITY_GROWTH_LEADERBOARD.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid var(--border-light)" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 700 }}>{item.city}</td>
                    <td style={{ padding: "14px 16px", fontWeight: 800, color: "var(--accent-primary)" }}>{item.avgPrice}</td>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "var(--accent-emerald)" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "2px" }}>
                        <TrendingUp size={14} /> {item.yoyGrowth}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "var(--accent-gold)" }}>{item.rentalYield}</td>
                    <td style={{ padding: "14px 16px", color: "var(--text-secondary)" }}>{item.driver}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. High-Growth Infrastructure Corridors */}
        <div>
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "1.4rem", margin: 0 }}>Mega Infrastructure Catalysts (2026 - 2028)</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: "4px 0 0" }}>
              High-impact civic infrastructure projects poised to deliver outsized capital appreciation.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {INFRASTRUCTURE_CORRIDORS.map((corridor, idx) => (
              <div
                key={idx}
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-lg)",
                  padding: "24px",
                  boxShadow: "var(--shadow-sm)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--accent-primary)", fontWeight: 700, textTransform: "uppercase" }}>
                      Target: {corridor.completion}
                    </span>
                    <span style={{ fontSize: "0.75rem", background: "var(--accent-emerald-light)", color: "var(--accent-emerald)", padding: "2px 8px", borderRadius: "var(--radius-full)", fontWeight: 700 }}>
                      {corridor.status}
                    </span>
                  </div>

                  <h4 style={{ fontSize: "1.15rem", margin: "0 0 6px" }}>{corridor.name}</h4>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "12px" }}>
                    <MapPin size={14} color="var(--accent-primary)" />
                    <span>{corridor.location}</span>
                  </div>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "16px" }}>
                    {corridor.desc}
                  </p>
                </div>

                <div style={{ padding: "10px 14px", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Projected Appreciation:</span>
                  <strong style={{ fontSize: "0.92rem", color: "var(--accent-emerald)" }}>{corridor.impact}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;
