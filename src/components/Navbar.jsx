import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import {
  Building2,
  Heart,
  Sun,
  Moon,
  User,
  LogOut,
  Menu,
  X
} from "lucide-react";

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
  const navigate = useNavigate();

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={handleNavClick}>
          <div className="brand-icon">
            <Building2 size={22} />
          </div>
          <span>Estate<span style={{ color: "var(--accent-primary)" }}>Hub</span></span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="nav-menu">
          <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Home
          </NavLink>
          <NavLink to="/properties" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Properties
          </NavLink>
          <NavLink to="/interior-studio" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            AI Studio
          </NavLink>
          <NavLink to="/affordability" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Affordability
          </NavLink>
          <NavLink to="/market-insights" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Market Trends
          </NavLink>
          <NavLink to="/valuation" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            AI Valuer
          </NavLink>
          <NavLink to="/matchmaker" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Matchmaker
          </NavLink>
          <NavLink to="/agents" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Agents
          </NavLink>
        </nav>

        {/* Right Actions: List Property, Currency, Unit, Theme, Favorites, Auth, Mobile Toggle */}
        <div className="nav-actions">
          {/* List Property CTA */}
          <Link
            to="/list-property"
            className="btn btn-gold btn-sm"
            style={{ padding: "6px 14px", fontSize: "0.82rem", fontWeight: 700 }}
          >
            + List Property
          </Link>
          {/* Live Currency Selector */}
          <button
            onClick={() => setCurrency(currency === "INR" ? "USD" : "INR")}
            className="btn-icon"
            style={{ width: "auto", padding: "4px 10px", borderRadius: "var(--radius-sm)", fontSize: "0.8rem", fontWeight: 700 }}
            title="Toggle Currency (INR / USD)"
          >
            {currency === "INR" ? "🇮🇳 ₹ INR" : "🇺🇸 $ USD"}
          </button>

          {/* Live Unit Selector */}
          <button
            onClick={() => setUnit(unit === "sqft" ? "sqyd" : "sqft")}
            className="btn-icon"
            style={{ width: "auto", padding: "4px 8px", borderRadius: "var(--radius-sm)", fontSize: "0.75rem", fontWeight: 700 }}
            title="Toggle Measurement Unit (Sq.Ft / Sq.Yard)"
          >
            {unit === "sqft" ? "sq.ft" : "sq.yd"}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn-icon"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={19} color="#fbbf24" /> : <Moon size={19} />}
          </button>

          {/* Favorites Link with Badge */}
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

          {/* User Auth Info */}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  background: "var(--bg-secondary)",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.85rem",
                  fontWeight: 600
                }}
              >
                <User size={16} color="var(--accent-primary)" />
                <span>{user.name.split(" ")[0]}</span>
              </div>
              <button
                onClick={logoutUser}
                className="btn-icon"
                title="Logout"
                style={{ width: "36px", height: "36px" }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              <User size={16} />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-toggle"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileOpen ? "open" : ""}`}>
        <NavLink to="/" className="mobile-nav-link" onClick={handleNavClick}>
          Home
        </NavLink>
        <NavLink to="/properties" className="mobile-nav-link" onClick={handleNavClick}>
          Properties
        </NavLink>
        <NavLink to="/interior-studio" className="mobile-nav-link" onClick={handleNavClick}>
          🎨 AI Interior Staging Studio
        </NavLink>
        <NavLink to="/affordability" className="mobile-nav-link" onClick={handleNavClick}>
          🏦 Loan Affordability & Stamp Duty
        </NavLink>
        <NavLink to="/market-insights" className="mobile-nav-link" onClick={handleNavClick}>
          📈 Live Market Trends & Heatmap
        </NavLink>
        <NavLink to="/valuation" className="mobile-nav-link" onClick={handleNavClick}>
          🧠 AI Valuation Engine
        </NavLink>
        <NavLink to="/matchmaker" className="mobile-nav-link" onClick={handleNavClick}>
          ⚡ AI Property Matchmaker
        </NavLink>
        <NavLink to="/agents" className="mobile-nav-link" onClick={handleNavClick}>
          Our Agents
        </NavLink>
        <NavLink to="/about" className="mobile-nav-link" onClick={handleNavClick}>
          About Us
        </NavLink>
        <NavLink to="/contact" className="mobile-nav-link" onClick={handleNavClick}>
          Contact Us
        </NavLink>
        <NavLink to="/list-property" className="mobile-nav-link" onClick={handleNavClick} style={{ color: "var(--accent-gold)", fontWeight: 700 }}>
          + List Your Property
        </NavLink>
        <NavLink to="/favorites" className="mobile-nav-link" onClick={handleNavClick}>
          Favorites ({favorites.length})
        </NavLink>
        {user ? (
          <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Signed in as <strong>{user.name}</strong></span>
            <button onClick={() => { logoutUser(); handleNavClick(); }} className="btn btn-outline btn-sm">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary" onClick={handleNavClick} style={{ marginTop: "16px" }}>
            Login / Sign Up
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
