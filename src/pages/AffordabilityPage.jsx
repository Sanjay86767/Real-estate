import React, { useState } from "react";
import {
  Calculator,
  ShieldCheck,
  Building2,
  Percent,
  CheckCircle2,
  FileCheck2,
  Award,
  ArrowRight,
  TrendingDown,
  Info,
  HelpCircle,
  Landmark
} from "lucide-react";
import AffordabilityCalculator from "../components/AffordabilityCalculator";
import { usePropertyContext } from "../context/PropertyContext";
import { playClickSound } from "../utils/effects";

// Major Bank Loan Interest Rates Benchmarks
const BANK_RATES = [
  { bank: "State Bank of India (SBI)", rate: "8.35% - 8.90%", maxLtv: "85%", fee: "0.35% (Max ₹10k)", prepay: "Nil", rating: "4.9" },
  { bank: "HDFC Bank Home Loans", rate: "8.40% - 9.15%", maxLtv: "80%", fee: "0.50% (Max ₹15k)", prepay: "Nil", rating: "4.9" },
  { bank: "ICICI Bank Home Finance", rate: "8.45% - 9.20%", maxLtv: "80%", fee: "0.50%", prepay: "Nil", rating: "4.8" },
  { bank: "Kotak Mahindra Bank", rate: "8.35% - 8.85%", maxLtv: "85%", fee: "0.30%", prepay: "Nil", rating: "4.8" },
  { bank: "Axis Bank Home Loans", rate: "8.50% - 9.30%", maxLtv: "80%", fee: "₹10,000 Flat", prepay: "Nil", rating: "4.7" }
];

// State-wise Stamp Duty & Registration Rates
const STATE_STAMP_DUTIES = [
  { state: "Bihar (Patna / Darbhanga)", male: "6.0%", female: "5.7%", joint: "5.8%", regFee: "2.0% Flat" },
  { state: "Maharashtra (Mumbai / Pune)", male: "6.0%", female: "5.0%", joint: "5.5%", regFee: "₹30,000 Flat" },
  { state: "Delhi NCR", male: "6.0%", female: "4.0%", joint: "5.0%", regFee: "1.0% + ₹100" },
  { state: "Karnataka (Bangalore)", male: "5.0%", female: "5.0%", joint: "5.0%", regFee: "1.0%" },
  { state: "Goa (Beach Villas)", male: "4.0%", female: "3.5%", joint: "3.8%", regFee: "₹25,000 Flat" },
  { state: "Chandigarh (UT)", male: "8.0%", female: "6.0%", joint: "7.0%", regFee: "₹15,000 Flat" },
  { state: "Punjab (Mohali / Amritsar)", male: "7.0%", female: "6.0%", joint: "6.5%", regFee: "1.0%" },
  { state: "Haryana (Gurugram / Panchkula)", male: "7.0%", female: "5.0%", joint: "6.0%", regFee: "₹50,000 Flat" }
];

