import React, { useState } from "react";
import {
  Calculator,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  FileCheck2,
  Award,
  DollarSign,
  ChevronRight,
  ExternalLink,
  Printer,
  X
} from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";
import { playClickSound, playSuccessSound, triggerConfetti } from "../utils/effects";
import { Link } from "react-router-dom";

export const AffordabilityCalculator = () => {
  const { formatPrice, currency, properties } = usePropertyContext();

  // Inputs
  const [monthlyIncome, setMonthlyIncome] = useState(250000); // 2.5L
  const [existingEmi, setExistingEmi] = useState(30000);
  const [downPayment, setDownPayment] = useState(4000000); // 40L
  const [creditScore, setCreditScore] = useState(780);
  const [tenureYears, setTenureYears] = useState(20);

  // Modal for Pre-Approval Letter
  const [showCertificate, setShowCertificate] = useState(false);

  // Calculations
  // Interest rate benchmark based on credit score
  let interestRate = 8.35;
  if (creditScore >= 800) interestRate = 8.25;
  else if (creditScore < 720) interestRate = 8.85;

  // Max EMI allowable (FOIR ~ 50% of income minus existing EMIs)
  const maxAllowableEmi = Math.max(0, monthlyIncome * 0.5 - existingEmi);

  // Reverse calculate loan amount from EMI
  // P = E * ((1+r)^n - 1) / (r * (1+r)^n)
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const numerator = Math.pow(1 + monthlyRate, totalMonths) - 1;
  const denominator = monthlyRate * Math.pow(1 + monthlyRate, totalMonths);
  const maxLoanAmount = Math.round(maxAllowableEmi * (numerator / denominator));

  // Total Buying Power = Max Loan + Down Payment
  const totalBuyingBudget = maxLoanAmount + downPayment;

  // DTI (Debt-to-Income) ratio
  const totalMonthlyDebt = existingEmi + maxAllowableEmi;
  const dtiRatio = Math.round((totalMonthlyDebt / monthlyIncome) * 100);

  // Matching properties from catalog
  const matchingProperties = properties.filter(
    (p) => p.price <= totalBuyingBudget && p.price >= totalBuyingBudget * 0.4
  ).slice(0, 3);

  const handleGenerateCertificate = () => {
    playSuccessSound();
    triggerConfetti();
    setShowCertificate(true);
  };

  return (
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
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "3px 10px",
                borderRadius: "var(--radius-full)",
                background: "var(--accent-emerald-light)",
                color: "var(--accent-emerald)",
                fontSize: "0.75rem",
                fontWeight: 800
              }}
            >
              <FileCheck2 size={13} />
              AI BANKING ALGORITHM
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>• RBI Compliant Lending Models</span>
          </div>
          <h3 style={{ fontSize: "1.6rem", margin: 0 }}>Home Buying Affordability & Pre-Approval Analyzer</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", margin: "4px 0 0" }}>
            Discover your maximum qualified purchasing power based on verified income, debt capacity, and bank underwriting benchmarks.
          </p>
        </div>

        <button
          onClick={handleGenerateCertificate}
          className="btn btn-gold btn-sm"
          style={{ gap: "6px", padding: "10px 18px", fontWeight: 700 }}
        >
          <Award size={16} />
          <span>Get Instant Pre-Approval Letter</span>
        </button>
      </div>

      {/* Main Grid: Inputs + Results Dashboard */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "36px",
          alignItems: "start"
        }}
        className="affordability-grid"
      >
        {/* Left: Input Sliders */}
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          {/* Monthly Income */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>Monthly Net In-Hand Income</span>
              <strong style={{ fontSize: "1.05rem", color: "var(--accent-primary)" }}>
                {formatPrice(monthlyIncome)} / mo
              </strong>
            </div>
            <input
              type="range"
              min="50000"
              max="1500000"
              step="25000"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--accent-primary)" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
              <span>₹50,000</span>
              <span>₹7.5 Lakh</span>
              <span>₹15 Lakh+</span>
            </div>
          </div>

          {/* Existing EMIs */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>Existing Monthly Debts & EMIs</span>
              <strong style={{ fontSize: "1.05rem", color: "var(--accent-rose)" }}>
                {formatPrice(existingEmi)} / mo
              </strong>
            </div>
            <input
              type="range"
              min="0"
              max="300000"
              step="5000"
              value={existingEmi}
              onChange={(e) => setExistingEmi(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--accent-rose)" }}
            />
          </div>

          {/* Down Payment Savings */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>Available Down Payment Savings</span>
              <strong style={{ fontSize: "1.05rem", color: "var(--accent-emerald)" }}>
                {formatPrice(downPayment)}
              </strong>
            </div>
            <input
              type="range"
              min="500000"
              max="20000000"
              step="200000"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--accent-emerald)" }}
            />
          </div>

          {/* Credit Score & Tenure in 2 columns */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "6px" }}>
                CIBIL / Experian Score: <strong>{creditScore}</strong>
              </label>
              <input
                type="range"
                min="650"
                max="850"
                step="10"
                value={creditScore}
                onChange={(e) => setCreditScore(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--accent-gold)" }}
              />
              <span style={{ fontSize: "0.75rem", color: creditScore >= 750 ? "var(--accent-emerald)" : "var(--accent-gold)" }}>
                {creditScore >= 750 ? "✓ Prime Tier (8.35% Rate)" : "Standard Tier (8.85% Rate)"}
              </span>
            </div>

            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "6px" }}>
                Loan Tenure: <strong>{tenureYears} Years</strong>
              </label>
              <select
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-light)",
                  background: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem"
                }}
              >
                <option value={10}>10 Years</option>
                <option value={15}>15 Years</option>
                <option value={20}>20 Years (Recommended)</option>
                <option value={25}>25 Years</option>
                <option value={30}>30 Years</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right: Results Card */}
        <div
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            padding: "24px",
            boxShadow: "var(--shadow-sm)"
          }}
        >
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
            Estimated Buying Capacity
          </span>
          <div style={{ fontSize: "2.3rem", fontWeight: 900, color: "var(--accent-primary)", margin: "4px 0 12px", lineHeight: 1.1 }}>
            {formatPrice(totalBuyingBudget)}
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
            The total property purchase price you can comfortably afford with bank financing and your saved down payment.
          </p>

          {/* Breakdown Pills */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "var(--bg-surface)", borderRadius: "var(--radius-sm)" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Max Loan Eligibility</span>
              <strong style={{ fontSize: "0.95rem" }}>{formatPrice(maxLoanAmount)}</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "var(--bg-surface)", borderRadius: "var(--radius-sm)" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Your Down Payment</span>
              <strong style={{ fontSize: "0.95rem" }}>{formatPrice(downPayment)}</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "var(--bg-surface)", borderRadius: "var(--radius-sm)" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Max Qualified Monthly EMI</span>
              <strong style={{ fontSize: "0.95rem", color: "var(--accent-emerald)" }}>{formatPrice(maxAllowableEmi)} / mo</strong>
            </div>

            {/* DTI Gauge */}
            <div style={{ padding: "12px 14px", background: "var(--bg-surface)", borderRadius: "var(--radius-sm)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Debt-To-Income (DTI) Health</span>
                <strong style={{ fontSize: "0.85rem", color: dtiRatio <= 45 ? "var(--accent-emerald)" : "var(--accent-rose)" }}>
                  {dtiRatio}% ({dtiRatio <= 45 ? "Safe Healthy Tier" : "Tight Debt Profile"})
                </strong>
              </div>
              <div style={{ width: "100%", height: "6px", background: "var(--border-light)", borderRadius: "3px", overflow: "hidden" }}>
                <div
                  style={{
                    width: `${Math.min(100, dtiRatio)}%`,
                    height: "100%",
                    background: dtiRatio <= 45 ? "var(--accent-emerald)" : "var(--accent-rose)",
                    transition: "width 0.3s ease"
                  }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerateCertificate}
            className="btn btn-primary"
            style={{ width: "100%", gap: "8px" }}
          >
            <ShieldCheck size={18} />
            <span>View Verified Pre-Approval Letter</span>
          </button>
        </div>
      </div>

      {/* Matched Properties under this budget */}
      {matchingProperties.length > 0 && (
        <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid var(--border-light)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h4 style={{ margin: 0, fontSize: "1.1rem" }}>
              Live Properties Within Your {formatPrice(totalBuyingBudget)} Budget
            </h4>
            <Link to="/properties" style={{ fontSize: "0.85rem", color: "var(--accent-primary)", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
              <span>View all matching inventory</span>
              <ChevronRight size={15} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
            {matchingProperties.map((prop) => (
              <Link
                key={prop.id}
                to={`/property/${prop.id}`}
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "10px",
                  background: "var(--bg-secondary)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-light)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "var(--transition)"
                }}
              >
                <img
                  src={prop.images[0]}
                  alt={prop.title}
                  style={{ width: "70px", height: "70px", borderRadius: "var(--radius-sm)", objectFit: "cover" }}
                />
                <div>
                  <strong style={{ fontSize: "0.88rem", display: "block", marginBottom: "2px" }}>{prop.title}</strong>
                  <span style={{ fontSize: "0.85rem", color: "var(--accent-primary)", fontWeight: 700 }}>
                    {formatPrice(prop.price)}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>
                    {prop.city} • {prop.bedrooms > 0 ? `${prop.bedrooms} BHK` : "Plot"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Pre-Approval Certificate Modal */}
      {showCertificate && (
        <div className="modal-backdrop" onClick={() => setShowCertificate(false)}>
          <div
            className="modal-container"
            style={{
              maxWidth: "600px",
              padding: "36px",
              background: "#ffffff",
              color: "#0f172a",
              borderRadius: "var(--radius-xl)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.3)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "#059669", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Award size={24} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.3rem", color: "#0f172a" }}>EstateHub Pre-Approval Letter</h3>
                  <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Verified Financial Eligibility • Valid 90 Days
                  </span>
                </div>
              </div>
              <button onClick={() => setShowCertificate(false)} className="btn-icon" style={{ color: "#64748b" }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ border: "2px solid #e2e8f0", borderRadius: "10px", padding: "20px", marginBottom: "20px", background: "#f8fafc" }}>
              <div style={{ textAlign: "center", paddingBottom: "16px", borderBottom: "1px dashed #cbd5e1", marginBottom: "16px" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                  Pre-Approved Maximum Purchase Capability
                </span>
                <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#2563eb", marginTop: "4px" }}>
                  {formatPrice(totalBuyingBudget)}
                </div>
                <span style={{ fontSize: "0.85rem", color: "#059669", fontWeight: 600 }}>
                  ✓ Loan Underwrite Approved up to {formatPrice(maxLoanAmount)}
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "0.85rem" }}>
                <div>
                  <span style={{ color: "#64748b" }}>Borrower Credit Score:</span>
                  <div style={{ fontWeight: 700, color: "#0f172a" }}>{creditScore} (Prime Tier)</div>
                </div>
                <div>
                  <span style={{ color: "#64748b" }}>Benchmark APR:</span>
                  <div style={{ fontWeight: 700, color: "#0f172a" }}>{interestRate}% p.a.</div>
                </div>
                <div>
                  <span style={{ color: "#64748b" }}>Max Qualified EMI:</span>
                  <div style={{ fontWeight: 700, color: "#0f172a" }}>{formatPrice(maxAllowableEmi)} / mo</div>
                </div>
                <div>
                  <span style={{ color: "#64748b" }}>Tenure Horizon:</span>
                  <div style={{ fontWeight: 700, color: "#0f172a" }}>{tenureYears} Years</div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: "1.6", marginBottom: "20px" }}>
              This pre-approval certificate is honored across EstateHub partner lending consortiums including HDFC Bank, SBI Global, and ICICI Home Finance. Sellers prioritize buyers with verified pre-qualification.
            </p>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => window.print()}
                className="btn btn-primary"
                style={{ flex: 1, gap: "6px", background: "#2563eb" }}
              >
                <Printer size={16} />
                <span>Print Certificate</span>
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="btn btn-secondary"
                style={{ padding: "10px 18px", color: "#0f172a" }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 850px) {
          .affordability-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AffordabilityCalculator;
