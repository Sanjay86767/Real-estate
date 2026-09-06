import React, { useState, useMemo } from "react";
import {
  X,
  FileText,
  Search,
  Printer,
  Download,
  ShieldCheck,
  Building2,
  MapPin,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Phone,
  MessageSquare
} from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";
import PropertyBrochureModal from "./PropertyBrochureModal";
import { playClickSound } from "../utils/effects";
import sanjayPhoto from "../assets/sanjay-kumar.jpg";

export const BrochureHubModal = ({ onClose }) => {
  const { properties, formatPrice } = usePropertyContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [bhkFilter, setBhkFilter] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Filter properties matching search and BHK
  const filteredBrochures = useMemo(() => {
    let list = properties;
    if (bhkFilter !== "all") {
      if (bhkFilter === "1") list = list.filter((p) => p.bedrooms === 1);
      else if (bhkFilter === "2") list = list.filter((p) => p.bedrooms === 2);
      else if (bhkFilter === "3") list = list.filter((p) => p.bedrooms === 3);
      else if (bhkFilter === "4") list = list.filter((p) => p.bedrooms === 4);
      else if (bhkFilter === "5") list = list.filter((p) => p.bedrooms >= 5);
      else if (bhkFilter === "bihar") list = list.filter((p) => (p.state && p.state.toLowerCase().includes("bihar")) || (p.city && (p.city.toLowerCase().includes("patna") || p.city.toLowerCase().includes("darbhanga"))));
      else if (bhkFilter === "mumbai") list = list.filter((p) => p.city && (p.city.toLowerCase().includes("mumbai") || p.city.toLowerCase().includes("pune")));
    }

    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          (p.state && p.state.toLowerCase().includes(q)) ||
          p.location.toLowerCase().includes(q) ||
          (p.reraId && p.reraId.toLowerCase().includes(q)) ||
          (p.bhk && p.bhk.toLowerCase().includes(q))
      );
    }
    return list.slice(0, 36); // Return top 36 for lightning-fast rendering
  }, [properties, searchTerm, bhkFilter]);

  // Signature Spotlight Residences for Quick Preview
  const spotlightDossiers = useMemo(() => {
    return properties.filter((p) => p.id === 1 || p.id === 2 || p.id === 3 || p.id === 4 || p.id === 58);
  }, [properties]);

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 1100 }}>
        <div
          className="modal-container"
          style={{
            maxWidth: "920px",
            maxHeight: "92vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            padding: 0,
            borderRadius: "var(--radius-xl)",
            background: "var(--bg-surface)",
            border: "1.5px solid var(--accent-gold)"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Banner */}
          <div
            style={{
              padding: "20px 24px",
              background: "linear-gradient(135deg, #0b1120 0%, #1e293b 100%)",
              color: "#ffffff",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #d97706, #fbbf24)",
                  color: "#0f172a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 15px rgba(251, 191, 36, 0.4)"
                }}
              >
                <FileText size={24} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <h2 style={{ fontSize: "1.35rem", margin: 0, fontWeight: 800, color: "#ffffff" }}>
                    Digital Property Brochure Center
                  </h2>
                  <span
                    style={{
                      background: "rgba(16, 185, 129, 0.2)",
                      color: "#34d399",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: "12px",
                      border: "1px solid rgba(16, 185, 129, 0.4)"
                    }}
                  >
                    10,000+ OFFICIAL PDFs
                  </span>
                </div>
                <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#94a3b8" }}>
                  Download, preview, and print official RERA investment prospectuses, CAD floor plans & Vastu compliance sheets.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn-icon"
              style={{ color: "#ffffff", background: "rgba(255,255,255,0.12)", width: "36px", height: "36px" }}
              title="Close Brochure Center"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search & Configuration Filter Bar */}
          <div style={{ padding: "16px 24px", background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-light)" }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
              <div style={{ position: "relative", flex: 1 }}>
                <Search
                  size={17}
                  style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search 10,000 properties by name, city (Patna, Darbhanga, Mumbai, Bangalore...), or RERA..."
                  style={{
                    width: "100%",
                    padding: "10px 14px 10px 42px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-light)",
                    background: "var(--bg-surface)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    outline: "none"
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Filter Chips */}
            <div style={{ display: "flex", gap: "6px", overflowX: "auto", scrollbarWidth: "none", paddingBottom: "2px" }}>
              {[
                { label: "All Residences (10,000)", key: "all" },
                { label: "1 BHK (5,450+ Units)", key: "1" },
                { label: "2 BHK (2,500+ Units)", key: "2" },
                { label: "3 BHK (1,300+ Units)", key: "3" },
                { label: "4 BHK (500+ Units)", key: "4" },
                { label: "5+ BHK Sky Villas", key: "5" },
                { label: "📍 Bihar (Darbhanga/Patna)", key: "bihar" },
                { label: "📍 Mumbai & Pune", key: "mumbai" }
              ].map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setBhkFilter(chip.key);
                  }}
                  className={`chip-btn ${bhkFilter === chip.key ? "active" : ""}`}
                  style={{
                    fontSize: "0.75rem",
                    padding: "5px 12px",
                    borderRadius: "var(--radius-full)",
                    whiteSpace: "nowrap"
                  }}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
            {/* Founder Advisory Callout */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 18px",
                background: "rgba(217, 119, 6, 0.08)",
                border: "1px solid rgba(217, 119, 6, 0.3)",
                borderRadius: "var(--radius-md)",
                marginBottom: "20px",
                flexWrap: "wrap",
                gap: "10px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img
                  src={sanjayPhoto}
                  alt="Sanjay Kumar"
                  style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover", border: "1.5px solid #d97706" }}
                />
                <div>
                  <strong style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>
                    Founder Advisory Desk: Sanjay Kumar (Darbhanga, Bihar)
                  </strong>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block" }}>
                    Need a custom multi-property investment dossier or institutional NRI report?
                  </span>
                </div>
              </div>
              <a
                href="https://wa.me/918809604880?text=Hello%20Sanjay%20ji,%20please%20send%20me%20the%20complete%20custom%20real%20estate%20investment%20brochure."
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm"
                style={{
                  background: "#16a34a",
                  color: "#ffffff",
                  gap: "6px",
                  fontSize: "0.78rem",
                  padding: "6px 14px"
                }}
              >
                <MessageSquare size={14} />
                <span>WhatsApp Request</span>
              </a>
            </div>

            {/* Brochures Grid */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                Showing <strong>{filteredBrochures.length}</strong> available PDF brochures
              </span>
              <span style={{ fontSize: "0.76rem", color: "var(--accent-gold)", fontWeight: 700 }}>
                ✔ 100% RERA Verified Dossiers
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
              {filteredBrochures.map((prop) => (
                <div
                  key={prop.id}
                  style={{
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s ease, border-color 0.2s ease",
                    cursor: "pointer"
                  }}
                  className="brochure-card-item"
                  onClick={() => {
                    playClickSound();
                    setSelectedProperty(prop);
                  }}
                >
                  <div style={{ height: "130px", position: "relative", overflow: "hidden" }}>
                    <img
                      src={(prop.images && prop.images[0]) || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"}
                      alt={prop.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "8px",
                        left: "8px",
                        background: "rgba(15, 23, 42, 0.85)",
                        color: "#38bdf8",
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        padding: "2px 6px",
                        borderRadius: "4px"
                      }}
                    >
                      {prop.bhk || (prop.bedrooms > 0 ? `${prop.bedrooms} BHK` : "Plot")}
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        bottom: "8px",
                        right: "8px",
                        background: "rgba(15, 23, 42, 0.85)",
                        color: "#fbbf24",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        padding: "2px 8px",
                        borderRadius: "4px"
                      }}
                    >
                      {prop.priceFormatted || formatPrice(prop.price)}
                    </span>
                  </div>

                  <div style={{ padding: "12px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <h4 style={{ fontSize: "0.88rem", fontWeight: 700, margin: "0 0 4px", color: "var(--text-primary)", lineHeight: "1.3" }}>
                        {prop.title}
                      </h4>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "8px" }}>
                        <MapPin size={12} color="var(--accent-primary)" />
                        <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {prop.city}, {prop.state}
                        </span>
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "var(--accent-emerald)", fontWeight: 700, marginBottom: "10px" }}>
                        RERA: {prop.reraId}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      style={{ width: "100%", gap: "6px", fontSize: "0.78rem", padding: "6px" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        playClickSound();
                        setSelectedProperty(prop);
                      }}
                    >
                      <FileText size={13} />
                      <span>View & Print PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Render selected Property Brochure */}
      {selectedProperty && (
        <PropertyBrochureModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </>
  );
};

export default BrochureHubModal;
