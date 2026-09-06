import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import {
  Bot,
  X,
  Send,
  Sparkles,
  ExternalLink,
  RotateCcw,
  MessageCircle
} from "lucide-react";

export const AiChatbot = () => {
  const { properties, agents, formatPrice } = usePropertyContext();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! I'm EstateBot, your intelligent real estate assistant. Looking for a luxury villa, calculating an EMI, or finding an advisor?",
      chips: [
        "Villas in Mohali",
        "Apartments under ₹80L",
        "EMI for ₹1 Crore",
        "Top Agents"
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

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
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse = generateAiResponse(query);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  const generateAiResponse = (userQuery) => {
    const q = userQuery.toLowerCase();

    // 1. EMI queries
    if (q.includes("emi") || q.includes("loan") || q.includes("interest")) {
      let amount = 10000000; // default 1 Cr
      if (q.includes("50 lakh") || q.includes("50l")) amount = 5000000;
      if (q.includes("75 lakh") || q.includes("75l")) amount = 7500000;
      if (q.includes("1 crore") || q.includes("1cr") || q.includes("1 cr")) amount = 10000000;
      if (q.includes("2 crore") || q.includes("2cr")) amount = 20000000;

      const r = 8.5 / 12 / 100;
      const n = 20 * 12;
      const emi = Math.round((amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));

      return {
        id: Date.now() + 1,
        sender: "bot",
        text: `At a current benchmark bank rate of 8.5% over 20 years, for a loan of ₹${(amount / 100000).toFixed(0)} Lakh, your estimated monthly EMI is approximately ₹${emi.toLocaleString("en-IN")}/month. You can test custom loan amounts on any property page!`,
        chips: ["Show properties in Chandigarh", "Properties in Mohali"]
      };
    }

    // 2. Agents query
    if (q.includes("agent") || q.includes("broker") || q.includes("advisor") || q.includes("consultant")) {
      return {
        id: Date.now() + 1,
        sender: "bot",
        text: `We have ${agents.length} certified real estate advisors including John Sharma (Luxury Villas), Priya Malhotra (High-Rise), and Vikram Sengupta (Commercial).`,
        recommendations: agents.slice(0, 2).map((a) => ({
          type: "agent",
          id: a.id,
          title: a.name,
          subtitle: `${a.role} • ${a.city}`,
          image: a.image,
          link: "/agents"
        })),
        chips: ["Contact an Advisor", "View All Properties"]
      };
    }

    // 3. Specific Property Type or City filter query
    let matchedProps = properties.filter((p) => {
      const matchCity =
        (q.includes("mohali") && p.city.toLowerCase() === "mohali") ||
        (q.includes("chandigarh") && p.city.toLowerCase() === "chandigarh") ||
        (q.includes("delhi") && p.city.toLowerCase() === "delhi") ||
        (q.includes("amritsar") && p.city.toLowerCase() === "amritsar") ||
        (q.includes("bangalore") && p.city.toLowerCase() === "bangalore");

      const matchType =
        (q.includes("villa") && p.type.toLowerCase() === "villa") ||
        (q.includes("apartment") && p.type.toLowerCase() === "apartment") ||
        (q.includes("penthouse") && p.type.toLowerCase() === "penthouse") ||
        (q.includes("plot") && p.type.toLowerCase() === "plot") ||
        (q.includes("house") && p.type.toLowerCase() === "house");

      if (q.includes("under 80") || q.includes("80l") || q.includes("budget")) {
        return p.price <= 8000000;
      }

      return matchCity || matchType;
    });

    if (matchedProps.length === 0) {
      matchedProps = properties.slice(0, 2);
    }

    return {
      id: Date.now() + 1,
      sender: "bot",
      text: `Found ${matchedProps.length} verified properties that match your inquiry:`,
      recommendations: matchedProps.slice(0, 3).map((p) => ({
        type: "property",
        id: p.id,
        title: p.title,
        subtitle: `${p.location} • ${formatPrice(p.price)}`,
        image: p.images[0],
        link: `/property/${p.id}`
      })),
      chips: ["Check Loan EMI", "Compare Properties", "Contact Team"]
    };
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 1,
        sender: "bot",
        text: "Chat refreshed! How can I assist with your property search today?",
        chips: [
          "Villas in Mohali",
          "Apartments under ₹80L",
          "EMI for ₹1 Crore",
          "Top Agents"
        ]
      }
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ai-bot-launcher"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 990,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%)",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(37, 99, 235, 0.4)",
          border: "2px solid rgba(255, 255, 255, 0.3)",
          cursor: "pointer",
          transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}
        aria-label="Open AI Assistant"
        title="Chat with EstateBot AI"
      >
        {isOpen ? <X size={24} /> : <Bot size={26} />}
        {!isOpen && (
          <span
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "14px",
              height: "14px",
              background: "var(--accent-emerald)",
              borderRadius: "50%",
              border: "2px solid #ffffff"
            }}
          />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "92px",
            right: "24px",
            zIndex: 995,
            width: "360px",
            maxWidth: "calc(100vw - 40px)",
            height: "520px",
            background: "var(--bg-surface-elevated)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
          }}
          className="animate-fade-in"
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)",
              color: "#ffffff",
              padding: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Bot size={20} color="#ffffff" />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: "0.95rem", color: "#ffffff" }}>EstateBot AI</h4>
                <span style={{ fontSize: "0.72rem", color: "#86efac", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#86efac" }} />
                  Online • Smart Advisor
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "6px" }}>
              <button
                onClick={handleResetChat}
                style={{ color: "rgba(255,255,255,0.7)", padding: "4px" }}
                title="Restart conversation"
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{ color: "rgba(255,255,255,0.7)", padding: "4px" }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div
            style={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              background: "var(--bg-primary)"
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%"
                }}
              >
                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.88rem",
                    lineHeight: "1.5",
                    background: msg.sender === "user" ? "var(--accent-primary)" : "var(--bg-surface)",
                    color: msg.sender === "user" ? "#ffffff" : "var(--text-primary)",
                    border: msg.sender === "user" ? "none" : "1px solid var(--border-light)",
                    boxShadow: "var(--shadow-xs)"
                  }}
                >
                  {msg.text}

                  {/* Recommendations Cards inside Chat */}
                  {msg.recommendations && (
                    <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {msg.recommendations.map((rec, i) => (
                        <Link
                          key={i}
                          to={rec.link}
                          onClick={() => setIsOpen(false)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "6px 8px",
                            background: "var(--bg-secondary)",
                            borderRadius: "var(--radius-sm)",
                            border: "1px solid var(--border-light)",
                            color: "inherit"
                          }}
                        >
                          <img
                            src={rec.image}
                            alt={rec.title}
                            style={{ width: "42px", height: "36px", borderRadius: "4px", objectFit: "cover" }}
                          />
                          <div style={{ flex: 1, overflow: "hidden" }}>
                            <strong style={{ fontSize: "0.8rem", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {rec.title}
                            </strong>
                            <span style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 600 }}>
                              {rec.subtitle}
                            </span>
                          </div>
                          <ExternalLink size={13} color="var(--text-muted)" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Action Chips */}
                {msg.chips && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
                    {msg.chips.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(chip)}
                        style={{
                          fontSize: "0.75rem",
                          padding: "4px 10px",
                          borderRadius: "var(--radius-full)",
                          background: "var(--bg-surface)",
                          border: "1px solid var(--border-light)",
                          color: "var(--accent-primary)",
                          fontWeight: 600
                        }}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div
                style={{
                  alignSelf: "flex-start",
                  padding: "8px 14px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-light)",
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  fontStyle: "italic"
                }}
              >
                EstateBot is searching listings...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              padding: "12px",
              background: "var(--bg-surface)",
              borderTop: "1px solid var(--border-light)",
              display: "flex",
              gap: "8px"
            }}
          >
            <input
              type="text"
              placeholder="Ask about properties, EMI, agents..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-light)",
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                fontSize: "0.88rem",
                outline: "none"
              }}
            />
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              style={{ padding: "0 14px" }}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AiChatbot;
