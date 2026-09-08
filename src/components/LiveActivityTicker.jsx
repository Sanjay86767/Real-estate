import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Sparkles, X, Eye, Heart, Calendar, TrendingUp, Zap, Bell } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "visit",
    icon: Calendar,
    iconColor: "#6366f1",
    bg: "rgba(99,102,241,0.12)",
    text: "Someone from Chandigarh booked a site tour for",
    property: "The Grand Regal Luxury Villa",
    propId: 1,
    time: "2 mins ago",
    badge: "TOUR"
  },
  {
    id: 2,
    type: "favorite",
    icon: Heart,
    iconColor: "#ec4899",
    bg: "rgba(236,72,153,0.12)",
    text: "3 investors recently favorited",
    property: "Skyline Panorama Luxury Apartment",
    propId: 2,
    time: "5 mins ago",
    badge: "HOT"
  },
  {
    id: 3,
    type: "view",
    icon: Eye,
    iconColor: "#10b981",
    bg: "rgba(16,185,129,0.12)",
    text: "6 buyers are live-viewing",
    property: "The Sovereign Penthouse Suite",
    propId: 3,
    time: "Just now",
    badge: "LIVE"
  },
  {
    id: 4,
    type: "closed",
    icon: Sparkles,
    iconColor: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    text: "Agent Priya Malhotra closed a deal for",
    property: "Urban Nest Smart Flat",
    propId: 5,
    time: "10 mins ago",
    badge: "SOLD"
  },
  {
    id: 5,
    type: "nri",
    icon: TrendingUp,
    iconColor: "#d97706",
    bg: "rgba(217,119,6,0.12)",
    text: "NRI client from Dubai scheduled a VIP consult with Founder Sanjay Kumar for",
    property: "Lakeview Executive Manor",
    propId: 4,
    time: "Just now",
    badge: "VIP"
  },
  {
    id: 6,
    type: "confirm",
    icon: Calendar,
    iconColor: "#10b981",
    bg: "rgba(16,185,129,0.12)",
    text: "Sanjay Kumar confirmed premium site visit for",
    property: "The Sovereign Penthouse Suite",
    propId: 3,
    time: "1 min ago",
    badge: "CONFIRMED"
  }
];

const BADGE_COLORS = {
  TOUR: { bg: "rgba(99,102,241,0.15)", color: "#6366f1" },
  HOT:  { bg: "rgba(239,68,68,0.15)",  color: "#ef4444" },
  LIVE: { bg: "rgba(16,185,129,0.15)", color: "#10b981" },
  SOLD: { bg: "rgba(245,158,11,0.15)", color: "#f59e0b" },
  VIP:  { bg: "rgba(217,119,6,0.15)",  color: "#d97706" },
  CONFIRMED: { bg: "rgba(16,185,129,0.15)", color: "#10b981" },
};

export const LiveActivityTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState("visible"); // "visible" | "hiding" | "showing"
  const [isDismissed, setIsDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const advance = useCallback(() => {
    setPhase("hiding");
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
      setPhase("showing");
      setTimeout(() => setPhase("visible"), 50);
    }, 350);
  }, []);

  useEffect(() => {
    if (isDismissed || isPaused) return;
    const id = setInterval(advance, 8000);
    return () => clearInterval(id);
  }, [isDismissed, isPaused, advance]);

  if (isDismissed) return null;

  const current = activities[currentIndex];
  const Icon = current.icon;
  const badgeStyle = BADGE_COLORS[current.badge] || BADGE_COLORS.LIVE;

  const opacity = phase === "visible" ? 1 : 0;
  const translateY = phase === "hiding" ? 14 : phase === "showing" ? -14 : 0;

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: "fixed",
        bottom: "clamp(80px, 10vw, 100px)",
        left: "clamp(12px, 2vw, 24px)",
        zIndex: 890,
        maxWidth: "clamp(290px, 32vw, 360px)",
        width: "calc(100vw - 24px)",
      }}
    >
      {/* Main card */}
      <div
        style={{
          background: "var(--bg-surface-elevated)",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.15)",
          overflow: "hidden",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Header strip */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "8px 12px 8px 14px",
          background: "linear-gradient(90deg, rgba(99,102,241,0.06), rgba(217,119,6,0.04))",
          borderBottom: "1px solid var(--border-light)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <div style={{
              width: "7px", height: "7px", borderRadius: "50%", background: "#10b981",
              boxShadow: "0 0 0 3px rgba(16,185,129,0.2)",
              animation: "pulse 2s ease-in-out infinite"
            }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Live Activity
            </span>
          </div>

          {/* Dot indicators */}
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            {activities.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setPhase("hiding");
                  setTimeout(() => { setCurrentIndex(i); setPhase("showing"); setTimeout(() => setPhase("visible"), 50); }, 300);
                }}
                style={{
                  width: i === currentIndex ? "14px" : "6px",
                  height: "6px",
                  borderRadius: "999px",
                  background: i === currentIndex ? "#6366f1" : "var(--border-light)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  border: "none",
                  padding: 0
                }}
              />
            ))}

            <button
              onClick={() => setIsDismissed(true)}
              style={{ color: "var(--text-muted)", cursor: "pointer", background: "none", border: "none", display: "flex", padding: "2px", marginLeft: "6px" }}
              aria-label="Dismiss"
            >
              <X size={13} />
            </button>
          </div>
        </div>

        {/* Activity content */}
        <div style={{
          padding: "14px 14px 16px",
          display: "flex", gap: "12px", alignItems: "flex-start",
          opacity, transform: `translateY(${translateY}px)`,
          transition: "opacity 0.35s ease, transform 0.35s ease"
        }}>
          {/* Icon */}
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: current.bg,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, marginTop: "2px"
          }}>
            <Icon size={17} color={current.iconColor} />
          </div>

          {/* Text */}
          <div style={{ flex: 1, fontSize: "0.82rem", lineHeight: "1.45" }}>
            <span style={{ color: "var(--text-secondary)" }}>{current.text} </span>
            <Link
              to={`/property/${current.propId}`}
              style={{ fontWeight: 700, color: "var(--accent-primary)", textDecoration: "none" }}
            >
              {current.property}
            </Link>
            <div style={{ display: "flex", gap: "8px", marginTop: "6px", alignItems: "center" }}>
              <span style={{
                fontSize: "0.67rem", fontWeight: 800, letterSpacing: "0.4px",
                padding: "2px 7px", borderRadius: "999px",
                background: badgeStyle.bg, color: badgeStyle.color
              }}>
                {current.badge}
              </span>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                ⚡ {current.time}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {!isPaused && (
          <div style={{ height: "2px", background: "var(--border-light)", position: "relative" }}>
            <div
              key={currentIndex}
              style={{
                position: "absolute", left: 0, top: 0, height: "100%",
                background: current.iconColor,
                animation: "ticker-progress 8s linear forwards",
                borderRadius: "0 1px 1px 0"
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveActivityTicker;
