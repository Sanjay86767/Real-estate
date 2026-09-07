import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bot,
  X,
  Send,
  Sparkles,
  MapPin,
  Calendar,
  Building,
  ShieldCheck,
  ChevronRight,
  Compass,
  ArrowRight
} from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";

export const EstateBot = () => {
  const { properties, formatPrice, scheduleVisit, addToast } = usePropertyContext();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Namaste! 🙏 I am EstateBot Pro, your AI Luxury Real Estate Concierge. I can find exclusive residences across 36 states, analyze Vastu harmony, or book private VIP inspections directly into our central database. How may I assist your portfolio today?",
      suggestions: [
        "💎 Sky Penthouses under ₹20 Cr",
        "🧭 Vastu Compliant Ishanya Homes",
        "🏰 Royal Heritage Estates in Bihar",
        "📅 Book VIP Site Visit",
      ],
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    // Add user message
    const userMsg = { id: Date.now(), sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // AI logic response
    setTimeout(() => {
      const q = query.toLowerCase();
      let botResponse = {};

      if (q.includes("book") || q.includes("visit") || q.includes("tour") || q.includes("inspection")) {
        // Book inspection flow
        const targetProp = properties[0] || { id: 1, title: "Imperial Skyline Penthouse" };
        const booked = scheduleVisit({
          propertyId: targetProp.id,
          propertyTitle: targetProp.title,
          location: targetProp.location || "Mumbai",
          date: "2026-09-15",
          time: "11:00 AM",
          agentName: "Sanjay Kumar (Founder Desk)",
          agentPhone: "+91 8809604880",
          type: "VIP Private Inspection",
        });

        botResponse = {
          id: Date.now() + 1,
          sender: "bot",
          text: `🎉 Splendid! I have reserved a VIP Private Site Inspection for "${targetProp.title}" on September 15, 2026 at 11:00 AM. It has been synced live to your Investor Dashboard and recorded in MongoDB Atlas!`,
          actionType: "booking",
          property: targetProp,
        };
      } else if (q.includes("vastu") || q.includes("ishanya") || q.includes("direction")) {
        const vastuProps = properties.filter((p) => p.vastu?.score >= 90 || p.vastu?.facing?.includes("North")).slice(0, 3);
        botResponse = {
          id: Date.now() + 1,
          sender: "bot",
          text: `🧭 Found ${vastuProps.length} residences with pristine Ishanya (North-East) Vastu alignment, rated 90%+ in cosmic energy and natural light flow:`,
          properties: vastuProps,
        };
      } else if (q.includes("bihar") || q.includes("darbhanga") || q.includes("patna") || q.includes("heritage")) {
        const heritageProps = properties.filter(
          (p) => p.city === "Darbhanga" || p.city === "Patna" || p.title?.includes("Heritage") || p.title?.includes("Raj")
        ).slice(0, 3);
        botResponse = {
          id: Date.now() + 1,
          sender: "bot",
          text: `🏰 Honoring royal architectural roots, here are signature heritage residences in Bihar curated under Founder Sanjay Kumar's advisory desk:`,
          properties: heritageProps,
        };
      } else if (q.includes("penthouse") || q.includes("sky")) {
        const penthouses = properties.filter((p) => p.type === "Penthouse" || p.title?.toLowerCase().includes("penthouse")).slice(0, 3);
        botResponse = {
          id: Date.now() + 1,
          sender: "bot",
          text: `💎 Here are our top sky penthouses offering panoramic skyline views and private elevator lobbies:`,
          properties: penthouses,
        };
      } else {
        // Generic smart filter by keyword or budget
        const matched = properties.filter((p) => {
          if (q.includes("bangalore") && p.city === "Bangalore") return true;
          if (q.includes("mumbai") && p.city === "Mumbai") return true;
          if (q.includes("delhi") && (p.city === "Delhi" || p.city === "Gurgaon")) return true;
          if (q.includes("villa") && p.type === "Villa") return true;
          if (q.includes("apartment") && p.type === "Apartment") return true;
          return p.title?.toLowerCase().includes(q) || p.city?.toLowerCase().includes(q);
        }).slice(0, 3);

        if (matched.length > 0) {
          botResponse = {
            id: Date.now() + 1,
            sender: "bot",
            text: `✨ I found ${matched.length} verified residences matching your query:`,
            properties: matched,
          };
        } else {
          botResponse = {
            id: Date.now() + 1,
            sender: "bot",
            text: `I understand you are searching for "${query}". I can help filter across our nationwide catalog of 10,000+ RERA-approved residences or connect you with Founder Sanjay Kumar directly.`,
            suggestions: [
              "💎 Sky Penthouses",
              "🧭 Vastu North-East Villas",
              "📅 Book VIP Inspection",
              "📞 Call Sanjay Kumar (+91 8809604880)",
            ],
          };
        }
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 650);
  };

  return (
    <>
      {/* Floating Trigger Badge */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 999,
            padding: "14px 20px",
            borderRadius: "50px",
            background: "linear-gradient(135deg, #1e1b4b, #312e81)",
            border: "1.5px solid rgba(212, 175, 55, 0.6)",
            color: "#fff",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            fontWeight: 800,
            fontSize: "0.92rem",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 8px #10b981",
            }}
          ></div>
          <Bot size={20} color="#d4af37" />
          <span>EstateBot AI</span>
          <span
            style={{
              background: "rgba(212, 175, 55, 0.2)",
              color: "#d4af37",
              fontSize: "0.7rem",
              padding: "2px 8px",
              borderRadius: "10px",
            }}
          >
            PRO
          </span>
        </button>
      )}

      {/* Interactive Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            width: "380px",
            maxWidth: "calc(100vw - 32px)",
            height: "580px",
            maxHeight: "calc(100vh - 48px)",
            background: "var(--bg-card, #0f172a)",
            border: "1.5px solid rgba(212, 175, 55, 0.4)",
            borderRadius: "18px",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(212, 175, 55, 0.2)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 18px",
              background: "linear-gradient(135deg, #1e1b4b, #0f172a)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #d4af37, #aa820a)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#000",
                }}
              >
                <Bot size={22} />
              </div>
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#f9fafb", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>EstateBot Pro</span>
                  <span style={{ fontSize: "0.65rem", background: "#10b981", color: "#000", padding: "1px 6px", borderRadius: "8px", fontWeight: 800 }}>LIVE</span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "#d4af37" }}>
                  AI PropTech Concierge • MongoDB Synced
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: "transparent", border: "none", color: "#9ca3af", cursor: "pointer", padding: "4px" }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "88%",
                }}
              >
                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: m.sender === "user" ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                    background: m.sender === "user" ? "linear-gradient(135deg, #4f46e5, #4338ca)" : "rgba(255,255,255,0.05)",
                    border: m.sender === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
                    color: "#f9fafb",
                    fontSize: "0.86rem",
                    lineHeight: 1.5,
                  }}
                >
                  {m.text}

                  {/* Render matched property cards if any */}
                  {m.properties && m.properties.length > 0 && (
                    <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {m.properties.map((p) => (
                        <Link
                          key={p.id}
                          to={`/property/${p.id}`}
                          onClick={() => setIsOpen(false)}
                          style={{
                            display: "flex",
                            gap: "10px",
                            padding: "8px",
                            background: "rgba(0,0,0,0.3)",
                            border: "1px solid rgba(212,175,55,0.2)",
                            borderRadius: "8px",
                            textDecoration: "none",
                            color: "inherit",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={p.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300"}
                            alt={p.title}
                            style={{ width: "50px", height: "45px", borderRadius: "6px", objectFit: "cover" }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: "0.8rem", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {p.title}
                            </div>
                            <div style={{ fontSize: "0.75rem", color: "#d4af37", fontWeight: 700 }}>
                              {formatPrice(p.price)}
                            </div>
                            <div style={{ fontSize: "0.7rem", color: "#9ca3af" }}>
                              📍 {p.city} • {p.bedrooms} BHK
                            </div>
                          </div>
                          <ChevronRight size={14} color="#d4af37" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Render suggestions if any */}
                  {m.suggestions && (
                    <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {m.suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(s)}
                          style={{
                            background: "rgba(212, 175, 55, 0.1)",
                            border: "1px solid rgba(212, 175, 55, 0.3)",
                            color: "#d4af37",
                            padding: "4px 10px",
                            borderRadius: "14px",
                            fontSize: "0.72rem",
                            cursor: "pointer",
                            fontWeight: 600,
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              padding: "12px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(0,0,0,0.2)",
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              type="text"
              placeholder="Ask anything or book a visit..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#fff",
                fontSize: "0.85rem",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #d4af37, #aa820a)",
                border: "none",
                color: "#000",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EstateBot;
