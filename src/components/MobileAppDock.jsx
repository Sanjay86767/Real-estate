import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Heart, Calculator, User, Settings, Phone, MessageSquare, Mail, X, ShieldCheck, Sparkles } from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";
import sanjayPhoto from "../assets/sanjay-kumar.jpg";

export const MobileAppDock = () => {
  const location = useLocation();
  const { favorites, user } = usePropertyContext();
  const [showVipSheet, setShowVipSheet] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Floating Glassmorphic App Dock (Screens <= 768px) */}
      <div className="mobile-app-dock" aria-label="Mobile Navigation Dock">
        <div className="mobile-dock-wrapper">
          {/* 1. Home */}
          <Link
            to="/"
            className={`dock-item ${isActive("/") ? "active" : ""}`}
            title="Home"
          >
            <Home size={19} />
            <span>Home</span>
          </Link>

          {/* 2. Explore Properties */}
          <Link
            to="/properties"
            className={`dock-item ${isActive("/properties") ? "active" : ""}`}
            title="Explore Properties"
          >
            <Search size={19} />
            <span>Explore</span>
          </Link>

          {/* 3. VIP Founder Sanjay Desk Button (Center Hero Button) */}
          <button
            type="button"
            className="dock-hero-btn"
            onClick={() => setShowVipSheet(true)}
            title="Sanjay Kumar VIP Advisory Desk"
          >
            <div className="dock-hero-avatar">
              <img src={sanjayPhoto} alt="Sanjay Kumar" />
              <span className="dock-hero-live-dot"></span>
            </div>
            <span>VIP Desk</span>
          </button>

          {/* 4. EMI & Finance Studio */}
          <Link
            to="/affordability"
            className={`dock-item ${isActive("/affordability") ? "active" : ""}`}
            title="Mortgage & EMI Calculator"
          >
            <Calculator size={19} />
            <span>Finance</span>
          </Link>

          {/* 5. Saved Shortlist */}
          <Link
            to="/favorites"
            className={`dock-item ${isActive("/favorites") ? "active" : ""}`}
            title="Saved Residences"
          >
            <div style={{ position: "relative", display: "inline-flex" }}>
              <Heart size={19} />
              {favorites && favorites.length > 0 && (
                <span className="dock-badge">{favorites.length}</span>
              )}
            </div>
            <span>Saved</span>
          </Link>

          {/* 6. VIP Account / Sign In */}
          <Link
            to="/login"
            className={`dock-item ${isActive("/login") ? "active" : ""}`}
            title={user ? `VIP Member: ${user.name}` : "Sign In / Register"}
          >
            <User size={19} />
            <span>{user ? "Profile" : "Sign In"}</span>
          </Link>
        </div>
      </div>

      {/* Slide-Up VIP Advisory Bottom Sheet (for Mobile) */}
      {showVipSheet && (
        <div className="dock-sheet-backdrop" onClick={() => setShowVipSheet(false)}>
          <div className="dock-sheet-container" onClick={(e) => e.stopPropagation()}>
            <div className="dock-sheet-handle"></div>

            <div className="dock-sheet-header">
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div className="dock-sheet-avatar">
                  <img src={sanjayPhoto} alt="Sanjay Kumar - Founder" />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, color: "#ffffff" }}>
                      Sanjay Kumar
                    </h3>
                    <ShieldCheck size={16} color="#10b981" />
                  </div>
                  <div style={{ fontSize: "0.74rem", color: "#93c5fd", fontWeight: 600, marginTop: "2px" }}>
                    🟢 Founder & Principal Consultant • Darbhanga, Bihar
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowVipSheet(false)}
                className="dock-sheet-close"
                aria-label="Close VIP Sheet"
              >
                <X size={18} />
              </button>
            </div>

            <div className="dock-sheet-body">
              <p style={{ fontSize: "0.84rem", color: "var(--text-secondary)", margin: "0 0 16px", lineHeight: 1.5 }}>
                Direct luxury portfolio advisory, off-market villa access, and instant private site tour clearance.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <a
                  href="tel:+918809604880"
                  className="dock-action-call"
                  style={{ textDecoration: "none" }}
                >
                  <Phone size={17} />
                  <span>Call Founder: +91 8809604880</span>
                </a>

                <a
                  href="https://wa.me/918809604880?text=Hi%20Sanjay,%20I%20am%20exploring%20luxury%20properties%20on%20EstateHub%20and%20need%20private%20advisory."
                  target="_blank"
                  rel="noreferrer"
                  className="dock-action-wa"
                  style={{ textDecoration: "none" }}
                >
                  <MessageSquare size={17} />
                  <span>Instant WhatsApp Chat</span>
                </a>

                <a
                  href="mailto:sanjay12012005@gmail.com"
                  className="dock-action-mail"
                  style={{ textDecoration: "none" }}
                >
                  <Mail size={15} />
                  <span>sanjay12012005@gmail.com</span>
                </a>
              </div>

              <div className="dock-sheet-footer-stats">
                <div>
                  <strong style={{ color: "#d97706" }}>10,000+</strong>
                  <span>Pan-India Portfolios</span>
                </div>
                <div>
                  <strong style={{ color: "#10b981" }}>100%</strong>
                  <span>RERA Verified</span>
                </div>
                <div>
                  <strong style={{ color: "#6366f1" }}>15 Mins</strong>
                  <span>Avg Response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileAppDock;
