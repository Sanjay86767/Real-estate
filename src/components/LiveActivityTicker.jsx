import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, X, Eye, Heart, Calendar } from "lucide-react";

export const LiveActivityTicker = () => {
  const activities = [
    {
      id: 1,
      icon: <Calendar size={15} color="var(--accent-primary)" />,
      text: "Someone from Chandigarh booked a site tour for",
      property: "The Grand Regal Luxury Villa",
      propId: 1,
      time: "2 mins ago"
    },
    {
      id: 2,
      icon: <Heart size={15} color="var(--accent-rose)" />,
      text: "3 investors recently favorited",
      property: "Skyline Panorama Luxury Apartment",
      propId: 2,
      time: "5 mins ago"
    },
    {
      id: 3,
      icon: <Eye size={15} color="var(--accent-emerald)" />,
      text: "Live view: 6 people are inspecting",
      property: "The Sovereign Penthouse Suite",
      propId: 3,
      time: "Just now"
    },
    {
      id: 4,
      icon: <Sparkles size={15} color="var(--accent-gold)" />,
      text: "Agent Priya Malhotra closed an inquiry for",
      property: "Urban Nest Smart Flat",
      propId: 5,
      time: "10 mins ago"
    },
    {
      id: 5,
      icon: <Sparkles size={15} color="#d97706" />,
      text: "NRI Client from Dubai scheduled a private consultation with Founder Sanjay Kumar",
      property: "Lakeview Executive Manor",
      propId: 4,
      time: "Just now"
    },
    {
      id: 6,
      icon: <Calendar size={15} color="#10b981" />,
      text: "Sanjay Kumar (+91 8809604880) confirmed VIP site visit for",
      property: "The Sovereign Penthouse Suite",
      propId: 3,
      time: "1 min ago"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % activities.length);
        setIsVisible(true);
      }, 400);
    }, 9000);

    return () => clearInterval(interval);
  }, [isDismissed, activities.length]);

  if (isDismissed) return null;

  const current = activities[currentIndex];

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        zIndex: 890,
        maxWidth: "340px",
        background: "var(--bg-surface-elevated)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-md)",
        padding: "12px 14px",
        boxShadow: "var(--shadow-md)",
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.4s ease, transform 0.4s ease"
      }}
      className="live-activity-box"
    >
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: "var(--bg-secondary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: "2px"
        }}
      >
        {current.icon}
      </div>

      <div style={{ flex: 1, fontSize: "0.82rem", lineHeight: "1.4" }}>
        <span style={{ color: "var(--text-secondary)" }}>{current.text} </span>
        <Link
          to={`/property/${current.propId}`}
          style={{ fontWeight: 700, color: "var(--accent-primary)", display: "inline" }}
        >
          {current.property}
        </Link>
        <span style={{ display: "block", fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "2px" }}>
          ⚡ Real-Time Activity • {current.time}
        </span>
      </div>

      <button
        onClick={() => setIsDismissed(true)}
        style={{ color: "var(--text-muted)", cursor: "pointer", display: "flex", padding: "2px" }}
        aria-label="Dismiss activity"
        title="Dismiss activity"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default LiveActivityTicker;
