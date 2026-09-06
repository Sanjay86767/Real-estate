import React from "react";
import { Link } from "react-router-dom";
import { Home, Compass, ArrowLeft } from "lucide-react";

export const NotFound = () => {
  return (
    <div
      style={{
        padding: "100px 24px",
        textAlign: "center",
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div style={{ maxWidth: "550px" }}>
        <div
          style={{
            fontSize: "7rem",
            fontWeight: 900,
            lineHeight: 1,
            color: "var(--accent-primary)",
            fontFamily: "var(--font-heading)",
            letterSpacing: "-2px",
            marginBottom: "10px"
          }}
        >
          404
        </div>
        <h1 style={{ fontSize: "2.2rem", marginBottom: "14px" }}>Oops! Page Not Found</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: "1.7", marginBottom: "32px" }}>
          The property, agent, or page you are trying to visit might have moved, been renamed, or does not exist.
        </p>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/" className="btn btn-primary btn-lg">
            <Home size={18} />
            <span>Back to Home</span>
          </Link>
          <Link to="/properties" className="btn btn-secondary btn-lg">
            <Compass size={18} />
            <span>Explore Properties</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
