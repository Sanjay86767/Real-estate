import React, { useState, useEffect } from "react";
import { Activity, Users, ShieldCheck, Flame, ArrowUpRight, TrendingUp, X, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const LIVE_EVENTS = [
  {
    id: 1,
    badge: "VIP SITE VISIT",
    color: "#10b981",
    city: "Mumbai, Worli",
    title: "The Sovereign Penthouse Suite",
    buyer: "Rajesh S. (NRI Investor)",
    action: "confirmed private sunset inspection",
    time: "Just now"
  },
  {
    id: 2,
    badge: "TITLE GREEN SHIELD",
    color: "#6366f1",
    city: "Bengaluru, Whitefield",
    title: "Sobha Tech Park Residencies",
    buyer: "Legal Due Diligence",
    action: "passed 30-year non-encumbrance audit (98/100)",
    time: "1m ago"
  },
  {
    id: 3,
    badge: "TOKEN ESCROWED",
    color: "#d97706",
    city: "Goa, Candolim Beach",
    title: "Azure Horizon Coastal Villa",
    buyer: "Ananya K.",
    action: "placed ₹5,00,000 earnest deposit with HDFC Escrow",
    time: "3m ago"
  },
  {
    id: 4,
    badge: "PRICE CONCESSION",
    color: "#ef4444",
    city: "Gurugram, Golf Course Ext",
    title: "DLF Privana High-Rise Penthouse",
    buyer: "Market Alert",
    action: "seller claimed exclusive ₹15 Lakhs VIP discount",
    time: "4m ago"
  },
  {
    id: 5,
    badge: "DIRECT ADVISORY",
    color: "#fbbf24",
    city: "Darbhanga / Patna Corridor",
    title: "Mithila Heritage Royal Acres",
    buyer: "Sunil M.",
    action: "connected with Founder Sanjay Kumar on WhatsApp Desk",
    time: "Just now"
  }
];

export const RealtimeLiveEngine = () => {
  const [onlineCount, setOnlineCount] = useState(146);
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [showEventToast, setShowEventToast] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // 1. Monitor Screen Resize in Real-Time
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. Real-Time Online Visitors Pulse (fluctuates dynamically every 6 seconds)
  useEffect(() => {
    const visitorInterval = setInterval(() => {
      setOnlineCount((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3; // -3 to +3
        const next = prev + delta;
        return next < 132 ? 138 : next > 168 ? 160 : next;
      });
    }, 6500);

    return () => clearInterval(visitorInterval);
  }, []);

  // 3. Real-Time Event Stream (shows real-time proptech activity toast every 22s)
  useEffect(() => {
    const toastCycle = setInterval(() => {
      setActiveEventIndex((prev) => (prev + 1) % LIVE_EVENTS.length);
      setShowEventToast(true);

      // Automatically hide after 7.5 seconds
      const hideTimeout = setTimeout(() => {
        setShowEventToast(false);
      }, 7500);

      return () => clearTimeout(hideTimeout);
    }, 22000);

    // Trigger first toast after 4s
    const firstTimeout = setTimeout(() => {
      setShowEventToast(true);
    }, 4000);

    return () => {
      clearInterval(toastCycle);
      clearTimeout(firstTimeout);
    };
  }, []);

  const currentEvent = LIVE_EVENTS[activeEventIndex];

  return (
    <>
      {/* Real-Time Live Floating Activity Toast */}
      {showEventToast && !dismissed && (
        <div
          className="realtime-toast-container"
          style={{
            position: "fixed",
            bottom: screenWidth <= 768 ? "78px" : "32px",
            left: screenWidth <= 768 ? "16px" : "24px",
            right: screenWidth <= 768 ? "16px" : "auto",
            zIndex: 899,
            maxWidth: screenWidth <= 768 ? "calc(100% - 32px)" : "380px",
            background: "rgba(15, 23, 42, 0.94)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "14px",
            padding: "12px 14px",
            boxShadow: "0 15px 35px rgba(0, 0, 0, 0.35), 0 0 20px rgba(99, 102, 241, 0.2)",
            animation: "slideInLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
            color: "#ffffff"
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: currentEvent.color,
                border: `1px solid ${currentEvent.color}40`
              }}
            >
              <Activity size={16} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "6px", marginBottom: "3px" }}>
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    letterSpacing: "0.5px",
                    color: currentEvent.color,
                    background: `${currentEvent.color}20`,
                    padding: "2px 7px",
                    borderRadius: "6px",
                    border: `1px solid ${currentEvent.color}35`
                  }}
                >
                  {currentEvent.badge}
                </span>
                <span style={{ fontSize: "0.68rem", color: "#94a3b8" }}>{currentEvent.time}</span>
              </div>

              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#f8fafc", lineHeight: 1.3, marginBottom: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {currentEvent.title}
              </div>

              <div style={{ fontSize: "0.75rem", color: "#cbd5e1", lineHeight: 1.35 }}>
                <strong style={{ color: "#ffffff" }}>{currentEvent.buyer}</strong> {currentEvent.action} • <span style={{ color: "#93c5fd" }}>{currentEvent.city}</span>
              </div>
            </div>

            <button
              onClick={() => setShowEventToast(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#64748b",
                cursor: "pointer",
                padding: "2px",
                display: "flex"
              }}
              title="Close activity"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RealtimeLiveEngine;
