import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  Sparkles,
  PieChart,
  ShieldCheck,
  Building,
  DollarSign,
  Download,
  ArrowRight,
  Calculator,
  Award,
  Layers,
  CheckCircle2,
  HelpCircle,
  ExternalLink
} from "lucide-react";
import { playClickSound, playSuccessSound, triggerConfetti } from "../utils/effects";
import { usePropertyContext } from "../context/PropertyContext";

export const SovereignPortfolioSimulator = () => {
  const { formatPrice, addToast } = usePropertyContext();

  // Investment Capital (Default ₹1.5 Crore)
  const [corpus, setCorpus] = useState(15000000);

  // Strategy Allocation % (Total 100%)
  const [metroPercent, setMetroPercent] = useState(40); // Tier-1 Luxury Metros (Mumbai, BLR)
  const [corridorPercent, setCorridorPercent] = useState(40); // Mega Infrastructure Corridors (Darbhanga Airport, Jewar, MTHL)
  const [commercialPercent, setCommercialPercent] = useState(20); // High-Yield Commercial & Co-Living

  // Horizon in Years (3, 5, 7, 10)
  const [horizonYears, setHorizonYears] = useState(5);

  // Rebalance sliders gracefully
  const handleMetroChange = (val) => {
    val = Number(val);
    setMetroPercent(val);
    const remaining = 100 - val;
    setCorridorPercent(Math.round(remaining * 0.65));
    setCommercialPercent(remaining - Math.round(remaining * 0.65));
  };

  const handleCorridorChange = (val) => {
    val = Number(val);
    setCorridorPercent(val);
    const remaining = 100 - val;
    setMetroPercent(Math.round(remaining * 0.7));
    setCommercialPercent(remaining - Math.round(remaining * 0.7));
  };

  // Mathematical Projections
  const simulation = useMemo(() => {
    // Blended Annual Capital Appreciation Rate
    // Metro: 12.5% CAGR, Corridor: 21.0% CAGR (Airport & Expressway boom), Commercial: 10.0% CAGR
    const blendedAppreciation =
      (metroPercent / 100) * 0.125 +
      (corridorPercent / 100) * 0.210 +
      (commercialPercent / 100) * 0.100;

    // Blended Rental Yield %
    // Metro: 3.4%, Corridor: 4.2%, Commercial: 7.8%
    const blendedRentalYield =
      (metroPercent / 100) * 0.034 +
      (corridorPercent / 100) * 0.042 +
      (commercialPercent / 100) * 0.078;

    // Projected Future Value using compound interest
    const futureCapitalValue = Math.round(corpus * Math.pow(1 + blendedAppreciation, horizonYears));
    const totalCapitalGain = futureCapitalValue - corpus;

    // Cumulative Rental Cash Flow
    let cumulativeRent = 0;
    let currentAssetBase = corpus;
    for (let yr = 1; yr <= horizonYears; yr++) {
      cumulativeRent += currentAssetBase * blendedRentalYield;
      currentAssetBase *= (1 + blendedAppreciation);
    }
    cumulativeRent = Math.round(cumulativeRent);

    const totalPortfolioWealth = futureCapitalValue + cumulativeRent;

    // Union Budget Section 54/54EC Capital Gains Tax Shield Savings (12.5% flat without indexation)
    const taxSavedUnderSec54 = Math.round(totalCapitalGain * 0.125);

    // Multi-Asset Comparison (5 Years)
    const goldFutureValue = Math.round(corpus * Math.pow(1 + 0.095, horizonYears));
    const niftyFutureValue = Math.round(corpus * Math.pow(1 + 0.125, horizonYears));
    const fdFutureValue = Math.round(corpus * Math.pow(1 + 0.068, horizonYears));

    return {
      blendedCagr: (blendedAppreciation * 100).toFixed(1),
      blendedYield: (blendedRentalYield * 100).toFixed(2),
      futureCapitalValue,
      totalCapitalGain,
      cumulativeRent,
      annualRentalCashflow: Math.round(corpus * blendedRentalYield),
      monthlyRentalCashflow: Math.round((corpus * blendedRentalYield) / 12),
      totalPortfolioWealth,
      taxSavedUnderSec54,
      goldFutureValue,
      niftyFutureValue,
      fdFutureValue,
      netRoiMultiplier: (totalPortfolioWealth / corpus).toFixed(2)
    };
  }, [corpus, metroPercent, corridorPercent, commercialPercent, horizonYears]);

  const presetCorpus = [
    { label: "₹50 Lacs", val: 5000000 },
    { label: "₹1.5 Crore", val: 15000000 },
    { label: "₹3.5 Crore", val: 35000000 },
    { label: "₹10 Crore", val: 100000000 }
  ];

  const handleDownloadDossier = () => {
    playSuccessSound();
    triggerConfetti();
    window.print();
  };

  return (
    <div
      id="portfolio-simulator"
      style={{
        background: "linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(24, 24, 60, 0.98))",
        border: "1.5px solid rgba(99, 102, 241, 0.35)",
        borderRadius: "var(--radius-xl)",
        padding: "clamp(24px, 4vw, 44px)",
        color: "#ffffff",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 30px rgba(99, 102, 241, 0.15)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Decorative Atmospheric Glow */}
      <div
        style={{
          position: "absolute",
          top: "-160px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(99, 102, 241, 0.25) 0%, transparent 75%)",
          pointerEvents: "none"
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "36px",
          flexWrap: "wrap",
          gap: "20px",
          position: "relative",
          zIndex: 2
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "var(--radius-full)",
                background: "linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(99, 102, 241, 0.25))",
                color: "#fbbf24",
                fontSize: "0.82rem",
                fontWeight: 900,
                border: "1px solid rgba(245, 158, 11, 0.4)"
              }}
            >
              <Sparkles size={14} />
              AI SOVEREIGN WEALTH & WEALTH MATRIX
            </span>
            <span style={{ fontSize: "0.82rem", color: "#94a3b8" }}>
              • Pan-India Real Estate Yield Model 2026–2031
            </span>
          </div>

          <h2 style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", margin: "4px 0", letterSpacing: "-0.5px" }}>
            AI Pan-India Real Estate Portfolio Simulator
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1rem", margin: 0, maxWidth: "720px", lineHeight: 1.5 }}>
            Simulate your capital compounding, passive rental cash flow, and Union Budget Section 54 tax exemptions across India's top metropolitan and mega airport growth corridors.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={handleDownloadDossier}
            className="btn btn-outline btn-sm"
            style={{ color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.3)", gap: "6px" }}
          >
            <Download size={15} />
            <span>Print Wealth Dossier</span>
          </button>

          <a
            href={`https://wa.me/918809604880?text=${encodeURIComponent(
              `Namaste Sanjay ji! I simulated a ₹${(corpus / 10000000).toFixed(2)} Cr portfolio on EstateHub with ${horizonYears}-Year horizon (Projected Wealth: ${formatPrice(
                simulation.totalPortfolioWealth
              )}). Please arrange a 1-on-1 private sovereign advisory consultation.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-sm"
            style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              borderColor: "#10b981",
              gap: "6px",
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)"
            }}
          >
            <span>Consult Founder Sanjay Desk</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "28px",
          position: "relative",
          zIndex: 2,
          marginBottom: "32px"
        }}
      >
        {/* Left Column: Sliders & Allocation Controls */}
        <div
          style={{
            background: "rgba(30, 41, 59, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "var(--radius-lg)",
            padding: "24px",
            backdropFilter: "blur(12px)"
          }}
        >
          {/* Target Capital Input */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "#cbd5e1" }}>
                Target Investment Corpus
              </label>
              <span style={{ fontSize: "1.45rem", fontWeight: 900, color: "#38bdf8" }}>
                {formatPrice(corpus)}
              </span>
            </div>

            <input
              type="range"
              min="2500000"
              max="200000000"
              step="500000"
              value={corpus}
              onChange={(e) => {
                playClickSound();
                setCorpus(Number(e.target.value));
              }}
              style={{
                width: "100%",
                accentColor: "#38bdf8",
                cursor: "pointer",
                height: "6px"
              }}
            />

            {/* Quick Corpus Presets */}
            <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
              {presetCorpus.map((preset) => (
                <button
                  key={preset.val}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setCorpus(preset.val);
                  }}
                  style={{
                    padding: "4px 12px",
                    borderRadius: "var(--radius-full)",
                    background: corpus === preset.val ? "#38bdf8" : "rgba(255, 255, 255, 0.08)",
                    color: corpus === preset.val ? "#0f172a" : "#cbd5e1",
                    border: "none",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.15s"
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Investment Horizon Buttons */}
          <div style={{ marginBottom: "26px" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "#cbd5e1", marginBottom: "8px" }}>
              Compounding Horizon
            </label>
            <div style={{ display: "flex", gap: "8px" }}>
              {[3, 5, 7, 10].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setHorizonYears(yr);
                  }}
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: "var(--radius-md)",
                    background: horizonYears === yr ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "rgba(255, 255, 255, 0.06)",
                    color: "#ffffff",
                    border: "1px solid",
                    borderColor: horizonYears === yr ? "#818cf8" : "rgba(255, 255, 255, 0.1)",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    cursor: "pointer"
                  }}
                >
                  {yr} Years
                </button>
              ))}
            </div>
          </div>

          {/* Multi-Corridor Allocation Sliders */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "4px" }}>
                <span style={{ color: "#93c5fd", fontWeight: 700 }}>
                  🏢 Tier-1 Prime Metros (Mumbai & BLR)
                </span>
                <strong style={{ color: "#ffffff" }}>{metroPercent}% (₹{(corpus * metroPercent / 1000000000).toFixed(2)} Cr)</strong>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={metroPercent}
                onChange={(e) => handleMetroChange(e.target.value)}
                style={{ width: "100%", accentColor: "#60a5fa" }}
              />
              <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                12.5% Target CAGR • Sovereign title security & steady absorption
              </span>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "4px" }}>
                <span style={{ color: "#fde047", fontWeight: 700 }}>
                  🛫 Mega Growth Corridors (Darbhanga & Jewar Airports)
                </span>
                <strong style={{ color: "#ffffff" }}>{corridorPercent}% (₹{(corpus * corridorPercent / 1000000000).toFixed(2)} Cr)</strong>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={corridorPercent}
                onChange={(e) => handleCorridorChange(e.target.value)}
                style={{ width: "100%", accentColor: "#facc15" }}
              />
              <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                21.0% Target CAGR • Mithila / Darbhanga Airport & MTHL infrastructure boom
              </span>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "4px" }}>
                <span style={{ color: "#86efac", fontWeight: 700 }}>
                  🏬 High-Yield Commercial & Co-Living
                </span>
                <strong style={{ color: "#ffffff" }}>{commercialPercent}% (₹{(corpus * commercialPercent / 1000000000).toFixed(2)} Cr)</strong>
              </div>
              <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: "2px" }}>
                7.8% Gross Rental Yield • Monthly tech-tenant distributions
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: High-Impact Projected Outputs Card */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(30, 27, 75, 0.85), rgba(15, 23, 42, 0.95))",
            border: "1.5px solid rgba(245, 158, 11, 0.4)",
            borderRadius: "var(--radius-lg)",
            padding: "26px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 12px 36px rgba(0,0,0,0.5)"
          }}
        >
          <div>
            <span style={{ fontSize: "0.75rem", color: "#fbbf24", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1px" }}>
              INSTITUTIONAL COMPOUNDED WEALTH OUTCOME ({horizonYears} YEARS)
            </span>

            <div style={{ marginTop: "10px", marginBottom: "18px" }}>
              <div style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", fontWeight: 900, color: "#10b981", lineHeight: 1.1 }}>
                {formatPrice(simulation.totalPortfolioWealth)}
              </div>
              <span style={{ fontSize: "0.88rem", color: "#94a3b8", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#10b981", fontWeight: 800 }}>+{simulation.blendedCagr}% Blended CAGR</span>
                <span>• {simulation.netRoiMultiplier}x Net Wealth Expansion</span>
              </span>
            </div>

            {/* Breakdown Highlights */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "20px" }}>
              <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "12px", borderRadius: "var(--radius-md)" }}>
                <span style={{ fontSize: "0.72rem", color: "#94a3b8", display: "block" }}>
                  Cumulative Rental Cash Flow
                </span>
                <strong style={{ fontSize: "1.15rem", color: "#38bdf8" }}>
                  +{formatPrice(simulation.cumulativeRent)}
                </strong>
                <span style={{ fontSize: "0.7rem", color: "#64748b", display: "block", marginTop: "2px" }}>
                  ≈ {formatPrice(simulation.monthlyRentalCashflow)} / month
                </span>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "12px", borderRadius: "var(--radius-md)" }}>
                <span style={{ fontSize: "0.72rem", color: "#94a3b8", display: "block" }}>
                  Net Capital Appreciation
                </span>
                <strong style={{ fontSize: "1.15rem", color: "#fbbf24" }}>
                  +{formatPrice(simulation.totalCapitalGain)}
                </strong>
                <span style={{ fontSize: "0.7rem", color: "#64748b", display: "block", marginTop: "2px" }}>
                  Compounded asset valuation
                </span>
              </div>
            </div>

            {/* Union Budget Tax Shield Alert */}
            <div
              style={{
                background: "rgba(16, 185, 129, 0.12)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                borderRadius: "var(--radius-md)",
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px"
              }}
            >
              <ShieldCheck size={22} color="#10b981" style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ fontSize: "0.82rem", color: "#10b981", display: "block" }}>
                  Union Budget Sec 54/54EC Capital Gains Shield: {formatPrice(simulation.taxSavedUnderSec54)} Saved
                </strong>
                <span style={{ fontSize: "0.72rem", color: "#cbd5e1" }}>
                  100% tax liability offset when re-invested into certified RERA residences within 24 months.
                </span>
              </div>
            </div>
          </div>

          {/* Multi-Asset Head-to-Head Comparison Bar */}
          <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.12)", paddingTop: "14px" }}>
            <span style={{ fontSize: "0.74rem", color: "#94a3b8", display: "block", marginBottom: "8px" }}>
              {horizonYears}-Year Compounded Value vs Alternative Asset Classes:
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", textAlign: "center" }}>
              <div style={{ background: "rgba(255, 255, 255, 0.04)", padding: "8px", borderRadius: "6px" }}>
                <span style={{ fontSize: "0.7rem", color: "#94a3b8", display: "block" }}>Nifty 50</span>
                <strong style={{ fontSize: "0.84rem", color: "#cbd5e1" }}>{formatPrice(simulation.niftyFutureValue)}</strong>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.04)", padding: "8px", borderRadius: "6px" }}>
                <span style={{ fontSize: "0.7rem", color: "#94a3b8", display: "block" }}>Physical Gold</span>
                <strong style={{ fontSize: "0.84rem", color: "#cbd5e1" }}>{formatPrice(simulation.goldFutureValue)}</strong>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.04)", padding: "8px", borderRadius: "6px" }}>
                <span style={{ fontSize: "0.7rem", color: "#94a3b8", display: "block" }}>Bank Fixed Deposit</span>
                <strong style={{ fontSize: "0.84rem", color: "#cbd5e1" }}>{formatPrice(simulation.fdFutureValue)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SovereignPortfolioSimulator;
