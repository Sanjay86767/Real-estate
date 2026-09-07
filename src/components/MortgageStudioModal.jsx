import React, { useState, useMemo } from "react";
import {
  Calculator,
  Percent,
  Calendar,
  Building,
  CheckCircle2,
  Download,
  Printer,
  X,
  Sparkles,
  ArrowRight,
  TrendingDown
} from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";

export const MortgageStudioModal = ({ property, onClose }) => {
  const { formatPrice, addToast } = usePropertyContext();

  const propertyPrice = property?.price || 10000000;
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [tenureYears, setTenureYears] = useState(20);
  const [selectedBank, setSelectedBank] = useState("sbi");

  const bankRates = {
    sbi: { name: "State Bank of India (SBI MaxGain)", rate: 8.40, fee: "0.25%", desc: "Government backed, lowest interest, overdraft option" },
    hdfc: { name: "HDFC Bank Home Loans", rate: 8.50, fee: "0.30%", desc: "Express 48-hour digital sanction, flexible repayments" },
    icici: { name: "ICICI Bank Extra Home Loan", rate: 8.65, fee: "0.25%", desc: "Pre-approved sanction letter, 30-year maximum tenure" },
  };

  const downPayment = (propertyPrice * downPaymentPercent) / 100;
  const principal = propertyPrice - downPayment;
  const interestRate = bankRates[selectedBank].rate;

  // Monthly EMI calculation
  const { monthlyEmi, totalInterest, totalPayable } = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const total = emi * totalMonths;
    const interest = total - principal;
    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(interest),
      totalPayable: Math.round(total),
    };
  }, [principal, interestRate, tenureYears]);

  const [sanctionGenerated, setSanctionGenerated] = useState(false);

  const handleGenerateSanction = () => {
    setSanctionGenerated(true);
    addToast("Provisional Bank Pre-Approval Sanction Letter Generated! 📄", "success");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(10px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "760px",
          maxHeight: "92vh",
          background: "var(--bg-card, #0f172a)",
          border: "1.5px solid rgba(59, 130, 246, 0.4)",
          borderRadius: "18px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(59, 130, 246, 0.2)",
          color: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.12), transparent)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <Calculator size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800 }}>
                Mortgage Structuring & Bank Desk
              </h3>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#93c5fd" }}>
                Live Interest Rates • Principal Amortization • Bank Sanction Letters
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: "transparent", border: "none", color: "#9ca3af", cursor: "pointer", padding: "6px" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "24px", overflowY: "auto", flex: 1 }}>
          {/* Top Monthly EMI Result */}
          <div
            style={{
              background: "linear-gradient(135deg, #1e3a8a, #0f172a)",
              border: "1.5px solid rgba(59, 130, 246, 0.4)",
              borderRadius: "14px",
              padding: "22px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <span style={{ fontSize: "0.8rem", color: "#93c5fd", textTransform: "uppercase", fontWeight: 800 }}>
                Estimated Monthly Repayment (EMI)
              </span>
              <div style={{ fontSize: "2.6rem", fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>
                ₹{monthlyEmi.toLocaleString("en-IN")}{" "}
                <span style={{ fontSize: "1rem", color: "#93c5fd", fontWeight: 600 }}>/ month</span>
              </div>
              <div style={{ fontSize: "0.85rem", color: "#cbd5e1", marginTop: "4px" }}>
                Loan Amount: <strong>{formatPrice(principal)}</strong> @ {interestRate}% for {tenureYears} Years
              </div>
            </div>

            <button
              onClick={handleGenerateSanction}
              style={{
                padding: "12px 20px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #d4af37, #aa820a)",
                border: "none",
                color: "#000",
                fontWeight: 800,
                fontSize: "0.88rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 15px rgba(212, 175, 55, 0.3)",
              }}
            >
              <Sparkles size={16} />
              <span>Get Bank Sanction Letter</span>
            </button>
          </div>

          {/* Bank Selector Chips */}
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "10px" }}>
            Select Preferred Lending Partner:
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "24px" }}>
            {Object.entries(bankRates).map(([key, b]) => (
              <div
                key={key}
                onClick={() => setSelectedBank(key)}
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  border: selectedBank === key ? "2px solid #3b82f6" : "1px solid rgba(255,255,255,0.08)",
                  background: selectedBank === key ? "rgba(59, 130, 246, 0.12)" : "rgba(255,255,255,0.02)",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>{b.name.split(" ")[0]}</span>
                  <span style={{ fontSize: "0.95rem", fontWeight: 900, color: "#3b82f6" }}>{b.rate}%</span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "#9ca3af", marginTop: "4px" }}>{b.desc}</div>
              </div>
            ))}
          </div>

          {/* Sliders Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
            {/* Down Payment Slider */}
            <div style={{ padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.85rem" }}>
                <span style={{ color: "#cbd5e1", fontWeight: 600 }}>Down Payment ({downPaymentPercent}%)</span>
                <strong style={{ color: "#d4af37" }}>{formatPrice(downPayment)}</strong>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#d4af37", cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#9ca3af", marginTop: "4px" }}>
                <span>10% (Min)</span>
                <span>20% (Standard)</span>
                <span>50%</span>
              </div>
            </div>

            {/* Tenure Slider */}
            <div style={{ padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.85rem" }}>
                <span style={{ color: "#cbd5e1", fontWeight: 600 }}>Loan Duration</span>
                <strong style={{ color: "#3b82f6" }}>{tenureYears} Years ({tenureYears * 12} Months)</strong>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={5}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#3b82f6", cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#9ca3af", marginTop: "4px" }}>
                <span>5 Yrs</span>
                <span>20 Yrs</span>
                <span>30 Yrs</span>
              </div>
            </div>
          </div>

          {/* Amortization Summary */}
          <div
            style={{
              padding: "16px",
              background: "#090d16",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "14px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>PRINCIPAL LOAN</span>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginTop: "2px" }}>
                {formatPrice(principal)}
              </div>
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>TOTAL INTEREST PAYABLE</span>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#f59e0b", marginTop: "2px" }}>
                {formatPrice(totalInterest)}
              </div>
            </div>
            <div>
              <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>TOTAL AMOUNT PAYABLE</span>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#10b981", marginTop: "2px" }}>
                {formatPrice(totalPayable)}
              </div>
            </div>
          </div>

          {/* Sanction Letter View */}
          {sanctionGenerated && (
            <div
              id="bank-sanction-letter"
              style={{
                background: "#08101e",
                border: "2px solid #d4af37",
                borderRadius: "12px",
                padding: "20px",
                marginTop: "16px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div>
                  <span style={{ background: "rgba(16, 185, 129, 0.2)", color: "#10b981", padding: "2px 8px", borderRadius: "8px", fontSize: "0.75rem", fontWeight: 800 }}>
                    PROVISIONAL PRE-APPROVAL SANCTION
                  </span>
                  <h4 style={{ margin: "8px 0 2px", fontSize: "1.15rem", color: "#fff" }}>
                    In-Principle Home Loan Sanction Letter
                  </h4>
                  <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                    Partner: <strong>{bankRates[selectedBank].name}</strong> • Ref: #SANCTION-2026-BANK-7721
                  </div>
                </div>
                <button
                  onClick={handlePrint}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Printer size={14} />
                  <span>Print Sanction Letter</span>
                </button>
              </div>

              <div style={{ fontSize: "0.82rem", color: "#cbd5e1", lineHeight: 1.6, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "12px" }}>
                This is to certify that based on initial portfolio valuation, a provisional loan facility of{" "}
                <strong style={{ color: "#d4af37" }}>{formatPrice(principal)}</strong> at an indicative interest rate of{" "}
                <strong>{interestRate}% p.a.</strong> has been pre-approved for the acquisition of{" "}
                <strong>"{property?.title || 'Subject Property'}"</strong>.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MortgageStudioModal;
