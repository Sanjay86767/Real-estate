import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star, Phone, Mail, MapPin, Award, CheckCircle2,
  Calendar, Send, Building, ArrowLeft, ShieldCheck,
  Video, Clock, Crown, MessageSquare, Sparkles, TrendingUp,
  ChevronRight, ExternalLink, Users, Zap
} from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";
import PropertyCard from "../components/PropertyCard";
import { playClickSound, playSuccessSound } from "../utils/effects";

const REVIEW_DATA = [
  { client: "Lt. Col. Jasbir Bains", city: "Mohali, Punjab", text: "Exceptional professionalism. Handled our duplex transaction in Sector 8 with meticulous title verification and zero surprise costs.", stars: 5 },
  { client: "Meenakshi Sundaram", city: "Bangalore, Karnataka", text: "Managed our NRI power-of-attorney remotely and completed the site registration without any hassle. Truly world-class service.", stars: 5 },
  { client: "Ajay Kapoor", city: "Gurgaon, Delhi NCR", text: "Best negotiator in the industry. Saved us ₹18L on a penthouse deal through his lender network access.", stars: 5 },
];

export const AgentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agents, properties, addToast } = usePropertyContext();

  const agent = agents.find(a => a.id === Number(id)) || agents[0];
  const agentProperties = properties.filter(p => p.agentId === agent.id);
  const isFounder = agent.id === 1;

  const [clientName, setClientName]   = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [meetingType, setMeetingType] = useState("video");
  const [meetingDate, setMeetingDate] = useState("");
  const [notes, setNotes]             = useState("");
  const [booked, setBooked]           = useState(false);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      addToast("Please fill in your contact information", "warning");
      return;
    }
    playSuccessSound?.();
    setBooked(true);
    addToast(`Private consultation scheduled with ${agent.name}! 🎉`, "success");
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px",
    borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)",
    background: "var(--bg-secondary)", color: "var(--text-primary)",
    fontSize: "0.88rem", outline: "none", boxSizing: "border-box"
  };
  const labelStyle = { fontSize: "0.75rem", fontWeight: 700, display: "block", marginBottom: "6px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.4px" };

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingBottom: "90px" }}>

      {/* ── Hero Banner ── */}
      <div style={{
        background: isFounder
          ? "linear-gradient(135deg, #0c1526 0%, #1e1510 50%, #0f1a0c 100%)"
          : "linear-gradient(135deg, #0c1526 0%, #1a1a40 100%)",
        padding: "clamp(36px,6vw,72px) 0",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: "-60px", right: "6%", width: "350px", height: "350px", background: `radial-gradient(circle, ${isFounder ? "rgba(217,119,6,0.12)" : "rgba(99,102,241,0.12)"}, transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />

        <div className="container">
          {/* Back */}
          <button onClick={() => navigate(-1)} style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#94a3b8", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--radius-md)", padding: "7px 14px", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", marginBottom: "28px" }}>
            <ArrowLeft size={14} /> Back to Advisors
          </button>

          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "28px", alignItems: "center" }} className="agent-hero-grid">

            {/* ── Avatar ── */}
            <div style={{ position: "relative" }}>
              {isFounder && (
                <div style={{
                  position: "absolute", inset: "-5px", borderRadius: "50%",
                  background: "conic-gradient(from 0deg, #d97706, #fbbf24, #f59e0b, #d97706)",
                  animation: "spin 4s linear infinite", zIndex: 0
                }} />
              )}
              <div style={{ position: "relative", zIndex: 1, width: "clamp(110px,15vw,150px)", height: "clamp(110px,15vw,150px)", borderRadius: "50%", overflow: "hidden", border: isFounder ? "4px solid #0c1526" : "4px solid rgba(99,102,241,0.5)", boxShadow: isFounder ? "0 0 32px rgba(217,119,6,0.4)" : "0 0 24px rgba(99,102,241,0.3)" }}>
                <img src={agent.image} alt={agent.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ position: "absolute", bottom: "4px", right: "4px", zIndex: 2, background: "#fff", borderRadius: "50%", padding: "3px" }}>
                <ShieldCheck size={20} color="#10b981" fill="#fff" />
              </div>
            </div>

            {/* ── Info ── */}
            <div>
              {isFounder && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(217,119,6,0.15)", border: "1px solid rgba(217,119,6,0.3)", borderRadius: "999px", padding: "4px 14px", marginBottom: "12px" }}>
                  <Crown size={12} color="#fbbf24" />
                  <span style={{ fontSize: "0.7rem", fontWeight: 900, color: "#fbbf24", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                    Founder & Chief Strategist
                  </span>
                </div>
              )}

              <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "#fff", margin: "0 0 6px", lineHeight: 1.1 }}>
                {agent.name}
              </h1>
              <p style={{ color: isFounder ? "#fbbf24" : "#818cf8", fontWeight: 600, fontSize: "1rem", margin: "0 0 16px" }}>
                {agent.role}
              </p>

              {/* Meta row */}
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(agent.rating) ? "#fbbf24" : "transparent"} color="#fbbf24" />)}
                  <strong style={{ color: "#fff", marginLeft: "4px" }}>{agent.rating}</strong>
                  <span style={{ color: "#64748b" }}>({agent.reviewsCount})</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#94a3b8" }}>
                  <Award size={14} color="#10b981" /> <span>{agent.dealsClosed} Closed</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#94a3b8" }}>
                  <Clock size={14} /> <span>{agent.experience} Experience</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#94a3b8" }}>
                  <MapPin size={14} color="#f59e0b" /> <span>{agent.city}</span>
                </div>
              </div>

              {/* RERA + Badges */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "14px" }}>
                {["RERA Verified", "ISO 9001", "NRI Specialist", "7+ Years"].map(b => (
                  <span key={b} style={{ fontSize: "0.68rem", fontWeight: 700, padding: "3px 10px", borderRadius: "999px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#cbd5e1" }}>
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>

            {/* ── CTAs ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "190px" }}>
              <a href={`tel:${agent.phone}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "12px 18px", background: "linear-gradient(135deg, #92400e, #d97706)", color: "#fff", borderRadius: "var(--radius-lg)", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none", boxShadow: "0 4px 14px rgba(217,119,6,0.3)" }}>
                <Phone size={15} /> {agent.phone}
              </a>
              <a
                href={`https://wa.me/918809604880?text=${encodeURIComponent(`Hi ${agent.name}, I found your profile on EstateHub. I'd like a property consultation.`)}`}
                target="_blank" rel="noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "12px 18px", background: "linear-gradient(135deg, #16a34a, #15803d)", color: "#fff", borderRadius: "var(--radius-lg)", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none", boxShadow: "0 4px 14px rgba(22,163,74,0.3)" }}
              >
                <MessageSquare size={15} /> WhatsApp
              </a>
              <a href={`mailto:${agent.email}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "10px 18px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#cbd5e1", borderRadius: "var(--radius-lg)", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none" }}>
                <Mail size={14} /> Email Agent
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Page Body ── */}
      <div className="container" style={{ paddingTop: "40px" }}>

        {/* Bio + Specialties */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "48px" }}>
          <div style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-xl)", padding: "28px", border: "1px solid var(--border-light)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={16} color="var(--accent-gold)" /> About {agent.name}
            </h3>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "var(--text-secondary)", margin: "0 0 18px" }}>
              {agent.bio} With deep transactional relationships across reputed builders, high-net-worth NRI families, and banking consortiums, {agent.name} ensures clean legal title clearances and premium negotiation leverage on every mandate.
            </p>
            <div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "10px" }}>Core Specializations</div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {(agent.specialties || []).map((spec, i) => (
                  <span key={i} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)", padding: "5px 12px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "5px" }}>
                    <CheckCircle2 size={11} color="var(--accent-primary)" /> {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Performance metrics */}
          <div style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-xl)", padding: "28px", border: "1px solid var(--border-light)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <TrendingUp size={16} color="#10b981" /> Performance Metrics
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {[
                { label: "Total Deals Closed", value: agent.dealsClosed, color: "#6366f1", icon: "✅" },
                { label: "Client Rating", value: `${agent.rating}/5 ⭐`, color: "#f59e0b", icon: "🏆" },
                { label: "Experience", value: agent.experience, color: "#10b981", icon: "📅" },
                { label: "Active Territory", value: agent.city, color: "#ec4899", icon: "📍" },
                { label: "Response Time", value: "< 30 min", color: "#0ea5e9", icon: "⚡" },
                { label: "Reviews", value: `${agent.reviewsCount}+`, color: "#8b5cf6", icon: "💬" },
              ].map(m => (
                <div key={m.label} style={{ background: "var(--bg-secondary)", borderRadius: "var(--radius-md)", padding: "12px 14px" }}>
                  <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>{m.icon} {m.label}</div>
                  <div style={{ fontSize: "1rem", fontWeight: 800, color: m.color, marginTop: "4px" }}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Col: Listings + Booking */}
        <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: "36px", alignItems: "start" }} className="agent-content-grid">

          {/* ── Left: Listings + Reviews ── */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 900, margin: 0 }}>
                Exclusive Listings ({agentProperties.length})
              </h3>
              <span style={{ fontSize: "0.78rem", background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "999px", padding: "3px 10px", fontWeight: 700 }}>
                Verified Mandates
              </span>
            </div>

            {agentProperties.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "22px" }}>
                {agentProperties.map(p => <PropertyCard key={p.id} property={p} />)}
              </div>
            ) : (
              <div style={{ background: "var(--bg-surface)", padding: "48px 24px", borderRadius: "var(--radius-xl)", textAlign: "center", border: "1px dashed var(--border-light)" }}>
                <Building size={40} color="var(--text-muted)" style={{ opacity: 0.4, display: "block", margin: "0 auto 16px" }} />
                <p style={{ color: "var(--text-secondary)", margin: "0 0 20px" }}>This advisor's current mandate inventory is undergoing private due-diligence.</p>
                <Link to="/properties" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "6px", textDecoration: "none" }}>
                  Browse All Properties <ChevronRight size={15} />
                </Link>
              </div>
            )}

            {/* ── Testimonials ── */}
            <div style={{ marginTop: "44px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 900, marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Users size={18} color="var(--accent-primary)" /> Verified Testimonials
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {REVIEW_DATA.map((rev, i) => (
                  <div key={i} style={{
                    background: "var(--bg-surface)", borderRadius: "var(--radius-xl)",
                    padding: "20px", border: "1px solid var(--border-light)",
                    transition: "all 0.25s ease"
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-light)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px", gap: "12px" }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: "0.92rem" }}>{rev.client}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 600, marginTop: "2px" }}>{rev.city}</div>
                      </div>
                      <div style={{ display: "flex", gap: "2px", flexShrink: 0 }}>
                        {[...Array(rev.stars)].map((_, s) => <Star key={s} size={13} fill="#fbbf24" color="#fbbf24" />)}
                      </div>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.65, fontStyle: "italic" }}>
                      "{rev.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Booking Card ── */}
          <div style={{ position: "sticky", top: "90px" }}>
            <div style={{
              background: "var(--bg-surface)", borderRadius: "var(--radius-xl)", overflow: "hidden",
              border: isFounder ? "1.5px solid rgba(217,119,6,0.3)" : "1px solid var(--border-light)",
              boxShadow: isFounder ? "0 16px 48px rgba(217,119,6,0.1)" : "var(--shadow-md)"
            }}>
              {/* Card header */}
              <div style={{ background: "linear-gradient(135deg, #0c1526, #1a1a40)", padding: "20px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden", border: "2px solid #d97706", flexShrink: 0 }}>
                    <img src={agent.image} alt={agent.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 800, fontSize: "0.95rem" }}>{agent.name}</div>
                    <div style={{ color: "#64748b", fontSize: "0.72rem" }}>Responds in &lt; 30 minutes</div>
                  </div>
                  <span style={{ marginLeft: "auto", width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981" }} />
                </div>
              </div>

              <div style={{ padding: "22px" }}>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 800, margin: "0 0 4px" }}>Book VIP Consultation</h4>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: "0 0 18px" }}>Private 1-on-1 advisory • Free of charge</p>

                {booked ? (
                  <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "var(--radius-lg)", padding: "24px", textAlign: "center" }}>
                    <CheckCircle2 size={36} color="#10b981" style={{ display: "block", margin: "0 auto 12px" }} />
                    <h4 style={{ color: "#10b981", margin: "0 0 6px" }}>Consultation Confirmed!</h4>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem", margin: 0, lineHeight: 1.6 }}>
                      {agent.name} will contact you at <strong>{clientPhone}</strong> with the secure meeting link.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input type="text" required placeholder="Your name" value={clientName} onChange={e => setClientName(e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input type="email" required placeholder="name@email.com" value={clientEmail} onChange={e => setClientEmail(e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone / WhatsApp *</label>
                      <input type="tel" required placeholder="+91 98765 00000" value={clientPhone} onChange={e => setClientPhone(e.target.value)} style={inputStyle} />
                    </div>

                    {/* Meeting type toggle */}
                    <div>
                      <label style={labelStyle}>Consultation Format</label>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {[
                          { val: "video", label: "Video Call", icon: <Video size={13} /> },
                          { val: "in-person", label: "Office Meet", icon: <Building size={13} /> },
                          { val: "whatsapp", label: "WhatsApp", icon: <MessageSquare size={13} /> },
                        ].map(mt => (
                          <button
                            key={mt.val} type="button"
                            onClick={() => setMeetingType(mt.val)}
                            style={{
                              flex: 1, padding: "8px 4px",
                              borderRadius: "var(--radius-md)",
                              background: meetingType === mt.val ? "var(--accent-primary)" : "var(--bg-secondary)",
                              color: meetingType === mt.val ? "#fff" : "var(--text-secondary)",
                              border: meetingType === mt.val ? "none" : "1px solid var(--border-light)",
                              fontSize: "0.72rem", fontWeight: 700, cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center", gap: "4px",
                              transition: "all 0.2s"
                            }}
                          >
                            {mt.icon} {mt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>Preferred Date</label>
                      <input type="date" value={meetingDate} onChange={e => setMeetingDate(e.target.value)} style={inputStyle} />
                    </div>

                    <div>
                      <label style={labelStyle}>Notes (optional)</label>
                      <textarea
                        placeholder="Budget range, property type, location preference..."
                        value={notes} onChange={e => setNotes(e.target.value)} rows={2}
                        style={{ ...inputStyle, resize: "vertical" }}
                      />
                    </div>

                    <button type="submit" style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      padding: "13px", background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                      color: "#fff", border: "none", borderRadius: "var(--radius-lg)",
                      fontWeight: 800, fontSize: "0.9rem", cursor: "pointer",
                      boxShadow: "0 6px 18px rgba(99,102,241,0.35)"
                    }}>
                      <Zap size={16} /> Book VIP Appointment
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .agent-hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .agent-content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default AgentDetails;
