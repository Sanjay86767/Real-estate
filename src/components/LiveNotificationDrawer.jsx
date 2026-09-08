import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  X,
  Radio,
  Flame,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Bell,
  Clock,
  ExternalLink,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sparkles,
  MapPin,
  Building2
} from "lucide-react";

const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "bid",
    category: "LIVE AUCTION",
    color: "#f59e0b",
    title: "New High Bid: ₹19.45 Cr",
    property: "The Imperial Sky Penthouse, Worli Sea Face",
    actor: "Rajiv S. (NRI London)",
    city: "Mumbai",
    time: "32s ago",
    link: "/properties"
  },
  {
    id: "notif-2",
    type: "token",
    category: "ESCROW TOKEN LOCKED",
    color: "#10b981",
    title: "Shubh Muhurat Token ₹51,000 Locked",
    property: "DLF Privana 4BHK High-Rise",
    actor: "Vikram Malhotra (HDFC Escrow)",
    city: "Gurugram",
    time: "1m ago",
    link: "/properties"
  },
  {
    id: "notif-3",
    type: "rera",
    category: "TITLE GREEN SHIELD",
    color: "#6366f1",
    title: "30-Year Non-Encumbrance Clean Pass",
    property: "Mithila Heritage Royal Acres",
    actor: "Legal Audit Panel (99/100)",
    city: "Darbhanga / Patna",
    time: "3m ago",
    link: "/properties"
  },
  {
    id: "notif-4",
    type: "price",
    category: "PRICE DROP ALERT",
    color: "#ef4444",
    title: "Price Reduced by ₹18.5 Lakhs",
    property: "Sobha Tech Park Residencies",
    actor: "Direct Developer Incentive",
    city: "Bengaluru, Whitefield",
    time: "5m ago",
    link: "/properties"
  },
  {
    id: "notif-5",
    type: "visit",
    category: "SITE VISIT CONFIRMED",
    color: "#06b6d4",
    title: "Private Sunset Helipad Inspection",
    property: "Azure Horizon Beach Villa",
    actor: "Sunita & Dr. Rao",
    city: "Goa, Candolim",
    time: "8m ago",
    link: "/properties"
  }
];

const MOCK_NEW_FEED = [
  {
    type: "bid",
    category: "LIVE AUCTION",
    color: "#f59e0b",
    title: "Bid Raised: ₹13.10 Cr Placed",
    property: "Signature Oceanfront Villa Assagao",
    actor: "Tanya C. (Hospitality Group)",
    city: "North Goa",
    link: "/properties"
  },
  {
    type: "visit",
    category: "SITE VISIT BOOKED",
    color: "#06b6d4",
    title: "VIP Chauffeured Site Inspection",
    property: "Lodha World One 4BHK",
    actor: "Anish Agarwal (Founder)",
    city: "Lower Parel, Mumbai",
    link: "/properties"
  },
  {
    type: "token",
    category: "ESCROW RESERVED",
    color: "#10b981",
    title: "15-Minute Deal Room Token Locked",
    property: "Prestige Golfshire Luxury Villa",
    actor: "Kunal & Shreya (NRI Singapore)",
    city: "Nandi Hills, Bengaluru",
    link: "/properties"
  },
  {
    type: "rera",
    category: "RERA APPROVED",
    color: "#6366f1",
    title: "Occupancy Certificate (OC) Received",
    property: "Godrej South Estate Ultra Luxury",
    actor: "RERA Authority New Delhi",
    city: "Okhla, South Delhi",
    link: "/properties"
  }
];

