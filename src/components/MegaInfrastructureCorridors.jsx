import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Plane,
  Train,
  Building,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Zap,
  MapPin,
  Calendar,
  CheckCircle2
} from "lucide-react";

const CORRIDORS_DATA = [
  {
    id: "mthl-navi-mumbai",
    name: "Atal Setu (MTHL) & Navi Mumbai International Airport",
    region: "Mumbai MMR / Raigad Belt",
    readiness: "Operational & Airport Launch 2026",
    appreciationProjection: "+48% by 2028",
    growthMultiplier: "2.4x",
    category: "Mega Expressway & Aerocity",
    color: "#38bdf8",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80",
    description: "Travel time from South Mumbai to Navi Mumbai reduced to 20 mins. Commercial hubs and waterfront towers experiencing rapid institutional capital inflows.",
    highlights: ["Panvel High-Speed Link", "Ulwe Coastal Corridor", "Dronagiri Port City"]
  },
  {
    id: "jewar-ncr",
    name: "Noida International Airport (Jewar) & Yamuna Expressway",
    region: "Delhi NCR / Uttar Pradesh",
    readiness: "Phase 1 Flight Trials Underway",
    appreciationProjection: "+55% by 2028",
    growthMultiplier: "2.8x",
    category: "Aviation & Film City Hub",
    color: "#f59e0b",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80",
    description: "Asia's largest upcoming airport combined with the planned International Film City and Olympic City along the Yamuna Expressway.",
    highlights: ["Sector 150 Sports City", "Expressway Commercial Pockets", "Jewar Aerocity"]
  },
  {
    id: "darbhanga-bihar",
    name: "Darbhanga Airport & Bihar Industrial Corridor",
    region: "Bihar (Founder Sanjay Kumar's Special Corridor)",
    readiness: "Airport Expansion & 6-Lane Expressway Live",
    appreciationProjection: "+62% by 2028",
    growthMultiplier: "3.1x",
    category: "Heritage & Strategic Growth",
    color: "#10b981",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80",
    description: "Handpicked by Founder Sanjay Kumar with 100% clean title non-encumbrance records. Direct flights connecting Delhi, Mumbai, Bengaluru driving high commercial yield.",
    highlights: ["Darbhanga Airport Ring", "Patna-Bihta IT Expressway", "Muzaffarpur Gateway"]
  },
  {
    id: "bengaluru-prr",
    name: "Bengaluru Peripheral Ring Road & Metro 3 AI Belt",
    region: "Karnataka / Silicon Valley",
    readiness: "Metro Line Approaching Launch",
    appreciationProjection: "+44% by 2028",
    growthMultiplier: "2.2x",
    category: "Tech & AI MNC Corridor",
    color: "#6366f1",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80",
    description: "Unprecedented demand from global semiconductor & AI firms along the Outer Ring Road and upcoming Peripheral Ring Road.",
    highlights: ["Whitefield Extension", "North Bengaluru Aerotropolis", "Sarjapur Road"]
  },
  {
    id: "ayodhya-aerocity",
    name: "Ayodhya Maharishi Valmiki Airport & Temple Corridor",
    region: "Uttar Pradesh (Spiritual Capital)",
    readiness: "International Airport Operational",
    appreciationProjection: "+75% by 2028",
    growthMultiplier: "3.5x",
    category: "Global Spiritual Tourism",
    color: "#ec4899",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    description: "International spiritual destination with 5-star hospitality brands, luxury riverfront suites, and unprecedented commercial appreciation.",
    highlights: ["Ram Janmabhoomi 5km", "Saryu Riverfront Penthouses", "Naya Ghat Hub"]
  },
  {
    id: "goa-mopa",
    name: "Goa Mopa (Manohar) Airport Coastal Expressway",
    region: "Goa Luxury Coast",
    readiness: "Fully Operational & Expanding",
    appreciationProjection: "+50% by 2028",
    growthMultiplier: "2.5x",
    category: "Boutique Luxury & Rental Yield",
    color: "#06b6d4",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    description: "Boutique private pool villas in Assagao, Siolim, and Mandrem commanding highest gross vacation yields (9-12% p.a.) in India.",
    highlights: ["Assagao High-End Villas", "Siolim Riverfront Estates", "Mandrem Beach"]
  }
];

export const MegaInfrastructureCorridors = () => {
  const [activeId, setActiveId] = useState(CORRIDORS_DATA[0].id);

  return (
    <section
      className="mega-infrastructure-section"
      style={{
        background: "linear-gradient(180deg, #070e1a 0%, #0b1424 50%, #070e1a 100%)",
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
              background: "rgba(56, 189, 248, 0.12)",
              border: "1px solid rgba(56, 189, 248, 0.35)",
              color: "#38bdf8",
              fontSize: "0.82rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "14px"
            }}
          >
            <Zap size={15} />
            <span>India 2026–2030 Mega Infrastructure Tracker</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.7rem)",
              fontWeight: 900,
              letterSpacing: "-0.5px",
              marginBottom: "12px",
              background: "linear-gradient(135deg, #ffffff 40%, #7dd3fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            High-Appreciation Growth Corridors
          </h2>
          <p style={{ color: "#94a3b8", maxWidth: "680px", margin: "0 auto", fontSize: "1rem", lineHeight: 1.6 }}>
            Invest where India's highest capital expenditures are transforming transit, aerocities, and expressways into wealth-compounding epicenters.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "24px"
          }}
        >
          {CORRIDORS_DATA.map((item) => (
            <div
              key={item.id}
              style={{
                background: "rgba(15, 23, 42, 0.75)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "20px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
                boxShadow: "0 15px 35px rgba(0,0,0,0.4)"
              }}
              className="corridor-card"
            >
              {/* Image Header */}
              <div style={{ position: "relative", height: "190px" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(7, 14, 26, 0.2) 0%, rgba(15, 23, 42, 0.95) 100%)"
                  }}
                />

                {/* Growth Multiplier Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    right: "14px",
                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                    color: "#ffffff",
                    fontSize: "0.74rem",
                    fontWeight: 900,
                    padding: "4px 10px",
                    borderRadius: "14px",
                    boxShadow: "0 4px 12px rgba(245, 158, 11, 0.4)"
                  }}
                >
                  🚀 {item.growthMultiplier} Projected Yield
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "16px",
                    right: "16px"
                  }}
                >
                  <div style={{ fontSize: "0.72rem", color: item.color, fontWeight: 800, textTransform: "uppercase" }}>
                    {item.category} • {item.region}
                  </div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#ffffff", margin: "2px 0 0" }}>
                    {item.name}
                  </h3>
                </div>
              </div>

              {/* Card Content */}
              <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <p style={{ color: "#cbd5e1", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "16px" }}>
                    {item.description}
                  </p>

                  {/* Highlights */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                    {item.highlights.map((h, i) => (
                      <span
                        key={i}
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          padding: "4px 10px",
                          borderRadius: "8px",
                          fontSize: "0.72rem",
                          color: "#e2e8f0"
                        }}
                      >
                        📍 {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Projection Strip */}
                <div
                  style={{
                    paddingTop: "14px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div style={{ fontSize: "0.68rem", color: "#94a3b8" }}>Capital Gain Forecast</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#10b981" }}>
                      {item.appreciationProjection}
                    </div>
                  </div>

                  <Link
                    to="/properties"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "8px 14px",
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#ffffff",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      textDecoration: "none"
                    }}
                  >
                    <span>View Projects</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MegaInfrastructureCorridors;
