import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import SearchBar from "../components/SearchBar";
import PropertyCard from "../components/PropertyCard";
import AgentCard from "../components/AgentCard";
import PropertyStoriesBar from "../components/PropertyStoriesBar";
import Luxury3DCarousel from "../components/Luxury3DCarousel";
import LiveMarketBarometer from "../components/LiveMarketBarometer";
import PremiumHero from "../components/PremiumHero";
import LiveStatsBar from "../components/LiveStatsBar";
import TrustBadgeSection from "../components/TrustBadgeSection";
import LiveAuctionHub from "../components/LiveAuctionHub";
import PanIndiaLiveRadar from "../components/PanIndiaLiveRadar";
import MegaInfrastructureCorridors from "../components/MegaInfrastructureCorridors";
import DroneAerialViewer from "../components/DroneAerialViewer";
import {
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Compass,
  Building,
  Key,
  Star,
  Brain,
  Zap,
  Wand2,
  Crown,
  MapPin,
  TrendingUp,
  Home as HomeIcon,
  BadgeCheck,
  Quote
} from "lucide-react";
import sanjayPhoto from "../assets/sanjay-kumar.jpg";
import IndiaStateExplorer from "../components/IndiaStateExplorer";

export const Home = () => {
  const { properties, agents } = usePropertyContext();
  const [activeTab, setActiveTab] = useState("All");
  const [showDroneViewer, setShowDroneViewer] = useState(false);
  const navigate = useNavigate();

  // Filter 6 featured properties based on active tab
  const featuredProperties = properties
    .filter((prop) => {
      if (activeTab === "All") return true;
      return prop.type.toLowerCase() === activeTab.toLowerCase();
    })
    .slice(0, 6);

  const topCities = [
    {
      name: "Patna & Darbhanga",
      state: "Bihar (Founder Sanjay Kumar's Corridor)",
      count: "85+ Properties",
      image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Mumbai & Pune",
      state: "Maharashtra",
      count: "180+ Properties",
      image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Delhi NCR & Gurugram",
      state: "Delhi NCR / Haryana",
      count: "240+ Properties",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Bangalore",
      state: "Karnataka (Silicon Valley)",
      count: "160+ Properties",
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Goa Beach Villas",
      state: "Goa",
      count: "75+ Properties",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Ayodhya & Varanasi",
      state: "Uttar Pradesh",
      count: "110+ Properties",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Dr. Sandeep Oberoi",
      role: "Purchased Luxury Villa in Sector 70, Mohali",
      text: "EstateHub made finding our family villa completely effortless. From initial tour to final registry paperwork, agent John Sharma handled everything with total transparency.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      name: "Ritu & Raghav Mehra",
      role: "First-time Apartment Buyers, Chandigarh",
      text: "As first-time buyers, we were intimidated by property jargon. EstateHub's verified listings and loan estimator helped us choose the perfect 3BHK flat within our budget!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      name: "Vikramaditya Rao",
      role: "NRI Investor, London",
      text: "Investing in Delhi NCR real estate from overseas felt risky until I worked with EstateHub. Their detailed video walkthroughs and legal verification are world-class.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <div className="home-page">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          🏆 PREMIUM HERO — India's No.1 Cinematic Entrance
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <PremiumHero />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          📊 LIVE STATS BAR — Real-time platform numbers
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <LiveStatsBar />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          🚁 3D DRONE ELEVATION & 4K SKYLINE SIMULATOR LAUNCHER
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        style={{
          background: "linear-gradient(90deg, #070e1a 0%, #0f1e36 50%, #070e1a 100%)",
          borderTop: "1px solid rgba(245, 158, 11, 0.35)",
          borderBottom: "1px solid rgba(245, 158, 11, 0.35)",
          padding: "20px 24px"
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ fontSize: "2.2rem" }}>🚁</span>
            <div>
              <div style={{ fontSize: "1.05rem", fontWeight: 900, color: "#ffffff", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <span>Interactive 3D Drone Elevation & Skyline Simulator (4K)</span>
                <span style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#ffffff", fontSize: "0.65rem", padding: "3px 8px", borderRadius: "12px", fontWeight: 900 }}>
                  INDUSTRY FIRST
                </span>
              </div>
              <div style={{ fontSize: "0.82rem", color: "#94a3b8", marginTop: "2px" }}>
                Experience panoramic views from Ground Pool Level, 18th Floor, to 52nd Floor Penthouse in Day, Sunset & Cyber Night lighting.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowDroneViewer(true)}
            style={{
              padding: "12px 24px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              border: "none",
              color: "#ffffff",
              fontSize: "0.9rem",
              fontWeight: 900,
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(245, 158, 11, 0.4)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <span>Launch 3D Drone Simulator</span>
            <Compass size={16} />
          </button>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ⚡ LIVE AUCTION HUB — India's 1st Real-Time Digital Property Floor
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <LiveAuctionHub />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          📡 PAN-INDIA REAL-TIME DEMAND RADAR & CORRIDORS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <PanIndiaLiveRadar />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          🚀 INDIA 2026-2030 MEGA INFRASTRUCTURE CORRIDORS TRACKER
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <MegaInfrastructureCorridors />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          🏅 TRUST BADGE SECTION — Awards & Certifications
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <TrustBadgeSection />

      {/* VIP LUXURY REELS & STORIES BAR */}

      <PropertyStoriesBar />

      {/* 3D LUXURY ROTATING ROTOR SHOWCASE */}
      <Luxury3DCarousel />

      {/* 2. STATS BAR */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Verified Pan-India Residences</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.8%</div>
              <div className="stat-label">Client Satisfaction Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">₹8,500 Cr+</div>
              <div className="stat-label">Transactions Facilitated</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">36</div>
              <div className="stat-label">Indian States & UTs Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 AI INNOVATIONS SHOWCASE */}
      <section style={{ padding: "40px 0", background: "var(--bg-surface)", borderBottom: "1px solid var(--border-light)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {/* Valuation Card */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0.02) 100%)",
                border: "1.5px solid rgba(37, 99, 235, 0.3)",
                borderRadius: "var(--radius-lg)",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "var(--accent-primary)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Brain size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--accent-primary)", fontWeight: 800, textTransform: "uppercase" }}>
                      Instant Algorithm
                    </span>
                    <h3 style={{ fontSize: "1.3rem", margin: 0 }}>AI Property Valuer</h3>
                  </div>
                </div>
                <p style={{ fontSize: "0.92rem", lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "20px" }}>
                  Predict true fair market valuation, price-per-sq.ft benchmarks, and expected monthly rental yields in under 30 seconds.
                </p>
              </div>
              <Link to="/valuation" className="btn btn-primary btn-sm" style={{ alignSelf: "flex-start", gap: "6px" }}>
                <span>Launch Valuation Engine</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Matchmaker Card */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(245, 158, 11, 0.02) 100%)",
                border: "1.5px solid rgba(245, 158, 11, 0.3)",
                borderRadius: "var(--radius-lg)",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "var(--accent-gold)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Zap size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--accent-gold)", fontWeight: 800, textTransform: "uppercase" }}>
                      Smart Discovery
                    </span>
                    <h3 style={{ fontSize: "1.3rem", margin: 0 }}>AI Property Matchmaker</h3>
                  </div>
                </div>
                <p style={{ fontSize: "0.92rem", lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "20px" }}>
                  Take our 60-second lifestyle quiz. Our matching neural score calculates the exact top 3 properties tailored to your family and budget.
                </p>
              </div>
              <Link to="/matchmaker" className="btn btn-gold btn-sm" style={{ alignSelf: "flex-start", gap: "6px" }}>
                <span>Take Matchmaker Quiz</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* AI Interior Staging Card */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(168, 85, 247, 0.02) 100%)",
                border: "1.5px solid rgba(168, 85, 247, 0.3)",
                borderRadius: "var(--radius-lg)",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#9333ea", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Wand2 size={22} />
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "#9333ea", fontWeight: 800, textTransform: "uppercase" }}>
                      Neural Rendering
                    </span>
                    <h3 style={{ fontSize: "1.3rem", margin: 0 }}>AI Interior Stager</h3>
                  </div>
                </div>
                <p style={{ fontSize: "0.92rem", lineHeight: "1.6", color: "var(--text-secondary)", marginBottom: "20px" }}>
                  Transform rooms into Scandinavian, Neo-Classical, or Cyberpunk designs in real-time with an interactive before/after split slider.
                </p>
              </div>
              <Link to="/properties" className="btn btn-secondary btn-sm" style={{ alignSelf: "flex-start", gap: "6px" }}>
                <span>Explore Staged Homes</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2.8 REAL-TIME LIVE CITY TELEMETRY & MARKET BAROMETER */}
      <LiveMarketBarometer />

      {/* 3. FEATURED PROPERTIES */}
      <section style={{ padding: "80px 0", background: "var(--bg-primary)" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "40px",
              flexWrap: "wrap",
              gap: "20px"
            }}
          >
            <div>
              <div className="section-eyebrow">Curated Selection</div>
              <h2 className="section-title-premium">
                Featured <span className="text-gradient-gold">Properties</span>
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="chip-group">
              {["All", "Villa", "Apartment", "Penthouse"].map((tab) => (
                <button
                  key={tab}
                  className={`chip-btn ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                  style={{ padding: "8px 18px" }}
                >
                  {tab === "All" ? "All Types" : tab}
                </button>
              ))}
            </div>
          </div>

          {/* Properties Grid */}
          <div className="properties-grid">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* View All Button */}
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Link to="/properties" className="btn btn-primary btn-lg">
              <span>View All Properties ({properties.length})</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. EXPLORE CITIES */}
      <section style={{ padding: "70px 0", background: "var(--bg-surface)", borderTop: "1px solid var(--border-light)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px" }}>
            <div className="section-eyebrow" style={{ justifyContent: "center" }}>Popular Hubs</div>
            <h2 className="section-title-premium">
              Explore Properties <span className="text-gradient-gold">By City</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "10px auto 0", textAlign: "center" }}>
              Discover prime neighborhoods, residential hubs, and top-yielding real estate sectors.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px"
            }}
          >
            {topCities.map((city, i) => (
              <div
                key={city.name}
                className="city-card-premium"
                onClick={() => navigate(`/properties?city=${city.name}`)}
                style={{ animation: `fade-in-scale 0.5s ease ${i * 0.08}s both` }}
              >
                <img src={city.image} alt={city.name} loading="lazy" />
                <div className="city-card-overlay" />
                <div className="city-card-content">
                  <div className="city-card-name">{city.name}</div>
                  <div className="city-card-state">{city.state}</div>
                  <span className="city-card-count">
                    <MapPin size={10} />
                    {city.count}
                  </span>
                  <div className="city-card-hover-btn">
                    <span>Explore Properties</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 5. WHY CHOOSE ESTATEHUB */}
      <section style={{ padding: "80px 0", background: "var(--bg-primary)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "650px", margin: "0 auto 50px" }}>
            <div className="section-eyebrow" style={{ justifyContent: "center" }}>The EstateHub Advantage</div>
            <h2 className="section-title-premium">
              Why Buy & Invest <span className="text-gradient-gold">With Us?</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "10px auto 0", textAlign: "center" }}>
              We eliminate ambiguity from Indian real estate with complete regulatory compliance and transparent transactions.
            </p>
          </div>


          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px"
            }}
          >
            <div
              style={{
                background: "var(--bg-surface)",
                padding: "32px 24px",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-light)",
                boxShadow: "var(--shadow-xs)"
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: "var(--accent-primary-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-primary)",
                  marginBottom: "20px"
                }}
              >
                <ShieldCheck size={26} />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "10px" }}>100% Verified Titles</h3>
              <p style={{ fontSize: "0.92rem", lineHeight: "1.6" }}>
                Every property undergoes multi-stage title verification, GMADA/RERA clearance, and encumbrance check before listing.
              </p>
            </div>

            <div
              style={{
                background: "var(--bg-surface)",
                padding: "32px 24px",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-light)",
                boxShadow: "var(--shadow-xs)"
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: "var(--accent-gold-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-gold)",
                  marginBottom: "20px"
                }}
              >
                <Key size={26} />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "10px" }}>Direct Advisor Connect</h3>
              <p style={{ fontSize: "0.92rem", lineHeight: "1.6" }}>
                Connect directly with certified property advisors who know local sector trends, true market valuations, and future infra.
              </p>
            </div>

            <div
              style={{
                background: "var(--bg-surface)",
                padding: "32px 24px",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-light)",
                boxShadow: "var(--shadow-xs)"
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: "var(--accent-emerald-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-emerald)",
                  marginBottom: "20px"
                }}
              >
                <Building size={26} />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "10px" }}>Home Loan & Legal Aid</h3>
              <p style={{ fontSize: "0.92rem", lineHeight: "1.6" }}>
                Pre-approved home loans with leading banks (SBI, HDFC, ICICI) with fastest sanction and end-to-end registration help.
              </p>
            </div>

            <div
              style={{
                background: "var(--bg-surface)",
                padding: "32px 24px",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-light)",
                boxShadow: "var(--shadow-xs)"
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: "var(--accent-rose-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-rose)",
                  marginBottom: "20px"
                }}
              >
                <Compass size={26} />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "10px" }}>Zero Hidden Charges</h3>
              <p style={{ fontSize: "0.92rem", lineHeight: "1.6" }}>
                Completely upfront pricing with breakdowns for registration, maintenance, and stamp duty. No unexpected surprise fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5B. PAN-INDIA 28 STATES & UTs REAL ESTATE NETWORK */}
      <IndiaStateExplorer />

      {/* 6. TOP AGENTS PREVIEW */}
      <section style={{ padding: "80px 0", background: "var(--bg-surface)", borderTop: "1px solid var(--border-light)" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "40px",
              flexWrap: "wrap",
              gap: "20px"
            }}
          >
            <div>
              <span
                style={{
                  color: "var(--accent-primary)",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "1px"
                }}
              >
                Trusted Advisors
              </span>
              <h2 style={{ fontSize: "2.3rem", marginTop: "4px" }}>Meet Our Top Property Experts</h2>
            </div>
            <Link to="/agents" className="btn btn-secondary btn-sm">
              <span>View All Advisors</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="agents-grid">
            {agents.slice(0, 3).map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section style={{ padding: "80px 0", background: "var(--bg-primary)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 50px" }}>
            <span
              style={{
                color: "var(--accent-primary)",
                fontWeight: 700,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "1px"
              }}
            >
              Testimonials
            </span>
            <h2 style={{ fontSize: "2.3rem", marginTop: "4px" }}>Loved By 10,000+ Homeowners</h2>
            <p style={{ marginTop: "10px" }}>
              Read authentic feedback from satisfied buyers, sellers, and property investors.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px"
            }}
          >
            {testimonials.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "var(--bg-surface)",
                  padding: "32px",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border-light)",
                  boxShadow: "var(--shadow-sm)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="var(--accent-gold)" color="var(--accent-gold)" />
                  ))}
                </div>
                <p style={{ fontSize: "0.95rem", lineHeight: "1.7", fontStyle: "italic", marginBottom: "24px" }}>
                  "{item.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <img
                    src={item.avatar}
                    alt={item.name}
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      objectFit: "cover"
                    }}
                  />
                  <div>
                    <h4 style={{ fontSize: "1.05rem", margin: 0 }}>{item.name}</h4>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section style={{ padding: "80px 0", background: "var(--bg-surface)" }}>
        <div className="container">
          <div
            style={{
              background: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)",
              borderRadius: "var(--radius-lg)",
              padding: "60px 40px",
              color: "#ffffff",
              textAlign: "center",
              boxShadow: "var(--shadow-lg)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <h2 style={{ fontSize: "2.6rem", color: "#ffffff", marginBottom: "16px" }}>
              Ready To Own Your Dream Property?
            </h2>
            <p
              style={{
                fontSize: "1.15rem",
                color: "#cbd5e1",
                maxWidth: "650px",
                margin: "0 auto 32px"
              }}
            >
              Get in touch with our certified property consultants today for a personalized property tour and free loan eligibility calculation.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/properties" className="btn btn-gold btn-lg">
                <span>Browse All Properties</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-lg" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}>
                <span>Contact an Advisor</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3D DRONE ELEVATION & 4K SKYLINE SIMULATOR MODAL */}
      <DroneAerialViewer
        isOpen={showDroneViewer}
        onClose={() => setShowDroneViewer(false)}
      />
    </div>
  );
};

export default Home;
