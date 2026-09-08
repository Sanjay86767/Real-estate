import React, { useState, useEffect, useRef } from "react";
import { TrendingUp, Users, MapPin, Building2, Award, Star, Home, Briefcase } from "lucide-react";

const STATS = [
  { icon: Building2, number: 120000, suffix: "+", label: "Verified Properties", color: "#FF6B00" },
  { icon: Users, number: 85000, suffix: "+", label: "Happy Families", color: "#F5A623" },
  { icon: MapPin, number: 500, suffix: "+", label: "Cities Covered", color: "#3B7BF6" },
  { icon: TrendingUp, number: 12500, prefix: "₹", suffix: " Cr+", label: "Deals Closed", color: "#00D9A5" },
  { icon: Award, number: 15, suffix: "+ Yrs", label: "Trusted Experience", color: "#FF3D71" },
  { icon: Star, number: 4.9, suffix: "/5", label: "Customer Rating", color: "#F5A623" },
];

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const isFloat = !Number.isInteger(target);
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setCount(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatItem({ icon: Icon, number, suffix = "", prefix = "", label, color, index, visible }) {
  const count = useCountUp(number, 2000 + index * 100, visible);
  return (
    <div
      className="live-stat-item"
      style={{
        animation: visible ? `slide-in-up 0.6s ease ${index * 0.1}s both` : "none",
        textAlign: "center",
      }}
    >
      <div className="live-stat-icon" style={{ background: `${color}18`, borderColor: `${color}40`, margin: "0 auto 12px" }}>
        <Icon size={18} color={color} />
      </div>
      <span className="live-stat-number" style={{
        background: `linear-gradient(135deg, ${color}, #FFD700)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        {prefix}{count.toLocaleString("en-IN")}{suffix}
      </span>
      <span className="live-stat-label">{label}</span>
    </div>
  );
}

export default function LiveStatsBar() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="live-stats-bar" ref={ref}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div className="live-indicator" style={{ justifyContent: "center", marginBottom: "8px" }}>
            <div className="live-dot">
              <div className="live-dot-inner" />
              <div className="live-dot-ring" />
            </div>
            Live Market Data
          </div>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase" }}>
            Updated every 5 minutes
          </p>
        </div>
        <div className="live-stats-bar-inner">
          {STATS.map((stat, i) => (
            <StatItem key={i} {...stat} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