export const AffordabilityPage = () => {
  const { formatPrice } = usePropertyContext();

  // Stamp Duty Calculator State
  const [propertyCost, setPropertyCost] = useState(12500000); // 1.25 Cr
  const [selectedState, setSelectedState] = useState(STATE_STAMP_DUTIES[0]);
  const [gender, setGender] = useState("male");

  const getStampRate = () => {
    if (gender === "female") return parseFloat(selectedState.female);
    if (gender === "joint") return parseFloat(selectedState.joint);
    return parseFloat(selectedState.male);
  };

  const stampDutyAmount = Math.round(propertyCost * (getStampRate() / 100));
  const estimatedRegFee = selectedState.regFee.includes("%")
    ? Math.round(propertyCost * 0.01)
    : 25000;
  const totalGovtCharges = stampDutyAmount + estimatedRegFee;

  return (
    <div className="affordability-page" style={{ padding: "40px 0 90px", background: "var(--bg-primary)" }}>
      <div className="container">
        {/* Page Hero Header */}
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 50px" }}>
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
            <Landmark size={15} />
            FINANCIAL INTELLIGENCE HUB
          </div>
          <h1 style={{ fontSize: "2.6rem", marginBottom: "14px" }}>
            Home Buying Power & Mortgage Hub
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: "1.7" }}>
            Calculate your exact home loan qualification, compare benchmark APR rates across India's top banks, and compute state-wise stamp duty taxes.
          </p>
        </div>

        {/* 1. Main Interactive Affordability Calculator */}
        <AffordabilityCalculator />

        {/* 2. Top Bank Comparison Matrix */}
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h3 style={{ fontSize: "1.4rem", margin: 0 }}>Prime Bank Home Loan Rate Comparison</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: "4px 0 0" }}>
                Updated daily with real-time repo-linked lending rates (RLLR).
              </p>
            </div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "var(--radius-full)",
                background: "var(--accent-emerald-light)",
                color: "var(--accent-emerald)",
                fontSize: "0.78rem",
                fontWeight: 700
              }}
            >
              <CheckCircle2 size={14} /> Zero Prepayment Penalties
            </span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.92rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border-light)", color: "var(--text-muted)" }}>
                  <th style={{ padding: "14px 16px" }}>Lending Institution</th>
                  <th style={{ padding: "14px 16px" }}>Benchmark APR Rate</th>
                  <th style={{ padding: "14px 16px" }}>Max LTV Ratio</th>
                  <th style={{ padding: "14px 16px" }}>Processing Fee</th>
                  <th style={{ padding: "14px 16px" }}>Borrower Rating</th>
                </tr>
              </thead>
              <tbody>
                {BANK_RATES.map((b, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid var(--border-light)", transition: "var(--transition)" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 700 }}>{b.bank}</td>
                    <td style={{ padding: "14px 16px", fontWeight: 800, color: "var(--accent-primary)" }}>{b.rate}</td>
                    <td style={{ padding: "14px 16px", color: "var(--text-secondary)" }}>{b.maxLtv}</td>
                    <td style={{ padding: "14px 16px", color: "var(--text-secondary)" }}>{b.fee}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ background: "rgba(245, 158, 11, 0.15)", color: "var(--accent-gold)", padding: "2px 8px", borderRadius: "var(--radius-full)", fontWeight: 700, fontSize: "0.8rem" }}>
                        ★ {b.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. State-Wise Stamp Duty & Registration Tax Calculator */}
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
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "1.4rem", margin: 0 }}>State-Wise Stamp Duty & Registration Estimator</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: "4px 0 0" }}>
              Compute official government registry expenses based on property jurisdiction and ownership gender concession.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "32px", alignItems: "start" }} className="stamp-calc-grid">
            {/* Left Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "6px" }}>
                  Select Property State / Region
                </label>
                <select
                  value={selectedState.state}
                  onChange={(e) => {
                    playClickSound();
                    const st = STATE_STAMP_DUTIES.find((s) => s.state === e.target.value);
                    if (st) setSelectedState(st);
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-light)",
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "0.95rem"
                  }}
                >
                  {STATE_STAMP_DUTIES.map((s, idx) => (
                    <option key={idx} value={s.state}>{s.state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "6px" }}>
                  Registered Property Consideration Value
                </label>
                <input
                  type="range"
                  min="2000000"
                  max="50000000"
                  step="500000"
                  value={propertyCost}
                  onChange={(e) => setPropertyCost(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--accent-primary)" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Cost:</span>
                  <strong style={{ color: "var(--accent-primary)", fontSize: "1.1rem" }}>{formatPrice(propertyCost)}</strong>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                  Primary Property Title Holder
                </label>
                <div style={{ display: "flex", gap: "10px" }}>
                  {[
                    { id: "female", label: "Female Owner (Concessional)", rate: selectedState.female },
                    { id: "male", label: "Male Owner", rate: selectedState.male },
                    { id: "joint", label: "Joint Ownership", rate: selectedState.joint }
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => { playClickSound(); setGender(g.id); }}
                      style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: "var(--radius-md)",
                        background: gender === g.id ? "var(--accent-primary)" : "var(--bg-secondary)",
                        color: gender === g.id ? "#ffffff" : "var(--text-primary)",
                        border: "1px solid",
                        borderColor: gender === g.id ? "var(--accent-primary)" : "var(--border-light)",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        cursor: "pointer"
                      }}
                    >
                      <div>{g.label}</div>
                      <strong style={{ fontSize: "0.88rem" }}>{g.rate}</strong>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Summary */}
            <div
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-lg)",
                padding: "24px"
              }}
            >
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                Estimated Statutory Expense
              </span>
              <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "var(--accent-primary)", margin: "4px 0 14px" }}>
                {formatPrice(totalGovtCharges)}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "var(--bg-surface)", borderRadius: "var(--radius-sm)" }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Stamp Duty ({getStampRate()}%)</span>
                  <strong style={{ fontSize: "0.95rem" }}>{formatPrice(stampDutyAmount)}</strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "var(--bg-surface)", borderRadius: "var(--radius-sm)" }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Registration & Court Fees</span>
                  <strong style={{ fontSize: "0.95rem" }}>{formatPrice(estimatedRegFee)}</strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "var(--bg-surface)", borderRadius: "var(--radius-sm)" }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Total Out-Of-Pocket Acquisition</span>
                  <strong style={{ fontSize: "0.95rem", color: "var(--accent-emerald)" }}>{formatPrice(propertyCost + totalGovtCharges)}</strong>
                </div>
              </div>

              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: "1.5" }}>
                💡 Tip: Women buyers in {selectedState.state} enjoy a 1% to 2% discount on stamp duties, saving up to {formatPrice(propertyCost * 0.02)} on registry.
              </div>
            </div>
          </div>
        </div>

        {/* 4. Tax Savings & Benefits Accordion / Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px"
          }}
        >
          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-lg)", padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent-primary)", marginBottom: "10px" }}>
              <Percent size={20} />
              <h4 style={{ margin: 0, fontSize: "1.05rem" }}>Section 24(b) Deduction</h4>
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
              Deduct up to <strong>₹2,00,000</strong> per financial year on home loan interest paid for self-occupied residential property.
            </p>
          </div>

          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-lg)", padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent-emerald)", marginBottom: "10px" }}>
              <ShieldCheck size={20} />
              <h4 style={{ margin: 0, fontSize: "1.05rem" }}>Section 80C Benefit</h4>
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
              Claim up to <strong>₹1,50,000</strong> tax deduction towards the principal repayment of your home loan and paid stamp duty.
            </p>
          </div>

          <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-lg)", padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent-gold)", marginBottom: "10px" }}>
              <Award size={20} />
              <h4 style={{ margin: 0, fontSize: "1.05rem" }}>Joint Home Loan Advantage</h4>
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
              Co-borrowers (spouse or parents) can double their combined tax deductions up to <strong>₹7,00,000</strong> annually!
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .stamp-calc-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AffordabilityPage;
