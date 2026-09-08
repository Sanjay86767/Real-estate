import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck, Target, HeartHandshake, Award, Sparkles,
  Building2, Users, ArrowRight, CheckCircle2, TrendingUp,
  MapPin, Phone, Star, Globe, Zap, Crown
} from "lucide-react";

const useCountUp = (end, duration = 2000, startOnMount = false) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(startOnMount);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, end, duration]);

  return { count, start: () => setStarted(true) };
};

const AnimatedStat = ({ value, label, color, suffix = "", prefix = "" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const numericEnd = parseInt(String(value).replace(/[^0-9]/g, ""), 10) || 0;
  const { count, start } = useCountUp(numericEnd, 1800);

  useEffect(() => {
    if (visible) start();
  }, [visible]);

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <strong style={{ display: "block", fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 900, color, letterSpacing: "-1px" }}>
        {prefix}{visible ? count.toLocaleString() : 0}{suffix}
      </strong>
      <span style={{ fontSize: "0.82rem", color: "#cbd5e1", fontWeight: 500, lineHeight: 1.4, display: "block", marginTop: "4px" }}>{label}</span>
    </div>
  );
};

const principles = [
  {
    Icon: ShieldCheck, color: "#6366f1", bg: "rgba(99,102,241,0.10)",
    title: "Radical Transparency",
    desc: "Zero hidden costs, no surprise escalation fees, and straightforward pricing communicated before site visits."
  },
  {
    Icon: Target, color: "#f59e0b", bg: "rgba(245,158,11,0.10)",
    title: "Client-Centricity",
    desc: "We curate based on your true lifestyle needs, budget envelope, and future school/work commutes."
  },
  {
    Icon: HeartHandshake, color: "#10b981", bg: "rgba(16,185,129,0.10)",
    title: "Regulatory Rigor",
    desc: "Strict RERA adherence and verification of master plans, encumbrance certificates, and builder credentials."
  },
  {
    Icon: Award, color: "#ec4899", bg: "rgba(236,72,153,0.10)",
    title: "End-To-End Support",
    desc: "From bank loan sanctioning to government sub-registrar title registration and key handover ceremonies."
  },
  {
    Icon: Zap, color: "#8b5cf6", bg: "rgba(139,92,246,0.10)",
    title: "Tech-First Approach",
    desc: "AI-powered matchmaking, virtual 3D tours, and real-time market barometers keep you ahead of the curve."
  },
  {
    Icon: Globe, color: "#0ea5e9", bg: "rgba(14,165,233,0.10)",
    title: "NRI-Friendly Services",
    desc: "Dedicated NRI desk with power-of-attorney support, repatriation guidance, and FEMA compliance experts."
  }
];

