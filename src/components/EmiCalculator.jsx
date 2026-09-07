import React, { useState, useMemo } from "react";
import { Calculator, IndianRupee, Percent, Calendar, ShieldCheck, Sparkles, Building, Landmark, PhoneCall } from "lucide-react";

export const EmiCalculator = ({ initialPrice = 7500000 }) => {
  const maxCalculatedLoan = Math.max(initialPrice * 1.2, 500000000); // Up to 50 Cr for luxury estates
  const [loanAmount, setLoanAmount] = useState(Math.round(initialPrice * 0.8));
  const [interestRate, setInterestRate] = useState(8.35);
  const [tenureYears, setTenureYears] = useState(20);

  const bankPresets = [
    { name: "SBI", rate: 8.35, desc: "Sovereign Low Rate" },
    { name: "HDFC", rate: 8.40, desc: "Fast Digital Sanction" },
    { name: "ICICI", rate: 8.45, desc: "Express Disbursement" },
    { name: "Kotak", rate: 8.35, desc: "Competitive Spread" }
  ];

  const tenurePresets = [10, 15, 20, 25, 30];

  const { monthlyEmi, totalInterest, totalPayment, principalPercent, interestPercent } = useMemo(() => {
    const p = Number(loanAmount);
    const r = Number(interestRate) / 12 / 100;
    const n = Number(tenureYears) * 12;

    if (p <= 0 || r <= 0 || n <= 0) {
      return { monthlyEmi: 0, totalInterest: 0, totalPayment: 0, principalPercent: 100, interestPercent: 0 };
    }

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emi * n;
    const totInterest = totalPay - p;

    const pPerc = Math.round((p / totalPay) * 100);
    const iPerc = 100 - pPerc;

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totInterest),
      totalPayment: Math.round(totalPay),
      principalPercent: pPerc,
      interestPercent: iPerc
    };
  }, [loanAmount, interestRate, tenureYears]);

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} Lakh`;
    }
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);
  };

  const downPayment = Math.max(0, initialPrice - loanAmount);

  return (
    <div
      className="emi-widget"
      style={{
        background: "var(--bg-surface)",
        border: "1.5px solid var(--border-light)",
        borderRadius: "var(--radius-xl)",
        padding: "28px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease"
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 4px 15px rgba(37, 99, 235, 0.35)",
              flexShrink: 0
            }}
          >
            <Calculator size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, margin: 0 }}>
              Institutional Home Loan & Mortgage Estimator
            </h3>
            <p style={{ fontSize: "0.85rem", margin: "2px 0 0", color: "var(--text-secondary)" }}>
              Real-time RBI benchmark repo linked rates across India's top lending banks
            </p>
          </div>
        </div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "4px 12px", borderRadius: "20px" }}>
          <ShieldCheck size={14} color="#10b981" />
          <span style={{ fontSize: "0.76rem", fontWeight: 800, color: "#10b981" }}>RBI Repo Linked Benchmark</span>
        </div>
      </div>

      {/* Quick Bank Presets */}
      <div style={{ marginBottom: "22px" }}>
        <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px", display: "block" }}>
          Popular Bank Rate Benchmarks:
        </span>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {bankPresets.map((b) => {
            const isSelected = interestRate === b.rate;
            return (
              <button
                key={b.name}
                type="button"
                onClick={() => setInterestRate(b.rate)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  background: isSelected ? "linear-gradient(135deg, #2563eb, #1d4ed8)" : "var(--bg-secondary)",
                  color: isSelected ? "#ffffff" : "var(--text-primary)",
                  border: isSelected ? "1px solid #3b82f6" : "1px solid var(--border-light)",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s ease"
                }}
              >
                <span>{b.name}</span>
                <span style={{ color: isSelected ? "#ffffff" : "var(--accent-primary)", fontWeight: 800 }}>
                  {b.rate}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sliders Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "24px" }}>
        {/* Loan Amount Slider */}
        <div style={{ background: "var(--bg-secondary)", padding: "16px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <label style={{ fontSize: "0.86rem", fontWeight: 700 }}>Loan Required</label>
            <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "var(--accent-primary)" }}>
              {formatCurrency(loanAmount)}
            </span>
          </div>
          <input
            type="range"
            min="500000"
            max={maxCalculatedLoan}
            step="100000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--accent-primary)", height: "6px", borderRadius: "3px", cursor: "pointer" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", fontSize: "0.72rem", color: "var(--text-muted)" }}>
            <span>Min: ₹5 Lakh</span>
            <span>Down Payment: {formatCurrency(downPayment)}</span>
            <span>Max: {formatCurrency(maxCalculatedLoan)}</span>
          </div>
        </div>

        {/* Interest Rate Slider */}
        <div style={{ background: "var(--bg-secondary)", padding: "16px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <label style={{ fontSize: "0.86rem", fontWeight: 700 }}>Interest Rate (% p.a.)</label>
            <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "var(--accent-primary)" }}>
              {interestRate}%
            </span>
          </div>
          <input
            type="range"
            min="6.5"
            max="14.0"
            step="0.05"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--accent-primary)", height: "6px", borderRadius: "3px", cursor: "pointer" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", fontSize: "0.72rem", color: "var(--text-muted)" }}>
            <span>6.5% (Lowest)</span>
            <span>Current: {interestRate}%</span>
            <span>14.0% (Max)</span>
          </div>
        </div>

        {/* Tenure Slider & Presets */}
        <div style={{ background: "var(--bg-secondary)", padding: "16px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <label style={{ fontSize: "0.86rem", fontWeight: 700 }}>Loan Tenure</label>
            <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "var(--accent-primary)" }}>
              {tenureYears} Years ({tenureYears * 12} mo)
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            step="1"
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--accent-primary)", height: "6px", borderRadius: "3px", cursor: "pointer" }}
          />
          <div style={{ display: "flex", gap: "6px", marginTop: "10px", flexWrap: "wrap" }}>
            {tenurePresets.map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => setTenureYears(yr)}
                style={{
                  padding: "3px 8px",
                  borderRadius: "6px",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  background: tenureYears === yr ? "var(--accent-primary)" : "var(--bg-surface)",
                  color: tenureYears === yr ? "#ffffff" : "var(--text-secondary)",
                  border: "1px solid var(--border-light)",
                  cursor: "pointer"
                }}
              >
                {yr}Y
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Split Bar */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 700, marginBottom: "6px" }}>
          <span style={{ color: "var(--accent-primary)" }}>● Principal Loan: {principalPercent}%</span>
          <span style={{ color: "#d97706" }}>● Total Interest: {interestPercent}%</span>
        </div>
        <div style={{ display: "flex", height: "10px", borderRadius: "10px", overflow: "hidden", background: "var(--bg-secondary)" }}>
          <div
            style={{ width: `${principalPercent}%`, background: "linear-gradient(90deg, #2563eb, #3b82f6)", transition: "width 0.3s ease" }}
            title={`Principal Loan: ${principalPercent}%`}
          />
          <div
            style={{ width: `${interestPercent}%`, background: "linear-gradient(90deg, #f59e0b, #d97706)", transition: "width 0.3s ease" }}
            title={`Total Interest: ${interestPercent}%`}
          />
        </div>
      </div>

      {/* Summary KPI Result Box */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.98))",
          padding: "24px",
          borderRadius: "var(--radius-xl)",
          color: "#ffffff",
          boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
          border: "1px solid rgba(245, 158, 11, 0.3)"
        }}
      >
        <div>
          <span style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.5px" }}>
            Estimated Monthly EMI
          </span>
          <div style={{ fontSize: "2rem", fontWeight: 900, color: "#38bdf8", lineHeight: 1.1, marginTop: "4px" }}>
            {formatCurrency(monthlyEmi)}/mo
          </div>
          <span style={{ fontSize: "0.74rem", color: "#cbd5e1", marginTop: "4px", display: "block" }}>
            Tax deductible under Sec 24 & 80C
          </span>
        </div>

        <div>
          <span style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.5px" }}>
            Total Interest Payable
          </span>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fbbf24", lineHeight: 1.1, marginTop: "4px" }}>
            {formatCurrency(totalInterest)}
          </div>
          <span style={{ fontSize: "0.74rem", color: "#94a3b8", marginTop: "4px", display: "block" }}>
            Over {tenureYears} Years
          </span>
        </div>

        <div>
          <span style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.5px" }}>
            Total Amount (P + I)
          </span>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#ffffff", lineHeight: 1.1, marginTop: "4px" }}>
            {formatCurrency(totalPayment)}
          </div>
          <a
            href="https://wa.me/918809604880?text=Hello%20Sanjay%20ji,%20I%20need%20priority%20home%20loan%20pre-approval%20assistance."
            target="_blank"
            rel="noreferrer"
            className="btn btn-gold btn-sm"
            style={{ marginTop: "8px", width: "100%", textDecoration: "none" }}
          >
            <PhoneCall size={13} />
            <span>Instant Loan Advisory</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;
