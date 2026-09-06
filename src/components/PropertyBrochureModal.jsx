import React, { useRef } from "react";
import {
  X,
  Printer,
  Download,
  ShieldCheck,
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  Award,
  QrCode,
  Share2
} from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";
import { playSuccessSound } from "../utils/effects";

export const PropertyBrochureModal = ({ property, agent, onClose }) => {
  const { formatPrice, formatArea, currency } = usePropertyContext();
  const printContentRef = useRef(null);

  const handlePrint = () => {
    playSuccessSound();
    window.print();
  };

  const pricePerSqFt = Math.round(property.price / (property.area || 1));

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container brochure-modal-container"
        style={{
          maxWidth: "840px",
          maxHeight: "92vh",
          overflowY: "auto",
          padding: 0,
          borderRadius: "var(--radius-xl)",
          background: "#ffffff",
          color: "#0f172a"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Actions Toolbar (hidden during print) */}
        <div
          className="no-print"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "#0f172a",
            color: "#ffffff",
            padding: "12px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 4px 14px rgba(0,0,0,0.2)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Award size={18} color="#fbbf24" />
            <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>
              Official Investment Memorandum & Property Prospectus
            </span>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              onClick={handlePrint}
              className="btn btn-primary btn-sm"
              style={{ gap: "6px", background: "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "#fff" }}
            >
              <Printer size={16} />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="btn-icon"
              style={{ color: "#ffffff", background: "rgba(255,255,255,0.15)", width: "34px", height: "34px" }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Brochure Document Body */}
        <div ref={printContentRef} className="printable-brochure-sheet" style={{ padding: "40px" }}>
          {/* Header Brand Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "2px solid #e2e8f0",
              paddingBottom: "20px",
              marginBottom: "28px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "8px",
                  background: "#2563eb",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Building2 size={24} />
              </div>
              <div>
                <h2 style={{ fontSize: "1.5rem", margin: 0, fontWeight: 800, letterSpacing: "-0.03em" }}>
                  Estate<span style={{ color: "#2563eb" }}>Hub</span>
                </h2>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b" }}>
                  Private Client Real Estate Advisory
                </span>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  background: "#ecfdf5",
                  color: "#059669",
                  fontSize: "0.75rem",
                  fontWeight: 700
                }}
              >
                <ShieldCheck size={14} />
                RERA APPROVED • CERTIFIED
              </div>
              <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "4px" }}>
                Document Ref: EH-MEMO-{property.id}-2026
              </div>
            </div>
          </div>

          {/* Cover Hero & Highlights */}
          <div style={{ marginBottom: "28px" }}>
            <div
              style={{
                height: "300px",
                borderRadius: "12px",
                overflow: "hidden",
                position: "relative",
                marginBottom: "20px"
              }}
            >
              <img
                src={property.images[0]}
                alt={property.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(transparent, rgba(15, 23, 42, 0.9))",
                  padding: "24px",
                  color: "#ffffff"
                }}
              >
                <div style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#93c5fd" }}>
                  {property.type} • {property.status}
                </div>
                <h1 style={{ fontSize: "2rem", margin: "4px 0", fontWeight: 800 }}>{property.title}</h1>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.95rem" }}>
                  <MapPin size={16} color="#60a5fa" />
                  <span>{property.address}</span>
                </div>
              </div>
            </div>

            {/* Price Banner & Area */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.5fr 1fr 1fr",
                gap: "16px",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "18px 24px"
              }}
            >
              <div>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                  Acquisition Valuation
                </span>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1e293b" }}>
                  {formatPrice(property.price)}
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                  Super Built-up Area
                </span>
                <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#2563eb" }}>
                  {formatArea(property.area)}
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                  Price / Sq.Ft
                </span>
                <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#059669" }}>
                  ₹{pricePerSqFt.toLocaleString("en-IN")}
                </div>
              </div>
            </div>
          </div>

          {/* Architectural Overview & Specifications Table */}
          <div style={{ marginBottom: "28px" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", marginBottom: "10px" }}>
              Executive Property Summary
            </h3>
            <p style={{ fontSize: "0.92rem", lineHeight: "1.7", color: "#475569", marginBottom: "18px" }}>
              {property.description}
            </p>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.88rem",
                border: "1px solid #e2e8f0"
              }}
            >
              <tbody>
                <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "10px 14px", fontWeight: 700, color: "#64748b", width: "25%" }}>Bedrooms</td>
                  <td style={{ padding: "10px 14px", fontWeight: 600, color: "#0f172a", width: "25%" }}>
                    {property.bedrooms > 0 ? `${property.bedrooms} Luxury Suites` : "Plot Asset"}
                  </td>
                  <td style={{ padding: "10px 14px", fontWeight: 700, color: "#64748b", width: "25%" }}>Bathrooms</td>
                  <td style={{ padding: "10px 14px", fontWeight: 600, color: "#0f172a", width: "25%" }}>
                    {property.bathrooms > 0 ? `${property.bathrooms} En-Suite Baths` : "N/A"}
                  </td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "10px 14px", fontWeight: 700, color: "#64748b" }}>Facing / Vastu</td>
                  <td style={{ padding: "10px 14px", fontWeight: 600, color: "#0f172a" }}>{property.facing}</td>
                  <td style={{ padding: "10px 14px", fontWeight: 700, color: "#64748b" }}>Parking Bays</td>
                  <td style={{ padding: "10px 14px", fontWeight: 600, color: "#0f172a" }}>{property.parking}</td>
                </tr>
                <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "10px 14px", fontWeight: 700, color: "#64748b" }}>Construction Age</td>
                  <td style={{ padding: "10px 14px", fontWeight: 600, color: "#0f172a" }}>Built {property.yearBuilt}</td>
                  <td style={{ padding: "10px 14px", fontWeight: 700, color: "#64748b" }}>Title Clearance</td>
                  <td style={{ padding: "10px 14px", fontWeight: 600, color: "#059669" }}>100% Freehold Cleared</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Amenities Breakdown */}
          <div style={{ marginBottom: "28px" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>
              Key Lifestyle & Club Amenities
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
              {property.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.85rem",
                    color: "#334155"
                  }}
                >
                  <CheckCircle2 size={15} color="#059669" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Investment & Advisor Signature Footer */}
          <div
            style={{
              borderTop: "2px solid #e2e8f0",
              paddingTop: "24px",
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr",
              gap: "24px",
              alignItems: "center"
            }}
          >
            {/* Senior Advisor Card */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <img
                src={agent.image}
                alt={agent.name}
                style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover" }}
              />
              <div>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                  Assigned Private Portfolio Lead
                </span>
                <h4 style={{ margin: 0, fontSize: "1.05rem", color: "#0f172a" }}>{agent.name}</h4>
                <div style={{ fontSize: "0.82rem", color: "#2563eb", fontWeight: 600 }}>{agent.email} • {agent.phone}</div>
              </div>
            </div>

            {/* Verification Seal & QR code placeholder */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "14px"
              }}
            >
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "0.7rem", color: "#94a3b8", display: "block" }}>SCAN FOR DIGITAL TOUR</span>
                <strong style={{ fontSize: "0.82rem", color: "#0f172a" }}>estatehub.com/prop/{property.id}</strong>
              </div>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  background: "#f1f5f9",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0f172a",
                  border: "1px solid #cbd5e1"
                }}
              >
                <QrCode size={36} />
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "24px",
              textAlign: "center",
              fontSize: "0.72rem",
              color: "#94a3b8",
              borderTop: "1px dashed #e2e8f0",
              paddingTop: "12px"
            }}
          >
            Disclaimer: All specifications, floor plans, and financial yields are audited by EstateHub Analytics and subject to official contract terms. Certified ISO 9001:2026 Real Estate Standard.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyBrochureModal;
