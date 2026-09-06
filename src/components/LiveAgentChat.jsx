import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Phone, CheckCheck, Sparkles } from "lucide-react";
import { sfx } from "../utils/effects";

export const LiveAgentChat = ({ agent, property }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatLog, setChatLog] = useState([
    {
      id: 1,
      sender: "agent",
      text: `Hello! I'm ${agent.name}, the listing advisor for "${property.title}". How can I help you today?`,
      time: "Just now"
    }
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatLog, isOpen]);

  const handleSend = (text) => {
    const msg = (text || input).trim();
    if (!msg) return;

    sfx.playPop();
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: msg,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setChatLog((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Realistic Agent Response simulation
    setTimeout(() => {
      let reply = `Thank you for asking! For ${property.title}, I can arrange an exclusive inspection or share full legal paperwork.`;
      const q = msg.toLowerCase();

      if (q.includes("discount") || q.includes("negotiable") || q.includes("offer") || q.includes("price")) {
        reply = `The owner is offering a slight 2% to 3% incentive for serious buyers who complete registration before next month. Would you like to schedule an inspection?`;
      } else if (q.includes("rera") || q.includes("legal") || q.includes("title") || q.includes("registry")) {
        reply = `The property has a 100% clear freehold title with GMADA / RERA clearance. Our legal counsel has reviewed all 30-year deed documents.`;
      } else if (q.includes("visit") || q.includes("inspection") || q.includes("see")) {
        reply = `I can personally host you for a private walkthrough today or this weekend! What time works best for you?`;
      } else if (q.includes("brochure") || q.includes("pdf") || q.includes("plan")) {
        reply = `I have logged your request. The architectural CAD layout and high-res brochure will be dispatched to your phone/email!`;
      }

      setChatLog((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "agent",
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
      setIsTyping(false);
      sfx.playPop();
    }, 1000);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-outline"
          style={{ width: "100%", gap: "8px", padding: "12px" }}
        >
          <MessageSquare size={16} />
          <span>Live Chat with {agent.name.split(" ")[0]} (Instant Reply)</span>
        </button>
      ) : (
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: "var(--shadow-md)"
          }}
          className="animate-fade-in"
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, var(--accent-primary) 0%, #1e40af 100%)",
              color: "#ffffff",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={agent.image}
                alt={agent.name}
                style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", border: "1.5px solid #ffffff" }}
              />
              <div>
                <h4 style={{ margin: 0, fontSize: "0.95rem", color: "#ffffff" }}>{agent.name}</h4>
                <span style={{ fontSize: "0.72rem", color: "#86efac", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#86efac" }} />
                  Online • Active Listing Advisor
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ color: "#ffffff", cursor: "pointer", padding: "4px" }}
              aria-label="Close live chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Question Chips */}
          <div style={{ display: "flex", gap: "6px", padding: "8px 12px", background: "var(--bg-secondary)", overflowX: "auto" }}>
            {["Is price negotiable?", "Is title RERA clear?", "Can I visit today?", "Send PDF brochure"].map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                style={{
                  fontSize: "0.72rem",
                  padding: "3px 10px",
                  borderRadius: "var(--radius-full)",
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-light)",
                  whiteSpace: "nowrap",
                  color: "var(--accent-primary)",
                  fontWeight: 600
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div
            style={{
              height: "220px",
              overflowY: "auto",
              padding: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              background: "var(--bg-primary)"
            }}
          >
            {chatLog.map((c) => (
              <div
                key={c.id}
                style={{
                  alignSelf: c.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%"
                }}
              >
                <div
                  style={{
                    padding: "8px 12px",
                    borderRadius: "12px",
                    fontSize: "0.85rem",
                    lineHeight: "1.4",
                    background: c.sender === "user" ? "var(--accent-primary)" : "var(--bg-surface)",
                    color: c.sender === "user" ? "#ffffff" : "var(--text-primary)",
                    border: c.sender === "user" ? "none" : "1px solid var(--border-light)",
                    boxShadow: "var(--shadow-xs)"
                  }}
                >
                  {c.text}
                </div>
                <div
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--text-muted)",
                    marginTop: "2px",
                    textAlign: c.sender === "user" ? "right" : "left",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: c.sender === "user" ? "flex-end" : "flex-start",
                    gap: "3px"
                  }}
                >
                  <span>{c.time}</span>
                  {c.sender === "user" && <CheckCheck size={12} color="var(--accent-primary)" />}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ alignSelf: "flex-start", fontSize: "0.75rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                {agent.name.split(" ")[0]} is typing...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{ padding: "10px", borderTop: "1px solid var(--border-light)", display: "flex", gap: "8px" }}
          >
            <input
              type="text"
              placeholder={`Ask ${agent.name.split(" ")[0]} anything...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: "8px 12px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-light)",
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                fontSize: "0.85rem",
                outline: "none"
              }}
            />
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              style={{ padding: "0 12px" }}
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LiveAgentChat;
