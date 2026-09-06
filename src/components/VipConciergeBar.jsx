import React, { useState } from "react";
import { Phone, Mail, MessageSquare, X, ChevronUp, ShieldCheck, Sparkles, Check } from "lucide-react";
import sanjayPhoto from "../assets/sanjay-kumar.jpg";

export const VipConciergeBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [callbackSent, setCallbackSent] = useState(false);
  const [clientPhone, setClientPhone] = useState("");

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    if (!clientPhone) return;
    setCallbackSent(true);
    setTimeout(() => {
      setCallbackSent(false);
      setClientPhone("");
      setIsOpen(false);
    }, 3000);
  };

  return (
    <div className="vip-dock-container" style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 990 }}>
      {/* Expanded Modal/Card */}
      {isOpen && (
        <div
          className="vip-dock-card"
          style={{
            marginBottom: "14px",
            width: "320px",
            background: "var(--bg-surface)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid rgba(217, 119, 6, 0.35)",
            boxShadow: "0 20px 45px rgba(0, 0, 0, 0.25), 0 0 25px rgba(217, 119, 6, 0.15)",
            overflow: "hidden",
            animation: "fadeInUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          {/* Card Header */}
          <div
            style={{
              padding: "16px 20px",
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "2px solid #d97706",
                  overflow: "hidden",
                  boxShadow: "0 0 12px rgba(217, 119, 6, 0.6)",
                  flexShrink: 0
                }}
              >
                <img
                  src={sanjayPhoto}
                  alt="Sanjay Kumar - Founder"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 800, color: "#ffffff" }}>
                    Sanjay Kumar
                  </h4>
                  <ShieldCheck size={14} color="#10b981" />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#10b981",
                      boxShadow: "0 0 8px #10b981"
                    }}
                  ></span>
                  <span style={{ fontSize: "0.72rem", color: "#93c5fd", fontWeight: 600 }}>
                    Founder Desk (Darbhanga, Bihar) • Online
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#94a3b8",
                cursor: "pointer",
                padding: "4px"
              }}
              aria-label="Close Concierge"
            >
              <X size={18} />
            </button>
          </div>

          {/* Card Body */}
          <div style={{ padding: "18px 20px" }}>
            <div
              style={{
                fontSize: "0.82rem",
                color: "var(--text-secondary)",
                marginBottom: "16px",
                lineHeight: 1.5
              }}
            >
              Direct luxury property inquiries, site visit bookings & bespoke NRI advisory desk.
            </div>

            {/* Quick Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a
                href="tel:+918809604880"
                className="btn btn-gold"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "10px 16px",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  borderRadius: "var(--radius-md)"
                }}
              >
                <Phone size={16} />
                <span>Call +91 8809604880</span>
              </a>

              <a
                href="https://wa.me/918809604880?text=Hi%20Sanjay,%20I%20am%20interested%20in%20luxury%20properties%20on%20EstateHub."
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  padding: "10px 16px",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  borderRadius: "var(--radius-md)",
                  background: "#16a34a",
                  color: "#ffffff",
                  boxShadow: "0 4px 12px rgba(22, 163, 74, 0.3)"
                }}
              >
                <MessageSquare size={16} />
                <span>WhatsApp Instant Chat</span>
              </a>

              <a
                href="mailto:sanjay12012005@gmail.com"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "8px 14px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  background: "var(--bg-secondary)",
                  borderRadius: "var(--radius-md)",
                  textDecoration: "none",
                  border: "1px solid var(--border-color)"
                }}
              >
                <Mail size={14} />
                <span>sanjay12012005@gmail.com</span>
              </a>
            </div>

            {/* Quick 1-Click Callback Request Form */}
            <div style={{ marginTop: "16px", borderTop: "1px solid var(--border-light)", paddingTop: "14px" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase" }}>
                Request Instant VIP Callback
              </div>
              {callbackSent ? (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--accent-emerald)", fontSize: "0.82rem", fontWeight: 700 }}>
                  <Check size={16} />
                  <span>Sanjay Kumar will call you shortly!</span>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} style={{ display: "flex", gap: "6px" }}>
                  <input
                    type="tel"
                    placeholder="Enter your phone"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    required
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-color)",
                      background: "var(--bg-surface)",
                      color: "var(--text-primary)",
                      fontSize: "0.82rem"
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    style={{ padding: "8px 14px", fontSize: "0.8rem", fontWeight: 700 }}
                  >
                    Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Pill Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="vip-concierge-pill"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 18px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#ffffff",
          border: "2px solid #d97706",
          borderRadius: "var(--radius-full)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35), 0 0 20px rgba(217, 119, 6, 0.4)",
          cursor: "pointer",
          transition: "all 0.3s ease",
          outline: "none"
        }}
        aria-label="Toggle Founder VIP Concierge"
      >
        <span
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "1.5px solid #d97706",
            overflow: "hidden",
            flexShrink: 0
          }}
        >
          <img
            src={sanjayPhoto}
            alt="Sanjay Kumar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <span
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 6px #10b981"
            }}
          ></span>
        </span>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#ffffff", letterSpacing: "0.2px" }}>
            Sanjay Kumar
          </div>
          <div style={{ fontSize: "0.68rem", color: "#fbbf24", fontWeight: 700 }}>
            VIP Advisory Desk • Bihar
          </div>
        </div>
        {isOpen ? <X size={16} color="#94a3b8" /> : <Sparkles size={15} color="#fbbf24" />}
      </button>
    </div>
  );
};

export default VipConciergeBar;
