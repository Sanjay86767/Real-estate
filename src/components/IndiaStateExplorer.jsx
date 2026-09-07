import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { indianStates, indiaZones } from "../data/indianStates";
import { properties } from "../data/properties";
import {
  MapPin,
  TrendingUp,
  ShieldCheck,
  Building2,
  ArrowRight,
  Sparkles,
  Compass,
  CheckCircle2
} from "lucide-react";

export const IndiaStateExplorer = () => {
  const [activeZone, setActiveZone] = useState("All India");
  const navigate = useNavigate();

  // Filter states by selected zone
  const filteredStates = activeZone === "All India"
    ? indianStates
    : indianStates.filter((s) => s.zone.toLowerCase() === activeZone.toLowerCase());

  // Helper to count available properties per state
  const getPropertyCountForState = (stateName) => {
    return properties.filter((p) => {
      if (!p.state) return false;
      const s = p.state.toLowerCase();
      const target = stateName.toLowerCase();
      return s.includes(target) || target.includes(s);
    }).length;
  };

  return (
    <section className="india-state-explorer-section" id="pan-india-states">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" style={{ maxWidth: "860px", margin: "0 auto 36px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              background: "rgba(217, 119, 6, 0.15)",
              border: "1px solid rgba(217, 119, 6, 0.4)",
              borderRadius: "var(--radius-full)",
              color: "var(--accent-gold)",
              fontSize: "0.82rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              marginBottom: "12px"
            }}
          >
            <Compass size={15} />
            <span>Pan-India Real Estate Network • All 36 States & UTs</span>
          </div>

          <h2 style={{ fontSize: "2.4rem", margin: "8px 0 14px", lineHeight: "1.25" }}>
            Explore Verified Properties Across <span className="text-gradient">Every Indian State</span>
          </h2>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: "1.65", margin: 0 }}>
            From Founder Sanjay Kumar's native roots in <strong>Darbhanga & Patna (Bihar)</strong> to Mumbai coastal penthouses, Goa beach villas, Gurugram high-rises & Bangalore IT corridors — 100% RERA compliant and clear-title audited.
          </p>
        </div>

        {/* Zone Filter Tabs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "36px"
          }}
        >
          {indiaZones.map((zone) => (
            <button
              key={zone}
              onClick={() => setActiveZone(zone)}
              className={`zone-filter-tab ${activeZone === zone ? "active" : ""}`}
            >
              {zone === "East" ? "East (incl. Bihar)" : zone}
            </button>
          ))}
        </div>

        {/* States Cards Grid */}
        <div className="india-states-grid">
          {filteredStates.map((state) => {
            const count = getPropertyCountForState(state.name);
            const isBihar = state.name.toLowerCase().includes("bihar");

            return (
              <div
                key={state.id}
                className={`state-luxury-card ${isBihar ? "state-bihar-highlight" : ""}`}
                onClick={() => navigate(`/properties?state=${encodeURIComponent(state.name)}`)}
              >
                {/* Background Image Container with Overlay */}
                <div className="state-card-image-wrap">
                  <img
                    src={state.image}
                    alt={state.name}
                    className="state-card-img"
                    loading="lazy"
                  />
                  <div className="state-card-overlay" />

                  {/* Top Badges */}
                  <div className="state-card-top-badges">
                    <span className="state-zone-badge">{state.zone}</span>
                    <span className="state-growth-badge">
                      <TrendingUp size={12} />
                      <span>{state.avgGrowth}</span>
                    </span>
                  </div>

                  {/* Count Pill */}
                  <div className="state-count-pill">
                    <Building2 size={13} />
                    <span>{count > 0 ? `${count} Active Listings` : "RERA Advisory Active"}</span>
                  </div>

                  {/* Sanjay Kumar Native Badge on Bihar */}
                  {isBihar && (
                    <div className="state-founder-tag">
                      <Sparkles size={13} color="#fbbf24" />
                      <span>Founder Sanjay Kumar's Roots (Darbhanga)</span>
                    </div>
                  )}
                </div>

                {/* Card Content Body */}
                <div className="state-card-body">
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px", marginBottom: "6px" }}>
                    <h3 className="state-card-title">{state.name}</h3>
                    <span className="state-rera-pill" title={state.reraAuthority}>
                      <ShieldCheck size={13} color="var(--accent-emerald)" />
                      <span>{state.reraAuthority.split(" ")[0]}</span>
                    </span>
                  </div>

                  <p className="state-card-tagline">{state.tagline}</p>

                  {/* Key Hubs */}
                  <div className="state-hubs-row">
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>
                      Key Hubs:
                    </span>
                    <div className="state-hubs-chips">
                      {state.hubs.slice(0, 3).map((hub, i) => (
                        <span key={i} className="state-hub-chip">
                          {hub}
                        </span>
                      ))}
                      {state.hubs.length > 3 && (
                        <span className="state-hub-chip more">+{state.hubs.length - 3}</span>
                      )}
                    </div>
                  </div>

                  {/* Rates & Duty Footer */}
                  <div className="state-card-footer">
                    <div>
                      <span style={{ display: "block", fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                        Average Rate
                      </span>
                      <strong style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>
                        {state.capitalRate}
                      </strong>
                    </div>

                    <Link
                      to={`/properties?state=${encodeURIComponent(state.name)}`}
                      className="state-explore-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Explore</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pan-India Trust Assurance Banner */}
        <div
          style={{
            marginTop: "48px",
            padding: "24px 30px",
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)",
            border: "1px solid rgba(217, 119, 6, 0.35)",
            borderRadius: "var(--radius-xl)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(217, 119, 6, 0.2)",
                border: "1.5px solid var(--accent-gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <ShieldCheck size={26} color="var(--accent-gold)" />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: "1.1rem", color: "#ffffff", fontWeight: 800 }}>
                100% Nationwide State RERA & Encumbrance Verification Guarantee
              </h4>
              <p style={{ margin: "4px 0 0", fontSize: "0.88rem", color: "#94a3b8" }}>
                Whether acquiring agricultural farmhouses in Punjab, commercial IT zones in Bangalore, or ancestral kothis in Bihar — all titles audited directly by our RERA legal team.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/properties" className="btn btn-gold btn-sm">
              <Building2 size={15} />
              <span>Browse 10,000+ Residences</span>
            </Link>
            <Link to="/agents" className="btn btn-outline btn-sm" style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.25)" }}>
              <span>Consult State Advisors</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndiaStateExplorer;
