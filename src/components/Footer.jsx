import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";

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
          style={{
            marginTop: "48px",
            marginBottom: "36px",
            padding: "24px 30px",
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)",
            border: "1px solid rgba(217, 119, 6, 0.4)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.35), 0 0 30px rgba(217, 119, 6, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px"
          }}
        >
          {/* Founder Bio & Identity */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <div
              style={{
                position: "relative",
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                border: "2px solid #d97706",
                overflow: "hidden",
                boxShadow: "0 0 16px rgba(217, 119, 6, 0.5)",
                flexShrink: 0
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
                alt="Sanjay Kumar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#10b981",
                  border: "2px solid #0f172a",
                  boxShadow: "0 0 8px #10b981"
                }}
              ></span>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800, color: "#ffffff", letterSpacing: "0.2px" }}>
                  Sanjay Kumar
                </h3>
                <span
                  style={{
                    padding: "3px 10px",
                    background: "rgba(217, 119, 6, 0.2)",
                    border: "1px solid rgba(217, 119, 6, 0.5)",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--accent-gold)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}
                >
                  Founder & Principal Strategist
                </span>
                <span style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span>
                  Direct Desk Online
                </span>
              </div>
              <p style={{ margin: "6px 0 0", color: "#94a3b8", fontSize: "0.86rem", lineHeight: 1.5 }}>
                Direct luxury estate acquisitions, ultra-HNW portfolio structuring & turnkey architectural development.
              </p>
            </div>
          </div>

          {/* Quick Contact Action Pills */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <a
              href="tel:+918809604880"
              className="btn btn-gold"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                fontSize: "0.88rem",
                fontWeight: 700,
                textDecoration: "none",
                borderRadius: "var(--radius-full)",
                boxShadow: "0 4px 15px rgba(217, 119, 6, 0.4)"
              }}
              title="Call Sanjay Kumar directly"
            >
              <Phone size={16} />
              <span>+91 8809604880</span>
            </a>

            <a
              href="https://wa.me/918809604880?text=Hi%20Sanjay,%20I%20am%20interested%20in%20luxury%20properties%20on%20EstateHub."
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                fontSize: "0.88rem",
                fontWeight: 700,
                textDecoration: "none",
                borderRadius: "var(--radius-full)",
                background: "#16a34a",
                color: "#ffffff",
                boxShadow: "0 4px 15px rgba(22, 163, 74, 0.35)",
                transition: "all 0.2s ease"
              }}
              title="Chat with Sanjay on WhatsApp"
            >
              <span>💬 WhatsApp</span>
            </a>

            <a
              href="mailto:sanjay12012005@gmail.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none",
                borderRadius: "var(--radius-full)",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#f8fafc",
                transition: "all 0.2s ease"
              }}
              title="Email Sanjay Kumar"
            >
              <Mail size={15} />
              <span>sanjay12012005@gmail.com</span>
            </a>
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
