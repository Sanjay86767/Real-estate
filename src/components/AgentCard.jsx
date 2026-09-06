import React from "react";
import { Link } from "react-router-dom";
import { Star, Phone, Mail, Award, CheckCircle } from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";

export const AgentCard = ({ agent, onContactClick }) => {
  const { addToast } = usePropertyContext();

  const handleCall = () => {
    addToast(`Dialing agent ${agent.name}: ${agent.phone}`, "info");
  };

  const handleEmail = () => {
    addToast(`Opening mail composer for ${agent.email}`, "info");
  };

  return (
    <div className="agent-card">
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

      {/* Action Buttons */}
      <div className="agent-contact-actions">
        <button
          onClick={handleCall}
          className="btn btn-secondary btn-sm"
          style={{ flex: 1, gap: "6px" }}
          title="Call agent"
        >
          <Phone size={14} color="var(--accent-primary)" />
          <span>Call</span>
        </button>

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