export const About = () => {
  return (
    <div className="about-page" style={{ padding: "0 0 80px" }}>

      {/* ── Hero ── */}
      <div style={{
        background: "linear-gradient(135deg, #0f1729 0%, #1a1240 50%, #0c1f3d 100%)",
        padding: "clamp(60px, 10vw, 100px) 0",
        position: "relative", overflow: "hidden"
      }}>
        {/* Orbs */}
        <div style={{ position: "absolute", top: "-80px", right: "8%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-100px", left: "5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(217,119,6,0.08), transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        <div className="container" style={{ textAlign: "center", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "999px", padding: "6px 18px", marginBottom: "24px" }}>
            <Sparkles size={14} color="#6366f1" />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "1px" }}>Our Journey & Purpose</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: "20px", maxWidth: "800px", margin: "0 auto 20px" }}>
            Redefining Luxury & Trust In Indian Real Estate
          </h1>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "#94a3b8", lineHeight: 1.75, maxWidth: "640px", margin: "0 auto 36px" }}>
            EstateHub was founded with a singular conviction: buying or investing in property should be transparent, delightful, and devoid of hidden surprises.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/properties" className="btn btn-primary" style={{ gap: "8px", display: "inline-flex", alignItems: "center" }}>
              Explore Properties <ArrowRight size={16} />
            </Link>
            <Link to="/agents" className="btn btn-secondary" style={{ gap: "8px", display: "inline-flex", alignItems: "center" }}>
              <Users size={16} /> Meet Our Team
            </Link>
          </div>
        </div>
      </div>

      <div className="container">

        {/* ── Story Section ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "clamp(24px, 5vw, 60px)",
          alignItems: "center",
          margin: "clamp(48px, 8vw, 80px) 0"
        }}>
          <div>
            <span style={{ color: "var(--accent-primary)", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              Our Story
            </span>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, margin: "10px 0 18px", lineHeight: 1.25 }}>
              From Local Passion To Regional Authority
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-secondary)", marginBottom: "16px" }}>
              Started in 2018 in Chandigarh, EstateHub recognized the gap in digital real estate services — fragmented listings, unverified ownership claims, and delayed paperwork plagued buyers and investors alike.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-secondary)", marginBottom: "28px" }}>
              Today, EstateHub bridges premier property developers with discerning homeowners and investors across Chandigarh, Mohali, Delhi NCR, Bangalore, Bihar, and beyond — with 100% legal title auditing and AI-powered insights.
            </p>
            {/* Mini stats */}
            <div style={{ display: "flex", gap: "clamp(16px, 4vw, 32px)", flexWrap: "wrap" }}>
              {[
                { val: "6+", label: "Years of Excellence", color: "var(--accent-primary)" },
                { val: "1,500+", label: "Homes Delivered", color: "var(--accent-gold)" },
                { val: "99%", label: "Clean Title Record", color: "var(--accent-emerald)" }
              ].map((s) => (
                <div key={s.label}>
                  <strong style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: s.color, display: "block", lineHeight: 1 }}>{s.val}</strong>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "var(--shadow-xl)", position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
              alt="Modern Estate Architecture"
              style={{ width: "100%", height: "clamp(280px, 40vw, 440px)", objectFit: "cover", display: "block" }}
            />
            <div style={{
              position: "absolute", bottom: "20px", left: "20px",
              background: "rgba(15,23,42,0.85)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--radius-md)",
              padding: "12px 18px", display: "flex", alignItems: "center", gap: "10px"
            }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Crown size={18} color="#f59e0b" />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.88rem" }}>Sanjay Kumar</div>
                <div style={{ fontSize: "0.73rem", color: "#94a3b8" }}>Founder & Managing Director</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Core Principles ── */}
        <div style={{ marginBottom: "clamp(48px, 8vw, 80px)" }}>
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto clamp(28px, 4vw, 48px)" }}>
            <span style={{ color: "var(--accent-primary)", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "10px" }}>Why Choose Us</span>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, marginBottom: "10px" }}>Our Guiding Principles</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.65 }}>The standards that guide every consultation, site visit, and closing.</p>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px"
          }}>
            {principles.map(({ Icon, color, bg, title, desc }) => (
              <div
                key={title}
                className="principle-card"
                style={{
                  background: "var(--bg-surface)",
                  padding: "clamp(20px, 3vw, 32px) clamp(18px, 2.5vw, 28px)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--border-light)",
                  transition: "all 0.3s ease",
                  cursor: "default"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = color + "60";
                  e.currentTarget.style.boxShadow = `0 8px 30px ${color}18`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-light)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ width: "50px", height: "50px", borderRadius: "14px", background: bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" }}>
                  <Icon size={24} color={color} />
                </div>
                <h3 style={{ fontSize: "1.08rem", fontWeight: 700, marginBottom: "10px" }}>{title}</h3>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Trust Metrics ── */}
        <div style={{
          background: "linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(30,41,59,0.95) 100%)",
          border: "1px solid rgba(217,119,6,0.25)",
          borderRadius: "var(--radius-2xl)",
          padding: "clamp(36px, 6vw, 64px) clamp(24px, 5vw, 48px)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
          marginBottom: "clamp(40px, 6vw, 60px)",
          position: "relative", overflow: "hidden"
        }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: "300px", height: "300px", background: "radial-gradient(circle, rgba(217,119,6,0.06), transparent 70%)", pointerEvents: "none" }} />

          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto clamp(28px, 4vw, 48px)" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--accent-gold)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
              <Sparkles size={13} /> Institutional Excellence
            </span>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.5px", marginBottom: "12px" }}>
              India's Premier Luxury Real Estate Network
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "0.96rem", lineHeight: 1.65, margin: 0 }}>
              Benchmarked against global architectural standards, delivering absolute legal transparency across northern and metropolitan India.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px"
          }}>
            {[
              { value: 1850, suffix: " Cr+", prefix: "₹", label: "High-Net-Worth Portfolio Volume", color: "#f59e0b" },
              { value: 100, suffix: "%", prefix: "", label: "RERA Legal Title Clearance Guarantee", color: "#10b981" },
              { value: 4200, suffix: "+", prefix: "", label: "Families & NRI Investors Served", color: "#60a5fa" },
              { value: 99, suffix: ".8%", prefix: "", label: "On-Time Possession & Deed Delivery", color: "#ec4899" }
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "clamp(18px, 3vw, 28px) 20px",
                  borderRadius: "var(--radius-lg)",
                  textAlign: "center",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <AnimatedStat value={stat.value} suffix={stat.suffix} prefix={stat.prefix} label={stat.label} color={stat.color} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Achievements Timeline ── */}
        <div style={{ marginBottom: "clamp(40px, 6vw, 64px)" }}>
          <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto clamp(28px, 4vw, 40px)" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800 }}>Our Milestones</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              { year: "2018", title: "Founded in Chandigarh", desc: "Launched with a team of 4, focusing on transparent property advisory.", color: "#6366f1" },
              { year: "2020", title: "Digital Platform Launch", desc: "Introduced AI-powered listings and virtual site tours during lockdown era.", color: "#10b981" },
              { year: "2022", title: "Bihar & NCR Expansion", desc: "Opened regional offices in Patna (Darbhanga Corridor) and Noida.", color: "#f59e0b" },
              { year: "2024", title: "1,500+ Homes Milestone", desc: "Crossed ₹1,850 Cr+ in portfolio volume with 99% legal clearance.", color: "#ec4899" },
              { year: "2025", title: "NRI Desk & AI Integration", desc: "Launched EstateBot AI, Floor Plan Viewer, and dedicated NRI concierge.", color: "#8b5cf6" }
            ].map((item, idx) => (
              <div key={item.year} style={{ display: "flex", gap: "clamp(14px, 3vw, 28px)", alignItems: "flex-start" }}>
                {/* Timeline line + dot */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: "40px" }}>
                  <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: item.color, boxShadow: `0 0 0 4px ${item.color}25`, marginTop: "14px", flexShrink: 0 }} />
                  {idx < 4 && <div style={{ width: "2px", flex: 1, background: "var(--border-light)", marginTop: "6px", minHeight: "40px" }} />}
                </div>
                <div style={{ paddingBottom: "clamp(16px, 3vw, 32px)" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: item.color, textTransform: "uppercase", letterSpacing: "0.5px" }}>{item.year}</span>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "4px 0 6px" }}>{item.title}</h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(217,119,6,0.06))",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-xl)",
          padding: "clamp(36px, 5vw, 60px) clamp(24px, 5vw, 48px)",
          textAlign: "center"
        }}>
          <Star size={28} color="var(--accent-gold)" style={{ marginBottom: "16px" }} />
          <h3 style={{ fontSize: "clamp(1.4rem, 3vw, 2.1rem)", fontWeight: 800, marginBottom: "12px" }}>
            Looking to Discuss Your Next Property?
          </h3>
          <p style={{ maxWidth: "540px", margin: "0 auto 30px", color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.7 }}>
            Our advisors are always accessible for a friendly consultation or a dedicated site tour — from Bihar to Bangalore.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/properties" className="btn btn-primary btn-lg" style={{ gap: "8px", display: "inline-flex", alignItems: "center" }}>
              <Building2 size={18} /> Explore Properties
            </Link>
            <Link to="/contact" className="btn btn-secondary btn-lg" style={{ gap: "8px", display: "inline-flex", alignItems: "center" }}>
              <Phone size={18} /> Contact Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
