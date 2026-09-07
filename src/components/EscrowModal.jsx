import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Download,
  Printer,
  QrCode,
  X,
  CreditCard,
  Building,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";
import apiService from "../services/api";

export const EscrowModal = ({ deal, property, onClose, onSuccess }) => {
  const { formatPrice, addToast, updateOfferStatus } = usePropertyContext();

  const [depositAmount, setDepositAmount] = useState(100000);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [step, setStep] = useState(1); // 1: Select, 2: Authorizing, 3: Certificate
  const [certificateData, setCertificateData] = useState(null);

  const targetTitle = property?.title || deal?.propertyTitle || "Luxury Residence";
  const targetId = property?.id || deal?.propertyId || 1;

  const handlePay = async () => {
    setStep(2);
    // Simulate banking/escrow gateway handshake
    setTimeout(async () => {
      const escrowRef = `ESCROW-IND-RERA-${Math.floor(100000 + Math.random() * 900000)}`;
      const cert = {
        escrowRef,
        amount: depositAmount,
        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        timestamp: new Date().toLocaleTimeString("en-IN"),
        txHash: "0x" + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
        propertyTitle: targetTitle,
        propertyId: targetId,
        escrowBank: "HDFC Bank Corporate RERA Escrow Account #8942-0199-55",
        status: "Earnest Escrowed & Guaranteed",
      };

      setCertificateData(cert);
      setStep(3);

      // Update in context
      if (deal?.id) {
        updateOfferStatus(deal.id, "Earnest Escrowed");
        await apiService.updateDealStatus(deal.id, "Earnest Escrowed");
      }

      addToast(`Earnest Token of ${formatPrice(depositAmount)} Escrowed Successfully! 🛡️`, "success");
      if (onSuccess) onSuccess(cert);
    }, 2200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(8px)",
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
          maxWidth: "680px",
          background: "var(--bg-card, #111827)",
          border: "1px solid rgba(212, 175, 55, 0.4)",
          borderRadius: "16px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(212, 175, 55, 0.15)",
          color: "var(--text-primary, #f9fafb)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border-light, rgba(255,255,255,0.1))",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "linear-gradient(135deg, rgba(212, 175, 55, 0.12), transparent)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #d4af37, #aa820a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000",
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>
                RERA Escrow Token Guarantee
              </h3>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--accent-gold, #d4af37)" }}>
                Official Earnest Money Lock • 100% Legally Protected
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-muted, #9ca3af)",
              cursor: "pointer",
              padding: "6px",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: "24px" }}>
          {step === 1 && (
            <div>
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "20px",
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Subject Residence
                </span>
                <div style={{ fontSize: "1.05rem", fontWeight: 700, marginTop: "4px" }}>{targetTitle}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--accent-gold)", marginTop: "2px" }}>
                  Estate ID: #{targetId} • Priority Seller Exclusivity
                </div>
              </div>

              {/* Deposit Tier Selection */}
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "10px" }}>
                Select Earnest Money Token Tier:
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                {[
                  { label: "VIP Priority Lock", amount: 50000, days: "7 Days Hold" },
                  { label: "RERA Official Escrow", amount: 100000, days: "15 Days Hold", popular: true },
                  { label: "Solitary Exclusivity", amount: 250000, days: "30 Days Hold" },
                ].map((tier) => (
                  <div
                    key={tier.amount}
                    onClick={() => setDepositAmount(tier.amount)}
                    style={{
                      padding: "14px 12px",
                      borderRadius: "10px",
                      border: depositAmount === tier.amount ? "2px solid #d4af37" : "1px solid rgba(255,255,255,0.1)",
                      background: depositAmount === tier.amount ? "rgba(212, 175, 55, 0.12)" : "rgba(255,255,255,0.02)",
                      cursor: "pointer",
                      textAlign: "center",
                      position: "relative",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {tier.popular && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-8px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: "#d4af37",
                          color: "#000",
                          fontSize: "0.65rem",
                          fontWeight: 800,
                          padding: "1px 8px",
                          borderRadius: "20px",
                        }}
                      >
                        RECOMMENDED
                      </span>
                    )}
                    <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#d4af37" }}>
                      {formatPrice(tier.amount)}
                    </div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 600, marginTop: "4px" }}>{tier.label}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "2px" }}>
                      {tier.days}
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Rail Options */}
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "10px" }}>
                Select Escrow Payment Rail:
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                {[
                  { id: "upi", title: "Instant UPI (GPay, PhonePe, Paytm, BHIM)", desc: "Instant Escrow Lock & Digital Receipt" },
                  { id: "netbanking", title: "Corporate NetBanking / RTGS", desc: "HDFC, ICICI, SBI, Axis Private Banking" },
                  { id: "card", title: "VIP High-Limit Debit / Credit Card", desc: "Encrypted 256-Bit SSL Payment Gateway" },
                ].map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: paymentMethod === m.id ? "1.5px solid #d4af37" : "1px solid rgba(255,255,255,0.1)",
                      background: paymentMethod === m.id ? "rgba(212, 175, 55, 0.08)" : "rgba(255,255,255,0.02)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.92rem", fontWeight: 700 }}>{m.title}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{m.desc}</div>
                    </div>
                    <input type="radio" checked={paymentMethod === m.id} readOnly />
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "8px",
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePay}
                  style={{
                    padding: "12px 24px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #d4af37, #aa820a)",
                    border: "none",
                    color: "#000",
                    fontWeight: 800,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 15px rgba(212, 175, 55, 0.4)",
                  }}
                >
                  <Lock size={16} />
                  <span>Authorize Escrow Lock ({formatPrice(depositAmount)})</span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  border: "3px solid #d4af37",
                  borderTopColor: "transparent",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 20px",
                }}
              ></div>
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, margin: "0 0 8px" }}>
                Communicating with RERA Escrow Gateway...
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
                Securing ₹{depositAmount.toLocaleString("en-IN")} in HDFC Bank RERA Escrow Trustee Account
              </p>
            </div>
          )}

          {step === 3 && certificateData && (
            <div>
              <div
                id="escrow-certificate"
                style={{
                  background: "#0d1322",
                  border: "2px solid #d4af37",
                  borderRadius: "12px",
                  padding: "24px",
                  position: "relative",
                  marginBottom: "20px",
                  boxShadow: "inset 0 0 30px rgba(212, 175, 55, 0.08)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <span style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981", padding: "4px 10px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 800 }}>
                      ● RERA OFFICIAL GUARANTEE
                    </span>
                    <h2 style={{ fontSize: "1.35rem", margin: "10px 0 4px", color: "#f9fafb" }}>
                      Earnest Money Escrow Certificate
                    </h2>
                    <div style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
                      Reference ID: <strong style={{ color: "#d4af37" }}>{certificateData.escrowRef}</strong>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", color: "#9ca3af", fontSize: "0.75rem" }}>
                    <div>Date: {certificateData.date}</div>
                    <div>Time: {certificateData.timestamp}</div>
                  </div>
                </div>

                <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "16px 0" }}></div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", fontSize: "0.85rem", marginBottom: "16px" }}>
                  <div>
                    <span style={{ color: "#9ca3af", display: "block", fontSize: "0.75rem" }}>PROPERTY</span>
                    <strong>{certificateData.propertyTitle}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#9ca3af", display: "block", fontSize: "0.75rem" }}>ESCROW AMOUNT</span>
                    <strong style={{ color: "#d4af37", fontSize: "1.1rem" }}>{formatPrice(certificateData.amount)}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#9ca3af", display: "block", fontSize: "0.75rem" }}>ESCROW BANK TRUSTEE</span>
                    <span>{certificateData.escrowBank}</span>
                  </div>
                  <div>
                    <span style={{ color: "#9ca3af", display: "block", fontSize: "0.75rem" }}>HOLD PERIOD</span>
                    <span style={{ color: "#10b981", fontWeight: 700 }}>Exclusive 30 Days Freeze</span>
                  </div>
                </div>

                <div style={{ background: "rgba(0,0,0,0.3)", padding: "10px 14px", borderRadius: "8px", fontSize: "0.72rem", color: "#94a3b8", fontFamily: "monospace", wordBreak: "break-all" }}>
                  Cryptographic Hash: {certificateData.txHash}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "18px", paddingTop: "14px", borderTop: "1px dashed rgba(255,255,255,0.15)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <QrCode size={36} color="#d4af37" />
                    <span style={{ fontSize: "0.7rem", color: "#9ca3af", maxWidth: "160px" }}>
                      Scan to verify digital RERA seal on central ledger
                    </span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#d4af37" }}>
                      EstateHub Trustee Advisory Desk
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "#6b7280" }}>
                      Founder & Principal Desk: Sanjay Kumar
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button
                  type="button"
                  onClick={handlePrint}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Printer size={16} />
                  <span>Print Guarantee</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: "10px 24px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    border: "none",
                    color: "#fff",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  Done & Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EscrowModal;
