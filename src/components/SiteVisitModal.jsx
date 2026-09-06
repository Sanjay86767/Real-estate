import React, { useState } from "react";
import { X, Calendar, Clock, Video, Home, Car, CheckCircle2, QrCode, Download } from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";

export const SiteVisitModal = ({ property, agent, onClose }) => {
  const { addToast } = usePropertyContext();

  const [tourType, setTourType] = useState("in_person"); // 'in_person' | 'video'
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedSlot, setSelectedSlot] = useState("11:00 AM");
  const [needCab, setNeedCab] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [bookedPass, setBookedPass] = useState(null);

  const availableSlots = [
    "10:00 AM",
    "11:30 AM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
    "06:30 PM"
  ];

  const handleBooking = (e) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorPhone.trim()) {
      addToast("Please provide your name and phone number", "warning");
      return;
    }

    const pass = {
      passId: `EH-${Math.floor(100000 + Math.random() * 900000)}`,
      propertyTitle: property.title,
      tourType: tourType === "in_person" ? "Physical Site Inspection" : "Live Video Walkthrough",
      date,
      time: selectedSlot,
      visitorName,
      agentName: agent.name,
      agentPhone: agent.phone,
      needCab
    };

    setBookedPass(pass);
    addToast(`Site visit pass generated! ID: ${pass.passId}`, "success");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(11, 17, 32, 0.75)",
        backdropFilter: "blur(6px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-lg)",
          maxWidth: "520px",
          width: "100%",
          padding: "32px",
          boxShadow: "var(--shadow-lg)",
          position: "relative",
          maxHeight: "92vh",
          overflowY: "auto"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="btn-icon"
          style={{ position: "absolute", top: "18px", right: "18px", width: "34px", height: "34px" }}
          aria-label="Close booking modal"
        >
          <X size={18} />
        </button>

        {bookedPass ? (
          /* Digital Booking Pass */
          <div style={{ textAlign: "center" }} className="animate-fade-in">
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "var(--accent-emerald-light)",
                color: "var(--accent-emerald)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px"
              }}
            >
              <CheckCircle2 size={34} />
            </div>

            <h3 style={{ fontSize: "1.6rem", margin: "0 0 6px" }}>Booking Confirmed!</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "24px" }}>
              Your digital entry pass has been generated and sent via SMS to {bookedPass.visitorPhone}.
            </p>

            {/* Pass Ticket Design */}
            <div
              style={{
                background: "var(--bg-secondary)",
                border: "2px dashed var(--accent-primary)",
                borderRadius: "var(--radius-md)",
                padding: "20px",
                textAlign: "left",
                marginBottom: "24px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-light)", paddingBottom: "10px", marginBottom: "12px" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Pass Number</span>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--accent-primary)" }}>{bookedPass.passId}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Type</span>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700 }}>{bookedPass.tourType}</div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.88rem" }}>
                <div><strong>Property:</strong> {bookedPass.propertyTitle}</div>
                <div><strong>Date & Time:</strong> {bookedPass.date} at {bookedPass.time}</div>
                <div><strong>Visitor:</strong> {bookedPass.visitorName}</div>
                <div><strong>Host Advisor:</strong> {bookedPass.agentName} ({bookedPass.agentPhone})</div>
                {bookedPass.needCab && (
                  <div style={{ color: "var(--accent-emerald)", fontWeight: 600 }}>
                    ✓ Complimentary EV Cab Pick-up Confirmed
                  </div>
                )}
              </div>
            </div>

            <button onClick={onClose} className="btn btn-primary" style={{ width: "100%" }}>
              Done & Return
            </button>
          </div>
        ) : (
          /* Booking Form */
          <div>
            <h3 style={{ fontSize: "1.4rem", margin: "0 0 6px" }}>Schedule a Property Inspection</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
              Select your preferred tour mode and real-time slot with advisor {agent.name}.
            </p>

            <form onSubmit={handleBooking} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Tour Mode Switcher */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setTourType("in_person")}
                  style={{
                    padding: "12px",
                    borderRadius: "var(--radius-md)",
                    border: `1.5px solid ${tourType === "in_person" ? "var(--accent-primary)" : "var(--border-light)"}`,
                    background: tourType === "in_person" ? "var(--accent-primary-light)" : "var(--bg-secondary)",
                    color: tourType === "in_person" ? "var(--accent-primary)" : "var(--text-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontWeight: 600,
                    fontSize: "0.85rem"
                  }}
                >
                  <Home size={16} />
                  <span>Physical Visit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTourType("video")}
                  style={{
                    padding: "12px",
                    borderRadius: "var(--radius-md)",
                    border: `1.5px solid ${tourType === "video" ? "var(--accent-primary)" : "var(--border-light)"}`,
                    background: tourType === "video" ? "var(--accent-primary-light)" : "var(--bg-secondary)",
                    color: tourType === "video" ? "var(--accent-primary)" : "var(--text-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontWeight: 600,
                    fontSize: "0.85rem"
                  }}
                >
                  <Video size={16} />
                  <span>Live Video Tour</span>
                </button>
              </div>

              {/* Date Input */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                  Select Inspection Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-light)",
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    outline: "none"
                  }}
                />
              </div>

              {/* Real-Time Slot Picker */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                  Available Time Slots
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      style={{
                        padding: "8px",
                        borderRadius: "var(--radius-sm)",
                        border: `1px solid ${selectedSlot === slot ? "var(--accent-primary)" : "var(--border-light)"}`,
                        background: selectedSlot === slot ? "var(--accent-primary)" : "var(--bg-secondary)",
                        color: selectedSlot === slot ? "#ffffff" : "var(--text-primary)",
                        fontSize: "0.82rem",
                        fontWeight: 600
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visitor Contact Info */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 00000"
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              {/* Complimentary Cab Checkbox */}
              {tourType === "in_person" && (
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 12px",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--bg-secondary)",
                    cursor: "pointer",
                    fontSize: "0.85rem"
                  }}
                >
                  <input
                    type="checkbox"
                    checked={needCab}
                    onChange={(e) => setNeedCab(e.target.checked)}
                    style={{ accentColor: "var(--accent-primary)" }}
                  />
                  <span>Request complimentary EV Cab pick-up from nearest transit station</span>
                </label>
              )}

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "6px" }}>
                Generate Inspection Pass
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteVisitModal;
