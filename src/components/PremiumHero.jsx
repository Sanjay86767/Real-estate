import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Mic, MapPin, Crown, Users, TrendingUp, Sparkles } from "lucide-react";
import sanjayPhoto from "../assets/sanjay-kumar.jpg";

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  size: Math.random() * 6 + 2,
  delay: Math.random() * 12,
  duration: Math.random() * 10 + 12,
  color: i % 3 === 0 ? "#FF6B00" : i % 3 === 1 ? "#F5A623" : "#3B7BF6",
  opacity: Math.random() * 0.4 + 0.1,
}));

const QUICK_SEARCHES = [
  "2BHK Mumbai", "Flats Delhi NCR", "Villa Goa", "Plot Bengaluru",
  "Budget Homes Pune", "Luxury Hyderabad", "Investment Bihar"
];

const STATS = [
  { value: "₹12,500 Cr+", label: "Deals Closed", icon: TrendingUp },
  { value: "85,000+", label: "Happy Families", icon: Users },
  { value: "500+", label: "Cities Covered", icon: MapPin },
  { value: "15+ Years", label: "Trusted Legacy", icon: Crown },
];

const HeroParticle = ({ x, size, delay, duration, color, opacity }) => (
  <div
    className="premium-hero-particle"
    style={{
      left: `${x}%`,
      width: size,
      height: size,
      background: color,
      opacity,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    }}
  />
);

export default function PremiumHero() {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [activeTagIdx, setActiveTagIdx] = useState(null);
  const [visibleStats, setVisibleStats] = useState(false);
  const statsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisibleStats(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim() || (activeTagIdx !== null ? QUICK_SEARCHES[activeTagIdx] : "");
    if (q) navigate(`/properties?q=${encodeURIComponent(q)}`);
    else navigate("/properties");
  };

  const handleVoice = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = "hi-IN";
    rec.onresult = (e) => setQuery(e.results[0][0].transcript);
    rec.onend = () => setIsListening(false);
    setIsListening(true);
    rec.start();
  };

  const AWARDS = [
    "🏆 India's No. 1 Real Estate Platform",
    "⭐ RERA Certified Listings",
    "🥇 Best PropTech Award 2024",
    "✅ RBI Approved Lenders",
    "🌟 50,000+ Happy Families",
    "🏅 ISO 27001 Certified"
  ];

  return (
    <section className="premium-hero" style={{ minHeight: "100vh" }}>
      {/* Background */}
      <div className="premium-hero-bg" />
      <div className="premium-hero-grid" />

      {/* Particles */}
      <div className="premium-hero-particles">
        {PARTICLES.map((p) => <HeroParticle key={p.id} {...p} />)}
      </div>

      {/* Award ticker strip */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 20,
        background: "linear-gradient(90deg, #FF6B00, #F5A623, #FFD700, #F5A623, #FF6B00)",
        backgroundSize: "400% 100%",
        padding: "8px 0",
        overflow: "hidden",
        animation: "aurora-shift 6s linear infinite",
      }}>
        <div className="award-strip-track">
          {[...Array(2)].flatMap((_, rep) =>
            AWARDS.map((item, i) => (
              <div key={`${rep}-${i}`} className="award-strip-item">
                <span>{item}</span>
                <span style={{ opacity: 0.4 }}>•</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="premium-hero-content" style={{ paddingTop: "70px" }}>
        {/* Curated by Founder Sanjay Kumar Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(245, 158, 11, 0.45)",
            padding: "5px 16px 5px 6px",
            borderRadius: "30px",
            marginBottom: "14px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(245, 158, 11, 0.2)"
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "1.5px solid #f59e0b",
              flexShrink: 0
            }}
          >
            <img
              src={sanjayPhoto}
              alt="Sanjay Kumar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981" }}></span>
          <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#fbbf24", letterSpacing: "0.3px" }}>
            Curated by Founder Sanjay Kumar (Darbhanga, Bihar) • 100% RERA Verified
          </span>
        </div>

        {/* Eyebrow badge */}
        <div className="premium-hero-eyebrow">
          <Crown size={14} />
          India's #1 Real Estate Platform
          <span style={{
            background: "rgba(255,107,0,0.2)",
            border: "1px solid rgba(255,107,0,0.5)",
            padding: "2px 8px", borderRadius: "999px",
            fontSize: "0.65rem", color: "#FFD700"
          }}>LIVE</span>
        </div>

        {/* Headline */}
        <h1 className="premium-hero-title">
          Find Your{" "}
          <span className="gradient-text">Dream Home</span>
          <br />
          Across India
        </h1>

        {/* Subtitle */}
        <p className="premium-hero-subtitle">
          From ₹15 Lakh budget homes to ₹50 Crore luxury villas — discover{" "}
          <strong style={{ color: "rgba(255,255,255,0.9)" }}>1,20,000+ verified properties</strong>{" "}
          across 500+ cities with AI-powered matching.
        </p>

        {/* Search */}
        <form className="premium-hero-search" onSubmit={handleSearch}>
          <MapPin size={20} style={{ color: "rgba(255,107,0,0.8)", flexShrink: 0, marginLeft: "8px" }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city, locality, project name..."
            autoComplete="off"
          />
          <button
            type="button"
            onClick={handleVoice}
            style={{
              background: isListening ? "rgba(255,61,113,0.2)" : "rgba(255,255,255,0.08)",
              border: `1px solid ${isListening ? "rgba(255,61,113,0.6)" : "rgba(255,255,255,0.15)"}`,
              color: isListening ? "#FF3D71" : "rgba(255,255,255,0.6)",
              borderRadius: "10px", padding: "10px",
              cursor: "pointer", transition: "all 0.2s ease",
              flexShrink: 0,
            }}
          >
            <Mic size={18} />
          </button>
          <button type="submit" className="premium-hero-search-btn shimmer-btn">
            <Search size={16} />
            Search
          </button>
        </form>

        {/* Quick tags */}
        <div className="premium-hero-tags">
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", fontWeight: 600 }}>Popular:</span>
          {QUICK_SEARCHES.map((tag, i) => (
            <button
              key={i}
              type="button"
              className="premium-hero-tag"
              style={activeTagIdx === i ? {
                background: "rgba(255,107,0,0.25)",
                borderColor: "rgba(255,107,0,0.6)",
                color: "#FFD700"
              } : {}}
              onClick={() => {
                setActiveTagIdx(i === activeTagIdx ? null : i);
                setQuery(tag);
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom stats */}
      <div className="premium-hero-stats" ref={statsRef}>
        {STATS.map(({ value, label, icon: Icon }, i) => (
          <div key={i} className="premium-hero-stat" style={{
            animation: visibleStats ? `slide-in-up 0.6s ease ${i * 0.12}s both` : "none"
          }}>
            <Icon size={14} style={{ color: "rgba(255,107,0,0.7)", display: "block", margin: "0 auto 4px" }} />
            <span className="premium-hero-stat-value">{value}</span>
            <span className="premium-hero-stat-label">{label}</span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="premium-hero-scroll-indicator" style={{ bottom: "24px" }}>
        <span>Scroll</span>
        <div style={{ width: "1px", height: "28px", background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)" }} />
      </div>
    </section>
  );
}