export const LiveNotificationDrawer = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [isPaused, setIsPaused] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Periodically inject new real-time notifications into the stream
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const template = MOCK_NEW_FEED[Math.floor(Math.random() * MOCK_NEW_FEED.length)];
      const newNotif = {
        ...template,
        id: `notif-${Date.now()}`,
        time: "Just now"
      };

      setNotifications((prev) => [newNotif, ...prev.slice(0, 19)]);
    }, 12000);

    return () => clearInterval(interval);
  }, [isPaused]);

  if (!isOpen) return null;

  const filteredNotifs =
    activeTab === "all"
      ? notifications
      : notifications.filter((n) => n.type === activeTab);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        justifyContent: "flex-end",
        animation: "fadeIn 0.2s ease"
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          height: "100%",
          background: "linear-gradient(180deg, #0b1320 0%, #080d16 100%)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "-10px 0 35px rgba(0, 0, 0, 0.6)",
          display: "flex",
          flexDirection: "column",
          color: "#ffffff"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(239, 68, 68, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f87171"
              }}
            >
              <Radio size={18} className="animate-pulse" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#ffffff", margin: 0 }}>
                  India Live Stream
                </h3>
                <span
                  style={{
                    background: "#ef4444",
                    color: "#ffffff",
                    fontSize: "0.62rem",
                    fontWeight: 900,
                    padding: "2px 6px",
                    borderRadius: "4px"
                  }}
                >
                  LIVE
                </span>
              </div>
              <div style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                Real-Time Pan-India PropTech Activity
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Pause / Play Stream */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? "Resume Live Stream" : "Pause Live Stream"}
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "none",
                borderRadius: "8px",
                color: isPaused ? "#f59e0b" : "#94a3b8",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
            >
              {isPaused ? <Play size={15} /> : <Pause size={15} />}
            </button>

            {/* Close Drawer Button */}
            <button
              onClick={onClose}
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "none",
                borderRadius: "8px",
                color: "#ffffff",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Quick Filter Tabs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            padding: "12px 20px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            overflowX: "auto"
          }}
        >
          {[
            { id: "all", label: "All Activity" },
            { id: "bid", label: "🔥 Live Bids" },
            { id: "token", label: "⚡ Escrow Tokens" },
            { id: "rera", label: "🛡️ RERA Clear" },
            { id: "price", label: "📉 Price Drops" }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: isActive ? "rgba(245, 158, 11, 0.2)" : "rgba(255, 255, 255, 0.05)",
                  border: isActive ? "1px solid #f59e0b" : "1px solid transparent",
                  color: isActive ? "#fbbf24" : "#cbd5e1",
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  padding: "5px 12px",
                  borderRadius: "20px",
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Stream List */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          }}
        >
          {filteredNotifs.map((item) => (
            <div
              key={item.id}
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "14px",
                padding: "14px",
                transition: "all 0.2s ease"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "6px"
                }}
              >
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    color: item.color,
                    background: `${item.color}20`,
                    padding: "2px 8px",
                    borderRadius: "6px",
                    border: `1px solid ${item.color}40`,
                    letterSpacing: "0.3px"
                  }}
                >
                  {item.category}
                </span>
                <span style={{ fontSize: "0.7rem", color: "#64748b" }}>{item.time}</span>
              </div>

              <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#ffffff", marginBottom: "4px" }}>
                {item.title}
              </div>

              <div style={{ fontSize: "0.78rem", color: "#94a3b8", marginBottom: "6px" }}>
                <strong style={{ color: "#e2e8f0" }}>{item.property}</strong>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.72rem",
                  color: "#64748b",
                  paddingTop: "6px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.05)"
                }}
              >
                <span>
                  By: <span style={{ color: "#cbd5e1" }}>{item.actor}</span> • {item.city}
                </span>
                <Link
                  to={item.link}
                  onClick={onClose}
                  style={{
                    color: "#38bdf8",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "3px",
                    textDecoration: "none",
                    fontWeight: 700
                  }}
                >
                  <span>View</span>
                  <ExternalLink size={11} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Drawer Footer */}
        <div
          style={{
            padding: "16px 20px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            background: "rgba(0, 0, 0, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.75rem",
            color: "#94a3b8"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <ShieldCheck size={14} color="#10b981" />
            <span>Encrypted Real-Time WebSocket Feed</span>
          </div>
          <span style={{ color: "#10b981", fontWeight: 800 }}>LIVE SYNC</span>
        </div>
      </div>
    </div>
  );
};

export default LiveNotificationDrawer;
