import React, { useState, useMemo } from "react";
import { TrendingUp, Percent, IndianRupee, BarChart3, ShieldCheck } from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";

export const InvestmentCalculator = ({ propertyPrice = 7500000 }) => {
  const { formatPrice } = usePropertyContext();

  // Default expected rent is ~3% annual yield divided by 12
  const [monthlyRent, setMonthlyRent] = useState(Math.round((propertyPrice * 0.035) / 12));
  const [appreciationRate, setAppreciationRate] = useState(8.5); // 8.5% annual capital appreciation
  const [annualExpenses, setAnnualExpenses] = useState(35000); // maintenance, insurance, tax

  const { grossYield, netAnnualIncome, futureVal5Yrs, totalGain5Yrs, roiPercent } = useMemo(() => {
    const annualRent = Number(monthlyRent) * 12;
    const price = Number(propertyPrice);

    if (price <= 0) return { grossYield: 0, netAnnualIncome: 0, futureVal5Yrs: 0, totalGain5Yrs: 0, roiPercent: 0 };

    const gYield = ((annualRent / price) * 100).toFixed(2);
    const netIncome = annualRent - Number(annualExpenses);

    // 5 Year Future Valuation: P * (1 + r)^5
    const r = Number(appreciationRate) / 100;
    const futureVal = Math.round(price * Math.pow(1 + r, 5));
    const capitalGain = futureVal - price;
    const fiveYearNetRental = netIncome * 5;
    const totGain = capitalGain + fiveYearNetRental;
    const roi = ((totGain / price) * 100).toFixed(1);

    return {
      grossYield: gYield,
      netAnnualIncome: netIncome,
      futureVal5Yrs: futureVal,
      totalGain5Yrs: totGain,
      roiPercent: roi
    };
  }, [propertyPrice, monthlyRent, appreciationRate, annualExpenses]);

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-lg)",
        padding: "28px",
        boxShadow: "var(--shadow-sm)"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            background: "var(--accent-gold-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--accent-gold)"
          }}
        >
          <TrendingUp size={20} />
        </div>
        <div>
          <h3 style={{ fontSize: "1.25rem", margin: 0 }}>Investment ROI & Rental Yield Calculator</h3>
          <p style={{ fontSize: "0.85rem", margin: 0, color: "var(--text-secondary)" }}>
            Forecast expected rental income, capital appreciation, and 5-year portfolio returns
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "24px" }}>
        {/* Expected Monthly Rent */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Expected Monthly Rent</label>
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--accent-primary)" }}>
              ₹{monthlyRent.toLocaleString("en-IN")} / mo
            </span>
          </div>
          <input
            type="range"
            min="10000"
            max="350000"
            step="2000"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--accent-primary)" }}
          />
        </div>

        {/* Expected Annual Appreciation % */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Capital Growth Rate</label>
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--accent-emerald)" }}>
              {appreciationRate}% p.a.
            </span>
          </div>
          <input
            type="range"
            min="3.0"
            max="16.0"
            step="0.5"
            value={appreciationRate}
            onChange={(e) => setAppreciationRate(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--accent-emerald)" }}
          />
        </div>

        {/* Annual Maintenance / Tax */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Annual Tax & Maintenance</label>
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-secondary)" }}>
              ₹{annualExpenses.toLocaleString("en-IN")} / yr
            </span>
          </div>
          <input
            type="range"
            min="5000"
            max="120000"
            step="5000"
            value={annualExpenses}
            onChange={(e) => setAnnualExpenses(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--accent-primary)" }}
          />
        </div>
      </div>

      {/* Yield & 5-Year Return Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "16px",
          background: "var(--bg-secondary)",
          padding: "18px",
          borderRadius: "var(--radius-md)",
          marginBottom: "20px"
        }}
      >
        <div>
          <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>
            Gross Rental Yield
          </span>
          <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--accent-emerald)" }}>
            {grossYield}%
          </div>
        </div>

        <div>
          <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>
            Net Annual Rent
          </span>
          <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)" }}>
            ₹{netAnnualIncome.toLocaleString("en-IN")}
          </div>
        </div>

        <div>
          <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>
            Est. 5-Yr Valuation
          </span>
          <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--accent-primary)" }}>
            {formatPrice(futureVal5Yrs)}
          </div>
        </div>

        <div>
          <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>
            5-Yr Total ROI
          </span>
          <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--accent-gold)" }}>
            +{roiPercent}%
          </div>
        </div>
      </div>

      {/* Union Budget Tax Intelligence Strip */}
      <div
        style={{
          background: "rgba(15, 23, 42, 0.04)",
          border: "1px dashed var(--border-focus)",
          borderRadius: "12px",
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px"
        }}
      >
        <div>
          <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
            <span>🇮🇳 Union Budget 12.5% LTCG Tax Shield</span>
            <span style={{ fontSize: "0.68rem", background: "var(--accent-gold-light)", color: "var(--accent-gold)", padding: "2px 6px", borderRadius: "4px" }}>Sec 54 / 54EC Eligible</span>
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "2px" }}>
            Estimated Capital Gains Tax on 5-yr exit: <strong>₹{Math.round((futureVal5Yrs - propertyPrice) * 0.125).toLocaleString("en-IN")}</strong> (Can be 100% exempted under Section 54 reinvestment).
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.74rem", color: "var(--text-secondary)" }}>Sec 24(a) 30% Standard Deduction</div>
          <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "var(--accent-emerald)" }}>
            ₹{Math.round(netAnnualIncome * 0.30).toLocaleString("en-IN")} Tax-Free Rent/Yr
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
