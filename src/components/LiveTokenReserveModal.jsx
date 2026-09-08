import React, { useState, useEffect } from "react";
import {
  X,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  Award,
  IndianRupee,
  FileCheck,
  Building2,
  Users,
  AlertCircle,
  Download,
  Share2
} from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";

export const LiveTokenReserveModal = ({ property, isOpen, onClose }) => {
  const { user, addToast } = usePropertyContext();

  const [secondsRemaining, setSecondsRemaining] = useState(15 * 60); // 15 mins
  const [tokenAmount, setTokenAmount] = useState(51000);
  const [buyerName, setBuyerName] = useState(user?.name || "");
  const [buyerPhone, setBuyerPhone] = useState(user?.phone || "");
  const [buyerPan, setBuyerPan] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [step, setStep] = useState("reserve"); // "reserve" | "processing" | "success"
  const [activeConcurrentBrowsers, setActiveConcurrentBrowsers] = useState(4);

  // 15-minute real-time lock timer
  useEffect(() => {
    if (!isOpen || step === "success") return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, step]);

  // Concurrent browser count fluctuations
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setActiveConcurrentBrowsers((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next < 2 ? 3 : next > 7 ? 5 : next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  const propTitle = property?.title || "Royal Sovereign Sea-Facing Penthouse";
  const propLocation = property?.location || "Worli Sea Face, South Mumbai";
  const propPrice = property?.price ? `₹${(property.price / 10000000).toFixed(2)} Cr` : "₹18.50 Cr";
  const propRera = property?.reraId || "P51900001889";

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone) {
      if (addToast) addToast("Please enter your name and phone number.", "warning");
      return;
    }

    setStep("processing");

    setTimeout(() => {
      setStep("success");
      if (addToast) {
        addToast(`🎉 Shubh Muhurat Token ₹${tokenAmount.toLocaleString("en-IN")} Locked! Provisional Allotment Generated.`, "success");
      }
    }, 1800);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
          background: "linear-gradient(180deg, #0f172a 0%, #070e1a 100%)",
          border: "1px solid rgba(245, 158, 11, 0.4)",
          borderRadius: "24px",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.7), 0 0 40px rgba(245, 158, 11, 0.15)",
          color: "#ffffff",
          overflow: "hidden",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip with Live Timer */}
        <div
          style={{
            background: "linear-gradient(90deg, #d97706, #f59e0b, #b45309)",
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#ffffff"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 800, fontSize: "0.85rem" }}>
            <Lock size={16} />
            <span>REAL-TIME 15-MIN EXCLUSIVE TOKEN LOCK</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(0, 0, 0, 0.35)",
              padding: "4px 12px",
              borderRadius: "20px",
              fontFamily: "monospace",
              fontWeight: 900,
              fontSize: "0.95rem"
            }}
          >
            <Clock size={14} />
            <span>
              {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "28px", overflowY: "auto", flex: 1 }}>
          {step === "reserve" && (
            <form onSubmit={handleConfirmReservation}>
              {/* Property Summary Pill */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "16px",
                  padding: "16px",
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <div style={{ fontSize: "0.75rem", color: "#fbbf24", fontWeight: 800, textTransform: "uppercase" }}>
                    Selected Residence
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#ffffff", marginTop: "2px" }}>
                    {propTitle}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                    {propLocation} • RERA: {propRera}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Agreement Price</div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#fde047" }}>
                    {propPrice}
                  </div>
                </div>
              </div>

              {/* Live Demand Alert */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  background: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid rgba(239, 68, 68, 0.35)",
                  color: "#fca5a5",
                  fontSize: "0.8rem",
                  marginBottom: "20px"
                }}
              >
                <Users size={16} />
                <span>
                  <strong>{activeConcurrentBrowsers} prospective buyers</strong> are currently reviewing this unit. Locking token grants 48-hour legal exclusivity.
                </span>
              </div>

              {/* Shubh Muhurat Token Amounts */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    fontWeight: 800,
                    color: "#cbd5e1",
                    textTransform: "uppercase",
                    marginBottom: "10px"
                  }}
                >
                  Select Token Tier (100% Refundable within 7 Days)
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                  {[
                    { amount: 21000, label: "₹21,000", sub: "Shubh Muhurat" },
                    { amount: 51000, label: "₹51,000", sub: "VIP Priority" },
                    { amount: 100000, label: "₹1,00,000", sub: "Platinum Escrow" }
                  ].map((tier) => {
                    const isSelected = tokenAmount === tier.amount;
                    return (
                      <button
                        type="button"
                        key={tier.amount}
                        onClick={() => setTokenAmount(tier.amount)}
                        style={{
                          padding: "12px",
                          borderRadius: "12px",
                          background: isSelected ? "rgba(245, 158, 11, 0.2)" : "rgba(255, 255, 255, 0.04)",
                          border: isSelected ? "2px solid #f59e0b" : "1px solid rgba(255, 255, 255, 0.1)",
                          color: isSelected ? "#fde047" : "#ffffff",
                          cursor: "pointer",
                          textAlign: "center"
                        }}
                      >
                        <div style={{ fontSize: "1.05rem", fontWeight: 900 }}>{tier.label}</div>
                        <div style={{ fontSize: "0.68rem", color: isSelected ? "#fbbf24" : "#94a3b8" }}>
                          {tier.sub}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Buyer Information Inputs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8", marginBottom: "6px" }}>
                    Primary Allottee Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Chandra"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#ffffff",
                      fontSize: "0.85rem",
                      outline: "none"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8", marginBottom: "6px" }}>
                    Mobile Number (For OTP & Escrow) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#ffffff",
                      fontSize: "0.85rem",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8", marginBottom: "8px" }}>
                  Escrow Payment Gateway
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                  {[
                    { id: "upi", label: "UPI Instant (GPay / PhonePe)" },
                    { id: "netbanking", label: "HDFC / ICICI NetBanking" },
                    { id: "card", label: "Credit Card / Amex" }
                  ].map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      style={{
                        padding: "10px",
                        borderRadius: "10px",
                        background: paymentMethod === m.id ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.04)",
                        border: paymentMethod === m.id ? "1px solid #10b981" : "1px solid rgba(255, 255, 255, 0.1)",
                        color: paymentMethod === m.id ? "#6ee7b7" : "#cbd5e1",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  border: "none",
                  color: "#ffffff",
                  fontSize: "1rem",
                  fontWeight: 900,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow: "0 6px 24px rgba(245, 158, 11, 0.4)"
                }}
              >
                <Sparkles size={18} />
                <span>Lock Real-Time Token ₹{tokenAmount.toLocaleString("en-IN")} via Escrow</span>
              </button>
            </form>
          )}

          {step === "processing" && (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  border: "4px solid rgba(245, 158, 11, 0.2)",
                  borderTopColor: "#f59e0b",
                  borderRadius: "50%",
                  margin: "0 auto 20px",
                  animation: "spin 1s linear infinite"
                }}
              />
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "8px" }}>
                Verifying Escrow & Reserving Allotment...
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                Contacting Bank Escrow Server and registering RERA provisional lock.
              </p>
            </div>
          )}

          {step === "success" && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "rgba(16, 185, 129, 0.2)",
                  color: "#10b981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  border: "2px solid #10b981"
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <span
                style={{
                  background: "rgba(16, 185, 129, 0.2)",
                  color: "#6ee7b7",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  padding: "4px 14px",
                  borderRadius: "20px"
                }}
              >
                PROVISIONAL ALLOTMENT CERTIFIED
              </span>

              <h3 style={{ fontSize: "1.5rem", fontWeight: 900, marginTop: "12px", marginBottom: "8px" }}>
                Unit Reserved Successfully!
              </h3>
              <p style={{ color: "#cbd5e1", fontSize: "0.9rem", maxWidth: "480px", margin: "0 auto 24px" }}>
                Token of ₹{tokenAmount.toLocaleString("en-IN")} held in HDFC RERA Escrow Account #9088219.
                Your 48-hour price freeze is now legally binding.
              </p>

              {/* Certificate Preview Card */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  borderRadius: "16px",
                  padding: "20px",
                  textAlign: "left",
                  marginBottom: "24px"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "8px" }}>
                  <span style={{ fontSize: "0.75rem", color: "#fbbf24", fontWeight: 800 }}>ESTATEHUB DIGITAL ALLOTMENT CERTIFICATE</span>
                  <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Ref: EH-{Date.now().toString().slice(-6)}</span>
                </div>
                <div style={{ fontSize: "0.85rem", color: "#ffffff", lineHeight: 1.6 }}>
                  <div><strong>Allottee:</strong> {buyerName}</div>
                  <div><strong>Property:</strong> {propTitle}</div>
                  <div><strong>Location:</strong> {propLocation}</div>
                  <div><strong>Advisory Lead:</strong> Sanjay Kumar (Founder Desk)</div>
                  <div><strong>Escrow Status:</strong> Confirmed & Sealed</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    flex: 1,
                    padding: "14px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Close Deal Room
                </button>
                <button
                  type="button"
                  onClick={() => alert("Digital Provisional Certificate PDF generated and sent to your registered phone!")}
                  style={{
                    flex: 1,
                    padding: "14px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    border: "none",
                    color: "#ffffff",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    cursor: "pointer"
                  }}
                >
                  <Download size={16} />
                  <span>Download Certificate</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveTokenReserveModal;
