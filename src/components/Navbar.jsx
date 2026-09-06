import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import {
  Building2,
  Heart,
  Sun,
  Moon,
  User,
  LogOut,
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Calculator,
  Compass,
  Layers,
  Home as HomeIcon,
  Flame,
  MapPin,
  MessageSquare,
  Check,
  ArrowRight,
  TrendingUp,
  Brain,
  Wand2,
  Zap,
  FileText
} from "lucide-react";
import sanjayPhoto from "../assets/sanjay-kumar.jpg";
import BrochureHubModal from "./BrochureHubModal";

export const Navbar = () => {
  const {
    favorites,
    darkMode,
    toggleTheme,
    user,
    logoutUser,
    currency,
    setCurrency,
    unit,
    setUnit
  } = usePropertyContext();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showBrochureHub, setShowBrochureHub] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
  }, [location.pathname]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (menuName) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 220);
  };

  const toggleDropdown = (menuName) => {
    setActiveDropdown(activeDropdown === menuName ? null : menuName);
  };

  const handleNavClick = () => {
    setMobileOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="navbar-header pro-navbar-header" ref={navRef}>
      {/* 1. TOP LUXURY UTILITY & FOUNDER DESK BAR */}
      <div className="navbar-top-utility-bar">
        <div className="container navbar-top-container">
          {/* Left: 10,000+ Inventory Indicator & RERA Clearance */}
          <div className="navbar-top-left">
            <span className="navbar-top-pill inventory-pill" style={{ color: "var(--accent-gold)", fontWeight: 800 }}>
              <Sparkles size={13} color="var(--accent-gold)" />
              <span>✨ <strong>10,000+</strong> Pan-India Residences Online</span>
            </span>
            <span className="navbar-top-pill rera-pill">
              <ShieldCheck size={13} color="var(--accent-emerald)" />
              <span>100% RERA Certified</span>
            </span>
            <span className="navbar-top-pill pulse-pill">
              <span className="live-dot-pulse"></span>
              <span>48 VIP Tours Active</span>
            </span>
          </div>

          {/* Right: Instant Brochure Center, Founder Sanjay Kumar VIP Direct Desk, Currency & Unit */}
          <div className="navbar-top-right">
            {/* Quick Instant Brochure Launcher */}
            <button
              type="button"
              onClick={() => setShowBrochureHub(true)}
              className="top-brochure-launcher-btn"
              title="Open Official Digital Brochure Center (10,000+ Verified PDFs)"
            >
              <FileText size={12} />
              <span>Instant Brochure Hub</span>
              <span className="top-brochure-tag">PDF</span>
            </button>

            {/* Founder VIP Desk Chip - Sleek, Executive, Pro-Level (No Raw Phone Digits in Header) */}
            <Link
              to="/agents"
              className="navbar-top-founder-chip"
              title="Founder & Advisory Desk - Sanjay Kumar (Darbhanga, Bihar)"
            >
              <div className="navbar-top-avatar-glow">
                <img
                  src={sanjayPhoto}
                  alt="Sanjay Kumar"
                  className="navbar-top-avatar"
                />
                <span className="navbar-top-online-dot"></span>
              </div>
              <span className="navbar-top-founder-text">
                Founder Desk: <strong>Sanjay Kumar</strong> <em>(Darbhanga, Bihar)</em>
              </span>
              <span className="navbar-top-founder-badge">VIP Desk</span>
            </Link>

            {/* Currency & Unit Switchers */}
            <div className="navbar-top-switches">
              <button
                onClick={() => setCurrency(currency === "INR" ? "USD" : "INR")}
                className="top-switch-btn"
                title="Toggle Currency (INR ₹ / USD $)"
              >
                {currency === "INR" ? "🇮🇳 ₹ INR" : "🇺🇸 $ USD"}
              </button>
              <button
                onClick={() => setUnit(unit === "sqft" ? "sqyd" : "sqft")}
                className="top-switch-btn"
                title="Toggle Area Unit (Sq.Ft / Sq.Yard)"
              >
                {unit === "sqft" ? "Sq.Ft" : "Sq.Yd"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div className="container navbar-container">
        {/* Brand Logo with 3D Crest */}
        <Link to="/" className="brand-logo" onClick={handleNavClick}>
          <div className="brand-icon">
            <Building2 size={22} />
          </div>
          <div className="brand-text-block">
            <span className="brand-name">
              Estate<span className="brand-highlight">Hub</span>
            </span>
            <span className="brand-sub">LUXURY REAL ESTATE & ADVISORY</span>
          </div>
        </Link>

        {/* Organized Desktop Navigation Links */}
        <nav className="nav-menu">
          <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Home
          </NavLink>

          {/* Mega Menu Dropdown: Properties by BHK & Type */}
          <div
            className={`nav-dropdown-wrapper ${activeDropdown === "properties" ? "open" : ""}`}
            onMouseEnter={() => handleMouseEnter("properties")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className="nav-link dropdown-toggle-btn"
              onClick={() => toggleDropdown("properties")}
            >
              <span>Properties</span>
              <span className="navbar-10k-glow-badge">10,000+</span>
              <ChevronDown size={14} className="dropdown-arrow" />
            </button>

            <div className="nav-dropdown-menu mega-menu-properties" style={{ width: "690px" }}>
              <div className="dropdown-header-banner">
                <span className="dropdown-badge">✨ 10,000+ Verified Luxury Residences Across 28 Indian States & UTs</span>
                <h4>5,450+ 1 BHKs • 2,500+ 2 BHKs • 1,300+ 3 BHKs • 500+ 4 BHKs • 100+ Mansions</h4>
              </div>

              {/* 2-Column Mega Layout: BHKs on left, Pan-India States on right */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {/* Left Column: BHK Configurations with Real Inventory Counts */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    BHK Configurations (10,000 Online)
                  </span>
                  <Link to="/properties?beds=1" className="mega-menu-card" onClick={handleNavClick}>
                    <div className="mega-card-icon" style={{ background: "rgba(59, 130, 246, 0.15)", color: "#3b82f6" }}>
                      1 BHK
                    </div>
                    <div>
                      <strong>1 BHK Smart Tech Flats (5,450+ Units)</strong>
                      <span>Darbhanga, Patna, Bangalore, Pune & Mumbai</span>
                    </div>
                  </Link>

                  <Link to="/properties?beds=2" className="mega-menu-card" onClick={handleNavClick}>
                    <div className="mega-card-icon" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>
                      2 BHK
                    </div>
                    <div>
                      <strong>2 BHK Modern Residences (2,500+ Units)</strong>
                      <span>Wave Estate, GIFT City, Baner & Zirakpur</span>
                    </div>
                  </Link>

                  <Link to="/properties?beds=3" className="mega-menu-card" onClick={handleNavClick}>
                    <div className="mega-card-icon" style={{ background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b" }}>
                      3 BHK
                    </div>
                    <div>
                      <strong>3 BHK Skyline High-Rises (1,300+ Units)</strong>
                      <span>Patna Ganga Riverfront, Powai & Kochi</span>
                    </div>
                  </Link>

                  <Link to="/properties?beds=4" className="mega-menu-card" onClick={handleNavClick}>
                    <div className="mega-card-icon" style={{ background: "rgba(239, 68, 68, 0.15)", color: "#ef4444" }}>
                      4 BHK
                    </div>
                    <div>
                      <strong>4 BHK Royal Kothis & Villas (500+ Units)</strong>
                      <span>Raj Darbhanga, Worli Coastal & ECR</span>
                    </div>
                  </Link>

                  <Link to="/properties?beds=5" className="mega-menu-card" onClick={handleNavClick}>
                    <div className="mega-card-icon" style={{ background: "rgba(168, 85, 247, 0.15)", color: "#a855f7" }}>
                      5+ BHK
                    </div>
                    <div>
                      <strong>5+ BHK Penthouses & Mansions (100+ Units)</strong>
                      <span>Jubilee Hills & Sovereign Golf Enclaves</span>
                    </div>
                  </Link>
                </div>

                {/* Right Column: Key Indian States Hubs */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--accent-gold)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Pan-India Regional Corridors
                  </span>
                  <Link to="/properties?state=Bihar" className="mega-menu-card" onClick={handleNavClick} style={{ border: "1px solid rgba(217, 119, 6, 0.4)" }}>
                    <div className="mega-card-icon" style={{ background: "rgba(217, 119, 6, 0.15)", color: "#d97706" }}>
                      BR
                    </div>
                    <div>
                      <strong>Bihar (Darbhanga & Patna)</strong>
                      <span>Sanjay Kumar's Native Corridor • Royal Heritage</span>
                    </div>
                  </Link>

                  <Link to="/properties?state=Maharashtra" className="mega-menu-card" onClick={handleNavClick}>
                    <div className="mega-card-icon" style={{ background: "rgba(59, 130, 246, 0.15)", color: "#3b82f6" }}>
                      MH
                    </div>
                    <div>
                      <strong>Maharashtra (Mumbai & Pune)</strong>
                      <span>Worli Sea Face, Bandra BKC & Kharadi</span>
                    </div>
                  </Link>

                  <Link to="/properties?state=Goa" className="mega-menu-card" onClick={handleNavClick}>
                    <div className="mega-card-icon" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>
                      GA
                    </div>
                    <div>
                      <strong>Goa Coastal Beachfront</strong>
                      <span>Candolim & Siolim Private Pool Villas</span>
                    </div>
                  </Link>

                  <Link to="/properties?city=Ayodhya" className="mega-menu-card" onClick={handleNavClick}>
                    <div className="mega-card-icon" style={{ background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b" }}>
                      UP
                    </div>
                    <div>
                      <strong>Uttar Pradesh (Ayodhya & Noida)</strong>
                      <span>Ram Mandir Corridor & Expressway Hubs</span>
                    </div>
                  </Link>

                  <Link to="/properties?state=Karnataka" className="mega-menu-card" onClick={handleNavClick}>
                    <div className="mega-card-icon" style={{ background: "rgba(14, 165, 233, 0.15)", color: "#0ea5e9" }}>
                      KA
                    </div>
                    <div>
                      <strong>Karnataka (Bangalore)</strong>
                      <span>Whitefield, Electronic City & Indiranagar</span>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="dropdown-footer-cta" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() => {
                    handleNavClick();
                    setShowBrochureHub(true);
                  }}
                  className="dropdown-explore-link"
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent-gold)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <FileText size={14} color="#fbbf24" />
                  <span>📄 Digital Brochure Center (10,000+ PDFs)</span>
                </button>
                <Link to="/properties" className="dropdown-explore-link" onClick={handleNavClick}>
                  <span>Explore Full 10,000+ Nationwide Catalog</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Highlighted Digital Brochure Hub Button */}
          <button
            type="button"
            onClick={() => setShowBrochureHub(true)}
            className="nav-link pro-brochure-nav-pill"
            title="Open Digital Brochure Center (10,000+ Verified PDFs)"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(245, 158, 11, 0.08)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              borderRadius: "var(--radius-full)",
              padding: "6px 12px",
              cursor: "pointer",
              fontWeight: 700
            }}
          >
            <FileText size={14} color="#fbbf24" />
            <span>Brochure Hub</span>
            <span className="pro-pdf-chip" style={{ background: "linear-gradient(135deg, #d97706, #fbbf24)", color: "#0f172a", fontSize: "0.62rem", padding: "1px 6px", borderRadius: "8px", fontWeight: 800 }}>
              PDF PRO
            </span>
          </button>

          {/* Dropdown: AI Real Estate Suite */}
          <div
            className={`nav-dropdown-wrapper ${activeDropdown === "ai" ? "open" : ""}`}
            onMouseEnter={() => handleMouseEnter("ai")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className="nav-link dropdown-toggle-btn"
              onClick={() => toggleDropdown("ai")}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <span>AI Suite</span>
                <span className="pro-ai-badge">AI PRO</span>
              </span>
              <ChevronDown size={14} className="dropdown-arrow" />
            </button>

            <div className="nav-dropdown-menu simple-dropdown-menu">
              <Link to="/interior-studio" className="dropdown-item-row" onClick={handleNavClick}>
                <div className="dropdown-item-icon" style={{ color: "#ec4899", background: "rgba(236, 72, 153, 0.12)" }}>
                  <Wand2 size={17} />
                </div>
                <div>
                  <strong>AI Interior Staging Studio</strong>
                  <span>Virtual 3D Room Makeovers & Styles</span>
                </div>
              </Link>

              <Link to="/valuation" className="dropdown-item-row" onClick={handleNavClick}>
                <div className="dropdown-item-icon" style={{ color: "#3b82f6", background: "rgba(59, 130, 246, 0.12)" }}>
                  <Brain size={17} />
                </div>
                <div>
                  <strong>AI Property Valuer</strong>
                  <span>Instant Fair Market Valuation & Yields</span>
                </div>
              </Link>

              <Link to="/matchmaker" className="dropdown-item-row" onClick={handleNavClick}>
                <div className="dropdown-item-icon" style={{ color: "#f59e0b", background: "rgba(245, 158, 11, 0.12)" }}>
                  <Zap size={17} />
                </div>
                <div>
                  <strong>AI Property Matchmaker</strong>
                  <span>Algorithmic Vastu & Budget Matching</span>
                </div>
              </Link>

              <Link to="/market-insights" className="dropdown-item-row" onClick={handleNavClick}>
                <div className="dropdown-item-icon" style={{ color: "#10b981", background: "rgba(16, 185, 129, 0.12)" }}>
                  <TrendingUp size={17} />
                </div>
                <div>
                  <strong>Live Market Analytics & Heatmap</strong>
                  <span>Real-time Capital Appreciation Trends</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Dropdown: Financial Calculators */}
          <div
            className={`nav-dropdown-wrapper ${activeDropdown === "finance" ? "open" : ""}`}
            onMouseEnter={() => handleMouseEnter("finance")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className="nav-link dropdown-toggle-btn"
              onClick={() => toggleDropdown("finance")}
            >
              <span>Calculators</span>
              <ChevronDown size={14} className="dropdown-arrow" />
            </button>

            <div className="nav-dropdown-menu simple-dropdown-menu">
              <Link to="/affordability" className="dropdown-item-row" onClick={handleNavClick}>
                <div className="dropdown-item-icon" style={{ color: "#0284c7", background: "rgba(2, 132, 199, 0.12)" }}>
                  <Calculator size={17} />
                </div>
                <div>
                  <strong>Loan Affordability & Stamp Duty</strong>
                  <span>State-wise Registration Taxes & EMI</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Advisory & Agents */}
          <NavLink to="/agents" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Advisory Desk
          </NavLink>
        </nav>

        {/* Right Actions Hub */}
        <div className="nav-actions">
          {/* Quick Instant Brochure Center Trigger */}
          <button
            type="button"
            onClick={() => setShowBrochureHub(true)}
            className="btn btn-outline btn-sm pro-brochure-action-btn"
            title="Download Official Property Brochures (PDF)"
            style={{
              borderColor: "rgba(245, 158, 11, 0.4)",
              background: "rgba(245, 158, 11, 0.08)",
              color: "var(--text-primary)",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "6px 12px",
              fontWeight: 700
            }}
          >
            <FileText size={14} color="#fbbf24" />
            <span className="pro-brochure-text">Brochures</span>
          </button>

          {/* List Property Premium Gold CTA */}
          <Link
            to="/list-property"
            className="btn btn-gold btn-sm pro-list-btn"
            title="Post Your Property for Free"
          >
            <Sparkles size={14} />
            <span>+ List Property</span>
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn-icon pro-theme-btn"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={18} color="#fbbf24" /> : <Moon size={18} />}
          </button>

          {/* Favorites Link with Animated Badge */}
          <Link
            to="/favorites"
            className="btn-icon fav-badge-btn"
            title="View Saved Favorites"
            aria-label="Favorites"
          >
            <Heart size={19} color={favorites.length > 0 ? "var(--accent-rose)" : "currentColor"} />
            {favorites.length > 0 && (
              <span className="fav-count-pill">{favorites.length}</span>
            )}
          </Link>

          {/* User Auth or VIP Founder Avatar Button */}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div className="nav-user-chip">
                <User size={15} color="var(--accent-primary)" />
                <span>{user.name.split(" ")[0]}</span>
              </div>
              <button
                onClick={logoutUser}
                className="btn-icon"
                title="Logout"
                style={{ width: "34px", height: "34px" }}
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-secondary btn-sm pro-login-btn">
              <User size={15} />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-toggle pro-mobile-toggle"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* 3. PRO-LEVEL ORGANIZED MOBILE DRAWER */}
      <div className={`mobile-nav-drawer ${mobileOpen ? "open" : ""}`}>
        {/* Founder VIP Mobile Banner */}
        <div className="mobile-founder-banner">
          <img
            src={sanjayPhoto}
            alt="Sanjay Kumar"
            className="mobile-founder-img"
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <strong style={{ fontSize: "1rem", color: "#ffffff" }}>Sanjay Kumar</strong>
              <span className="mobile-online-badge">Online</span>
            </div>
            <span style={{ fontSize: "0.75rem", color: "#93c5fd", fontWeight: 700, display: "block" }}>
              Founder Desk • Darbhanga, Bihar
            </span>
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              <a href="tel:+918809604880" className="mobile-banner-btn call">
                <Phone size={12} /> Call
              </a>
              <a
                href="https://wa.me/918809604880?text=Hi%20Sanjay,%20I%20am%20interested%20in%20luxury%20properties%20on%20EstateHub."
                target="_blank"
                rel="noreferrer"
                className="mobile-banner-btn wa"
              >
                <MessageSquare size={12} /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Quick Switches */}
        <div style={{ display: "flex", gap: "10px", paddingBottom: "12px", borderBottom: "1px solid var(--border-light)" }}>
          <button
            onClick={() => setCurrency(currency === "INR" ? "USD" : "INR")}
            className="btn btn-secondary btn-sm"
            style={{ flex: 1, fontSize: "0.8rem", fontWeight: 700 }}
          >
            {currency === "INR" ? "🇮🇳 INR (₹)" : "🇺🇸 USD ($)"}
          </button>
          <button
            onClick={() => setUnit(unit === "sqft" ? "sqyd" : "sqft")}
            className="btn btn-secondary btn-sm"
            style={{ flex: 1, fontSize: "0.8rem", fontWeight: 700 }}
          >
            {unit === "sqft" ? "Sq.Ft Area" : "Sq.Yard Area"}
          </button>
        </div>

        {/* Mobile Digital Brochure Center Action */}
        <div style={{ padding: "12px 0 6px" }}>
          <button
            type="button"
            onClick={() => {
              handleNavClick();
              setShowBrochureHub(true);
            }}
            className="btn"
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #1e293b, #0f172a)",
              border: "1.5px solid var(--accent-gold)",
              color: "#fbbf24",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontWeight: 800,
              padding: "10px",
              borderRadius: "var(--radius-md)",
              cursor: "pointer"
            }}
          >
            <FileText size={16} color="#fbbf24" />
            <span>📄 Instant Brochure Center (10,000+ PDFs)</span>
          </button>
        </div>

        {/* Categorized Mobile Navigation Links */}
        <div className="mobile-nav-scroll">
          <div className="mobile-nav-section-title">
            <HomeIcon size={14} color="var(--accent-primary)" />
            <span>Properties by BHK</span>
          </div>
          <div className="mobile-bhk-grid">
            <NavLink to="/properties?beds=1" className="mobile-bhk-chip" onClick={handleNavClick}>
              1 BHK Flats
            </NavLink>
            <NavLink to="/properties?beds=2" className="mobile-bhk-chip" onClick={handleNavClick}>
              2 BHK Flats
            </NavLink>
            <NavLink to="/properties?beds=3" className="mobile-bhk-chip" onClick={handleNavClick}>
              3 BHK High-Rise
            </NavLink>
            <NavLink to="/properties?beds=4" className="mobile-bhk-chip" onClick={handleNavClick}>
              4 BHK Luxury Kothi
            </NavLink>
            <NavLink to="/properties?beds=5" className="mobile-bhk-chip" onClick={handleNavClick}>
              5+ BHK Penthouses
            </NavLink>
            <NavLink to="/properties?type=Plot" className="mobile-bhk-chip" onClick={handleNavClick}>
              Villa Plots & Land
            </NavLink>
          </div>

          <div className="mobile-nav-section-title" style={{ marginTop: "18px" }}>
            <MapPin size={14} color="var(--accent-gold)" />
            <span>Pan-India Regional Hubs</span>
          </div>
          <div className="mobile-bhk-grid">
            <NavLink to="/properties?state=Bihar" className="mobile-bhk-chip" onClick={handleNavClick} style={{ borderColor: "rgba(217, 119, 6, 0.5)", background: "rgba(217, 119, 6, 0.08)" }}>
              📍 Bihar (Darbhanga/Patna)
            </NavLink>
            <NavLink to="/properties?state=Maharashtra" className="mobile-bhk-chip" onClick={handleNavClick}>
              📍 Mumbai & Pune
            </NavLink>
            <NavLink to="/properties?state=Goa" className="mobile-bhk-chip" onClick={handleNavClick}>
              📍 Goa Beach Villas
            </NavLink>
            <NavLink to="/properties?city=Ayodhya" className="mobile-bhk-chip" onClick={handleNavClick}>
              📍 Ayodhya Corridor
            </NavLink>
            <NavLink to="/properties?state=Karnataka" className="mobile-bhk-chip" onClick={handleNavClick}>
              📍 Bangalore Tech City
            </NavLink>
            <NavLink to="/properties?city=Delhi" className="mobile-bhk-chip" onClick={handleNavClick}>
              📍 Delhi NCR / Gurugram
            </NavLink>
          </div>

          <div className="mobile-nav-section-title" style={{ marginTop: "18px" }}>
            <Sparkles size={14} color="var(--accent-gold)" />
            <span>AI Real Estate Suite</span>
          </div>
          <NavLink to="/interior-studio" className="mobile-nav-link" onClick={handleNavClick}>
            🎨 AI Interior Staging Studio
          </NavLink>
          <NavLink to="/valuation" className="mobile-nav-link" onClick={handleNavClick}>
            🧠 Instant AI Property Valuer
          </NavLink>
          <NavLink to="/matchmaker" className="mobile-nav-link" onClick={handleNavClick}>
            ⚡ Smart Property Matchmaker
          </NavLink>
          <NavLink to="/market-insights" className="mobile-nav-link" onClick={handleNavClick}>
            📈 Live Market Trends & Heatmap
          </NavLink>

          <div className="mobile-nav-section-title" style={{ marginTop: "18px" }}>
            <Calculator size={14} color="var(--accent-primary)" />
            <span>Financial Tools</span>
          </div>
          <NavLink to="/affordability" className="mobile-nav-link" onClick={handleNavClick}>
            🏦 Loan Affordability & Stamp Duty
          </NavLink>

          <div className="mobile-nav-section-title" style={{ marginTop: "18px" }}>
            <Compass size={14} color="var(--accent-primary)" />
            <span>Company & VIP Advisory</span>
          </div>
          <NavLink to="/agents" className="mobile-nav-link" onClick={handleNavClick}>
            🤝 Our RERA Certified Agents
          </NavLink>
          <NavLink to="/about" className="mobile-nav-link" onClick={handleNavClick}>
            🏛️ About EstateHub
          </NavLink>
          <NavLink to="/contact" className="mobile-nav-link" onClick={handleNavClick}>
            📞 Contact Support & VIP Desk
          </NavLink>
          <NavLink to="/favorites" className="mobile-nav-link" onClick={handleNavClick}>
            ❤️ Saved Properties ({favorites.length})
          </NavLink>
        </div>

        {/* Mobile Action Buttons */}
        <div style={{ marginTop: "auto", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link to="/list-property" className="btn btn-gold" onClick={handleNavClick} style={{ width: "100%" }}>
            <Sparkles size={16} />
            <span>+ List Your Property Free</span>
          </Link>
          {user ? (
            <button onClick={() => { logoutUser(); handleNavClick(); }} className="btn btn-outline" style={{ width: "100%" }}>
              Sign Out ({user.name})
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary" onClick={handleNavClick} style={{ width: "100%" }}>
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>

      {/* 4. DIGITAL BROCHURE HUB MODAL */}
      {showBrochureHub && (
        <BrochureHubModal onClose={() => setShowBrochureHub(false)} />
      )}
    </header>
  );
};

export default Navbar;
