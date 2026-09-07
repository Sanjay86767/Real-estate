import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import {
  Building2,
  TrendingUp,
  Calendar,
  Clock,
  MapPin,
  Phone,
  FileText,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Trash2,
  ExternalLink,
  Plus,
  Share2,
  UserCheck,
  Download
} from "lucide-react";
import DealDeskModal from "../components/DealDeskModal";

export const Dashboard = ({ defaultTab }) => {
  const [searchParams] = useSearchParams();
  const queryTab = searchParams.get("tab");

  const {
    properties,
    favorites,
    scheduledVisits,
    cancelVisit,
    offers,
    updateOfferStatus,
    formatPrice,
    deleteCustomProperty,
    addToast,
    user,
    t,
    toggleFavorite
  } = usePropertyContext();

  const myListedProperties = properties.filter((p) => p.isCustom);
  const [activeTab, setActiveTab] = useState(
    queryTab || defaultTab || "visits"
  );

  useEffect(() => {
    if (queryTab) {
      setActiveTab(queryTab);
    } else if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [queryTab, defaultTab]);

  const [selectedPropertyForOffer, setSelectedPropertyForOffer] = useState(null);

  // Calculate tracked portfolio value from favorites
  const favoriteProps = properties.filter((p) => favorites.includes(p.id));
  const totalPortfolioValue = favoriteProps.reduce((sum, p) => sum + (p.price || 0), 0);

  // Helper for generating Google Calendar link
  const getGoogleCalendarUrl = (visit) => {
    const title = encodeURIComponent(`Site Inspection: ${visit.propertyTitle}`);
    const details = encodeURIComponent(
      `Private property inspection with ${visit.agentName} (${visit.agentPhone}). Location: ${visit.location}`
    );
    const location = encodeURIComponent(visit.location);
    // YYYYMMDD
    const dateFormatted = visit.date.replace(/-/g, "");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateFormatted}T060000Z/${dateFormatted}T070000Z`;
  };

  return (
    <div style={{ background: "var(--bg-main)", minHeight: "90vh", padding: "40px 0 80px" }}>
      <div className="container">
        {/* Top Header Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            borderRadius: "var(--radius-xl)",
            padding: "32px 36px",
            color: "#ffffff",
            marginBottom: "32px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
          }}
        >
          <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(245, 158, 11, 0.15)", border: "1px solid rgba(245, 158, 11, 0.3)", padding: "4px 12px", borderRadius: "20px", marginBottom: "10px" }}>
                <Sparkles size={14} color="#fbbf24" />
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#fbbf24", letterSpacing: "0.5px" }}>
                  INVESTOR COMMAND DESK
                </span>
              </div>
              <h1 style={{ fontSize: "2rem", fontWeight: 900, margin: "0 0 8px" }}>
                Welcome, {user?.name || "Distinguished Investor"}
              </h1>
              <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.95rem" }}>
                Manage verified site inspections, active deal term sheets, and portfolio wealth growth.
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link
                to="/properties"
                className="btn btn-gold"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 20px" }}
              >
                <span>Browse New Launches</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/list-property"
                className="btn btn-outline"
                style={{ borderColor: "rgba(255,255,255,0.3)", color: "#ffffff", padding: "10px 20px" }}
              >
                + List Your Property
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Core Financial KPI Metric Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
            marginBottom: "36px"
          }}
        >
          {/* Card 1: Tracked Portfolio Valuation */}
          <div
            onClick={() => setActiveTab("portfolio")}
            style={{
              background: "var(--bg-surface)",
              border: activeTab === "portfolio" ? "1.5px solid var(--accent-gold)" : "1px solid var(--border-light)",
              borderRadius: "var(--radius-lg)",
              padding: "20px",
              boxShadow: "var(--shadow-sm)",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            title="Click to view Saved Watchlist"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                {t("totalPortfolioValue")}
              </span>
              <Building2 size={20} color="var(--accent-primary)" />
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text-primary)" }}>
              {formatPrice(totalPortfolioValue || 45000000)}
            </div>
            <span style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 700, marginTop: "4px", display: "block" }}>
              Across {favoriteProps.length || 2} Monitored Properties →
            </span>
          </div>

          {/* Card 2: My Listed Properties */}
          <div
            onClick={() => setActiveTab("my-properties")}
            style={{
              background: "var(--bg-surface)",
              border: activeTab === "my-properties" ? "1.5px solid #f59e0b" : "1px solid var(--border-light)",
              borderRadius: "var(--radius-lg)",
              padding: "20px",
              boxShadow: "var(--shadow-sm)",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            title="Click to view My Listed Properties"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                My Added Listings
              </span>
              <Sparkles size={20} color="#f59e0b" />
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#f59e0b" }}>
              {myListedProperties.length} Properties
            </div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "4px", display: "block" }}>
              Published Live Nationwide →
            </span>
          </div>

          {/* Card 3: Active Deals */}
          <div
            onClick={() => setActiveTab("deals")}
            style={{
              background: "var(--bg-surface)",
              border: activeTab === "deals" ? "1.5px solid #d97706" : "1px solid var(--border-light)",
              borderRadius: "var(--radius-lg)",
              padding: "20px",
              boxShadow: "var(--shadow-sm)",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            title="Click to view Active Offers"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                {t("activeDeals")}
              </span>
              <FileText size={20} color="#d97706" />
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--accent-gold)" }}>
              {offers.length} Term Sheets
            </div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "4px", display: "block" }}>
              AI Acceptance Average: 84% →
            </span>
          </div>

          {/* Card 4: Scheduled Inspections */}
          <div
            onClick={() => setActiveTab("visits")}
            style={{
              background: "var(--bg-surface)",
              border: activeTab === "visits" ? "1.5px solid #3b82f6" : "1px solid var(--border-light)",
              borderRadius: "var(--radius-lg)",
              padding: "20px",
              boxShadow: "var(--shadow-sm)",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            title="Click to view Site Visit List"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                {t("scheduledVisits")}
              </span>
              <Calendar size={20} color="#3b82f6" />
            </div>
            <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#3b82f6" }}>
              {scheduledVisits.length} Confirmed
            </div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "4px", display: "block" }}>
              Click to Open Visit List →
            </span>
          </div>
        </div>

        {/* Main Section Tabs: My Properties | Visits | Deals | Portfolio */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            background: "var(--bg-surface)",
            padding: "8px",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border-light)",
            marginBottom: "32px",
            overflowX: "auto",
            boxShadow: "var(--shadow-sm)"
          }}
        >
          {[
            { id: "my-properties", label: `🏡 My Listed Properties (${myListedProperties.length})`, count: myListedProperties.length, color: "#f59e0b" },
            { id: "visits", label: `🗓️ Site Visit List (${scheduledVisits.length})`, count: scheduledVisits.length, color: "#3b82f6" },
            { id: "deals", label: `📑 My Offers & Deals (${offers.length})`, count: offers.length, color: "#d97706" },
            { id: "portfolio", label: `❤️ Saved Watchlist (${favoriteProps.length})`, count: favoriteProps.length, color: "#ec4899" }
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: "13px 18px",
                  borderRadius: "var(--radius-lg)",
                  border: isSelected ? `1.5px solid ${tab.color}` : "1px solid transparent",
                  background: isSelected ? "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(15, 23, 42, 0.95))" : "transparent",
                  fontWeight: 800,
                  fontSize: "0.92rem",
                  color: isSelected ? "#ffffff" : "var(--text-secondary)",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  whiteSpace: "nowrap",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: isSelected ? "0 4px 18px rgba(0,0,0,0.25)" : "none"
                }}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 0: MY LISTED PROPERTIES (PROPERTIES ADDED BY USER) */}
        {activeTab === "my-properties" && (
          <div>
            {myListedProperties.length === 0 ? (
              <div
                style={{
                  background: "var(--bg-surface)",
                  borderRadius: "var(--radius-lg)",
                  padding: "48px 24px",
                  textAlign: "center",
                  border: "1px dashed var(--border-light)"
                }}
              >
                <Building2 size={48} color="var(--accent-gold)" style={{ margin: "0 auto 16px" }} />
                <h3 style={{ margin: "0 0 8px" }}>No Properties Listed Yet</h3>
                <p style={{ color: "var(--text-secondary)", marginBottom: "20px", maxWidth: "520px", margin: "0 auto 20px" }}>
                  List your residential apartments, luxury villas, or royal heritage kothis on EstateHub to connect with verified buyers nationwide.
                </p>
                <Link to="/list-property" className="btn btn-gold" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <Plus size={16} />
                  <span>+ List Your First Property</span>
                </Link>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800 }}>
                      Your Live Listings Portfolio ({myListedProperties.length})
                    </h3>
                    <p style={{ margin: "4px 0 0", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      Properties you have published are live on EstateHub, pinned to the top of the All Residences catalog.
                    </p>
                  </div>
                  <Link to="/list-property" className="btn btn-gold btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <Plus size={14} />
                    <span>+ Add Another Property</span>
                  </Link>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "22px" }}>
                  {myListedProperties.map((prop) => {
                    const propImage = (prop.images && prop.images[0]) || prop.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80";
                    return (
                      <div
                        key={prop.id}
                        style={{
                          background: "var(--bg-surface)",
                          border: "1.5px solid rgba(245, 158, 11, 0.45)",
                          borderRadius: "var(--radius-xl)",
                          overflow: "hidden",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                          display: "flex",
                          flexDirection: "column"
                        }}
                      >
                        <div style={{ position: "relative", height: "200px" }}>
                          <img
                            src={propImage}
                            alt={prop.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              top: "12px",
                              left: "12px",
                              background: "linear-gradient(135deg, #10b981, #059669)",
                              color: "#ffffff",
                              fontSize: "0.72rem",
                              fontWeight: 900,
                              padding: "4px 10px",
                              borderRadius: "20px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "5px",
                              boxShadow: "0 4px 10px rgba(16, 185, 129, 0.4)"
                            }}
                          >
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ffffff", display: "inline-block" }}></span>
                            <span>LIVE & VERIFIED</span>
                          </div>

                          <div
                            style={{
                              position: "absolute",
                              bottom: "12px",
                              left: "12px",
                              background: "rgba(15, 23, 42, 0.9)",
                              backdropFilter: "blur(6px)",
                              color: "#fbbf24",
                              fontSize: "1.15rem",
                              fontWeight: 900,
                              padding: "4px 12px",
                              borderRadius: "8px",
                              border: "1px solid rgba(245, 158, 11, 0.4)"
                            }}
                          >
                            {formatPrice(prop.price)}
                          </div>
                        </div>

                        <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                          <div>
                            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px", flexWrap: "wrap" }}>
                              <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--accent-primary)", background: "var(--accent-primary-light)", padding: "2px 8px", borderRadius: "4px" }}>
                                {prop.type}
                              </span>
                              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                                {prop.bedrooms ? `${prop.bedrooms} BHK` : "Plot"} • {prop.area} sq.ft
                              </span>
                              <span style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: 700 }}>
                                {prop.status || "Ready to Move"}
                              </span>
                            </div>

                            <h3 style={{ margin: "0 0 6px", fontSize: "1.15rem", fontWeight: 800 }}>
                              {prop.title}
                            </h3>

                            <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--text-secondary)", fontSize: "0.82rem", marginBottom: "16px" }}>
                              <MapPin size={13} color="var(--accent-gold)" />
                              <span>{prop.location || `${prop.city}`}</span>
                            </div>
                          </div>

                          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", borderTop: "1px solid var(--border-light)", paddingTop: "14px" }}>
                            <Link
                              to={`/property/${prop.id}`}
                              className="btn btn-gold btn-sm"
                              style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px", textDecoration: "none" }}
                            >
                              <span>👁️ View Live Page</span>
                              <ExternalLink size={13} />
                            </Link>

                            <button
                              onClick={() => {
                                const url = `${window.location.origin}/property/${prop.id}`;
                                navigator.clipboard.writeText(url);
                                addToast("Direct link copied to clipboard! 📋", "success");
                              }}
                              className="btn btn-secondary btn-sm"
                              title="Copy Direct Link"
                              style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}
                            >
                              <Share2 size={13} />
                              <span>Share</span>
                            </button>

                            {deleteCustomProperty && (
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete "${prop.title}" from your listings?`)) {
                                    deleteCustomProperty(prop.id);
                                  }
                                }}
                                className="btn-icon btn-sm"
                                title="Delete Listing"
                                style={{ color: "#ef4444", borderColor: "rgba(239, 68, 68, 0.3)" }}
                              >
                                <Trash2 size={15} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 1: SCHEDULED SITE VISITS */}
        {activeTab === "visits" && (
          <div>
            {scheduledVisits.length === 0 ? (
              <div
                style={{
                  background: "var(--bg-surface)",
                  borderRadius: "var(--radius-xl)",
                  padding: "60px 24px",
                  textAlign: "center",
                  border: "1px dashed var(--border-light)"
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: "rgba(59, 130, 246, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px"
                  }}
                >
                  <Calendar size={36} color="#3b82f6" />
                </div>
                <h3 style={{ margin: "0 0 8px", fontSize: "1.35rem", fontWeight: 800 }}>
                  No Site Inspections Scheduled Yet
                </h3>
                <p style={{ color: "var(--text-secondary)", marginBottom: "24px", maxWidth: "480px", margin: "0 auto 24px" }}>
                  Book a private VIP physical tour or virtual inspection on any residence with verified keyholders and architects.
                </p>
                <Link to="/properties" className="btn btn-primary" style={{ padding: "12px 28px", fontWeight: 800 }}>
                  Explore Residences to Inspect
                </Link>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px" }}>
                {scheduledVisits.map((visit) => {
                  const matchedProp = properties.find((p) => p.id === Number(visit.propertyId));
                  const visitImage = matchedProp
                    ? (matchedProp.images && matchedProp.images[0]) || matchedProp.image
                    : "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80";
                  const propPrice = matchedProp ? formatPrice(matchedProp.price) : null;

                  return (
                    <div
                      key={visit.id}
                      style={{
                        background: "var(--bg-surface)",
                        border: "1.5px solid rgba(59, 130, 246, 0.4)",
                        borderRadius: "var(--radius-xl)",
                        overflow: "hidden",
                        boxShadow: "0 10px 28px rgba(0,0,0,0.14)",
                        display: "flex",
                        flexDirection: "column",
                        transition: "all 0.3s ease"
                      }}
                    >
                      {/* Property Image Banner with Visit Badges */}
                      <div style={{ position: "relative", height: "180px" }}>
                        <img
                          src={visitImage}
                          alt={visit.propertyTitle}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.15) 60%)"
                          }}
                        />

                        {/* Top Badges */}
                        <div style={{ position: "absolute", top: "12px", left: "12px", right: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span
                            style={{
                              background: "linear-gradient(135deg, #10b981, #059669)",
                              color: "#ffffff",
                              padding: "4px 12px",
                              borderRadius: "20px",
                              fontSize: "0.74rem",
                              fontWeight: 900,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "5px",
                              boxShadow: "0 4px 12px rgba(16, 185, 129, 0.4)"
                            }}
                          >
                            <CheckCircle2 size={13} />
                            <span>INSPECTION CONFIRMED</span>
                          </span>

                          <span
                            style={{
                              background: "rgba(15, 23, 42, 0.85)",
                              backdropFilter: "blur(6px)",
                              color: "#93c5fd",
                              fontSize: "0.72rem",
                              fontWeight: 800,
                              padding: "4px 10px",
                              borderRadius: "12px",
                              border: "1px solid rgba(59, 130, 246, 0.3)"
                            }}
                          >
                            {visit.type || "VIP Private Inspection"}
                          </span>
                        </div>

                        {/* Price & Pass ID */}
                        <div style={{ position: "absolute", bottom: "10px", left: "14px", right: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          {propPrice && (
                            <span style={{ color: "#fbbf24", fontWeight: 900, fontSize: "1.1rem", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
                              {propPrice}
                            </span>
                          )}
                          <span style={{ color: "#cbd5e1", fontSize: "0.72rem", background: "rgba(0,0,0,0.65)", padding: "2px 8px", borderRadius: "6px", fontWeight: 700 }}>
                            PASS: #{visit.id.toString().slice(-6).toUpperCase()}
                          </span>
                        </div>
                      </div>

                      {/* Content Details */}
                      <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <div>
                          <h3 style={{ margin: "0 0 6px", fontSize: "1.2rem", fontWeight: 800 }}>
                            {visit.propertyTitle}
                          </h3>

                          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "16px" }}>
                            <MapPin size={15} color="var(--accent-primary)" style={{ flexShrink: 0 }} />
                            <span>{visit.location}</span>
                          </div>

                          {/* Inspection Timing & Escort Box */}
                          <div
                            style={{
                              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(15, 23, 42, 0.6))",
                              borderRadius: "var(--radius-md)",
                              padding: "14px",
                              marginBottom: "16px",
                              border: "1px solid rgba(59, 130, 246, 0.25)"
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "0.92rem", fontWeight: 800, color: "var(--text-primary)" }}>
                              <Clock size={16} color="#3b82f6" />
                              <span>{visit.date} at {visit.time}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.84rem", color: "var(--text-secondary)" }}>
                              <UserCheck size={16} color="#f59e0b" />
                              <span>Dedicated Escort: <strong style={{ color: "var(--text-primary)" }}>{visit.agentName}</strong></span>
                            </div>
                          </div>
                        </div>

                        {/* Visit Actions: View Property, Google Cal, Call, Cancel */}
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", paddingTop: "14px", borderTop: "1px solid var(--border-light)" }}>
                          <Link
                            to={`/property/${visit.propertyId}`}
                            className="btn btn-primary btn-sm"
                            style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px", textDecoration: "none" }}
                          >
                            <ExternalLink size={13} />
                            <span>View Property</span>
                          </Link>

                          <a
                            href={getGoogleCalendarUrl(visit)}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-outline btn-sm"
                            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                            title="Sync with Google Calendar"
                          >
                            <Calendar size={13} />
                            <span>Google Cal</span>
                          </a>

                          <a
                            href={`tel:${visit.agentPhone}`}
                            className="btn btn-secondary btn-sm"
                            style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                            title={`Call ${visit.agentName}`}
                          >
                            <Phone size={13} />
                            <span>Call</span>
                          </a>

                          <button
                            onClick={() => cancelVisit(visit.id)}
                            className="btn-icon btn-sm"
                            title="Cancel Inspection"
                            style={{ color: "#ef4444" }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ACTIVE OFFERS & DEALS */}
        {activeTab === "deals" && (
          <div>
            {offers.length === 0 ? (
              <div
                style={{
                  background: "var(--bg-surface)",
                  borderRadius: "var(--radius-lg)",
                  padding: "48px 24px",
                  textAlign: "center",
                  border: "1px dashed var(--border-light)"
                }}
              >
                <FileText size={48} color="var(--text-muted)" style={{ margin: "0 auto 16px" }} />
                <h3 style={{ margin: "0 0 8px" }}>No Active Term Sheets</h3>
                <p style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>
                  Submit competitive counter-offers with AI probability ratings on any property.
                </p>
                <Link to="/properties" className="btn btn-primary">
                  Browse Properties & Make an Offer
                </Link>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "20px" }}>
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "var(--radius-xl)",
                      padding: "24px",
                      boxShadow: "var(--shadow-sm)"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <span
                        style={{
                          background: offer.status === "Accepted" ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                          color: offer.status === "Accepted" ? "#10b981" : "#d97706",
                          padding: "3px 10px",
                          borderRadius: "12px",
                          fontSize: "0.75rem",
                          fontWeight: 800
                        }}
                      >
                        {offer.status}
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "var(--accent-gold)", fontWeight: 700 }}>
                        {offer.loiCode}
                      </span>
                    </div>

                    <h3 style={{ margin: "0 0 8px", fontSize: "1.15rem", fontWeight: 800 }}>
                      {offer.propertyTitle}
                    </h3>

                    {/* Price Variance comparison */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "14px 0", background: "var(--bg-main)", padding: "12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)" }}>
                      <div>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Listed Asking</span>
                        <div style={{ fontSize: "1.05rem", fontWeight: 800 }}>{formatPrice(offer.askingPrice)}</div>
                      </div>
                      <div>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Your Offer</span>
                        <div style={{ fontSize: "1.05rem", fontWeight: 900, color: "#10b981" }}>{formatPrice(offer.offerPrice)}</div>
                      </div>
                    </div>

                    <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "16px" }}>
                      <div>Earnest Token Deposit: <strong>{formatPrice(offer.deposit || offer.earnestDeposit)}</strong></div>
                      <div>Target Closing Window: <strong>{offer.timeline}</strong></div>
                      <div>AI Acceptance Metric: <strong style={{ color: "#10b981" }}>{offer.probability}</strong></div>
                    </div>

                    {/* Buttons */}
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Link
                        to={`/property/${offer.propertyId}`}
                        className="btn btn-outline btn-sm"
                        style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                      >
                        <ExternalLink size={13} />
                        <span>View Residence</span>
                      </Link>
                      <button
                        onClick={() => {
                          const prop = properties.find((p) => p.id === offer.propertyId) || { id: offer.propertyId, title: offer.propertyTitle, price: offer.askingPrice };
                          setSelectedPropertyForOffer(prop);
                        }}
                        className="btn btn-gold btn-sm"
                        style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                      >
                        <FileText size={13} />
                        <span>Term Sheet</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SAVED PORTFOLIO WATCHLIST */}
        {activeTab === "portfolio" && (
          <div>
            {favoriteProps.length === 0 ? (
              <div
                style={{
                  background: "var(--bg-surface)",
                  borderRadius: "var(--radius-lg)",
                  padding: "48px 24px",
                  textAlign: "center",
                  border: "1px dashed var(--border-light)"
                }}
              >
                <Building2 size={48} color="var(--text-muted)" style={{ margin: "0 auto 16px" }} />
                <h3 style={{ margin: "0 0 8px" }}>Your Watchlist is Empty</h3>
                <p style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>
                  Save properties to track valuation updates, price drop alerts, and rental yields.
                </p>
                <Link to="/properties" className="btn btn-primary">
                  Explore 10,000+ Verified Homes
                </Link>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
                {favoriteProps.map((prop) => (
                  <div
                    key={prop.id}
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "var(--radius-xl)",
                      overflow: "hidden",
                      boxShadow: "var(--shadow-sm)",
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <div style={{ position: "relative", height: "180px" }}>
                      <img
                        src={prop.image}
                        alt={prop.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          left: "10px",
                          background: "rgba(15, 23, 42, 0.85)",
                          backdropFilter: "blur(4px)",
                          color: "#ffffff",
                          fontSize: "0.85rem",
                          fontWeight: 800,
                          padding: "4px 10px",
                          borderRadius: "6px"
                        }}
                      >
                        {formatPrice(prop.price)}
                      </div>
                    </div>

                    <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <h4 style={{ margin: "0 0 4px", fontSize: "1.05rem", fontWeight: 800 }}>
                          {prop.title}
                        </h4>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "block", marginBottom: "12px" }}>
                          {prop.location}, {prop.city}
                        </span>
                      </div>

                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", borderTop: "1px solid var(--border-light)", paddingTop: "12px" }}>
                        <button
                          onClick={() => setSelectedPropertyForOffer(prop)}
                          className="btn btn-gold btn-sm"
                          style={{ flex: 1 }}
                        >
                          Make Offer
                        </button>
                        <Link
                          to={`/property/${prop.id}`}
                          className="btn btn-outline btn-sm"
                          style={{ flex: 1, textAlign: "center" }}
                        >
                          Inspect
                        </Link>
                        <button
                          onClick={() => toggleFavorite(prop.id)}
                          className="btn-icon btn-sm"
                          style={{ color: "#ef4444" }}
                          title="Remove from Watchlist"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Deal Desk Modal trigger */}
      {selectedPropertyForOffer && (
        <DealDeskModal
          property={selectedPropertyForOffer}
          onClose={() => setSelectedPropertyForOffer(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
