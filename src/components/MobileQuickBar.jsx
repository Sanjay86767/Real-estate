import React from "react";
import { Phone, MessageSquare, Mail } from "lucide-react";

export const MobileQuickBar = () => {
  return (
    <div className="mobile-quick-dock">
      <div className="mobile-quick-content">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "2px solid #d97706",
              overflow: "hidden",
              flexShrink: 0
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80"
              alt="Sanjay Kumar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#ffffff", lineHeight: 1.2 }}>
              Sanjay Kumar
            </div>
            <div style={{ fontSize: "0.68rem", color: "#10b981", fontWeight: 700 }}>
              🟢 Direct Founder Desk
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <a
            href="tel:+918809604880"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "7px 12px",
              background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
              color: "#ffffff",
              borderRadius: "var(--radius-full)",
              fontSize: "0.78rem",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 3px 10px rgba(217, 119, 6, 0.4)"
            }}
          >
            <Phone size={13} />
            <span>Call</span>
          </a>

          <a
            href="https://wa.me/918809604880?text=Hi%20Sanjay,%20I%20am%20interested%20in%20luxury%20properties%20on%20EstateHub."
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "7px 12px",
              background: "#16a34a",
              color: "#ffffff",
              borderRadius: "var(--radius-full)",
              fontSize: "0.78rem",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 3px 10px rgba(22, 163, 74, 0.35)"
            }}
          >
            <MessageSquare size={13} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileQuickBar;
