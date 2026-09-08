import React from "react";
import { ShieldCheck, Award, Star, Zap, CheckCircle2, Lock, Globe, BadgeCheck } from "lucide-react";

const BADGES = [
  {
    icon: "🏆",
    bg: "rgba(255, 215, 0, 0.12)",
    border: "rgba(255, 215, 0, 0.35)",
    title: "India's #1 Platform",
    sub: "Ranked by CREDAI 2024",
  },
  {
    icon: "🏛️",
    bg: "rgba(59, 123, 246, 0.12)",
    border: "rgba(59, 123, 246, 0.35)",
    title: "RERA Certified",
    sub: "All-State Compliant",
  },
  {
    icon: "🔒",
    bg: "rgba(0, 217, 165, 0.12)",
    border: "rgba(0, 217, 165, 0.35)",
    title: "ISO 27001",
    sub: "Data Security Assured",
  },
  {
    icon: "🏦",
    bg: "rgba(255, 107, 0, 0.12)",
    border: "rgba(255, 107, 0, 0.35)",
    title: "RBI Approved",
    sub: "Loan Partners Network",
  },
  {
    icon: "⭐",
    bg: "rgba(245, 166, 35, 0.12)",
    border: "rgba(245, 166, 35, 0.35)",
    title: "4.9/5 Rating",
    sub: "85,000+ Reviews",
  },
  {
    icon: "🌐",
    bg: "rgba(139, 92, 246, 0.12)",
    border: "rgba(139, 92, 246, 0.35)",
    title: "500+ Cities",
    sub: "Pan-India Coverage",
  },
];

export default function TrustBadgeSection() {
  return (
    <section className="trust-section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <p style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "2px",
            color: "var(--text-muted)",
            marginBottom: "6px",
          }}>
            Trusted & Recognized By
          </p>
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.1rem",
            color: "var(--text-secondary)",
            fontWeight: 500,
          }}>
            India's most awarded real estate platform
          </h2>
        </div>

        <div className="trust-badges-row">
          {BADGES.map((badge, i) => (
            <div
              key={i}
              className="trust-badge"
              style={{
                borderColor: badge.border,
                background: badge.bg,
                animation: `fade-in-scale 0.5s ease ${i * 0.08}s both`,
              }}
            >
              <div
                className="trust-badge-icon"
                style={{
                  background: badge.bg,
                  border: `1px solid ${badge.border}`,
                  fontSize: "1.4rem",
                }}
              >
                {badge.icon}
              </div>
              <div className="trust-badge-text">
                <strong>{badge.title}</strong>
                <span>{badge.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Verified strip */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          marginTop: "24px",
          flexWrap: "wrap",
        }}>
          {[
            { icon: CheckCircle2, text: "100% Verified Listings" },
            { icon: Lock, text: "Secure Transactions" },
            { icon: ShieldCheck, text: "Legal Due Diligence" },
            { icon: BadgeCheck, text: "Fraud-Free Platform" },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "6px",
              color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 600,
            }}>
              <Icon size={15} color="var(--accent-emerald)" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
