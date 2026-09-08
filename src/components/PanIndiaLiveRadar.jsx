import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Activity,
  Flame,
  Users,
  Compass,
  ArrowUpRight,
  Sparkles,
  MapPin,
  Building,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react";

const CORRIDORS = [
  {
    id: "mumbai",
    name: "Mumbai MMR",
    state: "Maharashtra",
    demandIndex: 98,
    demandLevel: "Super Heated",
    demandColor: "#ef4444",
    priceTrend: "+2.8%",
    trendPositive: true,
    avgSqft: "₹42,500 / sq.ft",
    activeBuyersToday: "4,820+",
    hotSpots: ["Worli Sea Face", "Bandra West", "BKC", "Powai"],
    summary: "Metro Line 3 operational momentum driving record luxury absorption in South & Central Mumbai.",
    heroImage: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "bengaluru",
    name: "Bengaluru Tech Belt",
    state: "Karnataka",
    demandIndex: 96,
    demandLevel: "Very High",
    demandColor: "#f59e0b",
    priceTrend: "+3.4%",
    trendPositive: true,
    avgSqft: "₹14,200 / sq.ft",
    activeBuyersToday: "6,150+",
    hotSpots: ["Whitefield", "Indiranagar", "Sarjapur Road", "Hebbal"],
    summary: "High demand from AI/tech executives with tech corridor rental yields touching 4.8%.",
    heroImage: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "delhi-ncr",
    name: "Delhi NCR & Gurugram",
    state: "Haryana / Delhi",
    demandIndex: 94,
    demandLevel: "Very High",
    demandColor: "#f59e0b",
    priceTrend: "+4.1%",
    trendPositive: true,
    avgSqft: "₹18,900 / sq.ft",
    activeBuyersToday: "5,300+",
    hotSpots: ["Golf Course Ext", "Dwarka Expressway", "Noida Sec 150", "DLF Phase 5"],
    summary: "Dwarka Expressway full opening spurred aggressive high-rise luxury penthouse transactions.",
    heroImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "bihar-corridor",
    name: "Patna & Darbhanga Belt",
    state: "Bihar (Founder's Special Corridor)",
    demandIndex: 89,
    demandLevel: "Rapid Surge",
    demandColor: "#10b981",
    priceTrend: "+5.6%",
    trendPositive: true,
    avgSqft: "₹6,800 / sq.ft",
    activeBuyersToday: "2,410+",
    hotSpots: ["Darbhanga Airport Hub", "Patna Saguna More", "Bihta IT Park", "Muzaffarpur Ring Road"],
    summary: "Curated by Founder Sanjay Kumar with 100% clean ancestry non-encumbrance title vetting.",
    heroImage: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "hyderabad",
    name: "Hyderabad Financial Dist",
    state: "Telangana",
    demandIndex: 92,
    demandLevel: "Very High",
    demandColor: "#f59e0b",
    priceTrend: "+3.9%",
    trendPositive: true,
    avgSqft: "₹12,400 / sq.ft",
    activeBuyersToday: "3,890+",
    hotSpots: ["Gachibowli", "Kokapet Neopolis", "HITEC City", "Jubilee Hills"],
    summary: "Neopolis auctions set national benchmarks; MNC headquarters driving gated villa sales.",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "goa",
    name: "Goa Luxury Coastal",
    state: "Goa",
    demandIndex: 91,
    demandLevel: "High Yield",
    demandColor: "#06b6d4",
    priceTrend: "+3.1%",
    trendPositive: true,
    avgSqft: "₹24,000 / sq.ft",
    activeBuyersToday: "2,180+",
    hotSpots: ["Assagao", "Siolim", "Candolim", "Anjuna"],
    summary: "High-net-worth second-home purchases yielding 8-11% gross returns via boutique vacation rentals.",
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ayodhya-up",
    name: "Ayodhya & Temple Corridor",
    state: "Uttar Pradesh",
    demandIndex: 95,
    demandLevel: "Historic Boom",
    demandColor: "#ec4899",
    priceTrend: "+7.8%",
    trendPositive: true,
    avgSqft: "₹8,500 / sq.ft",
    activeBuyersToday: "3,450+",
    hotSpots: ["Ram Mandir 5km Radius", "Naya Ghat", "Gorakhpur Highway", "Varanasi Ring Rd"],
    summary: "Unprecedented hospitality and commercial plot appreciation driven by international spiritual tourism.",
    heroImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pune",
    name: "Pune Tech & Luxury",
    state: "Maharashtra",
    demandIndex: 88,
    demandLevel: "Stable Growth",
    demandColor: "#10b981",
    priceTrend: "+2.4%",
    trendPositive: true,
    avgSqft: "₹10,200 / sq.ft",
    activeBuyersToday: "3,100+",
    hotSpots: ["Kharadi IT", "Baner", "Koregaon Park", "Balewadi"],
    summary: "Consistent end-user preference for premium 3BHKs with world-class residential amenities.",
    heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
  }
];

