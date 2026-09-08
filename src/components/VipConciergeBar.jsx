import React, { useState } from "react";
import { Phone, Mail, MessageSquare, X, ShieldCheck, Sparkles, Check, Crown, Zap, Calendar } from "lucide-react";
import sanjayPhoto from "../assets/sanjay-kumar.jpg";

export const VipConciergeBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [callbackSent, setCallbackSent] = useState(false);
  const [clientPhone, setClientPhone] = useState("");
  const [activeTab, setActiveTab] = useState("contact"); // "contact" | "schedule"

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
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 990 }}>

      {/* ── Expanded Card ── */}
      {isOpen && (
        <div style={{
          marginBottom: "14px",
          width: "clamp(300px, 90vw, 340px)",
          background: "var(--bg-surface)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: "var(--radius-xl)",
          border: "1px solid rgba(217,119,6,0.35)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.35), 0 0 30px rgba(217,119,6,0.15)",
          overflow: "hidden",
          animation: "fadeInUp 0.28s cubic-bezier(0.16, 1, 0.3, 1)"
        }}>

          {/* Gold gradient header */}
          <div style={{
            padding: "16px 18px",
            background: "linear-gradient(135deg, #0c1526 0%, #1a2540 60%, #0f1f3a 100%)",
            position: "relative", overflow: "hidden"
          }}>
            {/* Subtle orb */}
            <div style={{
              position: "absolute", top: "-20px", right: "-20px",
              width: "90px", height: "90px",
              background: "radial-gradient(circle, rgba(217,119,6,0.2), transparent 70%)",
              borderRadius: "50%", pointerEvents: "none"
            }} />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {/* Avatar with gold ring */}
                <div style={{ position: "relative" }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "50%",
                    background: "conic-gradient(from 0deg, #d97706, #fbbf24, #d97706)",
                    padding: "2px"
                  }}>
                    <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", border: "2px solid #0c1526" }}>
                      <img src={sanjayPhoto} alt="Sanjay Kumar"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  </div>
                  {/* Online dot */}
                  <span style={{
                    position: "absolute", bottom: "1px", right: "1px",
                    width: "10px", height: "10px", borderRadius: "50%",
                    background: "#10b981", border: "2px solid #0c1526",
                    boxShadow: "0 0 6px #10b981"
                  }} />
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Crown size={12} color="#fbbf24" />
                    <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff" }}>Sanjay Kumar</span>
                    <ShieldCheck size={13} color="#10b981" />
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "#93c5fd", fontWeight: 600, marginTop: "2px" }}>
                    Founder • Darbhanga, Bihar • <span style={{ color: "#34d399" }}>● Online</span>
                  </div>
                </div>
              </div>

              <button onClick={() => setIsOpen(false)} style={{
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px", color: "#94a3b8", cursor: "pointer", padding: "5px", display: "flex"
              }}>
                <X size={16} />
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: "6px", marginTop: "12px", flexWrap: "wrap" }}>
              {["RERA Verified", "ISO 9001", "NRI Specialist"].map((badge) => (
                <span key={badge} style={{
                  fontSize: "0.63rem", fontWeight: 700, padding: "2px 8px",
                  borderRadius: "999px", background: "rgba(217,119,6,0.2)",
                  border: "1px solid rgba(217,119,6,0.4)", color: "#fbbf24",
                  textTransform: "uppercase", letterSpacing: "0.4px"
                }}>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Tab switcher */}
          <div style={{ display: "flex", borderBottom: "1px solid var(--border-light)" }}>
            {[
              { key: "contact", label: "Quick Contact", Icon: Zap },
              { key: "schedule", label: "Callback Request", Icon: Calendar }
            ].map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  flex: 1, padding: "10px", fontSize: "0.78rem", fontWeight: 700,
                  background: activeTab === key ? "var(--bg-primary)" : "transparent",
                  borderBottom: activeTab === key ? "2px solid var(--accent-gold)" : "2px solid transparent",
                  color: activeTab === key ? "var(--accent-gold)" : "var(--text-muted)",
                  cursor: "pointer", border: "none", display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "5px", transition: "all 0.2s"
                }}
              >
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>

          {/* Card body */}
          <div style={{ padding: "18px 18px 20px" }}>
            {activeTab === "contact" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.55, margin: "0 0 6px" }}>
                  Direct luxury inquiries, site visits & bespoke NRI advisory — straight to the Founder's desk.
                </p>

                <a href="tel:+918809604880" style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  padding: "12px 16px",
                  background: "linear-gradient(135deg, #92400e, #d97706)",
                  color: "#fff", borderRadius: "var(--radius-md)",
                  fontWeight: 700, fontSize: "0.88rem", textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(217,119,6,0.35)"
                }}>
                  <Phone size={16} /> Call +91 8809604880
                </a>

                <a
                  href="https://wa.me/918809604880?text=Hi%20Sanjay,%20I%20am%20interested%20in%20luxury%20properties%20on%20EstateHub."
                  target="_blank" rel="noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                    padding: "12px 16px",
                    background: "linear-gradient(135deg, #16a34a, #15803d)",
                    color: "#fff", borderRadius: "var(--radius-md)",
                    fontWeight: 700, fontSize: "0.88rem", textDecoration: "none",
                    boxShadow: "0 4px 16px rgba(22,163,74,0.3)"
                  }}
                >
                  <MessageSquare size={16} /> WhatsApp Instant Chat
                </a>

                <a href="mailto:sanjay12012005@gmail.com" style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "9px 14px",
                  background: "var(--bg-secondary)", border: "1px solid var(--border-light)",
                  color: "var(--text-secondary)", borderRadius: "var(--radius-md)",
                  fontWeight: 600, fontSize: "0.82rem", textDecoration: "none"
                }}>
                  <Mail size={14} /> sanjay12012005@gmail.com
                </a>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", margin: "0 0 14px", lineHeight: 1.55 }}>
                  Leave your number — Sanjay Kumar will personally call you within 15 minutes during business hours.
                </p>
                {callbackSent ? (
                  <div style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
                    borderRadius: "var(--radius-md)", padding: "14px 16px",
                    color: "#10b981", fontWeight: 700, fontSize: "0.88rem"
                  }}>
                    <Check size={18} />
                    <div>
                      <div>Callback Requested!</div>
                      <div style={{ fontSize: "0.75rem", fontWeight: 500, color: "#6ee7b7", marginTop: "2px" }}>
                        Sanjay Kumar will call you shortly.
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleCallbackSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <input
                      type="tel"
                      placeholder="Your mobile number (e.g. 9800...)"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      required
                      style={{
                        padding: "10px 14px", borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-light)",
                        background: "var(--bg-secondary)", color: "var(--text-primary)",
                        fontSize: "0.85rem", outline: "none", width: "100%"
                      }}
                    />
                    <button type="submit" style={{
                      padding: "11px", background: "var(--accent-primary)", color: "#fff",
                      borderRadius: "var(--radius-md)", border: "none", fontWeight: 700,
                      fontSize: "0.88rem", cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(37,99,235,0.3)"
                    }}>
                      Request VIP Callback
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Floating Pill ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex", alignItems: "center", gap: "10px",
          padding: "10px 18px",
          background: "linear-gradient(135deg, #0c1526 0%, #1a2540 100%)",
          color: "#fff",
          border: "2px solid #d97706",
          borderRadius: "var(--radius-full)",
          boxShadow: isOpen
            ? "0 12px 32px rgba(0,0,0,0.4), 0 0 24px rgba(217,119,6,0.5)"
            : "0 8px 24px rgba(0,0,0,0.35), 0 0 18px rgba(217,119,6,0.35)",
          cursor: "pointer",
          transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
          outline: "none",
          transform: isOpen ? "scale(0.96)" : "scale(1)"
        }}
        onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.45), 0 0 28px rgba(217,119,6,0.55)"; }}
        onMouseLeave={(e) => { if (!isOpen) e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.35), 0 0 18px rgba(217,119,6,0.35)"; }}
        aria-label="VIP Concierge"
      >
        {/* Avatar */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden", border: "1.5px solid #d97706" }}>
            <img src={sanjayPhoto} alt="Sanjay Kumar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <span style={{
            position: "absolute", bottom: "0", right: "0",
            width: "8px", height: "8px", borderRadius: "50%",
            background: "#10b981", border: "1.5px solid #0c1526",
            boxShadow: "0 0 6px #10b981"
          }} />
        </div>

        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#fff", letterSpacing: "0.2px" }}>
            Sanjay Kumar
          </div>
          <div style={{ fontSize: "0.67rem", color: "#fbbf24", fontWeight: 700 }}>
            VIP Advisory • Bihar
          </div>
        </div>

        <Sparkles size={14} color="#fbbf24" style={{
          animation: isOpen ? "none" : "pulse 2s ease-in-out infinite"
        }} />
      </button>
    </div>
  );
};

export default VipConciergeBar;
