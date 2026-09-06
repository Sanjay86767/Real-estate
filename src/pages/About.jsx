import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Target, HeartHandshake, Award, Sparkles, Building2, Users, Phone, Mail } from "lucide-react";
import sanjayPhoto from "../assets/sanjay-kumar.jpg";

export const About = () => {
  return (
    <div className="about-page" style={{ padding: "40px 0 80px" }}>
      <div className="container">
        {/* Hero Banner */}
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 60px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--accent-primary)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
            <Sparkles size={18} />
            <span>Our Journey & Purpose</span>
          </div>
          <h1 style={{ fontSize: "2.8rem", marginTop: "8px", lineHeight: "1.2" }}>
            Redefining Luxury & Trust In Indian Real Estate
          </h1>
          <p style={{ fontSize: "1.1rem", marginTop: "14px", color: "var(--text-secondary)", lineHeight: "1.7" }}>
            EstateHub was founded with a singular conviction: buying or investing in property should be transparent, delightful, and devoid of hidden surprises.
          </p>
        </div>

        {/* Story Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "48px",
            alignItems: "center",
            marginBottom: "80px"
          }}
        >
          <div>
            <span style={{ color: "var(--accent-primary)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}>
              Our Story
            </span>
            <h2 style={{ fontSize: "2.2rem", margin: "8px 0 16px" }}>From Local Passion To Regional Authority</h2>
            <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--text-secondary)", marginBottom: "16px" }}>
              Started in 2018 in Chandigarh, EstateHub recognized the gap in digital real estate services: fragmented listings, unverified ownership claims, and delayed paperwork.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: "1.8", color: "var(--text-secondary)", marginBottom: "24px" }}>
              Today, EstateHub bridges premier property developers with discerning homeowners and investors across Chandigarh, Mohali, Delhi NCR, Bangalore, and Amritsar with 100% legal title auditing.
            </p>
            <div style={{ display: "flex", gap: "24px" }}>
              <div>
                <strong style={{ fontSize: "2rem", color: "var(--accent-primary)", display: "block" }}>6+</strong>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Years of Excellence</span>
              </div>
              <div>
                <strong style={{ fontSize: "2rem", color: "var(--accent-gold)", display: "block" }}>1,500+</strong>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Homes Delivered</span>
              </div>
              <div>
                <strong style={{ fontSize: "2rem", color: "var(--accent-emerald)", display: "block" }}>99%</strong>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Clean Title Record</span>
              </div>
            </div>
          </div>

          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
              alt="Modern Estate Architecture"
              style={{ width: "100%", height: "420px", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Core Values */}
        <div style={{ marginBottom: "80px" }}>
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 40px" }}>
            <h2 style={{ fontSize: "2.2rem" }}>Our Guiding Principles</h2>
            <p style={{ marginTop: "6px" }}>The standards that guide every consultation, site visit, and closing.</p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px"
            }}
          >
            <div style={{ background: "var(--bg-surface)", padding: "30px 24px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
              <ShieldCheck size={32} color="var(--accent-primary)" style={{ marginBottom: "14px" }} />
              <h3 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>Radical Transparency</h3>
              <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                Zero hidden costs, no surprise escalation fees, and straightforward pricing communicated before site visits.
              </p>
            </div>

            <div style={{ background: "var(--bg-surface)", padding: "30px 24px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
              <Target size={32} color="var(--accent-gold)" style={{ marginBottom: "14px" }} />
              <h3 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>Client-Centricity</h3>
              <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                We curate based on your true lifestyle needs, budget envelope, and future school/work commutes.
              </p>
            </div>

            <div style={{ background: "var(--bg-surface)", padding: "30px 24px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
              <HeartHandshake size={32} color="var(--accent-emerald)" style={{ marginBottom: "14px" }} />
              <h3 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>Regulatory Rigor</h3>
              <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                Strict RERA adherence and verification of master plans, encumbrance certificates, and builder credentials.
              </p>
            </div>

            <div style={{ background: "var(--bg-surface)", padding: "30px 24px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
              <Award size={32} color="var(--accent-rose)" style={{ marginBottom: "14px" }} />
              <h3 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>End-To-End Support</h3>
              <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                From bank loan sanctioning to government sub-registrar title registration and key handover ceremonies.
              </p>
            </div>
          </div>
        </div>

        {/* Executive Leadership & Founder Spotlight */}
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-xl)",
            padding: "40px",
            boxShadow: "var(--shadow-md)",
            marginBottom: "80px"
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 30px" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--accent-primary)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Executive Leadership
            </span>
            <h2 style={{ fontSize: "2.2rem", margin: "6px 0 0" }}>Founder & Managing Director</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: "30px",
              alignItems: "center",
              background: "var(--bg-secondary)",
              padding: "30px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-light)"
            }}
            className="founder-card-grid"
          >
            <div className="pro-founder-avatar-frame" style={{ width: "110px", height: "110px" }}>
              <div className="pro-founder-avatar-inner">
                <img
                  src={sanjayPhoto}
                  alt="Sanjay Kumar - Founder"
                  className="pro-founder-avatar-img"
                />
              </div>
              <span className="pro-founder-live-pulse" title="Online"></span>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                <h3 style={{ margin: 0, fontSize: "1.6rem" }}>Sanjay Kumar</h3>
                <span style={{ background: "var(--accent-emerald-light)", color: "var(--accent-emerald)", padding: "2px 8px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 700 }}>
                  Founder & Principal Lead
                </span>
                <span style={{ background: "rgba(59, 130, 246, 0.15)", color: "#3b82f6", padding: "2px 8px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 700 }}>
                  📍 Darbhanga, Bihar Roots
                </span>
              </div>
              <p style={{ color: "var(--accent-primary)", fontWeight: 600, fontSize: "0.95rem", margin: "0 0 10px" }}>
                Managing Director, EstateHub Real Estate Technologies
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: "1.6", margin: 0 }}>
                Hailing from Darbhanga, Bihar, Sanjay Kumar is pioneering transparency, AI architectural staging, and legal certainty across Indian luxury real estate. Overseeing high-net-worth acquisitions, villa developments, and turnkey client portfolios with 100% guaranteed clear titles.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "190px" }}>
              <a
                href="tel:+918809604880"
                className="btn btn-primary btn-sm"
                style={{ gap: "8px", justifyContent: "center" }}
              >
                <Phone size={15} />
                <span>+91 8809604880</span>
              </a>
              <a
                href="mailto:sanjay12012005@gmail.com"
                className="btn btn-secondary btn-sm"
                style={{ gap: "8px", justifyContent: "center" }}
              >
                <Mail size={15} />
                <span>Send Direct Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            padding: "48px 36px",
            textAlign: "center"
          }}
        >
          <h3 style={{ fontSize: "2rem", marginBottom: "12px" }}>Looking to Discuss Your Next Property?</h3>
          <p style={{ maxWidth: "550px", margin: "0 auto 28px", color: "var(--text-secondary)" }}>
            Our advisors are always accessible for a friendly cup of coffee or a dedicated site tour.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <Link to="/properties" className="btn btn-primary">
              Explore Properties
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Contact Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
