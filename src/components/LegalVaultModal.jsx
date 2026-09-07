import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  FileCheck2,
  Lock,
  Download,
  Printer,
  QrCode,
  X,
  CheckCircle2,
  AlertTriangle,
  Building,
  Scale,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";

export const LegalVaultModal = ({ property, onClose }) => {
  const { formatPrice, addToast } = usePropertyContext();

  const [scanStep, setScanStep] = useState(0); // 0: Scanning, 1: Ready
  const [activeDocTab, setActiveDocTab] = useState("title");

  useEffect(() => {
    const timer = setTimeout(() => {
      setScanStep(1);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  const reraId = property?.reraId || `RERA-REG-${property?.city?.toUpperCase() || "MAH"}-2024-9842`;
  const title = property?.title || "Signature Luxury Residence";

  const handleDownload = () => {
    window.print();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(10px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "760px",
          maxHeight: "90vh",
          background: "var(--bg-card, #0b132b)",
          border: "1.5px solid rgba(16, 185, 129, 0.4)",
          borderRadius: "18px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(16, 185, 129, 0.15)",
          color: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12), transparent)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #10b981, #059669)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <Scale size={24} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800 }}>
                  RERA Legal Vault & Title Due Diligence
                </h3>
                <span
                  style={{
                    background: "rgba(16, 185, 129, 0.2)",
                    color: "#10b981",
                    fontSize: "0.7rem",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    fontWeight: 800,
                  }}
                >
                  AUDITED
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#94a3b8" }}>
                Independent Legal Audit & 30-Year Encumbrance Verification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: "transparent", border: "none", color: "#9ca3af", cursor: "pointer", padding: "6px" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "24px", overflowY: "auto", flex: 1 }}>
          {scanStep === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  border: "3px solid #10b981",
                  borderTopColor: "transparent",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 24px",
                }}
              ></div>
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, margin: "0 0 8px" }}>
                Scanning Land Registry & Central RERA Ledger...
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: 0 }}>
                Verifying 30-year non-encumbrance certificate, 7/12 extract, and bank mortgage clearance.
              </p>
            </div>
          ) : (
            <div>
              {/* Score Banner */}
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 78, 59, 0.25))",
                  border: "1px solid rgba(16, 185, 129, 0.35)",
                  borderRadius: "14px",
                  padding: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#6ee7b7", textTransform: "uppercase", fontWeight: 800 }}>
                    Official Legal Clearance Status
                  </span>
                  <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#fff", marginTop: "2px" }}>
                    100% Clear Marketable Title & Zero Litigation
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#94a3b8", marginTop: "4px" }}>
                    Verified by High Court Advocates & EstateHub Advisory Desk under Sanjay Kumar
                  </div>
                </div>

                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#10b981", lineHeight: 1 }}>
                    98<span style={{ fontSize: "1.1rem" }}>/100</span>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "#6ee7b7", fontWeight: 800 }}>
                    SUPREME GREEN SHIELD
                  </span>
                </div>
              </div>

              {/* 5 Pillars Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "24px" }}>
                {[
                  {
                    title: "Land Title & Ownership",
                    status: "Clear Freehold",
                    desc: "30-Year Non-Encumbrance Certificate (NEC) verified with Sub-Registrar.",
                    badge: "100% Clear",
                  },
                  {
                    title: "RERA Registration",
                    status: reraId,
                    desc: "Registered and validated on State Real Estate Regulatory Authority portal.",
                    badge: "Active RERA",
                  },
                  {
                    title: "Bank Approvals",
                    status: "SBI • HDFC • ICICI • Axis",
                    desc: "Project pre-approved for up to 85% home loan financing with zero queries.",
                    badge: "Sanctioned",
                  },
                  {
                    title: "Municipal Plan & NOC",
                    status: "CC & OC Compliant",
                    desc: "Sanctioned building plan, airport height NOC, and structural safety clearance.",
                    badge: "Approved",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "16px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#e2e8f0" }}>{item.title}</span>
                      <span
                        style={{
                          background: "rgba(16, 185, 129, 0.15)",
                          color: "#10b981",
                          fontSize: "0.68rem",
                          fontWeight: 800,
                          padding: "2px 8px",
                          borderRadius: "10px",
                        }}
                      >
                        {item.badge}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#d4af37" }}>{item.status}</div>
                    <div style={{ fontSize: "0.78rem", color: "#94a3b8", marginTop: "4px" }}>{item.desc}</div>
                  </div>
                ))}
              </div>

              {/* Legal Certificate Box */}
              <div
                style={{
                  background: "#070b14",
                  border: "1px dashed rgba(212, 175, 55, 0.4)",
                  borderRadius: "12px",
                  padding: "18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "14px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <QrCode size={42} color="#d4af37" />
                  <div>
                    <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#fff" }}>
                      Official Legal Due Diligence Dossier #LDD-2026-984
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                      Cryptographic Audit Seal • Ready for Bank Loan Submission
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={handleDownload}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      background: "linear-gradient(135deg, #10b981, #059669)",
                      border: "none",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <Printer size={15} />
                    <span>Print Dossier</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LegalVaultModal;
