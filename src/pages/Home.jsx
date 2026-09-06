import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import SearchBar from "../components/SearchBar";
import PropertyCard from "../components/PropertyCard";
import AgentCard from "../components/AgentCard";
import PropertyStoriesBar from "../components/PropertyStoriesBar";
import LiveMarketBarometer from "../components/LiveMarketBarometer";
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
  Wand2
} from "lucide-react";

export const Home = () => {
  const { properties, agents } = usePropertyContext();
  const [activeTab, setActiveTab] = useState("All");
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
      name: "Chandigarh",
      state: "Union Territory",
      count: "420+ Properties",
      image: "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Mohali",
      state: "Punjab",
      count: "310+ Properties",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Delhi",
      state: "Delhi NCR / Gurgaon",
      count: "680+ Properties",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Amritsar",
      state: "Punjab",
      count: "190+ Properties",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80"
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
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            {/* Founder Endorsement Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 20px",
                background: "rgba(217, 119, 6, 0.12)",
                border: "1px solid rgba(217, 119, 6, 0.4)",
                borderRadius: "var(--radius-full)",
                marginBottom: "16px",
                boxShadow: "0 0 20px rgba(217, 119, 6, 0.25)"
              }}
            >
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }}></span>
              <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--accent-gold)", letterSpacing: "0.5px" }}>
                Curated by Sanjay Kumar • Direct VIP Desk: +91 8809604880
              </span>
            </div>

            <div className="hero-tagline-pill">
              <Sparkles size={16} />
              <span>India's Most Prestigious Luxury Real Estate Platform</span>
            </div>
            <h1 className="hero-title">
              Find Your <span>Dream Estate</span><br />In Prime Corridors
            </h1>
            <p className="hero-desc">
              Explore thousands of handpicked villas, penthouses, and prime commercial plots with 100% verified titles and private advisory led by Sanjay Kumar.
            </p>

            {/* Quick Search Component */}
            <SearchBar />

            {/* Floating Luxury Trust Badges */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "14px",
                marginTop: "24px",
                flexWrap: "wrap"
              }}
            >
              <div className="hero-trust-badge">
                <span className="live-dot-pulse"></span>
                <span>🔥 48 VIP Tours Scheduled Today</span>
              </div>

              <div className="hero-trust-badge">
                <ShieldCheck size={14} color="var(--accent-emerald)" />
                <span>100% Freehold & RERA Cleared</span>
              </div>

              <div className="hero-trust-badge">
                <Star size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
                <span>4.98/5 High-Net-Worth Client Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIP LUXURY REELS & STORIES BAR */}
      <PropertyStoriesBar />

      {/* 2. STATS BAR */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">4,200+</div>
              <div className="stat-label">Curated Luxury Estates</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.6%</div>
              <div className="stat-label">Client Satisfaction Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">₹4,500 Cr+</div>
              <div className="stat-label">Transactions Facilitated</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">16+</div>
              <div className="stat-label">Metro Growth Hubs</div>
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
              <span
                style={{
                  color: "var(--accent-primary)",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  letterSpacing: "1px"
                }}
              >
                Curated Selection
              </span>
              <h2 style={{ fontSize: "2.4rem", marginTop: "4px" }}>Featured Properties</h2>
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
            <span
              style={{
                color: "var(--accent-primary)",
                fontWeight: 700,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "1px"
              }}
            >
              Popular Hubs
            </span>
            <h2 style={{ fontSize: "2.2rem", marginTop: "4px" }}>Explore Properties By City</h2>
            <p style={{ marginTop: "8px" }}>
              Discover prime neighborhoods, residential hubs, and top-yielding real estate sectors.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px"
            }}
          >
            {topCities.map((city) => (
              <div
                key={city.name}
                onClick={() => navigate(`/properties?city=${city.name}`)}
                style={{
                  position: "relative",
                  height: "300px",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "var(--shadow-sm)",
                  transition: "var(--transition)"
                }}
                className="city-explore-card"
              >
                <img
                  src={city.image}
                  alt={city.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease"
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "24px",
                    color: "#ffffff"
                  }}
                >
                  <h3 style={{ fontSize: "1.4rem", color: "#ffffff", marginBottom: "4px" }}>{city.name}</h3>
                  <span style={{ fontSize: "0.85rem", color: "#cbd5e1", marginBottom: "8px" }}>{city.state}</span>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 10px",
                      background: "rgba(255, 255, 255, 0.2)",
                      backdropFilter: "blur(6px)",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      width: "fit-content"
                    }}
                  >
                    {city.count}
                  </span>
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
            <span
              style={{
                color: "var(--accent-primary)",
                fontWeight: 700,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "1px"
              }}
            >
              The EstateHub Advantage
            </span>
            <h2 style={{ fontSize: "2.3rem", marginTop: "4px" }}>Why Buy & Invest With Us?</h2>
            <p style={{ marginTop: "10px" }}>
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
    </div>
  );
};

export default Home;
