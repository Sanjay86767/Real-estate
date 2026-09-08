import React from "react";
import SovereignPortfolioSimulator from "../components/SovereignPortfolioSimulator";
import { Sparkles, TrendingUp, ShieldCheck } from "lucide-react";

export const PortfolioSimulatorPage = () => {
  return (
    <div style={{ padding: "40px 0 80px", minHeight: "85vh", background: "var(--bg-primary)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 14px",
              borderRadius: "var(--radius-full)",
              background: "linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(99, 102, 241, 0.2))",
              color: "#fbbf24",
              fontSize: "0.82rem",
              fontWeight: 800,
              marginBottom: "8px"
            }}
          >
            <Sparkles size={14} />
            INSTITUTIONAL ASSET ALLOCATION STUDIO
          </div>
          <h1 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", margin: "4px 0" }}>
            Pan-India Real Estate Wealth Simulator
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "600px", margin: "0 auto" }}>
            Calculate 5-year compounded capital appreciation, monthly passive cashflow, and Section 54 tax exemptions.
          </p>
        </div>

        <SovereignPortfolioSimulator />
      </div>
    </div>
  );
};

export default PortfolioSimulatorPage;
