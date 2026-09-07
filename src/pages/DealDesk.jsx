import React, { useState } from "react";
import { usePropertyContext } from "../context/PropertyContext";
import { Sparkles, Building2, TrendingUp, ShieldCheck, ArrowRight, FileText, CheckCircle2, Lock } from "lucide-react";
import DealDeskModal from "../components/DealDeskModal";
import EscrowModal from "../components/EscrowModal";

export const DealDesk = () => {
  const { properties, formatPrice, t, offers } = usePropertyContext();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedEscrowDeal, setSelectedEscrowDeal] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");

  const filtered = properties.filter((p) =>
    p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.city.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.location.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div style={{ background: "var(--bg-main)", minHeight: "90vh", padding: "40px 0 80px" }}>
      <div className="container">
        {/* Hero Header */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "780px",
            margin: "0 auto 40px",
            padding: "20px"
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              padding: "6px 14px",
              borderRadius: "20px",
              color: "var(--accent-gold)",
              fontWeight: 800,
              fontSize: "0.78rem",
              marginBottom: "12px"
            }}
          >
            <Sparkles size={16} />
            <span>AI NEGOTIATION & TERM SHEET DESK</span>
          </div>
          <h1 style={{ fontSize: "2.4rem", fontWeight: 900, marginBottom: "12px", color: "var(--text-primary)" }}>
            Direct Digital Offer & Counter-Negotiation Engine
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.6 }}>
            Select any verified residence to run algorithmic valuation checks, test offer variance scenarios, and generate an official RERA-compliant Letter of Intent (LOI) in seconds.
          </p>

          {/* Quick Search */}
          <div style={{ maxWidth: "500px", margin: "24px auto 0" }}>
            <input
              type="text"
              placeholder="Search by city, project name or locality..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 20px",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--border-light)",
                background: "var(--bg-surface)",
                color: "var(--text-primary)",
                fontSize: "0.95rem",
                boxShadow: "var(--shadow-sm)"
              }}
            />
          </div>
        </div>

        {/* Active Pipeline & Earnest Escrow Section */}
        {offers.length > 0 && (
          <div
            style={{
              marginBottom: "36px",
              padding: "22px",
              background: "var(--bg-surface)",
              border: "1px solid rgba(212, 175, 55, 0.35)",
              borderRadius: "var(--radius-xl)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800 }}>
                  Active Negotiation Pipeline & RERA Escrow
                </h3>
                <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                  Lock seller exclusivity with a legally guaranteed RERA earnest token deposit.
                </p>
              </div>
              <span style={{ fontSize: "0.8rem", color: "var(--accent-gold)", fontWeight: 800 }}>
                {offers.length} Active Offers Monitored
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {offers.map((deal) => (
                <div
                  key={deal.id}
                  style={{
                    padding: "16px 18px",
                    background: "var(--bg-main)",
                    borderRadius: "12px",
                    border: "1px solid var(--border-light)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--text-primary)" }}>
                      {deal.propertyTitle}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "3px" }}>
                      LOI Code: <strong style={{ color: "var(--accent-gold)" }}>{deal.loiCode}</strong> • Offer: <strong>{formatPrice(deal.offerPrice)}</strong> • Probability: {deal.probability}
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "14px",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        background: deal.status === "Earnest Escrowed" ? "rgba(212, 175, 55, 0.2)" : "rgba(59, 130, 246, 0.15)",
                        color: deal.status === "Earnest Escrowed" ? "#d4af37" : "#3b82f6",
                      }}
                    >
                      ● {deal.status}
                    </span>
                    <button
                      onClick={() => setSelectedEscrowDeal(deal)}
                      className="btn btn-gold btn-sm"
                      style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem" }}
                    >
                      <ShieldCheck size={14} />
                      <span>{deal.status === "Earnest Escrowed" ? "View Escrow Seal" : "Lock with Escrow"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Properties Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          {filtered.slice(0, 9).map((prop) => (
            <div
              key={prop.id}
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease, box-shadow 0.2s ease"
              }}
            >
              <div style={{ position: "relative", height: "190px" }}>
                <img
                  src={prop.image}
                  alt={prop.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "rgba(16, 185, 129, 0.9)",
                    color: "#ffffff",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    padding: "3px 8px",
                    borderRadius: "4px"
                  }}
                >
                  DEAL DESK OPEN
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    background: "rgba(15, 23, 42, 0.9)",
                    backdropFilter: "blur(4px)",
                    color: "#ffffff",
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: "6px"
                  }}
                >
                  {formatPrice(prop.price)}
                </div>
              </div>

              <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ margin: "0 0 6px", fontSize: "1.1rem", fontWeight: 800 }}>
                    {prop.title}
                  </h3>
                  <p style={{ margin: "0 0 14px", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                    {prop.location}, {prop.city}
                  </p>

                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                    <span style={{ fontSize: "0.72rem", background: "var(--bg-main)", padding: "3px 8px", borderRadius: "4px", border: "1px solid var(--border-light)" }}>
                      {prop.bhk || `${prop.bedrooms} BHK`}
                    </span>
                    <span style={{ fontSize: "0.72rem", background: "var(--bg-main)", padding: "3px 8px", borderRadius: "4px", border: "1px solid var(--border-light)" }}>
                      {prop.area} sq.ft
                    </span>
                    <span style={{ fontSize: "0.72rem", background: "rgba(245, 158, 11, 0.1)", color: "#d97706", padding: "3px 8px", borderRadius: "4px", fontWeight: 700 }}>
                      AI Match 96%
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProperty(prop)}
                  className="btn btn-gold"
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                >
                  <Sparkles size={16} />
                  <span>Negotiate & Structure Offer</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {selectedProperty && (
        <DealDeskModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      {selectedEscrowDeal && (
        <EscrowModal
          deal={selectedEscrowDeal}
          onClose={() => setSelectedEscrowDeal(null)}
          onSuccess={() => setSelectedEscrowDeal(null)}
        />
      )}
    </div>
  );
};

export default DealDesk;
