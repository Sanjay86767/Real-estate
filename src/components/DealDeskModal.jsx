import React, { useState, useMemo, useRef } from "react";
import {
  X,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Award,
  FileText,
  Printer,
  CheckCircle2,
  AlertCircle,
  Clock,
  Building,
  DollarSign,
  ArrowRight,
  Download,
  Share2
} from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";

export const DealDeskModal = ({ property, onClose }) => {
  const { formatPrice, currency, submitOffer, user, addToast, t } = usePropertyContext();

  const askingPrice = property?.price || 15000000;
  // Default offer 5% below asking
  const [offerPrice, setOfferPrice] = useState(Math.round(askingPrice * 0.95));
  const [earnestDeposit, setEarnestDeposit] = useState(Math.round(askingPrice * 0.10));
  const [timelineDays, setTimelineDays] = useState(30);
  const [financingType, setFinancingType] = useState("pre_approved_loan"); // 'cash' | 'pre_approved_loan' | 'applying_loan'
  const [contingencies, setContingencies] = useState({
    reraTitleCheck: true,
    structuralSurvey: true,
    homeLoanSanction: true
  });
  const [buyerName, setBuyerName] = useState(user?.name || "");
  const [buyerEmail, setBuyerEmail] = useState(user?.email || "");
  const [buyerPhone, setBuyerPhone] = useState(user?.phone || "");
  const [generatedLoi, setGeneratedLoi] = useState(null);
  const loiPrintRef = useRef(null);

  // AI Probability Calculation
  const analysis = useMemo(() => {
    const discountPercent = ((askingPrice - offerPrice) / askingPrice) * 100;
    const depositPercent = (earnestDeposit / offerPrice) * 100;

    let score = 75; // base probability

    if (discountPercent <= 0) {
      score += 20; // Full or above asking price
    } else if (discountPercent <= 4) {
      score += 15;
    } else if (discountPercent <= 8) {
      score += 5;
    } else if (discountPercent <= 15) {
      score -= 15;
    } else {
      score -= 35;
    }

    // Faster timeline bonus
    if (timelineDays <= 21) score += 10;
    else if (timelineDays > 45) score -= 8;

    // Earnest deposit bonus
    if (depositPercent >= 15) score += 8;
    else if (depositPercent < 7) score -= 10;

    // Financing bonus
    if (financingType === "cash") score += 12;
    else if (financingType === "pre_approved_loan") score += 6;
    else score -= 8;

    const clampedScore = Math.min(Math.max(score, 18), 98);

    let sentiment = "Highly Competitive";
    let sentimentColor = "#10b981";
    let tip = "Your proposal is in the top 10% sweet spot. Sellers generally accept offers with high token commitment.";

    if (clampedScore < 50) {
      sentiment = "Aggressive Discount (High Rejection Risk)";
      sentimentColor = "#ef4444";
      tip = "Offer is significantly below market valuation. Consider raising offer by 3-5% or offering a quicker 21-day closing.";
    } else if (clampedScore < 75) {
      sentiment = "Moderate / Balanced Offer";
      sentimentColor = "#f59e0b";
      tip = "Strong starting point for counter-negotiations. Pre-approved loan sanction gives you extra leverage.";
    }

    return {
      discountPercent: discountPercent.toFixed(1),
      depositPercent: depositPercent.toFixed(1),
      probability: clampedScore,
      sentiment,
      sentimentColor,
      tip
    };
  }, [askingPrice, offerPrice, earnestDeposit, timelineDays, financingType]);

  const handleSubmitOffer = (e) => {
    e.preventDefault();
    if (!buyerName.trim() || !buyerEmail.trim() || !buyerPhone.trim()) {
      addToast("Please provide your name, email and contact phone", "warning");
      return;
    }

    const offerPayload = {
      propertyId: property.id,
      propertyTitle: property.title,
      propertyLocation: property.location,
      askingPrice,
      offerPrice,
      earnestDeposit,
      timeline: `${timelineDays} Days`,
      financingType,
      buyerName,
      buyerEmail,
      buyerPhone,
      probability: `${analysis.probability}%`,
      contingencies
    };

    const newOffer = submitOffer(offerPayload);
    setGeneratedLoi(newOffer);
  };

  const handlePrintLoi = () => {
    window.print();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(15, 23, 42, 0.8)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        overflowY: "auto"
      }}
    >
      <div
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-xl)",
          maxWidth: "850px",
          width: "100%",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          position: "relative"
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, rgba(217, 119, 6, 0.12), rgba(245, 158, 11, 0.04))"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #d97706, #fbbf24)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0f172a",
                boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)"
              }}
            >
              <Sparkles size={22} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800 }}>
                  AI Deal Desk & Digital Term Sheet
                </h3>
                <span
                  style={{
                    background: "rgba(16, 185, 129, 0.15)",
                    color: "#10b981",
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    padding: "2px 8px",
                    borderRadius: "20px"
                  }}
                >
                  RERA COMPLIANT
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                Negotiate directly on <strong>{property?.title}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-secondary)",
              padding: "6px"
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        {!generatedLoi ? (
          <form onSubmit={handleSubmitOffer} style={{ padding: "24px" }}>
            {/* Top Stat Summary Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "14px",
                marginBottom: "20px"
              }}
            >
              <div
                style={{
                  background: "var(--bg-main)",
                  padding: "14px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-light)"
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Listed Asking Price
                </span>
                <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--text-primary)" }}>
                  {formatPrice(askingPrice)}
                </div>
              </div>

              <div
                style={{
                  background: "var(--bg-main)",
                  padding: "14px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-light)"
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Your Offer Variance
                </span>
                <div
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: analysis.discountPercent >= 0 ? "#10b981" : "#ef4444"
                  }}
                >
                  {analysis.discountPercent >= 0 ? `-${analysis.discountPercent}%` : `+${Math.abs(analysis.discountPercent)}%`}
                </div>
              </div>

              <div
                style={{
                  background: "var(--bg-main)",
                  padding: "14px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-light)"
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  AI Acceptance Probability
                </span>
                <div
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: analysis.sentimentColor,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <TrendingUp size={18} />
                  <span>{analysis.probability}%</span>
                </div>
              </div>
            </div>

            {/* AI Advisor Badge */}
            <div
              style={{
                background: "rgba(245, 158, 11, 0.08)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                padding: "12px 16px",
                borderRadius: "var(--radius-md)",
                marginBottom: "24px",
                display: "flex",
                alignItems: "flex-start",
                gap: "10px"
              }}
            >
              <Award size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong style={{ color: "#d97706", fontSize: "0.85rem" }}>
                  AI Negotiator Rating: {analysis.sentiment}
                </strong>
                <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                  {analysis.tip}
                </p>
              </div>
            </div>

            {/* Negotiation Sliders */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "24px" }}>
              {/* Slider 1: Offer Price */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ fontSize: "0.88rem", fontWeight: 700 }}>
                    Proposed Offer Price
                  </label>
                  <span style={{ fontWeight: 800, color: "var(--accent-primary)", fontSize: "1rem" }}>
                    {formatPrice(offerPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min={Math.round(askingPrice * 0.75)}
                  max={Math.round(askingPrice * 1.15)}
                  step={50000}
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--accent-gold)", cursor: "pointer" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "3px" }}>
                  <span>Min: {formatPrice(Math.round(askingPrice * 0.75))} (-25%)</span>
                  <span>Asking: {formatPrice(askingPrice)}</span>
                  <span>Max: {formatPrice(Math.round(askingPrice * 1.15))} (+15%)</span>
                </div>
              </div>

              {/* Slider 2: Earnest Token Deposit */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ fontSize: "0.88rem", fontWeight: 700 }}>
                    Earnest Token Booking Deposit ({analysis.depositPercent}%)
                  </label>
                  <span style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "0.95rem" }}>
                    {formatPrice(earnestDeposit)}
                  </span>
                </div>
                <input
                  type="range"
                  min={Math.round(offerPrice * 0.02)}
                  max={Math.round(offerPrice * 0.30)}
                  step={25000}
                  value={earnestDeposit}
                  onChange={(e) => setEarnestDeposit(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#10b981", cursor: "pointer" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "3px" }}>
                  <span>2% (Basic Token)</span>
                  <span>10% (Standard Formal)</span>
                  <span>30% (VIP Fast-Track Priority)</span>
                </div>
              </div>

              {/* Slider 3: Desired Registry Timeline */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ fontSize: "0.88rem", fontWeight: 700 }}>
                    Desired Registry & Final Settlement Window
                  </label>
                  <span style={{ fontWeight: 800, color: "#3b82f6", fontSize: "0.95rem" }}>
                    {timelineDays} Calendar Days
                  </span>
                </div>
                <input
                  type="range"
                  min={14}
                  max={90}
                  step={7}
                  value={timelineDays}
                  onChange={(e) => setTimelineDays(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#3b82f6", cursor: "pointer" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "3px" }}>
                  <span>14 Days (Ultra-Fast)</span>
                  <span>30-45 Days (Standard Loan Window)</span>
                  <span>90 Days (Flexible)</span>
                </div>
              </div>
            </div>

            {/* Financing Type */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "0.88rem", fontWeight: 700, display: "block", marginBottom: "8px" }}>
                Buyer Funding Mechanism
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
                {[
                  { id: "cash", label: "Full Own Funds / Wire", sub: "Fastest acceptance" },
                  { id: "pre_approved_loan", label: "Pre-Approved Home Loan", sub: "Bank letter available" },
                  { id: "applying_loan", label: "Applying for New Loan", sub: "Subject to sanction" }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFinancingType(item.id)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "var(--radius-md)",
                      border: `1.5px solid ${financingType === item.id ? "var(--accent-gold)" : "var(--border-light)"}`,
                      background: financingType === item.id ? "rgba(245, 158, 11, 0.1)" : "var(--bg-main)",
                      cursor: "pointer",
                      textAlign: "left"
                    }}
                  >
                    <strong style={{ fontSize: "0.82rem", display: "block", color: "var(--text-primary)" }}>
                      {item.label}
                    </strong>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>
                      {item.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Buyer Details Form */}
            <div
              style={{
                background: "var(--bg-main)",
                padding: "16px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-light)",
                marginBottom: "24px"
              }}
            >
              <span style={{ fontSize: "0.82rem", fontWeight: 800, textTransform: "uppercase", color: "var(--accent-gold)", display: "block", marginBottom: "12px" }}>
                Signatory Legal Details
              </span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "0.78rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Singhania"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid var(--border-light)", background: "var(--bg-surface)", color: "var(--text-primary)" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.78rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid var(--border-light)", background: "var(--bg-surface)", color: "var(--text-primary)" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.78rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                    Mobile Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid var(--border-light)", background: "var(--bg-surface)", color: "var(--text-primary)" }}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline"
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-gold"
                style={{ padding: "10px 24px", display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <Sparkles size={16} />
                <span>Submit Offer & Generate LOI</span>
              </button>
            </div>
          </form>
        ) : (
          /* Stamped Digital LOI Document View */
          <div style={{ padding: "24px" }} ref={loiPrintRef}>
            <div
              style={{
                border: "2px solid #d97706",
                borderRadius: "var(--radius-lg)",
                padding: "28px",
                background: "#ffffff",
                color: "#0f172a",
                position: "relative",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
            >
              {/* Watermark Crest */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "2px solid #0f172a",
                  paddingBottom: "16px",
                  marginBottom: "20px"
                }}
              >
                <div>
                  <h2 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 900, color: "#0f172a", letterSpacing: "1px" }}>
                    LETTER OF INTENT (LOI) & TERM SHEET
                  </h2>
                  <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>
                    ESTATEHUB REAL ESTATE ADVISORY • RERA COMPLIANT DISCLOSURE
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#d97706" }}>
                    {generatedLoi.loiCode}
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Date: {generatedLoi.date}</span>
                </div>
              </div>

              {/* Stamped Stamp Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "100px",
                  right: "32px",
                  border: "3px dashed #10b981",
                  borderRadius: "8px",
                  padding: "6px 14px",
                  color: "#10b981",
                  fontWeight: 900,
                  transform: "rotate(-6deg)",
                  fontSize: "0.88rem",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase"
                }}
              >
                ✓ VERIFIED & RECORDED
              </div>

              {/* Property & Parties Table */}
              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px", fontSize: "0.85rem" }}>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "8px 0", color: "#64748b", width: "35%" }}>Property Description</td>
                    <td style={{ padding: "8px 0", fontWeight: 700, color: "#0f172a" }}>
                      {property.title} ({property.bhk || `${property.bedrooms} BHK`}), {property.location}, {property.city}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "8px 0", color: "#64748b" }}>RERA Registration Number</td>
                    <td style={{ padding: "8px 0", fontWeight: 700, color: "#0f172a" }}>
                      {property.reraId || "PRM/KA/RERA/1251/310/PR/2026/00912"}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "8px 0", color: "#64748b" }}>Prospective Buyer</td>
                    <td style={{ padding: "8px 0", fontWeight: 700, color: "#0f172a" }}>
                      {generatedLoi.buyerName} ({generatedLoi.buyerEmail} | {generatedLoi.buyerPhone})
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "8px 0", color: "#64748b" }}>Agreed Offer Price</td>
                    <td style={{ padding: "8px 0", fontWeight: 900, fontSize: "1.1rem", color: "#d97706" }}>
                      {formatPrice(generatedLoi.offerPrice)} (INR)
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "8px 0", color: "#64748b" }}>Committed Token Deposit</td>
                    <td style={{ padding: "8px 0", fontWeight: 700, color: "#0f172a" }}>
                      {formatPrice(generatedLoi.earnestDeposit)} (Escrow Ready)
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "8px 0", color: "#64748b" }}>Settlement & Registry Window</td>
                    <td style={{ padding: "8px 0", fontWeight: 700, color: "#0f172a" }}>
                      {generatedLoi.timeline} from seller acceptance
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "8px 0", color: "#64748b" }}>AI Deal Score Probability</td>
                    <td style={{ padding: "8px 0", fontWeight: 700, color: "#10b981" }}>
                      {generatedLoi.probability} Acceptance Likelihood
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Standard Legal Clauses */}
              <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "6px", fontSize: "0.72rem", color: "#475569", lineHeight: 1.5, marginBottom: "20px" }}>
                <strong>Binding Conditions:</strong> This Letter of Intent establishes a formal expression of interest under the Real Estate (Regulation and Development) Act (RERA). Subject to clean title search, clearance of Encumbrance Certificate (EC), and execution of definitive Agreement for Sale.
              </div>

              {/* Signatures */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px", paddingTop: "15px", borderTop: "1px solid #cbd5e1" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>Buyer Digital Signature</span>
                  <div style={{ fontFamily: "cursive", fontSize: "1.1rem", color: "#0f172a", marginTop: "4px" }}>
                    {generatedLoi.buyerName}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.75rem", color: "#64748b", display: "block" }}>EstateHub Institutional Escrow Desk</span>
                  <div style={{ fontWeight: 800, fontSize: "0.85rem", color: "#d97706", marginTop: "4px" }}>
                    Sanjay Kumar, Lead Advisor
                  </div>
                </div>
              </div>
            </div>

            {/* Post Generation Action Buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", flexWrap: "wrap", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setGeneratedLoi(null)}
                className="btn btn-outline"
              >
                ← Adjust Offer Terms
              </button>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={handlePrintLoi}
                  className="btn btn-secondary"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <Printer size={16} />
                  <span>Print Official LOI</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-gold"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <CheckCircle2 size={16} />
                  <span>View in Dashboard</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealDeskModal;
