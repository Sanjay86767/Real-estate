import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, ShieldCheck, Award, MessageSquare } from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";
import sanjayPhoto from "../assets/sanjay-kumar.jpg";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = usePropertyContext();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      addToast("Please enter a valid email address", "warning");
      return;
    }
    setSubscribed(true);
    addToast("Subscribed to EstateHub VIP Newsletter!", "success");
    setEmail("");
  };

  return (
    <footer className="footer-main">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand">
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "var(--accent-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff"
                }}
              >
                <Building2 size={20} />
              </div>
              <h3 style={{ margin: 0 }}>EstateHub</h3>
            </div>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: "1.7", marginBottom: "20px" }}>
              Your trusted partner in luxury villas, residential high-rises, and prime commercial plots across Chandigarh, Mohali, Delhi NCR, and major metropolitan cities.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#cbd5e1", fontSize: "0.85rem" }}>
                <MapPin size={16} color="var(--accent-primary)" />
                <span>Sector 17, Chandigarh, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/properties">All Properties</Link>
              <Link to="/agents">Our Agents</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact Support</Link>
              <Link to="/favorites">Saved Properties</Link>
            </div>
          </div>

          {/* Property Types */}
          <div className="footer-column">
            <h4>Property Types</h4>
            <div className="footer-links">
              <Link to="/properties?type=Villa">Luxury Villas</Link>
              <Link to="/properties?type=Apartment">Modern Apartments</Link>
              <Link to="/properties?type=Penthouse">Penthouses</Link>
              <Link to="/properties?type=House">Independent Houses</Link>
              <Link to="/properties?type=Plot">Residential Plots</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-column">
            <h4>Get Prime Listings</h4>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "16px" }}>
              Subscribe to get exclusive price-drop alerts, new project launches, and market insights directly to your inbox.
            </p>
            {subscribed ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent-emerald)", fontSize: "0.9rem" }}>
                <CheckCircle2 size={18} />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "8px" }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid #334155",
                    background: "#0f172a",
                    color: "#f8fafc",
                    fontSize: "0.9rem",
                    outline: "none"
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  style={{ padding: "0 16px" }}
                  aria-label="Submit newsletter"
                >
                  <Send size={16} />
                </button>
              </form>
            )}
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem", color: "#94a3b8" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Phone size={14} color="var(--accent-primary)" />
                <a href="tel:+918809604880" style={{ color: "#cbd5e1" }}>+91 8809604880</a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Mail size={14} color="var(--accent-primary)" />
                <a href="mailto:sanjay12012005@gmail.com" style={{ color: "#cbd5e1" }}>sanjay12012005@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* EXECUTIVE FOUNDER & VIP DESK SPOTLIGHT */}
        <div
          className="founder-luxury-card"
          style={{
            marginTop: "48px",
            marginBottom: "36px",
            padding: "36px 32px"
          }}
        >
          {/* Subtle Ambient Golden Glow */}
          <div
            style={{
              position: "absolute",
              top: "-60px",
              right: "-60px",
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(217, 119, 6, 0.3) 0%, transparent 70%)",
              pointerEvents: "none"
            }}
          />

          {/* Top Row: Founder Identity & Bio */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
            {/* Animated Luxury Conic Border Frame for Sanjay Kumar */}
            <div className="pro-founder-avatar-frame" title="Sanjay Kumar - Founder & Luxury Strategist">
              <div className="pro-founder-avatar-inner">
                <img
                  src={sanjayPhoto}
                  alt="Sanjay Kumar - Founder"
                  className="pro-founder-avatar-img"
                />
              </div>
              <span
                className="pro-founder-live-pulse"
                title="Sanjay Kumar Direct VIP Desk Online"
              ></span>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "6px" }}>
                <h3 style={{ margin: 0, fontSize: "1.65rem", fontWeight: 800, color: "#ffffff", letterSpacing: "0.2px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <span>Sanjay Kumar</span>
                  <Award size={20} color="var(--accent-gold)" />
                </h3>
                <span
                  style={{
                    padding: "4px 12px",
                    background: "rgba(217, 119, 6, 0.2)",
                    border: "1px solid rgba(217, 119, 6, 0.6)",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: "var(--accent-gold)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}
                >
                  Founder & Principal Luxury Strategist
                </span>
                <span
                  style={{
                    padding: "4px 12px",
                    background: "rgba(59, 130, 246, 0.18)",
                    border: "1px solid rgba(59, 130, 246, 0.45)",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: "#93c5fd"
                  }}
                >
                  📍 Darbhanga, Bihar Roots
                </span>
                <span style={{ fontSize: "0.78rem", color: "#10b981", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }}></span>
                  Direct Desk Online & Available
                </span>
              </div>
              <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.94rem", lineHeight: 1.65, maxWidth: "840px" }}>
                Proudly hailing from Darbhanga, Bihar, Sanjay Kumar spearheads EstateHub's elite luxury real estate network — advising high-net-worth families, entrepreneurs, and NRI investors in securing ultra-luxury villas, sky penthouses, and clear-title commercial estates across Chandigarh, Mohali, Gurugram, Bangalore & Bihar.
              </p>
            </div>
          </div>

          {/* Bottom Row: Phone Number & Contact Actions Placed Cleanly Below */}
          <div
            style={{
              paddingTop: "20px",
              borderTop: "1px solid rgba(255, 255, 255, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px"
            }}
          >
            {/* Direct VIP Contact Action Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <a
                href="tel:+918809604880"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 24px",
                  background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  textDecoration: "none",
                  borderRadius: "var(--radius-full)",
                  boxShadow: "0 6px 20px rgba(217, 119, 6, 0.45)",
                  letterSpacing: "0.5px"
                }}
                title="Direct Call Founder Sanjay Kumar"
              >
                <Phone size={18} />
                <span>Call +91 8809604880</span>
              </a>

              <a
                href="https://wa.me/918809604880?text=Hi%20Sanjay,%20I%20am%20interested%20in%20luxury%20properties%20on%20EstateHub."
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 24px",
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  textDecoration: "none",
                  borderRadius: "var(--radius-full)",
                  boxShadow: "0 6px 20px rgba(16, 185, 129, 0.45)",
                  letterSpacing: "0.5px"
                }}
                title="Direct WhatsApp with Founder Sanjay Kumar"
              >
                <MessageSquare size={18} />
                <span>WhatsApp +91 8809604880</span>
              </a>

              <a
                href="mailto:sanjay12012005@gmail.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 20px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#e2e8f0",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  borderRadius: "var(--radius-full)"
                }}
                title="Email Sanjay Kumar"
              >
                <Mail size={16} />
                <span>sanjay12012005@gmail.com</span>
              </a>
            </div>

            {/* Official RERA Verification Pill */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "#94a3b8" }}>
              <span style={{ color: "var(--accent-gold)", fontWeight: 700 }}>RERA Certified:</span>
              <span
                style={{
                  padding: "4px 10px",
                  background: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid #334155",
                  borderRadius: "4px",
                  fontFamily: "monospace",
                  color: "#cbd5e1",
                  fontSize: "0.8rem",
                  fontWeight: 700
                }}
              >
                RERA-IND-ESTATE-2024-SK
              </span>
            </div>
          </div>
        </div>

        {/* INSTITUTIONAL TRUST & REGULATORY ACCREDITATIONS */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            padding: "20px 24px",
            marginBottom: "32px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px"
          }}
        >
          <div>
            <div style={{ fontSize: "0.74rem", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
              Pan-India RERA Accreditations & Compliance
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", fontSize: "0.75rem" }}>
              <span style={{ background: "rgba(255, 255, 255, 0.05)", padding: "4px 10px", borderRadius: "6px", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#e2e8f0" }}>
                🏛️ MahaRERA: A51900001889
              </span>
              <span style={{ background: "rgba(255, 255, 255, 0.05)", padding: "4px 10px", borderRadius: "6px", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#e2e8f0" }}>
                🏛️ Karnataka RERA: PRM/KA/1251
              </span>
              <span style={{ background: "rgba(255, 255, 255, 0.05)", padding: "4px 10px", borderRadius: "6px", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#e2e8f0" }}>
                🏛️ Haryana HRERA: GGM-1092
              </span>
              <span style={{ background: "rgba(245, 158, 11, 0.12)", padding: "4px 10px", borderRadius: "6px", border: "1px solid rgba(245, 158, 11, 0.3)", color: "#fbbf24", fontWeight: 700 }}>
                👑 Bihar RERA: BRERA-00921 (Sanjay Kumar Desk)
              </span>
              <span style={{ background: "rgba(255, 255, 255, 0.05)", padding: "4px 10px", borderRadius: "6px", border: "1px solid rgba(255, 255, 255, 0.1)", color: "#e2e8f0" }}>
                🏛️ UP RERA: UPRERA-9021
              </span>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.74rem", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
              RBI-Approved Escrow & Security
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.78rem", color: "#cbd5e1" }}>
              <span style={{ color: "#38bdf8", fontWeight: 700 }}>HDFC Escrow</span> •
              <span style={{ color: "#f59e0b", fontWeight: 700 }}>ICICI Bank</span> •
              <span style={{ color: "#10b981", fontWeight: 700 }}>SBI Global</span> •
              <span style={{ color: "#a78bfa", fontWeight: 700 }}>256-Bit TLS</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.88rem" }}>
              © {new Date().getFullYear()} EstateHub Technologies Ltd. Handcrafted & Led by <strong>Sanjay Kumar</strong>.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "6px", fontSize: "0.8rem", color: "#64748b" }}>
              <span>📞 Hotline: <a href="tel:+918809604880" style={{ color: "var(--accent-primary)", fontWeight: 700 }}>+91 8809604880</a></span>
              <span>•</span>
              <span>✉️ <a href="mailto:sanjay12012005@gmail.com" style={{ color: "#cbd5e1" }}>sanjay12012005@gmail.com</a></span>
              <span>•</span>
              <span style={{ color: "var(--accent-emerald)", fontWeight: 700 }}>🟢 Live on Vercel</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
            <Link to="/about" style={{ color: "#64748b", fontSize: "0.85rem" }}>Privacy Policy</Link>
            <Link to="/about" style={{ color: "#64748b", fontSize: "0.85rem" }}>Terms of Service</Link>
            <Link to="/contact" style={{ color: "#64748b", fontSize: "0.85rem" }}>RERA Compliance</Link>
            <a
              href="https://github.com/Sanjay86767/Real-estate"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--accent-primary)", fontSize: "0.85rem", fontWeight: 700 }}
            >
              GitHub Code ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