export const PanIndiaLiveRadar = () => {
  const [selectedCorridorId, setSelectedCorridorId] = useState("mumbai");
  const [livePulse, setLivePulse] = useState(0);

  // Subtle live pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePulse((prev) => (prev + 1) % 100);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const selected = CORRIDORS.find((c) => c.id === selectedCorridorId) || CORRIDORS[0];

  return (
    <section
      className="pan-india-radar"
      style={{
        background: "linear-gradient(180deg, #070e1a 0%, #0d192e 50%, #070e1a 100%)",
        padding: "80px 20px",
        color: "#ffffff",
        position: "relative"
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "30px",
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.35)",
              color: "#34d399",
              fontSize: "0.82rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "14px"
            }}
          >
            <Activity size={15} />
            <span>Pan-India Real-Time Demand Radar</span>
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 8px #10b981"
              }}
            />
          </div>

          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.7rem)",
              fontWeight: 900,
              letterSpacing: "-0.5px",
              marginBottom: "12px",
              background: "linear-gradient(135deg, #ffffff 40%, #a7f3d0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Real-Time Market Barometer & Growth Corridors
          </h2>
          <p style={{ color: "#94a3b8", maxWidth: "680px", margin: "0 auto", fontSize: "1rem", lineHeight: 1.6 }}>
            Live buyer sentiment, 24-hour price movements, and micro-market heatmaps across India's highest performing property zones.
          </p>
        </div>

        {/* Main 2-Column Dashboard Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "28px",
            alignItems: "start"
          }}
        >
          {/* Left: Scrollable Interactive Corridor List */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.7)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "20px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "4px 8px 12px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
              }}
            >
              <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase" }}>
                Select Growth Corridor
              </span>
              <span style={{ fontSize: "0.72rem", color: "#10b981", fontWeight: 700 }}>
                Live Stream Active
              </span>
            </div>

            {CORRIDORS.map((corridor) => {
              const isSelected = corridor.id === selectedCorridorId;
              return (
                <div
                  key={corridor.id}
                  onClick={() => setSelectedCorridorId(corridor.id)}
                  style={{
                    padding: "14px 16px",
                    borderRadius: "14px",
                    background: isSelected ? "rgba(16, 185, 129, 0.15)" : "rgba(255, 255, 255, 0.03)",
                    border: isSelected ? "1px solid #10b981" : "1px solid rgba(255, 255, 255, 0.06)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 0.2s ease"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "10px",
                        background: "rgba(255, 255, 255, 0.06)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: corridor.demandColor,
                        fontWeight: 800,
                        fontSize: "0.85rem"
                      }}
                    >
                      {corridor.demandIndex}%
                    </div>

                    <div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#ffffff" }}>
                        {corridor.name}
                      </div>
                      <div style={{ fontSize: "0.74rem", color: "#94a3b8" }}>
                        {corridor.state} • <span style={{ color: "#38bdf8" }}>{corridor.avgSqft}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "3px",
                        fontSize: "0.78rem",
                        fontWeight: 800,
                        color: "#10b981",
                        background: "rgba(16, 185, 129, 0.15)",
                        padding: "2px 8px",
                        borderRadius: "6px"
                      }}
                    >
                      <TrendingUp size={12} />
                      {corridor.priceTrend}
                    </span>
                    <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "3px" }}>
                      {corridor.activeBuyersToday} Buyers
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Detailed Deep-Dive Card for Selected Corridor */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)"
            }}
          >
            {/* Header Visual with Image */}
            <div style={{ position: "relative", height: "200px" }}>
              <img
                src={selected.heroImage}
                alt={selected.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(7, 14, 26, 0.3) 0%, rgba(15, 23, 42, 0.95) 100%)"
                }}
              />

              <div style={{ position: "absolute", bottom: "18px", left: "20px", right: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span
                    style={{
                      background: selected.demandColor,
                      color: "#ffffff",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      padding: "3px 10px",
                      borderRadius: "20px",
                      textTransform: "uppercase"
                    }}
                  >
                    🔥 {selected.demandLevel} ({selected.demandIndex}/100)
                  </span>
                  <span style={{ fontSize: "0.74rem", color: "#e2e8f0" }}>24h Demand Meter</span>
                </div>
                <h3 style={{ fontSize: "1.45rem", fontWeight: 900, color: "#ffffff" }}>
                  {selected.name}
                </h3>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div style={{ padding: "24px" }}>
              <p style={{ color: "#cbd5e1", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "20px" }}>
                {selected.summary}
              </p>

              {/* Grid of Key Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                  marginBottom: "20px"
                }}
              >
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.08)"
                  }}
                >
                  <div style={{ fontSize: "0.72rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: 700 }}>
                    Avg Capital Value
                  </div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#38bdf8", marginTop: "2px" }}>
                    {selected.avgSqft}
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.08)"
                  }}
                >
                  <div style={{ fontSize: "0.72rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: 700 }}>
                    Active Buyers Today
                  </div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#10b981", marginTop: "2px" }}>
                    {selected.activeBuyersToday}
                  </div>
                </div>
              </div>

              {/* Hot Micro-Markets Tags */}
              <div style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", marginBottom: "8px" }}>
                  Trending Micro-Markets
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {selected.hotSpots.map((spot, i) => (
                    <span
                      key={i}
                      style={{
                        background: "rgba(255, 255, 255, 0.06)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#f8fafc",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        padding: "6px 12px",
                        borderRadius: "8px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px"
                      }}
                    >
                      <MapPin size={12} color="#f59e0b" />
                      {spot}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link to Filtered Properties */}
              <Link
                to={`/properties?search=${encodeURIComponent(selected.name.split(" ")[0])}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: "0.92rem",
                  boxShadow: "0 4px 20px rgba(16, 185, 129, 0.3)",
                  transition: "transform 0.15s ease"
                }}
              >
                <span>Explore Verified Properties in {selected.name}</span>
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PanIndiaLiveRadar;
