import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star,
  Phone,
  Mail,
  MapPin,
  Award,
  CheckCircle2,
  Calendar,
  Send,
  Building,
  ArrowLeft,
  ShieldCheck,
  Video,
  Clock
} from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";
import PropertyCard from "../components/PropertyCard";
import { playClickSound, playSuccessSound } from "../utils/effects";

export const AgentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agents, properties, addToast } = usePropertyContext();

  const agent = agents.find((a) => a.id === Number(id)) || agents[0];

  // Properties listed by this agent
  const agentProperties = properties.filter((p) => p.agentId === agent.id);

  // Consultation booking state
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [meetingType, setMeetingType] = useState("video");
  const [meetingDate, setMeetingDate] = useState("");
  const [notes, setNotes] = useState("");
  const [booked, setBooked] = useState(false);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      addToast("Please fill in your contact information", "warning");
      return;
    }
    playSuccessSound();
    setBooked(true);
    addToast(`Private consultation scheduled with ${agent.name}!`, "success");
  };

  return (
    <div className="agent-details-page" style={{ padding: "30px 0 90px", background: "var(--bg-primary)" }}>
      <div className="container">
        {/* Back navigation */}
        <div style={{ marginBottom: "24px" }}>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary btn-sm"
            style={{ gap: "6px" }}
          >
            <ArrowLeft size={16} />
            <span>Back to Advisors</span>
          </button>
        </div>

        {/* Advisor Profile Header Card */}
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-xl)",
            padding: "36px",
            boxShadow: "var(--shadow-md)",
            marginBottom: "40px"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: "30px",
              alignItems: "center"
            }}
            className="agent-header-grid"
          >
            {/* Portrait */}
            <div style={{ position: "relative" }}>
              <img
                src={agent.image}
                alt={agent.name}
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid var(--accent-primary)",
                  boxShadow: "var(--shadow-md)"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "6px",
                  right: "6px",
                  background: "var(--accent-emerald)",
                  color: "#ffffff",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #ffffff"
                }}
                title="Verified Luxury Real Estate Consultant"
              >
                <ShieldCheck size={18} />
              </div>
            </div>

            {/* Core Info */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                <span
                  style={{
                    background: "var(--accent-primary-light)",
                    color: "var(--accent-primary)",
                    padding: "3px 10px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.75rem",
                    fontWeight: 700
                  }}
                >
                  {agent.city} Territory Lead
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  RERA Reg: EH-AGT-{agent.id}092
                </span>
              </div>

              <h1 style={{ fontSize: "2.2rem", margin: "0 0 6px" }}>{agent.name}</h1>
              <p style={{ color: "var(--accent-primary)", fontWeight: 600, fontSize: "1.05rem", margin: "0 0 14px" }}>
                {agent.role}
              </p>

              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", fontSize: "0.9rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Star size={16} fill="var(--accent-gold)" color="var(--accent-gold)" />
                  <strong>{agent.rating} Rating</strong>
                  <span style={{ color: "var(--text-muted)" }}>({agent.reviewsCount} reviews)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Award size={16} color="var(--accent-emerald)" />
                  <strong>{agent.dealsClosed}</strong>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Clock size={16} color="var(--text-muted)" />
                  <span>{agent.experience} Experience</span>
                </div>
              </div>
            </div>

            {/* Direct Contact CTAs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "180px" }}>
              <a
                href={`tel:${agent.phone}`}
                className="btn btn-primary"
                style={{ gap: "8px", justifyContent: "center" }}
              >
                <Phone size={16} />
                <span>Call {agent.phone}</span>
              </a>
              <a
                href={`mailto:${agent.email}`}
                className="btn btn-secondary"
                style={{ gap: "8px", justifyContent: "center" }}
              >
                <Mail size={16} />
                <span>Send Email</span>
              </a>
            </div>
          </div>

          {/* Bio & Specialties */}
          <div style={{ marginTop: "28px", paddingTop: "24px", borderTop: "1px solid var(--border-light)" }}>
            <h4 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>About {agent.name}</h4>
            <p style={{ fontSize: "0.98rem", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "18px" }}>
              {agent.bio} With deep transactional relationships across reputed builders, high-net-worth NRI families, and banking consortiums, {agent.name} ensures clean legal title clearances and premium negotiation leverage.
            </p>

            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "8px" }}>
                Core Expertise & Asset Specialization
              </span>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {agent.specialties.map((spec, sIdx) => (
                  <span
                    key={sIdx}
                    style={{
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-light)",
                      padding: "6px 14px",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.85rem",
                      fontWeight: 600
                    }}
                  >
                    ✓ {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Section: Schedule Consultation + Exclusive Portfolio */}
        <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: "36px", alignItems: "start" }} className="agent-content-grid">
          {/* Left: Active Portfolio */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.5rem", margin: 0 }}>
                Exclusive Listings Represented ({agentProperties.length})
              </h3>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Verified Mandates</span>
            </div>

            {agentProperties.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                {agentProperties.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            ) : (
              <div style={{ background: "var(--bg-surface)", padding: "40px", borderRadius: "var(--radius-lg)", textAlign: "center", border: "1px solid var(--border-light)" }}>
                <p style={{ color: "var(--text-secondary)", margin: 0 }}>
                  This consultant's current mandate inventory is undergoing private due-diligence. Explore all listings on the main catalog.
                </p>
                <Link to="/properties" className="btn btn-primary" style={{ marginTop: "16px" }}>
                  Browse All Properties
                </Link>
              </div>
            )}

            {/* Verified Client Reviews */}
            <div style={{ marginTop: "40px" }}>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "18px" }}>Verified Client Testimonials</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  { client: "Lt. Col. Jasbir Bains", city: "Mohali Sector 79", text: "John helped us negotiate our duplex in Sector 8 smoothly. His title check was thorough and he made sure all municipal approvals were verified.", stars: 5 },
                  { client: "Meenakshi Sundaram", city: "Bangalore", text: "Exceptional professionalism. Handled our remote NRI power of attorney and site registration without any hassle.", stars: 5 }
                ].map((rev, rIdx) => (
                  <div key={rIdx} style={{ background: "var(--bg-surface)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", padding: "18px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <strong>{rev.client}</strong>
                      <div style={{ display: "flex", gap: "2px" }}>
                        {[...Array(rev.stars)].map((_, s) => (
                          <Star key={s} size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
                        ))}
                      </div>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "var(--accent-primary)", fontWeight: 600, display: "block", marginBottom: "6px" }}>
                      {rev.city}
                    </span>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0, lineHeight: "1.5" }}>
                      "{rev.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Book VIP 1-on-1 Consultation */}
          <div
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-xl)",
              padding: "28px",
              boxShadow: "var(--shadow-md)",
              position: "sticky",
              top: "95px"
            }}
          >
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
              Direct Booking
            </span>
            <h3 style={{ fontSize: "1.3rem", margin: "4px 0 16px" }}>
              Schedule Consultation
            </h3>

            {booked ? (
              <div style={{ background: "var(--accent-emerald-light)", border: "1px solid var(--accent-emerald)", color: "var(--accent-emerald)", padding: "20px", borderRadius: "var(--radius-md)", textAlign: "center" }}>
                <CheckCircle2 size={32} style={{ margin: "0 auto 10px" }} />
                <h4 style={{ margin: "0 0 6px" }}>Consultation Confirmed!</h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "inherit" }}>
                  {agent.name} will reach out at {clientPhone} with the secure calendar link.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "4px" }}>
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Sanjay Kumar"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)", background: "var(--bg-secondary)", color: "var(--text-primary)", fontSize: "0.9rem" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "4px" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)", background: "var(--bg-secondary)", color: "var(--text-primary)", fontSize: "0.9rem" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "4px" }}>
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 00000"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)", background: "var(--bg-secondary)", color: "var(--text-primary)", fontSize: "0.9rem" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "4px" }}>
                    Consultation Format
                  </label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      type="button"
                      onClick={() => setMeetingType("video")}
                      style={{
                        flex: 1,
                        padding: "8px",
                        borderRadius: "var(--radius-sm)",
                        background: meetingType === "video" ? "var(--accent-primary)" : "var(--bg-secondary)",
                        color: meetingType === "video" ? "#fff" : "inherit",
                        border: "1px solid var(--border-light)",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px"
                      }}
                    >
                      <Video size={14} /> Video Call
                    </button>

                    <button
                      type="button"
                      onClick={() => setMeetingType("in-person")}
                      style={{
                        flex: 1,
                        padding: "8px",
                        borderRadius: "var(--radius-sm)",
                        background: meetingType === "in-person" ? "var(--accent-primary)" : "var(--bg-secondary)",
                        color: meetingType === "in-person" ? "#fff" : "inherit",
                        border: "1px solid var(--border-light)",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px"
                      }}
                    >
                      <Building size={14} /> Office Meet
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, display: "block", marginBottom: "4px" }}>
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)", background: "var(--bg-secondary)", color: "var(--text-primary)", fontSize: "0.85rem" }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "6px" }}>
                  <Send size={16} />
                  <span>Book VIP Appointment</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .agent-header-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .agent-content-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AgentDetails;
