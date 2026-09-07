import React from "react";
import { Link } from "react-router-dom";
import { Star, Phone, Mail, Award, CheckCircle, Crown, MessageSquare, ExternalLink } from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";

export const AgentCard = ({ agent, onContactClick }) => {
  const { addToast } = usePropertyContext();

  const handleCall = () => {
    addToast(`Dialing agent ${agent.name}: ${agent.phone}`, "info");
  };

  const handleEmail = () => {
    addToast(`Opening mail composer for ${agent.email}`, "info");
  };

  const isFounder = agent.id === 1;

  return (
    <div
      className="agent-card"
      style={{
        border: isFounder ? "1.5px solid rgba(245, 158, 11, 0.6)" : undefined,
        boxShadow: isFounder ? "0 10px 30px rgba(245, 158, 11, 0.15)" : undefined,
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      {isFounder && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: "linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(15, 23, 42, 0.9))",
            border: "1px solid #fbbf24",
            padding: "4px 12px",
            borderRadius: "20px",
            marginBottom: "12px",
            color: "#fbbf24",
            fontSize: "0.74rem",
            fontWeight: 900,
            letterSpacing: "0.4px"
          }}
        >
          <Crown size={13} color="#fbbf24" />
          <span>FOUNDER & CHIEF STRATEGIST</span>
        </div>
      )}

      <div className="agent-avatar-box">
        <Link to={`/agent/${agent.id}`}>
          <img src={agent.image} alt={agent.name} loading="lazy" />
        </Link>
        <div
          style={{
            position: "absolute",
            bottom: "2px",
            right: "2px",
            background: "#ffffff",
            borderRadius: "50%",
            display: "flex",
            padding: "2px"
          }}
          title="Verified Agent"
        >
          <CheckCircle size={18} color="var(--accent-primary)" fill="#ffffff" />
        </div>
      </div>

      <h3 className="agent-name">
        <Link to={`/agent/${agent.id}`}>{agent.name}</Link>
      </h3>
      <p className="agent-role">{agent.role}</p>

      {/* Ratings */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          marginBottom: "12px"
        }}
      >
        <Star size={16} fill="var(--accent-gold)" color="var(--accent-gold)" />
        <strong style={{ fontSize: "0.95rem" }}>{agent.rating}</strong>
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          ({agent.reviewsCount} reviews)
        </span>
      </div>

      {/* Stats */}
      <div className="agent-stats">
        <div className="agent-stat-item">
          <strong>{agent.experience}</strong>
          <span>Experience</span>
        </div>
        <div className="agent-stat-item">
          <strong>{agent.dealsClosed}</strong>
          <span>Properties Sold</span>
        </div>
        <div className="agent-stat-item">
          <strong>{agent.city}</strong>
          <span>Base City</span>
        </div>
      </div>

      <p
        style={{
          fontSize: "0.85rem",
          color: "var(--text-secondary)",
          marginBottom: "18px",
          lineHeight: "1.5",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        }}
      >
        {agent.bio}
      </p>

      {/* Direct Phone Number & WhatsApp Pills */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
        <a
          href={`tel:${agent.phone}`}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "8px 12px",
            background: "rgba(37, 99, 235, 0.08)",
            border: "1px solid rgba(37, 99, 235, 0.25)",
            borderRadius: "var(--radius-full)",
            color: "var(--accent-primary)",
            fontWeight: 700,
            fontSize: "0.82rem",
            textDecoration: "none"
          }}
          title={`Call ${agent.name} directly`}
        >
          <Phone size={13} />
          <span>{agent.phone}</span>
        </a>

        <a
          href={`https://wa.me/918809604880?text=Hello%20${encodeURIComponent(agent.name)},%20I%20am%20interested%20in%20consulting%20with%20EstateHub%20regarding%20luxury%20properties.`}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            padding: "8px 12px",
            background: "rgba(16, 185, 129, 0.12)",
            border: "1px solid rgba(16, 185, 129, 0.35)",
            borderRadius: "var(--radius-full)",
            color: "#10b981",
            fontWeight: 700,
            fontSize: "0.82rem",
            textDecoration: "none"
          }}
          title="Direct WhatsApp Chat"
        >
          <MessageSquare size={13} />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* Action Buttons */}
      <div className="agent-contact-actions">
        <a
          href={`tel:${agent.phone}`}
          className="btn btn-secondary btn-sm"
          style={{ flex: 1, gap: "6px", textDecoration: "none" }}
          title="Call agent"
        >
          <Phone size={14} color="var(--accent-primary)" />
          <span>Call</span>
        </a>

        <button
          onClick={handleEmail}
          className="btn btn-secondary btn-sm"
          style={{ flex: 1, gap: "6px" }}
          title="Email agent"
        >
          <Mail size={14} color="var(--accent-primary)" />
          <span>Email</span>
        </button>

        {onContactClick && (
          <button
            onClick={() => onContactClick(agent)}
            className="btn btn-primary btn-sm"
            style={{ flex: 1.2 }}
          >
            Inquire
          </button>
        )}
      </div>
    </div>
  );
};

export default AgentCard;
