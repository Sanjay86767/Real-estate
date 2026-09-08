import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import {
  Calendar, Clock, MapPin, Phone, CheckCircle2, Trash2,
  ExternalLink, Search, Sparkles, X, Share2, Bell,
  CalendarCheck, ChevronRight, Home, Filter, Star,
  AlertCircle, Video, Car, Download, ArrowRight, Plus
} from "lucide-react";

const STATUS_CONFIG = {
  Confirmed:    { color: "#10b981", bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.3)",  icon: CheckCircle2, label: "Confirmed" },
  Pending:      { color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.3)",  icon: AlertCircle,  label: "Pending" },
  Rescheduled:  { color: "#6366f1", bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.3)", icon: Calendar,     label: "Rescheduled" },
  Cancelled:    { color: "#ef4444", bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.3)",  icon: X,            label: "Cancelled" },
};

const getGoogleCalendarUrl = (visit) => {
  const title = encodeURIComponent(`Site Inspection: ${visit.propertyTitle}`);
  const details = encodeURIComponent(
    `Private property inspection with ${visit.agentName} (${visit.agentPhone}). Location: ${visit.location}`
  );
  const location = encodeURIComponent(visit.location || "");
  const dateFormatted = (visit.date || "").replace(/-/g, "");
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateFormatted}T060000Z/${dateFormatted}T070000Z`;
};

const getDaysUntil = (dateStr) => {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0,0,0,0);
  const visitDate = new Date(dateStr);
  const diff = Math.round((visitDate - today) / (1000 * 60 * 60 * 24));
  return diff;
};

export const VisitListPage = () => {
  const { scheduledVisits, cancelVisit, addToast, properties } = usePropertyContext();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("date-asc");

  // Apply search + filter
  let filtered = scheduledVisits.filter((v) => {
    const q = search.toLowerCase().trim();
    const matchSearch = !q || (
      v.propertyTitle?.toLowerCase().includes(q) ||
      v.location?.toLowerCase().includes(q) ||
      v.agentName?.toLowerCase().includes(q) ||
      v.type?.toLowerCase().includes(q)
    );
    const matchStatus = filterStatus === "All" || v.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Sort
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
    if (sortBy === "date-desc") return new Date(b.date) - new Date(a.date);
    if (sortBy === "name") return (a.propertyTitle || "").localeCompare(b.propertyTitle || "");
    return 0;
  });

  const upcoming = filtered.filter((v) => {
    const d = getDaysUntil(v.date);
    return d !== null && d >= 0 && v.status !== "Cancelled";
  });
  const past = filtered.filter((v) => {
    const d = getDaysUntil(v.date);
    return d !== null && d < 0 || v.status === "Cancelled";
  });

  const handleCancel = (visit) => {
    cancelVisit(visit.id);
    addToast(`Visit for "${visit.propertyTitle}" cancelled`, "info");
  };

  const handleShare = (visit) => {
    const text = `Site Inspection Confirmed!\n🏠 ${visit.propertyTitle}\n📅 ${visit.date} at ${visit.time}\n📍 ${visit.location}\nAgent: ${visit.agentName} (${visit.agentPhone})`;
    navigator.clipboard?.writeText(text);
    addToast("Visit details copied to clipboard!", "success");
  };

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingBottom: "100px" }}>

      {/* ── Hero ── */}
      <div style={{
        background: "linear-gradient(135deg, #0c1526 0%, #1a2540 50%, #0f1f3a 100%)",
        padding: "clamp(40px, 7vw, 72px) 0 clamp(28px, 5vw, 52px)",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: "-60px", right: "8%", width: "380px", height: "380px", background: "radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "5%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: "999px", padding: "5px 16px", marginBottom: "16px" }}>
                <CalendarCheck size={14} color="#60a5fa" />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#60a5fa", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Site Visit Manager
                </span>
              </div>
              <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", margin: "0 0 10px", lineHeight: 1.15 }}>
                My Visit List
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "1rem", margin: 0, maxWidth: "500px" }}>
                Track, manage and reschedule all your confirmed property inspections in one place.
              </p>
            </div>

            {/* Stats pills */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {[
                { label: "Total", value: scheduledVisits.length, color: "#60a5fa" },
                { label: "Upcoming", value: upcoming.length, color: "#10b981" },
                { label: "Confirmed", value: scheduledVisits.filter(v => v.status === "Confirmed").length, color: "#f59e0b" },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--radius-md)", padding: "12px 18px", textAlign: "center", minWidth: "72px" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: "0.7rem", color: "#94a3b8", marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Controls Bar ── */}
      <div style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border-light)", padding: "14px 0", position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(16px)" }}>
        <div className="container" style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
          {/* Search */}
          <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
            <Search size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search property, agent, location..."
              style={{
                width: "100%", padding: "9px 12px 9px 36px",
                background: "var(--bg-secondary)", border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-md)", fontSize: "0.875rem",
                color: "var(--text-primary)", outline: "none"
              }}
            />
            {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer" }}><X size={13} /></button>}
          </div>

          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: "9px 12px", background: "var(--bg-secondary)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", fontSize: "0.875rem", color: "var(--text-primary)", cursor: "pointer" }}
          >
            {["All", "Confirmed", "Pending", "Rescheduled", "Cancelled"].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: "9px 12px", background: "var(--bg-secondary)", border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", fontSize: "0.875rem", color: "var(--text-primary)", cursor: "pointer" }}
          >
            <option value="date-asc">Date: Earliest First</option>
            <option value="date-desc">Date: Latest First</option>
            <option value="name">Name A–Z</option>
          </select>

          <Link to="/properties" className="btn btn-primary" style={{ gap: "6px", display: "inline-flex", alignItems: "center", padding: "9px 16px", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
            <Plus size={14} /> Book New Visit
          </Link>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "36px" }}>

        {scheduledVisits.length === 0 ? (
          /* ── Empty State ── */
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{
              width: "110px", height: "110px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(59,130,246,0.15), rgba(59,130,246,0.04) 70%)",
              display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px",
              animation: "pulse 2.5s ease-in-out infinite"
            }}>
              <CalendarCheck size={44} color="#3b82f6" style={{ opacity: 0.7 }} />
            </div>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, marginBottom: "12px" }}>No Visits Scheduled Yet</h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "460px", margin: "0 auto 32px", lineHeight: 1.7, fontSize: "1rem" }}>
              Click the <Calendar size={14} style={{ display: "inline", verticalAlign: "middle" }} color="#3b82f6" /> calendar icon on any property card to book a free site inspection.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/properties" className="btn btn-primary btn-lg" style={{ gap: "8px", display: "inline-flex", alignItems: "center" }}>
                <Home size={18} /> Browse Properties
              </Link>
              <Link to="/dashboard" className="btn btn-secondary btn-lg">Go to Dashboard</Link>
            </div>
          </div>
        ) : (
          <>
            {/* Result count */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              <Sparkles size={15} color="var(--accent-gold)" />
              <span>
                Showing <strong style={{ color: "var(--text-primary)" }}>{filtered.length}</strong>
                {filtered.length !== scheduledVisits.length && ` of ${scheduledVisits.length}`} visit{filtered.length !== 1 ? "s" : ""}
              </span>
              {upcoming.length > 0 && (
                <span style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", color: "#10b981", fontSize: "0.75rem", fontWeight: 700, padding: "2px 10px", borderRadius: "999px" }}>
                  {upcoming.length} upcoming
                </span>
              )}
            </div>

            {/* ── Upcoming Visits ── */}
            {upcoming.length > 0 && (
              <section style={{ marginBottom: "48px" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981", display: "inline-block", boxShadow: "0 0 8px #10b981" }} />
                  Upcoming Inspections
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(clamp(300px, 45vw, 420px), 1fr))", gap: "20px" }}>
                  {upcoming.map((visit) => (
                    <VisitCard key={visit.id} visit={visit} onCancel={handleCancel} onShare={handleShare} properties={properties} />
                  ))}
                </div>
              </section>
            )}

            {/* ── Past Visits ── */}
            {past.length > 0 && (
              <section>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--text-muted)", display: "inline-block" }} />
                  Past & Cancelled
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(clamp(300px, 45vw, 420px), 1fr))", gap: "20px", opacity: 0.7 }}>
                  {past.map((visit) => (
                    <VisitCard key={visit.id} visit={visit} onCancel={handleCancel} onShare={handleShare} properties={properties} isPast />
                  ))}
                </div>
              </section>
            )}

            {/* No results after filter */}
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-secondary)" }}>
                <Search size={40} style={{ opacity: 0.3, display: "block", margin: "0 auto 16px" }} />
                <div style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "8px" }}>No visits match "{search}"</div>
                <button onClick={() => { setSearch(""); setFilterStatus("All"); }} style={{ color: "var(--accent-primary)", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

/* ─── Individual Visit Card ─── */
const VisitCard = ({ visit, onCancel, onShare, properties, isPast }) => {
  const [hovered, setHovered] = useState(false);
  const cfg = STATUS_CONFIG[visit.status] || STATUS_CONFIG.Confirmed;
  const StatusIcon = cfg.icon;
  const daysUntil = getDaysUntil(visit.date);
  const property = properties.find(p => p.id === visit.propertyId);
  const propImage = property?.images?.[0] || property?.image ||
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80";

  const urgencyBg = daysUntil === 0 ? "#ef4444" : daysUntil === 1 ? "#f59e0b" : daysUntil <= 3 ? "#6366f1" : "#10b981";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--bg-surface)",
        border: hovered ? `1.5px solid ${cfg.color}60` : "1px solid var(--border-light)",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        boxShadow: hovered
          ? `0 16px 48px rgba(0,0,0,0.18), 0 0 0 1px ${cfg.color}20`
          : "var(--shadow-sm)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        display: "flex", flexDirection: "column"
      }}
    >
      {/* Image header */}
      <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
        <img src={propImage} alt={visit.propertyTitle}
          style={{ width: "100%", height: "100%", objectFit: "cover",
            filter: isPast ? "grayscale(0.5)" : "none",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.5s ease"
          }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.7) 100%)" }} />

        {/* Status badge */}
        <div style={{
          position: "absolute", top: "12px", left: "12px",
          display: "inline-flex", alignItems: "center", gap: "5px",
          background: cfg.bg, border: `1px solid ${cfg.border}`,
          borderRadius: "999px", padding: "4px 10px",
          backdropFilter: "blur(8px)"
        }}>
          <StatusIcon size={12} color={cfg.color} />
          <span style={{ fontSize: "0.68rem", fontWeight: 800, color: cfg.color, textTransform: "uppercase", letterSpacing: "0.4px" }}>
            {visit.status || "Confirmed"}
          </span>
        </div>

        {/* Days until pill */}
        {!isPast && daysUntil !== null && (
          <div style={{
            position: "absolute", top: "12px", right: "12px",
            background: urgencyBg, color: "#fff",
            borderRadius: "999px", padding: "4px 10px",
            fontSize: "0.68rem", fontWeight: 800
          }}>
            {daysUntil === 0 ? "TODAY!" : daysUntil === 1 ? "Tomorrow" : `In ${daysUntil}d`}
          </div>
        )}

        {/* Property name overlay */}
        <div style={{ position: "absolute", bottom: "12px", left: "12px", right: "12px" }}>
          <div style={{ fontWeight: 800, color: "#fff", fontSize: "1rem", lineHeight: 1.25,
            textShadow: "0 1px 8px rgba(0,0,0,0.8)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
          }}>
            {visit.propertyTitle}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: "18px 18px 16px", flex: 1 }}>
        {/* Tour type badge */}
        <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "14px", flexWrap: "wrap" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "4px",
            fontSize: "0.7rem", fontWeight: 700, padding: "3px 8px",
            background: "var(--accent-primary-light)", color: "var(--accent-primary)",
            borderRadius: "999px", textTransform: "uppercase"
          }}>
            {visit.tourType?.includes("Video") ? <Video size={10} /> : <Home size={10} />}
            {visit.type || "Site Inspection"}
          </span>
          {visit.needCab && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.7rem", fontWeight: 700, padding: "3px 8px", background: "rgba(99,102,241,0.1)", color: "#6366f1", borderRadius: "999px" }}>
              <Car size={10} /> Cab Requested
            </span>
          )}
        </div>

        {/* Details grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>Date</span>
            <span style={{ fontSize: "0.88rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "5px" }}>
              <Calendar size={13} color="var(--accent-primary)" />
              {visit.date ? new Date(visit.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>Time</span>
            <span style={{ fontSize: "0.88rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "5px" }}>
              <Clock size={13} color="var(--accent-gold)" />
              {visit.time || "—"}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px", gridColumn: "1/-1" }}>
            <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>Location</span>
            <span style={{ fontSize: "0.83rem", fontWeight: 600, display: "flex", alignItems: "flex-start", gap: "5px", color: "var(--text-secondary)" }}>
              <MapPin size={13} color="#ec4899" style={{ flexShrink: 0, marginTop: "2px" }} />
              {visit.location || "Prime Location"}
            </span>
          </div>
        </div>

        {/* Agent info */}
        <div style={{
          background: "var(--bg-secondary)", borderRadius: "var(--radius-md)",
          padding: "10px 12px", marginBottom: "14px",
          display: "flex", alignItems: "center", gap: "10px"
        }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "var(--accent-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: "1rem" }}>👤</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "0.82rem", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {visit.agentName || "EstateHub Agent"}
            </div>
            <a href={`tel:${visit.agentPhone}`} style={{ fontSize: "0.75rem", color: "var(--accent-primary)", fontWeight: 600, textDecoration: "none" }}>
              {visit.agentPhone}
            </a>
          </div>
          <a
            href={`tel:${visit.agentPhone}`}
            style={{
              width: "32px", height: "32px", borderRadius: "50%",
              background: "var(--accent-primary)", display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", flexShrink: 0
            }}
          >
            <Phone size={14} />
          </a>
        </div>

        {/* Visitor info */}
        {visit.visitorName && (
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
            <CheckCircle2 size={12} color="#10b981" />
            Visitor: <strong style={{ color: "var(--text-secondary)" }}>{visit.visitorName}</strong>
            {visit.visitorPhone && <span>• {visit.visitorPhone}</span>}
          </div>
        )}
      </div>

      {/* Card Actions */}
      <div style={{ padding: "0 18px 18px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", gap: "8px" }}>
          {property && (
            <Link
              to={`/property/${visit.propertyId}`}
              style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
                padding: "9px", background: "var(--accent-primary)", color: "#fff",
                borderRadius: "var(--radius-md)", fontWeight: 700, fontSize: "0.8rem",
                textDecoration: "none", transition: "opacity 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
            >
              <ExternalLink size={13} /> View Property
            </Link>
          )}
          <a
            href={getGoogleCalendarUrl(visit)}
            target="_blank" rel="noreferrer"
            title="Add to Google Calendar"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
              padding: "9px 12px", background: "var(--bg-secondary)",
              border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)",
              color: "var(--text-secondary)", fontSize: "0.78rem", fontWeight: 600,
              textDecoration: "none"
            }}
          >
            <Calendar size={13} /> Cal
          </a>
          <button
            onClick={() => onShare(visit)}
            title="Copy visit details"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "9px 12px", background: "var(--bg-secondary)",
              border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)",
              color: "var(--text-secondary)", cursor: "pointer"
            }}
          >
            <Share2 size={13} />
          </button>
        </div>

        {/* Cancel button */}
        {visit.status !== "Cancelled" && (
          <button
            onClick={() => onCancel(visit)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
              padding: "7px", background: "rgba(239,68,68,0.07)",
              border: "1px solid rgba(239,68,68,0.2)", borderRadius: "var(--radius-md)",
              color: "#ef4444", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.14)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.07)"; }}
          >
            <Trash2 size={12} /> Cancel Visit
          </button>
        )}
      </div>
    </div>
  );
};

export default VisitListPage;
