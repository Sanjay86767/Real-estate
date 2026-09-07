import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import {
  User,
  Lock,
  Mail,
  Phone,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Building2,
  Eye,
  EyeOff,
  ShieldCheck,
  Award,
  Crown,
  Briefcase,
  Zap,
  Flame,
  Check
} from "lucide-react";
import sanjayPhoto from "../assets/sanjay-kumar.jpg";

export const Login = () => {
  const navigate = useNavigate();
  const { user, loginUser, logoutUser, addToast } = usePropertyContext();

  const [activeTab, setActiveTab] = useState("login"); // 'login' | 'register'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // If already logged in, show luxury VIP Member Console
  if (user) {
    return (
      <div className="login-page-luxury" style={{ padding: "60px 20px 100px", minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            maxWidth: "560px",
            width: "100%",
            background: "rgba(15, 23, 42, 0.9)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "24px",
            border: "1px solid rgba(217, 119, 6, 0.35)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(217, 119, 6, 0.2)",
            padding: "40px 32px",
            textAlign: "center",
            color: "#ffffff"
          }}
        >
          <div
            style={{
              width: "74px",
              height: "74px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #d97706, #b45309)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 18px",
              boxShadow: "0 0 24px rgba(217, 119, 6, 0.6)",
              border: "3px solid #ffffff"
            }}
          >
            <Crown size={38} color="#ffffff" />
          </div>

          <span
            style={{
              background: "rgba(217, 119, 6, 0.2)",
              border: "1px solid rgba(217, 119, 6, 0.5)",
              color: "#fbbf24",
              fontSize: "0.76rem",
              fontWeight: 800,
              padding: "4px 14px",
              borderRadius: "20px",
              letterSpacing: "0.5px"
            }}
          >
            ● VIP ELITE INVESTOR ACTIVE
          </span>

          <h2 style={{ fontSize: "2rem", fontWeight: 900, margin: "14px 0 6px", color: "#ffffff" }}>
            Welcome Back, {user.name}!
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "0.92rem", marginBottom: "28px" }}>
            Authenticated Member: <strong style={{ color: "#38bdf8" }}>{user.email}</strong>
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px", textAlign: "left" }}>
            <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "14px", borderRadius: "14px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <span style={{ fontSize: "0.72rem", color: "#94a3b8", display: "block" }}>Membership Tier</span>
              <strong style={{ color: "#fbbf24", fontSize: "0.92rem" }}>Private Wealth VIP</strong>
            </div>
            <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "14px", borderRadius: "14px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <span style={{ fontSize: "0.72rem", color: "#94a3b8", display: "block" }}>Escrow Authorization</span>
              <strong style={{ color: "#10b981", fontSize: "0.92rem" }}>Level 3 (₹100 Cr+)</strong>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Link
              to="/admin"
              className="btn btn-gold"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px 20px",
                fontSize: "0.92rem",
                textDecoration: "none"
              }}
            >
              <Zap size={16} />
              <span>Open Executive Command Center</span>
            </Link>

            <Link
              to="/properties"
              className="btn btn-secondary"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px 20px",
                fontSize: "0.92rem",
                textDecoration: "none"
              }}
            >
              <span>Explore 10,000+ Verified Luxury Estates</span>
              <ArrowRight size={16} />
            </Link>

            <button
              onClick={() => {
                logoutUser();
                addToast("Signed out successfully", "info");
              }}
              className="btn btn-outline"
              style={{
                marginTop: "6px",
                padding: "10px",
                borderColor: "rgba(255, 255, 255, 0.2)",
                color: "#94a3b8",
                fontSize: "0.85rem",
                cursor: "pointer"
              }}
            >
              Sign Out of Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 1-Click Instant Demo Logins
  const handleRoleLogin = (roleType) => {
    if (roleType === "investor") {
      loginUser({
        name: "Vikram Singhania",
        email: "vikram.hnw@estatehub.in",
        phone: "+91 98201 12345",
        role: "HNW Investor"
      });
      addToast("Welcome Vikram Singhania! Logged in as VIP Investor.", "success");
    } else if (roleType === "admin") {
      loginUser({
        name: "Sanjay Kumar",
        email: "sanjay12012005@gmail.com",
        phone: "+91 8809604880",
        role: "Founder & Executive Admin"
      });
      addToast("Welcome Sanjay Kumar! Full Administrator Rights Granted.", "success");
      navigate("/admin");
      return;
    } else if (roleType === "broker") {
      loginUser({
        name: "Priya Malhotra",
        email: "priya.malhotra@estatehub.in",
        phone: "+91 98110 54321",
        role: "Certified Broker"
      });
      addToast("Logged in as Certified Partner Priya Malhotra", "success");
    }
    navigate("/properties");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      addToast("Please enter email and password", "warning");
      return;
    }
    loginUser({
      name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      email: email,
      role: "Verified Member"
    });
    addToast(`Signed in successfully as ${email}!`, "success");
    navigate("/properties");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      addToast("Please fill all required fields", "warning");
      return;
    }
    loginUser({
      name: name,
      email: email,
      phone: phone || "+91 98000 00000",
      role: "Private Member"
    });
    addToast("Welcome to EstateHub! Your VIP account is active.", "success");
    navigate("/properties");
  };

  return (
    <div
      className="luxury-auth-wrapper"
      style={{
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px 80px",
        background: "radial-gradient(ellipse at top, #1e1b4b 0%, #0b0f19 60%, #030712 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background Luxury Ambient Glow Orbs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "15%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(99, 102, 241, 0) 70%)",
          filter: "blur(60px)",
          pointerEvents: "none"
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "15%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(217, 119, 6, 0.16) 0%, rgba(217, 119, 6, 0) 70%)",
          filter: "blur(70px)",
          pointerEvents: "none"
        }}
      ></div>

      <div
        className="luxury-auth-card"
        style={{
          maxWidth: "1040px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          borderRadius: "28px",
          background: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(25px)",
          WebkitBackdropFilter: "blur(25px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(99, 102, 241, 0.15)",
          overflow: "hidden",
          position: "relative",
          zIndex: 2
        }}
      >
        {/* Left Column: Prestigious Showcase & Benefits */}
        <div
          style={{
            padding: "44px 36px",
            background: "linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.95) 100%)",
            borderRight: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: "#ffffff"
          }}
        >
          <div>
            {/* Header Badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #d97706, #b45309)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 14px rgba(217, 119, 6, 0.4)"
                }}
              >
                <Building2 size={22} color="#ffffff" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 900, letterSpacing: "-0.3px", color: "#ffffff" }}>
                  Estate<span style={{ color: "#d4af37" }}>Hub</span>
                </h3>
                <span style={{ fontSize: "0.68rem", color: "#94a3b8", fontWeight: 700, letterSpacing: "1px" }}>
                  VIP MEMBER PORTAL
                </span>
              </div>
            </div>

            <h2 style={{ fontSize: "1.9rem", fontWeight: 900, lineHeight: 1.25, margin: "0 0 14px", color: "#ffffff" }}>
              Unlock Exclusive <span style={{ color: "#fbbf24" }}>High-Value Portfolios</span> & RERA Escrow
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.55, margin: "0 0 28px" }}>
              Join 3,840+ High-Net-Worth buyers, NRIs, and institutional investors with direct access to private deals curated by Sanjay Kumar.
            </p>

            {/* VIP Perks List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981", flexShrink: 0, marginTop: "2px" }}>
                  <Check size={14} />
                </div>
                <div>
                  <strong style={{ fontSize: "0.88rem", color: "#f8fafc", display: "block" }}>30-Year Title Search Vault</strong>
                  <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Download certified non-encumbrance & ownership dossiers.</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(217, 119, 6, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fbbf24", flexShrink: 0, marginTop: "2px" }}>
                  <Check size={14} />
                </div>
                <div>
                  <strong style={{ fontSize: "0.88rem", color: "#f8fafc", display: "block" }}>HDFC RERA Earnest Escrow</strong>
                  <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Lock deals with cryptographic token receipts (`0x...`).</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(99, 102, 241, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#818cf8", flexShrink: 0, marginTop: "2px" }}>
                  <Check size={14} />
                </div>
                <div>
                  <strong style={{ fontSize: "0.88rem", color: "#f8fafc", display: "block" }}>Direct Line to Founder Sanjay Kumar</strong>
                  <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>1-on-1 priority advisory for prime Darbhanga, Mumbai & Goa parcels.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Founder Testimonial Card */}
          <div
            style={{
              background: "rgba(0, 0, 0, 0.35)",
              border: "1px solid rgba(217, 119, 6, 0.3)",
              borderRadius: "16px",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}
          >
            <img
              src={sanjayPhoto}
              alt="Sanjay Kumar"
              style={{ width: "42px", height: "42px", borderRadius: "50%", border: "1.5px solid #d97706", objectFit: "cover", flexShrink: 0 }}
            />
            <div>
              <div style={{ fontSize: "0.82rem", fontWeight: 800, color: "#ffffff" }}>
                Sanjay Kumar
              </div>
              <div style={{ fontSize: "0.72rem", color: "#fbbf24", fontWeight: 700 }}>
                Founder & Private Advisory Lead
              </div>
              <div style={{ fontSize: "0.68rem", color: "#94a3b8", marginTop: "2px" }}>
                "Every listing is RERA cleared and legally audited before member presentation."
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form & 1-Click Demo Logins */}
        <div style={{ padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {/* Quick 1-Click Demo Buttons */}
          <div style={{ marginBottom: "26px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "#fbbf24", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                ⚡ 1-Click Instant Demo Login
              </span>
              <span style={{ fontSize: "0.68rem", color: "#10b981", fontWeight: 700 }}>● No typing needed</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
              <button
                type="button"
                onClick={() => handleRoleLogin("investor")}
                style={{
                  padding: "9px 6px",
                  background: "rgba(99, 102, 241, 0.15)",
                  border: "1px solid rgba(99, 102, 241, 0.35)",
                  borderRadius: "10px",
                  color: "#a5b4fc",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "3px",
                  transition: "all 0.2s"
                }}
                title="Login instantly as VIP Investor"
              >
                <Crown size={15} color="#818cf8" />
                <span>VIP Buyer</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleLogin("admin")}
                style={{
                  padding: "9px 6px",
                  background: "rgba(217, 119, 6, 0.18)",
                  border: "1px solid rgba(217, 119, 6, 0.5)",
                  borderRadius: "10px",
                  color: "#fde68a",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "3px",
                  transition: "all 0.2s"
                }}
                title="Login instantly as Sanjay Kumar / Admin"
              >
                <Zap size={15} color="#fbbf24" />
                <span>Admin Desk</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleLogin("broker")}
                style={{
                  padding: "9px 6px",
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.35)",
                  borderRadius: "10px",
                  color: "#6ee7b7",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "3px",
                  transition: "all 0.2s"
                }}
                title="Login instantly as Certified Broker"
              >
                <Briefcase size={15} color="#34d399" />
                <span>Broker</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "22px" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255, 255, 255, 0.1)" }}></div>
            <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 700 }}>OR SIGN IN WITH CREDENTIALS</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255, 255, 255, 0.1)" }}></div>
          </div>

          {/* Tab Switcher */}
          <div
            style={{
              display: "flex",
              background: "rgba(0, 0, 0, 0.4)",
              borderRadius: "12px",
              padding: "4px",
              marginBottom: "22px",
              border: "1px solid rgba(255, 255, 255, 0.08)"
            }}
          >
            <button
              onClick={() => setActiveTab("login")}
              style={{
                flex: 1,
                padding: "9px",
                borderRadius: "8px",
                fontWeight: 800,
                fontSize: "0.85rem",
                background: activeTab === "login" ? "linear-gradient(135deg, #d97706, #b45309)" : "transparent",
                color: activeTab === "login" ? "#ffffff" : "#94a3b8",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("register")}
              style={{
                flex: 1,
                padding: "9px",
                borderRadius: "8px",
                fontWeight: 800,
                fontSize: "0.85rem",
                background: activeTab === "register" ? "linear-gradient(135deg, #d97706, #b45309)" : "transparent",
                color: activeTab === "register" ? "#ffffff" : "#94a3b8",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              Register Member
            </button>
          </div>

          {/* Form */}
          {activeTab === "login" ? (
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#cbd5e1", marginBottom: "6px" }}>
                  Email Address
                </label>
                <div style={{ position: "relative" }}>
                  <Mail size={16} color="#64748b" style={{ position: "absolute", top: "13px", left: "14px" }} />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px 12px 42px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      background: "rgba(0, 0, 0, 0.35)",
                      color: "#ffffff",
                      fontSize: "0.88rem",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#cbd5e1" }}>
                    Security Password
                  </label>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      addToast("Demo mode: Use any password or click demo buttons above", "info");
                    }}
                    style={{ fontSize: "0.75rem", color: "#fbbf24", textDecoration: "none" }}
                  >
                    Forgot?
                  </a>
                </div>
                <div style={{ position: "relative" }}>
                  <Lock size={16} color="#64748b" style={{ position: "absolute", top: "13px", left: "14px" }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 42px 12px 42px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      background: "rgba(0, 0, 0, 0.35)",
                      color: "#ffffff",
                      fontSize: "0.88rem",
                      outline: "none"
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "12px",
                      background: "transparent",
                      border: "none",
                      color: "#94a3b8",
                      cursor: "pointer"
                    }}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "4px 0" }}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: "#d97706", width: "16px", height: "16px", cursor: "pointer" }}
                />
                <label htmlFor="rememberMe" style={{ fontSize: "0.78rem", color: "#94a3b8", cursor: "pointer" }}>
                  Keep me authenticated on this device
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-gold"
                style={{
                  width: "100%",
                  padding: "13px",
                  fontSize: "0.92rem",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  marginTop: "6px"
                }}
              >
                <span>Authorize & Enter VIP Portal</span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#cbd5e1", marginBottom: "5px" }}>
                  Full Name
                </label>
                <div style={{ position: "relative" }}>
                  <User size={16} color="#64748b" style={{ position: "absolute", top: "13px", left: "14px" }} />
                  <input
                    type="text"
                    placeholder="e.g. Vikram Sharma"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px 12px 42px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      background: "rgba(0, 0, 0, 0.35)",
                      color: "#ffffff",
                      fontSize: "0.88rem",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#cbd5e1", marginBottom: "5px" }}>
                  Official Email
                </label>
                <div style={{ position: "relative" }}>
                  <Mail size={16} color="#64748b" style={{ position: "absolute", top: "13px", left: "14px" }} />
                  <input
                    type="email"
                    placeholder="vikram@enterprise.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px 12px 42px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      background: "rgba(0, 0, 0, 0.35)",
                      color: "#ffffff",
                      fontSize: "0.88rem",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#cbd5e1", marginBottom: "5px" }}>
                  Mobile (For VIP Site Visits & Escrow)
                </label>
                <div style={{ position: "relative" }}>
                  <Phone size={16} color="#64748b" style={{ position: "absolute", top: "13px", left: "14px" }} />
                  <input
                    type="tel"
                    placeholder="+91 98000 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px 12px 42px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      background: "rgba(0, 0, 0, 0.35)",
                      color: "#ffffff",
                      fontSize: "0.88rem",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#cbd5e1", marginBottom: "5px" }}>
                  Set Security Password
                </label>
                <div style={{ position: "relative" }}>
                  <Lock size={16} color="#64748b" style={{ position: "absolute", top: "13px", left: "14px" }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create strong password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 42px 12px 42px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      background: "rgba(0, 0, 0, 0.35)",
                      color: "#ffffff",
                      fontSize: "0.88rem",
                      outline: "none"
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "12px",
                      background: "transparent",
                      border: "none",
                      color: "#94a3b8",
                      cursor: "pointer"
                    }}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-gold"
                style={{
                  width: "100%",
                  padding: "13px",
                  fontSize: "0.92rem",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  marginTop: "6px"
                }}
              >
                <span>Create VIP Account</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
