import React, { useState, useMemo } from "react";
import { Calculator, IndianRupee, Percent, Calendar } from "lucide-react";

export const EmiCalculator = ({ initialPrice = 7500000 }) => {
  // Default loan amount to 80% of property price
  const [loanAmount, setLoanAmount] = useState(Math.round(initialPrice * 0.8));
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

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
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="emi-widget">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            background: "var(--accent-primary-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--accent-primary)"
          }}
        >
          <Calculator size={20} />
        </div>
        <div>
          <h3 style={{ fontSize: "1.25rem", margin: 0 }}>Home Loan & EMI Estimator</h3>
          <p style={{ fontSize: "0.85rem", margin: 0, color: "var(--text-secondary)" }}>
            Calculate your estimated monthly installment with prevailing bank interest rates
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
        {/* Loan Amount */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Loan Amount</label>
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--accent-primary)" }}>
              {formatCurrency(loanAmount)}
            </span>
          </div>
          <input
            type="range"
            min="500000"
            max="40000000"
            step="100000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--accent-primary)" }}
          />
        </div>

        {/* Interest Rate */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Interest Rate (% p.a.)</label>
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--accent-primary)" }}>
              {interestRate}%
            </span>
          </div>
          <input
            type="range"
            min="6.5"
            max="14.0"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--accent-primary)" }}
          />
        </div>

        {/* Loan Tenure */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Loan Tenure</label>
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--accent-primary)" }}>
              {tenureYears} Years
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            step="1"
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--accent-primary)" }}
          />
        </div>
      </div>

      {/* Visual Split Bar */}
      <div className="emi-split-bar">
        <div
          className="emi-split-principal"
          style={{ width: `${principalPercent}%` }}
          title={`Principal: ${principalPercent}%`}
        />
        <div
          className="emi-split-interest"
          style={{ width: `${interestPercent}%` }}
          title={`Interest: ${interestPercent}%`}
        />
      </div>

      {/* Calculations Summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "16px",
          background: "var(--bg-secondary)",
          padding: "16px",
          borderRadius: "var(--radius-md)"
        }}
      >
        <div>
          <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>
            Monthly EMI
          </span>
          <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--accent-primary)" }}>
            {formatCurrency(monthlyEmi)}
          </div>
        </div>

        <div>
          <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>
            Total Interest
          </span>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent-gold)" }}>
            {formatCurrency(totalInterest)}
          </div>
        </div>

        <div>
          <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>
            Total Payable
          </span>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
            {formatCurrency(totalPayment)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;
