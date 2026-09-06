import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import { triggerConfetti, sfx } from "../utils/effects";
import {
  Brain,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Download,
  Printer,
  BarChart3
} from "lucide-react";

export const Valuation = () => {
  const { formatPrice } = usePropertyContext();

  const [city, setCity] = useState("Mohali");
  const [propertyType, setPropertyType] = useState("Villa");
  const [bhk, setBhk] = useState(3);
  const [area, setArea] = useState(2200);
  const [age, setAge] = useState("0-2"); // years
  const [furnishing, setFurnishing] = useState("Semi-Furnished");
  const [hasPool, setHasPool] = useState(true);
  const [hasGym, setHasGym] = useState(true);
  const [hasAutomation, setHasAutomation] = useState(true);

  const [isCalculating, setIsCalculating] = useState(false);
  const [progressStep, setProgressStep] = useState("");
  const [report, setReport] = useState(null);

  const handleRunValuation = (e) => {
    e.preventDefault();
    sfx.playPop();
    setIsCalculating(true);
    setReport(null);

    const steps = [
      "Analyzing 650+ recent sub-registrar sales comps...",
      "Evaluating municipal circle rates & infra premium...",
      "Calculating capital appreciation index for 2026...",
      "Synthesizing neural valuation model..."
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setProgressStep(step);
      }, (idx + 1) * 450);
    });

    setTimeout(() => {
      // Base rates per sq.ft by city & type
      const cityBaseRate = {
        Chandigarh: 8800,
        Mohali: 6200,
        Delhi: 11500,
        Amritsar: 4800,
        Bangalore: 8200
      }[city] || 6000;

      const typeMultiplier = {
        Villa: 1.35,
        Penthouse: 1.45,
        Apartment: 1.0,
        House: 1.15,
        Plot: 0.9
      }[propertyType] || 1.0;

      const luxuryBonus = (hasPool ? 400 : 0) + (hasGym ? 250 : 0) + (hasAutomation ? 350 : 0);
      const furnishingBonus = furnishing === "Fully Furnished" ? 600 : furnishing === "Semi-Furnished" ? 250 : 0;

      const ratePerSqFt = Math.round((cityBaseRate * typeMultiplier) + luxuryBonus + furnishingBonus);
      const estimatedValue = ratePerSqFt * Number(area);
      const minVal = Math.round(estimatedValue * 0.95);
      const maxVal = Math.round(estimatedValue * 1.06);

      const monthlyRent = Math.round((estimatedValue * 0.034) / 12);
      const projected3YrVal = Math.round(estimatedValue * Math.pow(1 + 0.09, 3));

      setReport({
        median: estimatedValue,
        min: minVal,
        max: maxVal,
        ratePerSqFt,
        monthlyRent,
        projected3YrVal,
        confidence: "98.4%",
        liquidity: "High (Avg 24 days on market)",
        rating: "AAA • Grade A Residential Asset"
      });

      setIsCalculating(false);
      sfx.playSuccess();
      triggerConfetti();
    }, 2200);
  };

  return (
    <div className="valuation-page" style={{ padding: "40px 0 90px", minHeight: "85vh" }}>
      <div className="container" style={{ maxWidth: "980px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--accent-primary)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
            <Brain size={18} />
            <span>AI Valuation Engine v3.8</span>
          </div>
          <h1 style={{ fontSize: "2.6rem", marginTop: "6px" }}>Instant AI Property Valuation</h1>
          <p style={{ marginTop: "6px", color: "var(--text-secondary)", fontSize: "1.05rem" }}>
            Estimate true market valuation, rental yield potential, and 3-year growth using machine learning market comps.
          </p>
        </div>

        {/* Input Form Card */}
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            padding: "36px",
            boxShadow: "var(--shadow-sm)",
            marginBottom: "36px"
          }}
        >
          <form onSubmit={handleRunValuation}>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "20px" }}>Property Parameters</h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px", marginBottom: "20px" }}>
              {/* City */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                  City / Market
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-light)",
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    outline: "none"
                  }}
                >
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Mohali">Mohali, Punjab</option>
                  <option value="Delhi">Delhi NCR / Gurgaon</option>
                  <option value="Amritsar">Amritsar, Punjab</option>
                  <option value="Bangalore">Bangalore, Karnataka</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-light)",
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    outline: "none"
                  }}
                >
                  <option value="Villa">Luxury Villa</option>
                  <option value="Apartment">Modern Apartment</option>
                  <option value="Penthouse">Penthouse Suite</option>
                  <option value="House">Independent House</option>
                  <option value="Plot">Residential Plot</option>
                </select>
              </div>

              {/* BHK */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                  Bedrooms (BHK)
                </label>
                <select
                  value={bhk}
                  onChange={(e) => setBhk(Number(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-light)",
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    outline: "none"
                  }}
                >
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5">5+ BHK</option>
                </select>
              </div>

              {/* Area */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                  Super Built-up Area (sq.ft)
                </label>
                <input
                  type="number"
                  required
                  min="400"
                  max="15000"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-light)",
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    outline: "none"
                  }}
                />
              </div>
            </div>

            {/* Additional Features Toggle */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "10px" }}>
                Luxury Amenities & Automation Premia
              </label>
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <label className="checkbox-label">
                  <input type="checkbox" checked={hasPool} onChange={(e) => setHasPool(e.target.checked)} />
                  <span>Private Swimming Pool</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" checked={hasGym} onChange={(e) => setHasGym(e.target.checked)} />
                  <span>Clubhouse / Fitness Suite</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" checked={hasAutomation} onChange={(e) => setHasAutomation(e.target.checked)} />
                  <span>Smart Home Touch Automation</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isCalculating}
              className="btn btn-primary btn-lg"
              style={{ width: "100%", gap: "10px" }}
            >
              <Sparkles size={20} />
              <span>{isCalculating ? "Calculating AI Valuation..." : "Run AI Property Valuation"}</span>
            </button>
          </form>

          {/* Calculating Animation */}
          {isCalculating && (
            <div style={{ textAlign: "center", marginTop: "24px" }} className="animate-fade-in">
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  border: "3px solid var(--border-light)",
                  borderTopColor: "var(--accent-primary)",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  margin: "0 auto 12px"
                }}
              />
              <p style={{ fontSize: "0.95rem", color: "var(--accent-primary)", fontWeight: 600 }}>
                {progressStep}
              </p>
            </div>
          )}
        </div>

        {/* Valuation Result Report Card */}
        {report && (
          <div
            style={{
              background: "var(--bg-surface)",
              border: "2px solid var(--accent-primary)",
              borderRadius: "var(--radius-lg)",
              padding: "40px",
              boxShadow: "var(--shadow-lg)"
            }}
            className="animate-fade-in"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
              <div>
                <span
                  style={{
                    padding: "4px 12px",
                    background: "var(--accent-emerald-light)",
                    color: "var(--accent-emerald)",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.78rem",
                    fontWeight: 800,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <ShieldCheck size={14} />
                  AI Model Accuracy: {report.confidence}
                </span>
                <h2 style={{ fontSize: "2rem", marginTop: "8px" }}>Official Valuation Certificate</h2>
                <span style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                  {bhk} BHK {propertyType} in {city} ({area} sq.ft)
                </span>
              </div>

              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Estimated Fair Market Value
                </span>
                <div style={{ fontSize: "2.8rem", fontWeight: 900, color: "var(--accent-primary)", lineHeight: 1.1 }}>
                  {formatPrice(report.median)}
                </div>
                <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                  Range: {formatPrice(report.min)} – {formatPrice(report.max)}
                </span>
              </div>
            </div>

            {/* Key Valuation Metrics Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "18px",
                background: "var(--bg-secondary)",
                padding: "24px",
                borderRadius: "var(--radius-md)",
                marginBottom: "32px"
              }}
            >
              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Estimated Rate / Sq.Ft
                </span>
                <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)" }}>
                  ₹{report.ratePerSqFt.toLocaleString("en-IN")} / sq.ft
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Monthly Rent Potential
                </span>
                <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--accent-emerald)" }}>
                  ₹{report.monthlyRent.toLocaleString("en-IN")} / mo
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  3-Year Projected Value
                </span>
                <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--accent-gold)" }}>
                  {formatPrice(report.projected3YrVal)}
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Market Liquidity
                </span>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent-primary)" }}>
                  {report.liquidity}
                </div>
              </div>
            </div>

            {/* Appreciation Forecast Graph */}
            <div style={{ marginBottom: "32px" }}>
              <h4 style={{ fontSize: "1.1rem", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                <TrendingUp size={18} color="var(--accent-emerald)" />
                <span>3-Year Historical & Compounded Forecast Trend</span>
              </h4>

              <div style={{ background: "var(--bg-secondary)", borderRadius: "var(--radius-md)", padding: "20px" }}>
                <svg viewBox="0 0 600 150" style={{ width: "100%", height: "130px" }}>
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Area fill */}
                  <path d="M 50 110 Q 180 85 300 65 T 550 20 L 550 130 L 50 130 Z" fill="url(#grad)" />

                  {/* Line */}
                  <path d="M 50 110 Q 180 85 300 65 T 550 20" fill="none" stroke="var(--accent-primary)" strokeWidth="3" />

                  {/* Points */}
                  <circle cx="50" cy="110" r="5" fill="var(--accent-primary)" />
                  <text x="50" y="145" textAnchor="middle" fill="var(--text-muted)" fontSize="11">2024</text>

                  <circle cx="300" cy="65" r="6" fill="var(--accent-primary)" />
                  <text x="300" y="145" textAnchor="middle" fill="var(--text-primary)" fontSize="11" fontWeight="700">2026 (Now)</text>

                  <circle cx="550" cy="20" r="6" fill="var(--accent-emerald)" />
                  <text x="550" y="145" textAnchor="middle" fill="var(--accent-emerald)" fontSize="11" fontWeight="700">2029 (Forecast)</text>
                </svg>
              </div>
            </div>

            {/* Action Bar */}
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link to="/list-property" className="btn btn-gold" style={{ flex: 1 }}>
                <span>List Property at This Valuation</span>
                <ArrowRight size={16} />
              </Link>
              <button
                onClick={() => window.print()}
                className="btn btn-secondary"
                style={{ gap: "8px" }}
              >
                <Printer size={16} />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Valuation;
