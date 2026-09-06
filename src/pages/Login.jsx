import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import { User, Lock, Mail, Phone, CheckCircle, ArrowRight, Sparkles, Building2 } from "lucide-react";

export const Login = () => {
  const navigate = useNavigate();
  const { user, loginUser, logoutUser, addToast } = usePropertyContext();

  const [activeTab, setActiveTab] = useState("login"); // 'login' | 'register'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // If already logged in, show status
  if (user) {
    return (
      <div className="container" style={{ padding: "80px 24px", textAlign: "center", minHeight: "75vh" }}>
        <div
          style={{
            maxWidth: "480px",
            margin: "0 auto",
            background: "var(--bg-surface)",
            padding: "40px",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-light)",
            boxShadow: "var(--shadow-md)"
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "var(--accent-primary-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              color: "var(--accent-primary)"
            }}
          >
            <User size={34} />
          </div>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>Welcome Back, {user.name}!</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "24px" }}>
            Signed in as <strong>{user.email}</strong>
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Link to="/properties" className="btn btn-primary">
              <span>Browse Properties</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/favorites" className="btn btn-secondary">
              View Saved Favorites
            </Link>
            <button
              onClick={() => logoutUser()}
              className="btn btn-outline"
              style={{ marginTop: "8px" }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      addToast("Please fill in email and password", "warning");
      return;
    }
    loginUser({
      name: email.split("@")[0].replace(".", " "),
      email: email
    });
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
      phone: phone
    });
    addToast("Account created successfully!", "success");
    navigate("/properties");
  };

  // Quick 1-Click Demo Login
  const handleDemoLogin = () => {
    loginUser({
      name: "Priya Sharma",
      email: "priya.sharma@example.com"
    });
    navigate("/properties");
  };

  return (
    <div className="login-page" style={{ padding: "60px 24px 100px", minHeight: "85vh", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ maxWidth: "480px" }}>
        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "var(--accent-primary)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
              boxShadow: "0 6px 16px rgba(37, 99, 235, 0.35)"
            }}
          >
            <Building2 size={26} />
          </div>
          <h1 style={{ fontSize: "2rem", margin: 0 }}>EstateHub Account</h1>
          <p style={{ marginTop: "6px", fontSize: "0.95rem", color: "var(--text-secondary)" }}>
            Access saved shortlist, track site visits, and contact advisors
          </p>
        </div>

        {/* Auth Card */}
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            padding: "36px",
            boxShadow: "var(--shadow-md)"
          }}
        >
          {/* Tab Switcher */}
          <div
            style={{
              display: "flex",
              background: "var(--bg-secondary)",
              borderRadius: "var(--radius-md)",
              padding: "4px",
              marginBottom: "28px"
            }}
          >
            <button
              onClick={() => setActiveTab("login")}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "var(--radius-sm)",
                fontWeight: 600,
                fontSize: "0.9rem",
                background: activeTab === "login" ? "var(--bg-surface)" : "transparent",
                color: activeTab === "login" ? "var(--accent-primary)" : "var(--text-secondary)",
                boxShadow: activeTab === "login" ? "var(--shadow-xs)" : "none",
                transition: "var(--transition)"
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("register")}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "var(--radius-sm)",
                fontWeight: 600,
                fontSize: "0.9rem",
                background: activeTab === "register" ? "var(--bg-surface)" : "transparent",
                color: activeTab === "register" ? "var(--accent-primary)" : "var(--text-secondary)",
                boxShadow: activeTab === "register" ? "var(--shadow-xs)" : "none",
                transition: "var(--transition)"
              }}
            >
              Create Account
            </button>
          </div>

          {/* 1-Click Demo Login Banner */}
          <div
            style={{
              background: "var(--accent-primary-light)",
              border: "1px solid rgba(37, 99, 235, 0.25)",
              borderRadius: "var(--radius-sm)",
              padding: "12px 16px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={18} color="var(--accent-primary)" />
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent-primary)" }}>
                Instant Demo Access
              </span>
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="btn btn-primary btn-sm"
              style={{ padding: "6px 12px", fontSize: "0.8rem" }}
            >
              Demo Login
            </button>
          </div>

          {/* Form */}
          {activeTab === "login" ? (
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                  Email Address
                </label>
                <div style={{ position: "relative" }}>
                  <Mail size={16} color="var(--text-muted)" style={{ position: "absolute", top: "14px", left: "14px" }} />
                  <input
                    type="email"
                    placeholder="user@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "11px 14px 11px 40px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Password</label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); addToast("Password reset link sent to registered email.", "info"); }} style={{ fontSize: "0.8rem", color: "var(--accent-primary)", fontWeight: 600 }}>
                    Forgot password?
                  </a>
                </div>
                <div style={{ position: "relative" }}>
                  <Lock size={16} color="var(--text-muted)" style={{ position: "absolute", top: "14px", left: "14px" }} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "11px 14px 11px 40px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              <label className="checkbox-label" style={{ marginTop: "4px" }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span style={{ fontSize: "0.85rem" }}>Remember this device</span>
              </label>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "8px" }}>
                Sign In to EstateHub
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                  Full Name
                </label>
                <div style={{ position: "relative" }}>
                  <User size={16} color="var(--text-muted)" style={{ position: "absolute", top: "14px", left: "14px" }} />
                  <input
                    type="text"
                    placeholder="Priya Sharma"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "11px 14px 11px 40px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                  Email Address
                </label>
                <div style={{ position: "relative" }}>
                  <Mail size={16} color="var(--text-muted)" style={{ position: "absolute", top: "14px", left: "14px" }} />
                  <input
                    type="email"
                    placeholder="priya@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "11px 14px 11px 40px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                  Phone Number
                </label>
                <div style={{ position: "relative" }}>
                  <Phone size={16} color="var(--text-muted)" style={{ position: "absolute", top: "14px", left: "14px" }} />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "11px 14px 11px 40px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <Lock size={16} color="var(--text-muted)" style={{ position: "absolute", top: "14px", left: "14px" }} />
                  <input
                    type="password"
                    placeholder="Minimum 6 characters"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "11px 14px 11px 40px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "8px" }}>
                Create Free Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
