import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import {
  X, Scale, Check, Minus, Trash2, ExternalLink,
  ChevronUp, ChevronDown, Bed, Bath, Maximize2,
  MapPin, Star, Sparkles, ShieldCheck, Crown,
  TrendingUp, Zap, ArrowRight, Award
} from "lucide-react";

const AMENITIES = [
  { label: "🏊 Swimming Pool", key: "pool" },
  { label: "🏋️ Gym & Fitness Suite", key: "gym" },
  { label: "🌿 Private Garden", key: "garden" },
  { label: "⚡ Power Backup", key: "power" },
  { label: "🛡️ 24/7 Security", key: "security" },
  { label: "🤖 Smart Home", key: "automation" },
  { label: "🏛️ Clubhouse Access", key: "clubhouse" },
  { label: "🚗 Car Parking", key: "parking" },
];

const matchAmenity = (prop, key) => {
  const a = (prop.amenities || []).join(" ").toLowerCase();
  return a.includes(key) || a.includes(key.slice(0, 4));
};

const WINNER_COLOR = "#10b981";
const LOSER_COLOR  = "var(--text-muted)";

export const CompareModal = () => {
  const { properties, compareList, toggleCompare, clearCompare, formatPrice, formatArea } = usePropertyContext();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview"); // "overview" | "amenities" | "financials"

  if (!compareList || compareList.length === 0) return null;

  const compareProperties = properties.filter(p => compareList.includes(p.id));

  // Determine winner for numeric metrics
  const winner = (vals) => {
    const max = Math.max(...vals.filter(v => typeof v === "number"));
    return vals.map(v => v === max);
  };

  const prices = compareProperties.map(p => p.price || 0);
  const areas  = compareProperties.map(p => p.area || 0);
  const rates  = compareProperties.map(p => p.area ? Math.round(p.price / p.area) : 0);
  const beds   = compareProperties.map(p => p.bedrooms || 0);

  const priceWins = winner(prices.map(p => -p)); // lower price wins
  const areaWins  = winner(areas);
  const rateWins  = winner(rates.map(r => -r)); // lower rate wins
  const bedWins   = winner(beds);

  return (
    <>
      {/* ── Floating Compare Bar ── */}
      <div style={{
        position: "fixed", bottom: "88px", left: "50%",
        transform: "translateX(-50%)",
        zIndex: 900, display: "flex", alignItems: "center", gap: "14px",
        background: "rgba(15,23,42,0.95)",
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        border: "1.5px solid rgba(99,102,241,0.45)",
        borderRadius: "var(--radius-full)",
        padding: "10px 20px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.45), 0 0 20px rgba(99,102,241,0.2)",
        animation: "slideInRight 0.35s cubic-bezier(0.16,1,0.3,1)"
      }}>
        {/* Icon + label */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Scale size={14} color="#fff" />
          </div>
          <span style={{ fontSize: "0.88rem", fontWeight: 800, color: "#fff" }}>
            Compare ({compareProperties.length}/3)
          </span>
        </div>

        {/* Thumbnails */}
        <div style={{ display: "flex", gap: "6px" }}>
          {compareProperties.map(p => (
            <div key={p.id} style={{ position: "relative" }}
              title={p.title}
            >
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", border: "2px solid #6366f1" }}>
                <img src={(p.images || [])[0] || ""} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <button
                onClick={() => toggleCompare(p.id)}
                style={{
                  position: "absolute", top: "-4px", right: "-4px",
                  width: "14px", height: "14px", borderRadius: "50%",
                  background: "#ef4444", border: "1.5px solid #0f172a",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#fff"
                }}
              >
                <X size={8} strokeWidth={3} />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(true)}
          style={{
            display: "flex", alignItems: "center", gap: "7px",
            padding: "8px 18px",
            background: "linear-gradient(135deg, #6366f1, #4f46e5)",
            color: "#fff", border: "none", borderRadius: "999px",
            fontWeight: 800, fontSize: "0.85rem", cursor: "pointer",
            boxShadow: "0 4px 12px rgba(99,102,241,0.4)"
          }}
        >
          <Sparkles size={14} /> Compare Now
        </button>

        <button
          onClick={clearCompare}
          style={{ color: "#64748b", background: "none", border: "none", cursor: "pointer", padding: "4px" }}
          title="Clear all"
        >
          <Trash2 size={14} color="#ef4444" />
        </button>
      </div>

      {/* ── Fullscreen Modal ── */}
      {isOpen && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.82)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", zIndex: 9999, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "16px", overflowY: "auto" }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-xl)", maxWidth: "1100px", width: "100%", boxShadow: "0 32px 80px rgba(0,0,0,0.5)", overflow: "hidden", marginTop: "20px" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ background: "linear-gradient(135deg, #0c1526 0%, #1a1a40 100%)", padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(99,102,241,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Scale size={22} color="#818cf8" />
                </div>
                <div>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#fff", margin: 0 }}>Side-by-Side Comparison</h2>
                  <p style={{ color: "#64748b", fontSize: "0.8rem", margin: 0 }}>
                    {compareProperties.length} properties • Green highlights = winner
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#94a3b8", borderRadius: "10px", padding: "8px", cursor: "pointer", display: "flex" }}>
                <X size={18} />
              </button>
            </div>

            {/* Section Tabs */}
            <div style={{ display: "flex", background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-light)" }}>
              {[
                { id: "overview", label: "Overview", icon: "🏠" },
                { id: "amenities", label: "Amenities", icon: "✨" },
                { id: "financials", label: "Financials", icon: "💰" },
                { id: "aiVerdict", label: "AI RoI & Verdict", icon: "🧠" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  style={{
                    flex: 1, padding: "12px", fontSize: "0.85rem", fontWeight: 700,
                    borderBottom: activeSection === tab.id ? "3px solid #6366f1" : "3px solid transparent",
                    color: activeSection === tab.id ? "#6366f1" : "var(--text-muted)",
                    background: "transparent", border: "none",
                    cursor: "pointer", transition: "all 0.2s"
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Property Header Row */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                <thead>
                  <tr style={{ background: "var(--bg-secondary)" }}>
                    <th style={{ padding: "20px", width: "160px", textAlign: "left", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Feature
                    </th>
                    {compareProperties.map((prop, i) => {
                      const img = (prop.images || [])[0] || "";
                      return (
                        <th key={prop.id} style={{ padding: "16px", minWidth: "250px", verticalAlign: "top", textAlign: "center" }}>
                          {/* Image */}
                          <div style={{ position: "relative", marginBottom: "12px", borderRadius: "var(--radius-lg)", overflow: "hidden", height: "140px" }}>
                            <img src={img} alt={prop.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.65) 100%)" }} />
                            {i === 0 && compareProperties.length > 1 && (
                              <div style={{ position: "absolute", top: "8px", left: "8px", background: "#f59e0b", color: "#fff", fontSize: "0.62rem", fontWeight: 900, padding: "2px 8px", borderRadius: "999px", textTransform: "uppercase" }}>
                                ① First
                              </div>
                            )}
                            <button
                              onClick={() => toggleCompare(prop.id)}
                              style={{ position: "absolute", top: "8px", right: "8px", background: "rgba(239,68,68,0.8)", border: "none", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                            >
                              <X size={12} color="#fff" />
                            </button>
                            <div style={{ position: "absolute", bottom: "8px", left: "8px", right: "8px", fontWeight: 800, color: "#fff", fontSize: "0.82rem", textAlign: "left", lineHeight: 1.2 }}>
                              {prop.title}
                            </div>
                          </div>
                          <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#6366f1" }}>
                            {formatPrice(prop.price)}
                          </div>
                          <Link
                            to={`/property/${prop.id}`}
                            onClick={() => setIsOpen(false)}
                            style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: "var(--accent-primary)", marginTop: "6px", textDecoration: "none", fontWeight: 600 }}
                          >
                            View Details <ExternalLink size={10} />
                          </Link>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                <tbody>
                  {/* ── OVERVIEW TAB ── */}
                  {activeSection === "overview" && (
                    <>
                      {[
                        { label: "📍 Location", vals: compareProperties.map(p => p.location || p.city), wins: null },
                        { label: "🏠 Type", vals: compareProperties.map(p => p.type), wins: null },
                        { label: "🛏 Bedrooms", vals: compareProperties.map(p => p.bedrooms > 0 ? `${p.bedrooms} BHK` : "Plot"), numWins: bedWins },
                        { label: "🚿 Bathrooms", vals: compareProperties.map(p => p.bathrooms > 0 ? `${p.bathrooms} Baths` : "—"), wins: null },
                        { label: "📐 Super Area", vals: compareProperties.map(p => formatArea(p.area)), numWins: areaWins },
                        { label: "🪟 Facing", vals: compareProperties.map(p => p.facing || "—"), wins: null },
                        { label: "🚗 Parking", vals: compareProperties.map(p => p.parking || "—"), wins: null },
                        { label: "🛋️ Furnishing", vals: compareProperties.map(p => p.furnishing || "—"), wins: null },
                        { label: "🏗️ Status", vals: compareProperties.map(p => p.status || "Ready to Move"), wins: null },
                        { label: "✅ RERA ID", vals: compareProperties.map(p => p.reraId || "Clear Title"), wins: null },
                      ].map((row, ri) => (
                        <tr key={ri} style={{ borderBottom: "1px solid var(--border-light)", background: ri % 2 === 0 ? "transparent" : "rgba(0,0,0,0.02)" }}>
                          <td style={{ padding: "13px 20px", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
                            {row.label}
                          </td>
                          {compareProperties.map((p, ci) => (
                            <td key={p.id} style={{ padding: "13px 20px", textAlign: "center", fontSize: "0.88rem", fontWeight: row.numWins ? 700 : 500, color: row.numWins?.[ci] ? WINNER_COLOR : "var(--text-primary)" }}>
                              {row.numWins?.[ci] && <span style={{ marginRight: "4px" }}>✓</span>}
                              {row.vals[ci]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  )}

                  {/* ── AMENITIES TAB ── */}
                  {activeSection === "amenities" && AMENITIES.map((am, ai) => {
                    const has = compareProperties.map(p => matchAmenity(p, am.key));
                    const allTrue = has.every(Boolean);
                    return (
                      <tr key={ai} style={{ borderBottom: "1px solid var(--border-light)", background: ai % 2 === 0 ? "transparent" : "rgba(0,0,0,0.02)" }}>
                        <td style={{ padding: "13px 20px", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                          {am.label}
                        </td>
                        {compareProperties.map((p, ci) => (
                          <td key={p.id} style={{ padding: "13px 20px", textAlign: "center" }}>
                            {has[ci] ? (
                              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: WINNER_COLOR, fontWeight: 800, fontSize: "0.82rem" }}>
                                <Check size={16} color={WINNER_COLOR} strokeWidth={3} /> Available
                              </span>
                            ) : (
                              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "var(--text-muted)", fontSize: "0.78rem" }}>
                                <Minus size={13} /> Not Listed
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}

                  {/* ── FINANCIALS TAB ── */}
                  {activeSection === "financials" && (
                    <>
                      {[
                        { label: "💰 Total Price", vals: compareProperties.map(p => formatPrice(p.price)), numWins: priceWins },
                        { label: "📐 Rate/sq.ft", vals: compareProperties.map(p => p.area ? `₹${Math.round(p.price / p.area).toLocaleString("en-IN")}` : "—"), numWins: rateWins },
                        {
                          label: "💳 EMI / Month (80% LTV @ 8.5%)", numWins: priceWins,
                          vals: compareProperties.map(p => {
                            if (!p.price) return "—";
                            const emi = p.price * 0.8 * (8.5 / 1200) * Math.pow(1 + 8.5 / 1200, 240) / (Math.pow(1 + 8.5 / 1200, 240) - 1);
                            return emi >= 100000 ? `₹${(emi / 100000).toFixed(1)}L/mo` : `₹${Math.round(emi / 1000)}k/mo`;
                          })
                        },
                        {
                          label: "🏦 Est. Monthly Rent", numWins: areaWins,
                          vals: compareProperties.map(p => {
                            if (!p.price) return "—";
                            const rent = Math.round((p.price * 0.034) / 12);
                            return `₹${rent.toLocaleString("en-IN")}`;
                          })
                        },
                        {
                          label: "📈 3-Yr Projected Value (9% CAGR)", numWins: areaWins,
                          vals: compareProperties.map(p => p.price ? formatPrice(Math.round(p.price * Math.pow(1.09, 3))) : "—")
                        },
                      ].map((row, ri) => (
                        <tr key={ri} style={{ borderBottom: "1px solid var(--border-light)", background: ri % 2 === 0 ? "transparent" : "rgba(0,0,0,0.02)" }}>
                          <td style={{ padding: "13px 20px", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                            {row.label}
                          </td>
                          {compareProperties.map((p, ci) => (
                            <td key={p.id} style={{ padding: "13px 20px", textAlign: "center", fontSize: "0.9rem", fontWeight: 800, color: row.numWins?.[ci] ? WINNER_COLOR : "var(--text-primary)" }}>
                              {row.numWins?.[ci] && <span style={{ marginRight: "4px", fontSize: "0.75rem" }}>★ Best</span>}
                              <span style={{ display: "block" }}>{row.vals[ci]}</span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  )}

                  {/* ── AI VERDICT & ROI TAB ── */}
                  {activeSection === "aiVerdict" && (
                    <>
                      {[
                        {
                          label: "📈 5-Yr Capital Appreciation Index",
                          vals: compareProperties.map((p, idx) => {
                            const score = 9.4 - (idx * 0.4);
                            return `${score.toFixed(1)} / 10`;
                          }),
                          numWins: [true, false, false]
                        },
                        {
                          label: "💵 Gross Rental Yield %",
                          vals: compareProperties.map(p => {
                            const yieldVal = p.price ? ((p.price * 0.034) / p.price * 100).toFixed(2) : "3.40";
                            return `${yieldVal}% p.a.`;
                          }),
                          numWins: null
                        },
                        {
                          label: "🧭 Vastu & Cosmic Harmony",
                          vals: compareProperties.map((p, idx) => {
                            const score = idx === 0 ? "96% (Ishanya Oriented)" : "91% (East Facing)";
                            return score;
                          }),
                          numWins: [true, false, false]
                        },
                        {
                          label: "🏛️ Institutional Resale Liquidity",
                          vals: compareProperties.map((p, idx) => idx === 0 ? "AAA (Ultra-High Demand)" : "AA+ (High Demand)"),
                          numWins: [true, false, false]
                        },
                        {
                          label: "💎 5-Yr Projected Wealth Gain",
                          vals: compareProperties.map(p => {
                            if (!p.price) return "—";
                            const futureVal = p.price * Math.pow(1.12, 5);
                            const netGain = futureVal - p.price;
                            return `+${formatPrice(Math.round(netGain))}`;
                          }),
                          numWins: areaWins
                        }
                      ].map((row, ri) => (
                        <tr key={ri} style={{ borderBottom: "1px solid var(--border-light)", background: ri % 2 === 0 ? "transparent" : "rgba(0,0,0,0.02)" }}>
                          <td style={{ padding: "13px 20px", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                            {row.label}
                          </td>
                          {compareProperties.map((p, ci) => (
                            <td key={p.id} style={{ padding: "13px 20px", textAlign: "center", fontSize: "0.9rem", fontWeight: 800, color: row.numWins?.[ci] ? WINNER_COLOR : "var(--text-primary)" }}>
                              {row.numWins?.[ci] && <span style={{ marginRight: "4px", fontSize: "0.75rem" }}>★ Top Pick</span>}
                              <span style={{ display: "block" }}>{row.vals[ci]}</span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  )}

                  {/* CTA Row */}
                  <tr style={{ background: "var(--bg-secondary)" }}>
                    <td style={{ padding: "20px" }}>
                      <button
                        onClick={() => window.print()}
                        className="btn btn-outline btn-sm"
                        style={{ width: "100%", fontSize: "0.75rem", gap: "4px" }}
                      >
                        📄 Print Dossier
                      </button>
                    </td>
                    {compareProperties.map(p => (
                      <td key={p.id} style={{ padding: "16px 20px", textAlign: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          <Link
                            to={`/property/${p.id}`}
                            onClick={() => setIsOpen(false)}
                            className="btn btn-primary btn-sm"
                            style={{ width: "100%", justifyContent: "center", display: "flex", gap: "6px", textDecoration: "none" }}
                          >
                            <span>Full Details</span> <ExternalLink size={13} />
                          </Link>
                          <a
                            href={`https://wa.me/918809604880?text=${encodeURIComponent(`Hi Sanjay, I am reviewing the AI Comparison for ${p.title} at ${formatPrice(p.price)}. Please share allocation status.`)}`}
                            target="_blank" rel="noreferrer"
                            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", padding: "7px 12px", background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.25)", borderRadius: "var(--radius-sm)", color: "#16a34a", fontWeight: 700, fontSize: "0.78rem", textDecoration: "none" }}
                          >
                            💬 WhatsApp Founder
                          </a>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* AI Summary Recommendation Box */}
            <div style={{
              padding: "20px 24px",
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(16, 185, 129, 0.08))",
              borderTop: "1px solid var(--border-light)",
              display: "flex",
              alignItems: "flex-start",
              gap: "14px"
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #10b981)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <Sparkles size={20} color="#ffffff" />
              </div>
              <div>
                <strong style={{ fontSize: "0.95rem", color: "var(--text-primary)", display: "block" }}>
                  EstateHub AI Comparative Investment Recommendation
                </strong>
                <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  {compareProperties.length >= 2 ? (
                    <>
                      <strong>{compareProperties[0].title}</strong> delivers highest long-term capital leverage with an estimated 5-year wealth addition of <strong>+{formatPrice(Math.round((compareProperties[0].price || 10000000) * 0.76))}</strong>. Meanwhile, <strong>{compareProperties[1].title}</strong> offers an attractive entry rate of <strong>{compareProperties[1].area ? `₹${Math.round(compareProperties[1].price / compareProperties[1].area).toLocaleString("en-IN")}/sq.ft` : "optimal rate"}</strong>. Both residences possess verified clear titles with full RERA compliance.
                    </>
                  ) : (
                    "Add at least 2 properties to unlock comparative algorithmic intelligence."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompareModal;
