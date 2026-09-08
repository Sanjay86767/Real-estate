import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Star, Phone, Mail, Award, CheckCircle, Crown,
  MessageSquare, MapPin, TrendingUp, Zap, ArrowRight
} from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";

export const AgentCard = ({ agent, onContactClick }) => {
  const { addToast } = usePropertyContext();
  const [hovered, setHovered] = useState(false);

  const handleEmail = () => {
    addToast(`Opening mail for ${agent.email}`, "info");
  };

  const isFounder = agent.id === 1;

  return (
    <div
      className="agent-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        border: isFounder
          ? "1.5px solid rgba(245,158,11,0.6)"
          : "1px solid var(--border-light)",
        boxShadow: hovered
          ? isFounder
            ? "0 20px 50px rgba(245,158,11,0.22), 0 8px 24px rgba(0,0,0,0.18)"
            : "0 16px 44px rgba(99,102,241,0.14), 0 6px 16px rgba(0,0,0,0.12)"
          : isFounder
            ? "0 8px 24px rgba(245,158,11,0.12)"
            : "var(--shadow-sm)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        overflow: "hidden",
      }}
    >
      {/* Shimmer sweep on hover */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)",
        transform: hovered ? "translateX(100%)" : "translateX(-100%)",
        transition: "transform 0.7s ease",
        zIndex: 1,
      }} />

      {/* Founder Banner */}
      {isFounder && (
        <div style={{
          background: "linear-gradient(90deg, #92400e, #d97706, #b45309)",
          padding: "6px 16px",
          display: "flex", alignItems: "center", gap: "6px",
          justifyContent: "center"
        }}>
          <Crown size={12} color="#fff" />
          <span style={{ fontSize: "0.68rem", fontWeight: 900, color: "#fff", textTransform: "uppercase", letterSpacing: "1.2px" }}>
            FOUNDER & CHIEF STRATEGIST
          </span>
          <Crown size={12} color="#fff" />
        </div>
      )}

      {/* Avatar */}
      <div style={{ padding: "24px 20px 0", textAlign: "center" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          {/* Glow ring for founder */}
          {isFounder && (
            <div style={{
              position: "absolute", inset: "-5px",
              borderRadius: "50%",
              background: "conic-gradient(from 0deg, #d97706, #f59e0b, #fbbf24, #d97706)",
              animation: "spin 3s linear infinite",
              zIndex: 0,
            }} />
          )}
          <Link to={`/agent/${agent.id}`} style={{ display: "block", position: "relative", zIndex: 1 }}>
            <div style={{
              width: "88px", height: "88px", borderRadius: "50%",
              border: isFounder ? "3px solid #0f172a" : "3px solid var(--bg-surface)",
              overflow: "hidden",
              boxShadow: isFounder ? "0 0 20px rgba(217,119,6,0.5)" : "0 4px 12px rgba(0,0,0,0.15)",
              margin: "0 auto", position: "relative", zIndex: 1,
            }}>
              <img src={agent.image} alt={agent.name} loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </Link>
          {/* Verified badge */}
          <div style={{
            position: "absolute", bottom: "2px", right: "2px",
            background: "#fff", borderRadius: "50%", padding: "2px",
            zIndex: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
          }}>
            <CheckCircle size={18} color="var(--accent-primary)" fill="#fff" />
          </div>
        </div>

        {/* Name & Role */}
        <h3 style={{ margin: "14px 0 2px", fontSize: "1.05rem", fontWeight: 800 }}>
          <Link to={`/agent/${agent.id}`} style={{ color: "var(--text-primary)", textDecoration: "none" }}>
            {agent.name}
          </Link>
        </h3>
        <p style={{ fontSize: "0.8rem", color: isFounder ? "#f59e0b" : "var(--text-muted)", fontWeight: 600, margin: "0 0 10px" }}>
          {agent.role}
        </p>

        {/* Stars */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "3px", marginBottom: "14px" }}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={13}
              fill={i < Math.floor(agent.rating) ? "var(--accent-gold)" : "transparent"}
              color="var(--accent-gold)"
            />
          ))}
          <strong style={{ fontSize: "0.88rem", marginLeft: "4px" }}>{agent.rating}</strong>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>({agent.reviewsCount})</span>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        borderTop: "1px solid var(--border-light)", borderBottom: "1px solid var(--border-light)",
        margin: "0 0 16px"
      }}>
        {[
          { label: "Exp.", value: agent.experience },
          { label: "Sold", value: agent.dealsClosed },
          { label: "City", value: agent.city?.split(" ")[0] },
        ].map((s, i) => (
          <div key={i} style={{
            padding: "12px 6px", textAlign: "center",
            borderRight: i < 2 ? "1px solid var(--border-light)" : "none",
          }}>
            <strong style={{ display: "block", fontSize: "0.92rem", fontWeight: 800, color: "var(--text-primary)" }}>
              {s.value}
            </strong>
            <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Bio */}
      <div style={{ padding: "0 18px 16px" }}>
        <p style={{
          fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.55,
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden", margin: 0
        }}>
          {agent.bio}
        </p>
      </div>

      {/* City pill */}
      {agent.city && (
        <div style={{ padding: "0 18px 14px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "4px",
            padding: "3px 10px", borderRadius: "999px", fontSize: "0.72rem",
            background: "var(--bg-secondary)", color: "var(--text-muted)",
            border: "1px solid var(--border-light)", fontWeight: 600
          }}>
            <MapPin size={10} /> {agent.city}
          </span>
        </div>
      )}

      {/* Action buttons */}
      <div style={{ padding: "0 18px 18px", display: "flex", flexDirection: "column", gap: "8px" }}>
        {/* WhatsApp CTA */}
        <a
          href={`https://wa.me/918809604880?text=Hello%20${encodeURIComponent(agent.name)},%20I%20found%20your%20profile%20on%20EstateHub.%20I%27m%20interested%20in%20property%20consultation.`}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            padding: "10px 14px",
            background: "linear-gradient(135deg, #16a34a, #15803d)",
            color: "#fff", borderRadius: "var(--radius-md)",
            fontWeight: 700, fontSize: "0.85rem", textDecoration: "none",
            boxShadow: "0 4px 12px rgba(22,163,74,0.3)",
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.02)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          <MessageSquare size={15} />
          WhatsApp Chat
        </a>

        {/* Call + Email */}
        <div style={{ display: "flex", gap: "8px" }}>
          <a
            href={`tel:${agent.phone}`}
            style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
              padding: "8px", background: "rgba(37,99,235,0.08)",
              border: "1px solid rgba(37,99,235,0.2)", borderRadius: "var(--radius-sm)",
              color: "var(--accent-primary)", fontWeight: 700, fontSize: "0.8rem",
              textDecoration: "none", transition: "all 0.2s"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(37,99,235,0.14)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(37,99,235,0.08)"; }}
          >
            <Phone size={13} /> Call
          </a>
          <button
            onClick={handleEmail}
            style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
              padding: "8px", background: "var(--bg-secondary)",
              border: "1px solid var(--border-light)", borderRadius: "var(--radius-sm)",
              color: "var(--text-secondary)", fontWeight: 700, fontSize: "0.8rem",
              cursor: "pointer", transition: "all 0.2s"
            }}
          >
            <Mail size={13} /> Email
          </button>
          {onContactClick && (
            <button
              onClick={() => onContactClick(agent)}
              style={{
                flex: 1.2, display: "flex", alignItems: "center", justifyContent: "center",
                padding: "8px", background: "var(--accent-primary)",
                border: "none", borderRadius: "var(--radius-sm)",
                color: "#fff", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              Inquire
            </button>
          )}
        </div>

        {/* Profile link */}
        <Link
          to={`/agent/${agent.id}`}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
            fontSize: "0.78rem", color: "var(--text-muted)", textDecoration: "none",
            paddingTop: "4px", transition: "color 0.2s"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent-primary)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
        >
          View Full Profile <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
};

export default AgentCard;
