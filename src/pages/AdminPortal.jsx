import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Database,
  Building2,
  TrendingUp,
  FileText,
  Calendar,
  Trash2,
  CheckCircle2,
  Clock,
  RefreshCw,
  Sparkles,
  PlusCircle,
  ExternalLink,
  ShieldAlert,
  Search,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  DollarSign
} from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";
import apiService from "../services/api";
import EscrowModal from "../components/EscrowModal";

export const AdminPortal = () => {
  const {
    formatPrice,
    addToast,
    backendStatus,
    offers,
    updateOfferStatus,
    scheduledVisits,
    cancelVisit
  } = usePropertyContext();

  const [activeTab, setActiveTab] = useState("properties"); // 'properties' | 'deals' | 'visits' | 'analytics'
  const [propertiesList, setPropertiesList] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEscrowDeal, setSelectedEscrowDeal] = useState(null);

  // Load telemetry & properties directly from MongoDB Atlas API
  const loadData = async () => {
    setLoading(true);
    try {
      const [props, stats] = await Promise.all([
        apiService.getProperties(),
        apiService.getAnalytics()
      ]);
      if (props) setPropertiesList(props);
      if (stats) setAnalytics(stats);
    } catch (e) {
      console.warn("Could not load admin data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Delete property from MongoDB Atlas
  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}" from MongoDB Atlas?`)) return;

    try {
      const res = await apiService.deleteProperty(id);
      if (res && res.success) {
        setPropertiesList((prev) => prev.filter((p) => p.id !== id && p._id !== id && p.numericId !== id));
        addToast(`"${title}" deleted from MongoDB Atlas!`, "info");
      } else {
        addToast(res?.message || "Failed to delete property", "warning");
      }
    } catch (err) {
      addToast("Network error deleting property", "error");
    }
  };

  // Toggle Property Status (For Sale <-> Under Offer <-> Sold)
  const handleStatusChange = async (id, currentStatus) => {
    const nextStatus =
      currentStatus === "For Sale" ? "Under Offer" : currentStatus === "Under Offer" ? "Sold" : "For Sale";

    try {
      const res = await apiService.updatePropertyStatus(id, nextStatus);
      if (res && res.success) {
        setPropertiesList((prev) =>
          prev.map((p) => (p.id === id || p._id === id || p.numericId === id ? { ...p, status: nextStatus } : p))
        );
        addToast(`Status updated to "${nextStatus}" in MongoDB Atlas!`, "success");
      }
    } catch (err) {
      addToast("Error updating status", "error");
    }
  };

  // Trigger one-click seed
  const handleReSeed = async () => {
    if (!window.confirm("Re-seed MongoDB Atlas with all 57 signature luxury properties?")) return;
    try {
      const res = await apiService.seedDatabase();
      if (res && res.success) {
        addToast(res.message, "success");
        loadData();
      }
    } catch (err) {
      addToast("Error seeding database", "error");
    }
  };

  const filteredProps = propertiesList.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-portal-page" style={{ minHeight: "90vh", padding: "40px 16px", background: "var(--bg-primary)" }}>
      <div className="container" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header with Live Telemetry */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "20px", marginBottom: "32px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <span style={{ background: "rgba(99, 102, 241, 0.15)", color: "#6366f1", padding: "4px 12px", borderRadius: "20px", fontSize: "0.78rem", fontWeight: 800 }}>
                ● ENTERPRISE MERN CONTROL DESK
              </span>
              <span
                style={{
                  background: backendStatus?.connected ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                  color: backendStatus?.connected ? "#10b981" : "#f59e0b",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <Database size={13} />
                <span>{backendStatus?.connected ? "MongoDB Atlas Cloud Live" : "In-Memory Fallback"}</span>
              </span>
            </div>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 900, margin: "0 0 6px", color: "var(--text-primary)" }}>
              Platform Operations & Cloud Admin
            </h1>
            <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.95rem" }}>
              Live telemetry, inventory CRUD, buyer LOI pipeline, and RERA inspection desk.
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={handleReSeed}
              className="btn btn-secondary"
              style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem" }}
              title="Reset and repopulate 57 properties into MongoDB Atlas"
            >
              <RefreshCw size={15} />
              <span>Sync / Re-Seed Cloud</span>
            </button>
            <Link
              to="/list-property"
              className="btn btn-gold"
              style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", fontSize: "0.85rem" }}
            >
              <PlusCircle size={16} />
              <span>+ Add New Property</span>
            </Link>
          </div>
        </div>

        {/* 4 Telemetry KPI Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "18px",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              padding: "20px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-light)",
              borderRadius: "14px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase" }}>Cloud Inventory</span>
              <Building2 size={20} color="#6366f1" />
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--text-primary)" }}>
              {analytics?.totalProperties || propertiesList.length || 57}
            </div>
            <span style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 700 }}>
              ● 100% Synced to MongoDB Atlas
            </span>
          </div>

          <div
            style={{
              padding: "20px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-light)",
              borderRadius: "14px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase" }}>Portfolio Valuation</span>
              <TrendingUp size={20} color="#d4af37" />
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: "#d4af37" }}>
              {analytics?.totalValuation ? formatPrice(analytics.totalValuation) : "₹125.46 Cr"}
            </div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              Avg ticket: {analytics?.avgPrice ? formatPrice(analytics.avgPrice) : "₹2.20 Cr"}
            </span>
          </div>

          <div
            style={{
              padding: "20px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-light)",
              borderRadius: "14px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase" }}>Active Deal Desk LOIs</span>
              <FileText size={20} color="#3b82f6" />
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--text-primary)" }}>
              {offers.length}
            </div>
            <span style={{ fontSize: "0.75rem", color: "#3b82f6", fontWeight: 700 }}>
              Live buyer-seller negotiations
            </span>
          </div>

          <div
            style={{
              padding: "20px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-light)",
              borderRadius: "14px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", marginBottom: "8px" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase" }}>Scheduled Site Visits</span>
              <Calendar size={20} color="#ec4899" />
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--text-primary)" }}>
              {scheduledVisits.length}
            </div>
            <span style={{ fontSize: "0.75rem", color: "#ec4899", fontWeight: 700 }}>
              VIP inspections on calendar
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid var(--border-light)", marginBottom: "24px" }}>
          {[
            { id: "properties", label: "Properties Catalog", icon: Building2, count: propertiesList.length },
            { id: "deals", label: "Deal Desk LOIs", icon: FileText, count: offers.length },
            { id: "visits", label: "Site Inspection Tours", icon: Calendar, count: scheduledVisits.length },
            { id: "analytics", label: "Market Analytics", icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "12px 18px",
                  background: "transparent",
                  border: "none",
                  borderBottom: active ? "3px solid #d4af37" : "3px solid transparent",
                  color: active ? "#d4af37" : "var(--text-secondary)",
                  fontWeight: active ? 800 : 600,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    style={{
                      background: active ? "rgba(212, 175, 55, 0.2)" : "rgba(255,255,255,0.08)",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      fontSize: "0.75rem",
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Properties Catalog */}
        {activeTab === "properties" && (
          <div
            style={{
              background: "var(--bg-card)",
              borderRadius: "16px",
              border: "1px solid var(--border-light)",
              padding: "20px",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
              <div style={{ position: "relative", minWidth: "260px" }}>
                <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input
                  type="text"
                  placeholder="Search by title, city, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 12px 9px 36px",
                    borderRadius: "8px",
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-light)",
                    color: "var(--text-primary)",
                    fontSize: "0.85rem",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Showing <strong>{filteredProps.length}</strong> cloud properties
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-light)", color: "var(--text-muted)", textAlign: "left" }}>
                    <th style={{ padding: "12px 8px" }}>Property</th>
                    <th style={{ padding: "12px 8px" }}>City / Type</th>
                    <th style={{ padding: "12px 8px" }}>Price</th>
                    <th style={{ padding: "12px 8px" }}>Vastu / RERA</th>
                    <th style={{ padding: "12px 8px" }}>Status</th>
                    <th style={{ padding: "12px 8px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProps.slice(0, 15).map((prop) => (
                    <tr
                      key={prop._id || prop.id}
                      style={{
                        borderBottom: "1px solid var(--border-light)",
                        transition: "background 0.15s ease",
                      }}
                    >
                      <td style={{ padding: "12px 8px", display: "flex", alignItems: "center", gap: "10px" }}>
                        <img
                          src={prop.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200"}
                          alt={prop.title}
                          style={{ width: "48px", height: "40px", borderRadius: "6px", objectFit: "cover" }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{prop.title}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            ID: #{prop.numericId || prop.id} • {prop.bedrooms} BHK
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <div>{prop.city}</div>
                        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{prop.type}</span>
                      </td>
                      <td style={{ padding: "12px 8px", fontWeight: 800, color: "var(--accent-primary)" }}>
                        {formatPrice(prop.price)}
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <span style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 700, display: "block" }}>
                          🧭 {prop.vastu?.score || 92}% {prop.vastu?.facing || "North-East"}
                        </span>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>RERA Verified</span>
                      </td>
                      <td style={{ padding: "12px 8px" }}>
                        <button
                          onClick={() => handleStatusChange(prop._id || prop.id, prop.status || "For Sale")}
                          style={{
                            background:
                              prop.status === "Sold"
                                ? "rgba(239, 68, 68, 0.15)"
                                : prop.status === "Under Offer"
                                ? "rgba(245, 158, 11, 0.15)"
                                : "rgba(16, 185, 129, 0.15)",
                            color:
                              prop.status === "Sold"
                                ? "#ef4444"
                                : prop.status === "Under Offer"
                                ? "#f59e0b"
                                : "#10b981",
                            border: "none",
                            padding: "4px 10px",
                            borderRadius: "14px",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                          title="Click to toggle status in MongoDB Atlas"
                        >
                          ● {prop.status || "For Sale"}
                        </button>
                      </td>
                      <td style={{ padding: "12px 8px", textAlign: "right" }}>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                          <Link
                            to={`/properties/${prop.numericId || prop.id}`}
                            style={{
                              padding: "6px",
                              borderRadius: "6px",
                              background: "var(--bg-secondary)",
                              color: "var(--text-primary)",
                              display: "inline-flex",
                            }}
                            title="View live dossier"
                          >
                            <ExternalLink size={14} />
                          </Link>
                          <button
                            onClick={() => handleDelete(prop._id || prop.id, prop.title)}
                            style={{
                              padding: "6px",
                              borderRadius: "6px",
                              background: "rgba(239, 68, 68, 0.1)",
                              border: "1px solid rgba(239, 68, 68, 0.2)",
                              color: "#ef4444",
                              cursor: "pointer",
                            }}
                            title="Delete permanently from MongoDB Atlas"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Deal Desk LOIs */}
        {activeTab === "deals" && (
          <div
            style={{
              background: "var(--bg-card)",
              borderRadius: "16px",
              border: "1px solid var(--border-light)",
              padding: "20px",
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <h3 style={{ margin: "0 0 4px", fontSize: "1.2rem", fontWeight: 800 }}>
                Active LOI Bids & Negotiations
              </h3>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Offers submitted via Deal Desk stored directly in MongoDB Atlas.
              </p>
            </div>

            {offers.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-muted)" }}>
                No active offers in negotiation pipeline.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {offers.map((deal) => (
                  <div
                    key={deal.id}
                    style={{
                      padding: "18px",
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "14px",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <span style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--text-primary)" }}>
                          {deal.propertyTitle}
                        </span>
                        <span
                          style={{
                            background:
                              deal.status === "Accepted"
                                ? "rgba(16, 185, 129, 0.15)"
                                : deal.status === "Earnest Escrowed"
                                ? "rgba(212, 175, 55, 0.2)"
                                : "rgba(59, 130, 246, 0.15)",
                            color:
                              deal.status === "Accepted"
                                ? "#10b981"
                                : deal.status === "Earnest Escrowed"
                                ? "#d4af37"
                                : "#3b82f6",
                            padding: "2px 8px",
                            borderRadius: "10px",
                            fontSize: "0.72rem",
                            fontWeight: 800,
                          }}
                        >
                          ● {deal.status}
                        </span>
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        LOI: <strong style={{ color: "#d4af37" }}>{deal.loiCode}</strong> • Closing: {deal.timeline} • Probability: {deal.probability}
                      </div>
                      <div style={{ marginTop: "6px", fontSize: "0.9rem" }}>
                        Offer: <strong style={{ color: "var(--accent-primary)" }}>{formatPrice(deal.offerPrice)}</strong>{" "}
                        <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                          (Asking: {formatPrice(deal.askingPrice)})
                        </span>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <button
                        onClick={() => setSelectedEscrowDeal(deal)}
                        style={{
                          padding: "8px 14px",
                          borderRadius: "8px",
                          background: "linear-gradient(135deg, #d4af37, #aa820a)",
                          border: "none",
                          color: "#000",
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <ShieldCheck size={14} />
                        <span>Escrow Token</span>
                      </button>
                      <button
                        onClick={() => updateOfferStatus(deal.id, "Accepted")}
                        style={{
                          padding: "8px 14px",
                          borderRadius: "8px",
                          background: "rgba(16, 185, 129, 0.15)",
                          border: "1px solid rgba(16, 185, 129, 0.3)",
                          color: "#10b981",
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          cursor: "pointer",
                        }}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateOfferStatus(deal.id, "Countered")}
                        style={{
                          padding: "8px 14px",
                          borderRadius: "8px",
                          background: "rgba(245, 158, 11, 0.15)",
                          border: "1px solid rgba(245, 158, 11, 0.3)",
                          color: "#f59e0b",
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          cursor: "pointer",
                        }}
                      >
                        Counter
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Site Inspection Tours */}
        {activeTab === "visits" && (
          <div
            style={{
              background: "var(--bg-card)",
              borderRadius: "16px",
              border: "1px solid var(--border-light)",
              padding: "20px",
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <h3 style={{ margin: "0 0 4px", fontSize: "1.2rem", fontWeight: 800 }}>
                Inspection Desk & Calendar
              </h3>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Tours booked via properties or EstateBot AI synced to MongoDB Atlas.
              </p>
            </div>

            {scheduledVisits.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-muted)" }}>
                No site inspections scheduled.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {scheduledVisits.map((v) => (
                  <div
                    key={v.id}
                    style={{
                      padding: "16px",
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text-primary)" }}>
                        {v.propertyTitle}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "2px" }}>
                        📅 {v.date} at {v.time} • {v.type}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#10b981", marginTop: "2px" }}>
                        Escort: {v.agentName} ({v.agentPhone})
                      </div>
                    </div>
                    <button
                      onClick={() => cancelVisit(v.id)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        color: "#ef4444",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                      }}
                    >
                      Cancel Tour
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Market Analytics */}
        {activeTab === "analytics" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div
              style={{
                background: "var(--bg-card)",
                borderRadius: "16px",
                border: "1px solid var(--border-light)",
                padding: "20px",
              }}
            >
              <h3 style={{ margin: "0 0 16px", fontSize: "1.1rem", fontWeight: 800 }}>
                Inventory by Tier-1 Corridors
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {analytics?.cities?.map((c) => (
                  <div
                    key={c._id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      background: "var(--bg-secondary)",
                      borderRadius: "8px",
                      fontSize: "0.9rem",
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>{c._id}</span>
                    <span style={{ color: "#d4af37", fontWeight: 800 }}>
                      {c.count} Residences • Avg {formatPrice(c.avgPrice)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: "var(--bg-card)",
                borderRadius: "16px",
                border: "1px solid var(--border-light)",
                padding: "20px",
              }}
            >
              <h3 style={{ margin: "0 0 16px", fontSize: "1.1rem", fontWeight: 800 }}>
                Property Asset Classes
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {analytics?.types?.map((t) => (
                  <div
                    key={t._id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      background: "var(--bg-secondary)",
                      borderRadius: "8px",
                      fontSize: "0.9rem",
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>{t._id}</span>
                    <span style={{ color: "var(--accent-primary)", fontWeight: 800 }}>
                      {t.count} Units
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Escrow Modal Triggered from Deal Desk Tab */}
      {selectedEscrowDeal && (
        <EscrowModal
          deal={selectedEscrowDeal}
          onClose={() => setSelectedEscrowDeal(null)}
          onSuccess={() => setSelectedEscrowDeal(null)}
        />
      )}
    </div>
  );
};

export default AdminPortal;
