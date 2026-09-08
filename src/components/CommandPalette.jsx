import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import {
  Search,
  Building,
  Calendar,
  Sparkles,
  Compass,
  ArrowRight,
  X,
  FileText,
  DollarSign,
  Sun,
  Moon,
  ShieldCheck,
  Crown,
  Command
} from "lucide-react";

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const {
    properties,
    darkMode,
    toggleTheme,
    currency,
    setCurrency,
    formatPrice,
    addToast
  } = usePropertyContext();

  // Listen for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSearch("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Command items definitions
  const quickActions = [
    {
      id: "action-visits",
      title: "My Visit List — Scheduled Inspections",
      category: "Navigation",
      icon: Calendar,
      action: () => navigate("/visit-list"),
      badge: "Visit List"
    },
    {
      id: "action-add-prop",
      title: "List a New Property (Zero Commission)",
      category: "Navigation",
      icon: Building,
      action: () => navigate("/list-property"),
      badge: "Portal"
    },
    {
      id: "action-all-props",
      title: "Browse All Residences (10,000+ Online)",
      category: "Navigation",
      icon: Compass,
      action: () => navigate("/properties"),
      badge: "Catalog"
    },
    {
      id: "action-royal-heritage",
      title: "Raj Darbhanga Royal Heritage Kothi",
      category: "Signature",
      icon: Crown,
      action: () => navigate("/property/19"),
      badge: "VIP Sovereign"
    },
    {
      id: "action-emi",
      title: "Investment & Loan EMI Calculator",
      category: "Tools",
      icon: DollarSign,
      action: () => navigate("/affordability"),
      badge: "Finance"
    },
    {
      id: "action-deal-desk",
      title: "Deal Desk & Term Sheet Generator",
      category: "Tools",
      icon: FileText,
      action: () => navigate("/deal-desk"),
      badge: "AI Legal"
    },
    {
      id: "action-interior",
      title: "AI Interior Design Studio",
      category: "Tools",
      icon: Sparkles,
      action: () => navigate("/interior-studio"),
      badge: "GenAI"
    },
    {
      id: "action-theme",
      title: darkMode ? "Switch to Light Luxury Theme" : "Switch to Dark Executive Theme",
      category: "System",
      icon: darkMode ? Sun : Moon,
      action: () => {
        toggleTheme();
        addToast(darkMode ? "Light theme activated" : "Dark theme activated", "info");
      },
      badge: "Theme"
    },
    {
      id: "action-currency",
      title: currency === "INR" ? "Switch Currency to USD ($)" : "Switch Currency to INR (₹)",
      category: "System",
      icon: DollarSign,
      action: () => {
        const next = currency === "INR" ? "USD" : "INR";
        setCurrency(next);
        addToast(`Currency switched to ${next}`, "info");
      },
      badge: "Currency"
    }
  ];

  // Property search matches
  const propertyMatches = search.trim()
    ? properties
        .filter((p) => {
          const q = search.toLowerCase();
          return (
            p.title.toLowerCase().includes(q) ||
            p.location.toLowerCase().includes(q) ||
            (p.city && p.city.toLowerCase().includes(q)) ||
            (p.state && p.state.toLowerCase().includes(q))
          );
        })
        .slice(0, 5)
        .map((p) => ({
          id: `prop-${p.id}`,
          title: p.title,
          category: "Properties",
          subtitle: `${p.location} • ${formatPrice(p.price)}`,
          icon: Building,
          action: () => navigate(`/property/${p.id}`),
          badge: p.type
        }))
    : [];

  const filteredActions = search.trim()
    ? quickActions.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()))
    : quickActions;

  const allItems = [...propertyMatches, ...filteredActions];

  // Arrow key handling
  const handleKeyDownList = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % allItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + allItems.length) % allItems.length);
    } else if (e.key === "Enter" && allItems[selectedIndex]) {
      e.preventDefault();
      allItems[selectedIndex].action();
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="cmd-palette-trigger"
        title="Open Command Center (Ctrl+K or ⌘K)"
        aria-label="Open Command Palette"
        style={{
          position: "fixed",
          bottom: "24px",
          left: "24px",
          zIndex: 900,
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.98))",
          backdropFilter: "blur(14px)",
          border: "1.5px solid rgba(245, 158, 11, 0.4)",
          borderRadius: "var(--radius-full)",
          padding: "10px 18px",
          color: "#ffffff",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.3), 0 0 15px rgba(245, 158, 11, 0.2)",
          cursor: "pointer",
          fontSize: "0.84rem",
          fontWeight: 800,
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.06) translateY(-2px)";
          e.currentTarget.style.borderColor = "rgba(245, 158, 11, 0.8)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1) translateY(0)";
          e.currentTarget.style.borderColor = "rgba(245, 158, 11, 0.4)";
        }}
      >
        <Command size={14} color="#fbbf24" />
        <span style={{ color: "#fbbf24" }}>PRO COMMAND</span>
        <span style={{ background: "rgba(255, 255, 255, 0.15)", padding: "2px 6px", borderRadius: "4px", fontSize: "0.72rem", color: "#cbd5e1" }}>
          ⌘K
        </span>
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(0, 0, 0, 0.72)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "15vh 16px 20px"
      }}
      onClick={() => setIsOpen(false)}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "620px",
          background: "var(--bg-surface)",
          border: "1.5px solid rgba(245, 158, 11, 0.4)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 30px rgba(245, 158, 11, 0.2)",
          overflow: "hidden",
          animation: "fadeInUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "16px 20px",
            borderBottom: "1px solid var(--border-light)",
            gap: "12px"
          }}
        >
          <Search size={20} color="var(--accent-gold)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, property, city, or tool..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownList}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: "1.05rem",
              fontWeight: 600,
              color: "var(--text-primary)"
            }}
          />
          <button
            onClick={() => setIsOpen(false)}
            style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: "380px", overflowY: "auto", padding: "10px 8px" }}>
          {allItems.length === 0 ? (
            <div style={{ padding: "36px 20px", textAlign: "center", color: "var(--text-secondary)" }}>
              No matches found for "{search}". Try searching "Mumbai", "Darbhanga", "Visits", or "Kothi".
            </div>
          ) : (
            allItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const IconComponent = item.icon || Building;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "11px 16px",
                    borderRadius: "var(--radius-md)",
                    background: isSelected ? "var(--accent-primary-light)" : "transparent",
                    border: isSelected ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    marginBottom: "2px"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: isSelected ? "var(--accent-primary)" : "var(--bg-secondary)",
                        color: isSelected ? "#ffffff" : "var(--text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      <IconComponent size={16} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "1px" }}>
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        padding: "2px 8px",
                        borderRadius: "10px",
                        background: "var(--bg-secondary)",
                        color: "var(--text-secondary)"
                      }}
                    >
                      {item.badge}
                    </span>
                    <ArrowRight size={14} color={isSelected ? "var(--accent-primary)" : "transparent"} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div
          style={{
            padding: "10px 18px",
            background: "var(--bg-secondary)",
            borderTop: "1px solid var(--border-light)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.74rem",
            color: "var(--text-secondary)"
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span style={{ fontWeight: 800, color: "var(--accent-gold)" }}>
            ⚡ EstateHub Pro Command Engine
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
