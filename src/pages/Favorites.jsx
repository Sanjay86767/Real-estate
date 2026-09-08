import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import PropertyCard from "../components/PropertyCard";
import {
  Heart, Trash2, Home, Grid, List,
  TrendingUp, ArrowRight, Search, Sparkles,
  MapPin, X
} from "lucide-react";

export const Favorites = () => {
  const { properties, favorites, clearAllFavorites } = usePropertyContext();
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("default");
  const [search, setSearch] = useState("");

  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));

  const searched = favoriteProperties.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.city?.toLowerCase().includes(search.toLowerCase()) ||
    p.type?.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...searched].sort((a, b) => {
    if (sortBy === "price-asc") return (a.price || 0) - (b.price || 0);
    if (sortBy === "price-desc") return (b.price || 0) - (a.price || 0);
    if (sortBy === "name") return (a.title || "").localeCompare(b.title || "");
    return 0;
  });

  const cities = [...new Set(favoriteProperties.map((p) => p.city).filter(Boolean))];
  const types = [...new Set(favoriteProperties.map((p) => p.type).filter(Boolean))];

  return (
    <div className="favorites-page" style={{ padding: "0 0 100px", minHeight: "100vh" }}>

      {/* Hero Banner */}
      <div style={{
        background: "linear-gradient(135deg, #0f1729 0%, #1a1040 50%, #0d1f3c 100%)",
        padding: "clamp(40px, 7vw, 80px) 0 clamp(32px, 5vw, 60px)",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: "-60px", right: "5%", width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", bottom: "-80px", left: "8%", width: "350px", height: "350px",
          background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none"
        }} />
        <div className="container">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px,4vw,40px)", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(236,72,153,0.12)", border: "1px solid rgba(236,72,153,0.3)", borderRadius: "999px", padding: "5px 14px", marginBottom: "16px" }}>
                <Heart size={14} fill="var(--accent-rose)" color="var(--accent-rose)" />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-rose)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  My Shortlist
                </span>
                {favoriteProperties.length > 0 && (
                  <span style={{ background: "var(--accent-rose)", color: "#fff", borderRadius: "999px", padding: "1px 8px", fontSize: "0.72rem", fontWeight: 800 }}>
                    {favoriteProperties.length}
                  </span>
                )}
              </div>
              <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, margin: "0 0 10px" }}>
                My Favourite Properties
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "1rem", margin: 0, maxWidth: "520px" }}>
                Your curated shortlist — saved locally in your browser. Compare, share, and contact advisors at your own pace.
              </p>
            </div>
            {favoriteProperties.length > 0 && (
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                {[
                  { label: "Saved", value: favoriteProperties.length, color: "var(--accent-gold)" },
                  { label: "Cities", value: cities.length, color: "#10b981" },
                  { label: "Types", value: types.length, color: "#60a5fa" }
                ].map((stat) => (
                  <div key={stat.label} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: "var(--radius-md)", padding: "14px 20px", textAlign: "center" }}>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "2px" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      {favoriteProperties.length > 0 && (
        <div style={{
          background: "var(--bg-surface)", borderBottom: "1px solid var(--border-light)",
          padding: "14px 0", position: "sticky", top: "0", zIndex: 50, backdropFilter: "blur(12px)"
        }}>
          <div className="container" style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: "1", minWidth: "220px" }}>
              <Search size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your shortlist..."
                style={{
                  width: "100%", padding: "8px 12px 8px 36px",
                  background: "var(--bg-secondary)", border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-md)", fontSize: "0.88rem",
                  color: "var(--text-primary)", outline: "none"
                }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", cursor: "pointer", background: "none", border: "none" }}>
                  <X size={14} />
                </button>
              )}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "8px 12px", background: "var(--bg-secondary)",
                border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)",
                fontSize: "0.88rem", color: "var(--text-primary)", cursor: "pointer"
              }}
            >
              <option value="default">Default Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name A to Z</option>
            </select>
            <div style={{ display: "flex", border: "1px solid var(--border-light)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
              {[
                { mode: "grid", Icon: Grid, title: "Grid View" },
                { mode: "list", Icon: List, title: "List View" }
              ].map(({ mode, Icon, title }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  title={title}
                  style={{
                    padding: "8px 14px",
                    background: viewMode === mode ? "var(--accent-primary)" : "var(--bg-secondary)",
                    color: viewMode === mode ? "#fff" : "var(--text-muted)",
                    cursor: "pointer", border: "none", display: "flex", alignItems: "center"
                  }}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
            <button
              onClick={clearAllFavorites}
              style={{
                display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px",
                background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: "var(--radius-md)", color: "#ef4444",
                fontSize: "0.84rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.18)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
            >
              <Trash2 size={15} /> Clear All
            </button>
          </div>
        </div>
      )}

      <div className="container" style={{ paddingTop: "36px" }}>
        {favoriteProperties.length > 0 ? (
          <>
            <div style={{ marginBottom: "20px", fontSize: "0.9rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <Sparkles size={15} color="var(--accent-gold)" />
              Showing <strong style={{ color: "var(--text-primary)" }}>{sorted.length}</strong>
              {sorted.length !== favoriteProperties.length && ` of ${favoriteProperties.length}`}{" "}
              saved {sorted.length === 1 ? "property" : "properties"}
              {cities.length > 0 && <span style={{ color: "var(--text-muted)" }}>• {cities.join(", ")}</span>}
            </div>

            {viewMode === "grid" ? (
              <div className="properties-grid">
                {sorted.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {sorted.map((prop) => (
                  <Link key={prop.id} to={`/property/${prop.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <div
                      style={{
                        display: "flex", gap: "20px", alignItems: "center",
                        background: "var(--bg-surface)", border: "1px solid var(--border-light)",
                        borderRadius: "var(--radius-lg)", padding: "16px 20px",
                        transition: "all 0.25s ease", cursor: "pointer"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--accent-primary)";
                        e.currentTarget.style.boxShadow = "0 4px 20px rgba(99,102,241,0.15)";
                        e.currentTarget.style.transform = "translateX(5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border-light)";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <img
                        src={prop.image || (prop.images && prop.images[0]) || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80"}
                        alt={prop.title}
                        style={{ width: "90px", height: "70px", objectFit: "cover", borderRadius: "var(--radius-md)", flexShrink: 0 }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "4px" }}>
                          <span style={{ background: "var(--accent-primary-light)", color: "var(--accent-primary)", fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: "999px", textTransform: "uppercase" }}>
                            {prop.type}
                          </span>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{prop.title}</div>
                        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "4px", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                          {prop.city && <span style={{ display: "flex", alignItems: "center", gap: "3px" }}><MapPin size={11} />{prop.city}</span>}
                          {prop.beds && <span>🛏 {prop.beds} Beds</span>}
                          {prop.baths && <span>🚿 {prop.baths} Baths</span>}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--accent-gold)" }}>{prop.price}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--accent-primary)", marginTop: "4px" }}>View Details →</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {sorted.length === 0 && search && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-secondary)" }}>
                <Search size={40} style={{ opacity: 0.3, marginBottom: "16px", display: "block", margin: "0 auto 16px" }} />
                <div style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "8px" }}>No matches for "{search}"</div>
                <button onClick={() => setSearch("")} style={{ color: "var(--accent-primary)", cursor: "pointer", fontWeight: 600, background: "none", border: "none", fontSize: "0.9rem" }}>
                  Clear search
                </button>
              </div>
            )}

            {/* CTA Banner */}
            <div style={{
              marginTop: "60px",
              background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(217,119,6,0.06))",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-xl)",
              padding: "clamp(28px, 4vw, 48px) clamp(20px, 4vw, 40px)",
              display: "flex", flexWrap: "wrap", gap: "20px",
              alignItems: "center", justifyContent: "space-between"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent-gold)", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", marginBottom: "8px" }}>
                  <TrendingUp size={14} /> Ready for the next step?
                </div>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 800, margin: "0 0 6px" }}>Connect with an Expert Advisor</h3>
                <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "0.9rem" }}>
                  Our specialists guide you through site visits, legal docs, and loan assistance.
                </p>
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link to="/agents" className="btn btn-primary" style={{ gap: "8px", display: "inline-flex", alignItems: "center" }}>
                  <span>Talk to an Agent</span> <ArrowRight size={16} />
                </Link>
                <Link to="/properties" className="btn btn-secondary">Explore More</Link>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center" }}>
            <div style={{ position: "relative", width: "120px", height: "120px", margin: "0 auto 32px" }}>
              <div style={{
                width: "120px", height: "120px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(236,72,153,0.04) 70%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                animation: "pulse 2.5s ease-in-out infinite"
              }}>
                <div style={{
                  width: "80px", height: "80px", borderRadius: "50%",
                  background: "rgba(236,72,153,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <Heart size={40} color="var(--accent-rose)" style={{ opacity: 0.7 }} />
                </div>
              </div>
            </div>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, marginBottom: "12px" }}>
              Your Shortlist is Empty
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "480px", lineHeight: 1.7, marginBottom: "36px", fontSize: "1rem" }}>
              Tap the heart icon on any property card to save your favourites here for quick comparison and revisiting.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}>
              <Link to="/properties" className="btn btn-primary btn-lg" style={{ gap: "8px", display: "inline-flex", alignItems: "center" }}>
                <Home size={18} /> Browse Properties
              </Link>
              <Link to="/matchmaker" className="btn btn-secondary btn-lg" style={{ gap: "8px", display: "inline-flex", alignItems: "center" }}>
                <Sparkles size={18} /> AI Matchmaker
              </Link>
            </div>
            <div style={{ marginTop: "40px", display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
              {["Luxury Villas", "Patna Flats", "Goa Villas", "Delhi NCR", "Under 1 Cr"].map((chip) => (
                <Link
                  key={chip}
                  to={`/properties`}
                  style={{
                    padding: "7px 16px",
                    background: "var(--bg-surface)", border: "1px solid var(--border-light)",
                    borderRadius: "999px", fontSize: "0.82rem", color: "var(--text-secondary)", textDecoration: "none"
                  }}
                >
                  {chip}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
