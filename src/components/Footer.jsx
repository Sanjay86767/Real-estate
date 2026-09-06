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

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} EstateHub Technologies Ltd. All rights reserved.</p>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link to="/about" style={{ color: "#64748b" }}>Privacy Policy</Link>
            <Link to="/about" style={{ color: "#64748b" }}>Terms of Service</Link>
            <Link to="/contact" style={{ color: "#64748b" }}>RERA Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
