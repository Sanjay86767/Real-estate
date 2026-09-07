import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  FileText,
  CheckCircle2,
  Crown,
  Compass,
  Building,
  TrendingUp,
  Activity,
  Calculator,
  ArrowRight,
  ExternalLink,
  Zap,
  Star
} from "lucide-react";
import sanjayPhoto from "../assets/sanjay-kumar.jpg";
import { playClickSound } from "../utils/effects";

export const PropertiesSidebarContent = ({ onOpenBrochures, layout = "grid" }) => {
  // Quick EMI slider state
  const [loanAmountLakhs, setLoanAmountLakhs] = useState(50); // ₹50 Lakhs
  const interestRate = 8.4; // 8.40% p.a.
  const tenureYears = 20;

  // Calculate monthly EMI
  const P = loanAmountLakhs * 100000;
  const r = interestRate / (12 * 100);
  const n = tenureYears * 12;
  const emi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));

  // Live Pan-India rates
  const marketRates = [
    { city: "Darbhanga & Patna", rate: "₹5,800/sq.ft", change: "+22.4%", up: true },
    { city: "Mumbai (Worli/BKC)", rate: "₹45,200/sq.ft", change: "+14.2%", up: true },
    { city: "Goa Beachfront", rate: "₹16,800/sq.ft", change: "+18.5%", up: true },
    { city: "Bangalore IT Belt", rate: "₹11,200/sq.ft", change: "+12.1%", up: true },
    { city: "Gurugram (Golf Rd)", rate: "₹14,500/sq.ft", change: "+9.8%", up: true }
  ];

  // Signature Trophy mini listings
  const trophyPicks = [
    {
      id: 18,
      title: "Worli Sea Face Sky Mansion",
      location: "Mumbai, Maharashtra",
      price: "₹18.50 Cr",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 16,
      title: "Raj Darbhanga Royal Kothi",
      location: "Darbhanga, Bihar",
      price: "₹1.65 Cr",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 20,
      title: "Candolim Beachfront Pool Villa",
      location: "Goa Beachfront",
      price: "₹4.85 Cr",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 13,
      title: "DLF Sovereign Penthouse",
      location: "Gurugram, NCR",
      price: "₹3.20 Cr",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div
      style={
        layout === "grid"
          ? {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              width: "100%",
              marginTop: "24px"
            }
          : {
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              marginTop: "18px"
            }
      }
    >
      {/* 1. Founder Sanjay Kumar VIP Advisory Desk */}
      <div
        style={{
          padding: "20px 18px",
          background: "linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.96))",
          border: "1px solid rgba(217, 119, 6, 0.5)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(217, 119, 6, 0.15)",
          color: "#ffffff"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <div style={{ position: "relative" }}>
            <img
              src={sanjayPhoto}
              alt="Sanjay Kumar - Founder"
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #d97706",
                boxShadow: "0 0 14px rgba(217, 119, 6, 0.6)"
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#10b981",
                border: "2px solid #0f172a"
              }}
              title="Online Active"
            />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <strong style={{ fontSize: "1rem", color: "#ffffff", fontWeight: 800 }}>Sanjay Kumar</strong>
              <ShieldCheck size={16} color="#10b981" />
            </div>
            <span style={{ fontSize: "0.72rem", color: "#fbbf24", fontWeight: 700, display: "block" }}>
              Founder Desk • Darbhanga, Bihar
            </span>
          </div>
        </div>

        <p style={{ fontSize: "0.78rem", color: "#cbd5e1", lineHeight: 1.45, margin: "0 0 14px" }}>
          Need a private off-market estate or institutional NRI advisory in Bihar, Mumbai, or Goa?
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <a
            href="tel:+918809604880"
            style={{
              padding: "8px 10px",
              borderRadius: "var(--radius-sm)",
              background: "linear-gradient(135deg, #d97706, #b45309)",
              color: "#ffffff",
              fontSize: "0.76rem",
              fontWeight: 800,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              boxShadow: "0 3px 10px rgba(217, 119, 6, 0.3)"
            }}
          >
            <Phone size={13} />
            <span>Call Desk</span>
          </a>

          <a
            href="https://wa.me/918809604880?text=Hi%20Sanjay,%20I%20am%20exploring%20properties%20on%20EstateHub%20and%20need%20expert%20advisory."
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "8px 10px",
              borderRadius: "var(--radius-sm)",
              background: "#25D366",
              color: "#ffffff",
              fontSize: "0.76rem",
              fontWeight: 800,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px"
            }}
          >
            <MessageSquare size={13} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* 2. Live Pan-India Capital Appreciation Barometer */}
      <div
        style={{
          padding: "18px 16px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-sm)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <TrendingUp size={17} color="#10b981" />
            <h4 style={{ margin: 0, fontSize: "0.88rem", fontWeight: 800, color: "var(--text-primary)" }}>
              Pan-India Price Barometer
            </h4>
          </div>
          <span style={{ fontSize: "0.68rem", color: "#10b981", fontWeight: 800, background: "rgba(16, 185, 129, 0.12)", padding: "2px 6px", borderRadius: "8px" }}>
            LIVE
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {marketRates.map((m, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 8px",
                background: "var(--bg-surface)",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.75rem"
              }}
            >
              <div>
                <strong style={{ color: "var(--text-primary)", display: "block" }}>{m.city}</strong>
                <span style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>{m.rate}</span>
              </div>
              <span style={{ color: "#10b981", fontWeight: 800, fontFamily: "monospace" }}>
                {m.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Instant Home Loan Quick Calculator */}
      <div
        style={{
          padding: "18px 16px",
          background: "var(--bg-card)",
          border: "1px solid rgba(59, 130, 246, 0.3)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-sm)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
          <Calculator size={18} color="#3b82f6" />
          <h4 style={{ margin: 0, fontSize: "0.9rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Instant Loan EMI Desk
          </h4>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px", fontSize: "0.75rem" }}>
          <span style={{ color: "var(--text-secondary)" }}>Loan Amount:</span>
          <strong style={{ color: "var(--text-primary)" }}>₹{loanAmountLakhs} Lakhs</strong>
        </div>

        <input
          type="range"
          min="10"
          max="300"
          step="5"
          value={loanAmountLakhs}
          onChange={(e) => setLoanAmountLakhs(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#3b82f6", marginBottom: "10px", cursor: "pointer" }}
        />

        <div
          style={{
            padding: "10px 12px",
            background: "rgba(59, 130, 246, 0.08)",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            borderRadius: "var(--radius-md)",
            textAlign: "center",
            marginBottom: "10px"
          }}
        >
          <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", display: "block" }}>
            Estimated Monthly EMI @ 8.40% (20 Yrs)
          </span>
          <strong style={{ fontSize: "1.15rem", color: "#3b82f6", fontWeight: 900 }}>
            ₹{emi.toLocaleString("en-IN")}/mo
          </strong>
        </div>

        <Link
          to="/affordability"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            fontSize: "0.76rem",
            color: "var(--accent-primary)",
            fontWeight: 700,
            textDecoration: "none"
          }}
        >
          <span>Open Full Mortgage Eligibility Desk</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* 4. Top Signature Trophy Estates (Mini-Showcase) */}
      <div
        style={{
          padding: "18px 16px",
          background: "var(--bg-card)",
          border: "1px solid rgba(212, 175, 55, 0.3)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-sm)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "12px" }}>
          <Crown size={17} color="#d4af37" />
          <h4 style={{ margin: 0, fontSize: "0.88rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Top Signature Estates
          </h4>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {trophyPicks.map((t) => (
            <Link
              key={t.id}
              to={`/properties/${t.id}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                padding: "6px",
                borderRadius: "var(--radius-sm)",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-light)",
                transition: "all 0.2s ease"
              }}
            >
              <img
                src={t.image}
                alt={t.title}
                style={{ width: "52px", height: "42px", borderRadius: "6px", objectFit: "cover" }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <strong
                  style={{
                    fontSize: "0.76rem",
                    color: "var(--text-primary)",
                    display: "block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                >
                  {t.title}
                </strong>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>
                  {t.location}
                </span>
                <span style={{ fontSize: "0.75rem", color: "#d4af37", fontWeight: 800 }}>
                  {t.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 5. Official PDF Brochure Hub Launcher */}
      <div
        style={{
          padding: "18px 16px",
          background: "linear-gradient(135deg, rgba(212, 175, 55, 0.12), rgba(245, 158, 11, 0.05))",
          border: "1px solid rgba(212, 175, 55, 0.4)",
          borderRadius: "var(--radius-lg)",
          textAlign: "center"
        }}
      >
        <FileText size={22} color="#d4af37" style={{ margin: "0 auto 8px" }} />
        <h4 style={{ margin: "0 0 6px", fontSize: "0.9rem", fontWeight: 800, color: "var(--text-primary)" }}>
          Official Brochure Center
        </h4>
        <p style={{ fontSize: "0.74rem", color: "var(--text-secondary)", margin: "0 0 12px", lineHeight: 1.4 }}>
          10,000+ official RERA investment prospectuses, floor plans & Vastu dossiers ready for download.
        </p>
        <button
          type="button"
          onClick={() => {
            playClickSound();
            if (onOpenBrochures) onOpenBrochures();
          }}
          className="btn btn-gold btn-sm"
          style={{ width: "100%", justifyContent: "center", gap: "6px", fontSize: "0.78rem" }}
        >
          <Sparkles size={14} />
          <span>Open PDF Hub</span>
        </button>
      </div>

      {/* 6. Live Activity Stream (Recent Deals & Visits) */}
      <div
        style={{
          padding: "16px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-lg)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "10px" }}>
          <Activity size={16} color="#3b82f6" />
          <h4 style={{ margin: 0, fontSize: "0.85rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Live Platform Activity
          </h4>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.72rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", color: "var(--text-secondary)" }}>
            <span style={{ color: "#10b981", marginTop: "1px" }}>●</span>
            <span>Buyer in Patna booked site tour for 3 BHK flat (5 mins ago)</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", color: "var(--text-secondary)" }}>
            <span style={{ color: "#3b82f6", marginTop: "1px" }}>●</span>
            <span>Token deposit verified for Candolim Villa (18 mins ago)</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", color: "var(--text-secondary)" }}>
            <span style={{ color: "#d4af37", marginTop: "1px" }}>●</span>
            <span>Freehold title audit completed for Darbhanga Kothi (34 mins ago)</span>
          </div>
        </div>
      </div>

      {/* 7. 100% Freehold Trust Seal */}
      <div
        style={{
          padding: "14px",
          background: "rgba(16, 185, 129, 0.08)",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          borderRadius: "var(--radius-md)",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}
      >
        <ShieldCheck size={24} color="#10b981" style={{ flexShrink: 0 }} />
        <div>
          <strong style={{ fontSize: "0.8rem", color: "#10b981", display: "block" }}>
            100% RERA & Freehold Security
          </strong>
          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
            Zero litigation guarantee with 30-yr non-encumbrance certificate.
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertiesSidebarContent;
