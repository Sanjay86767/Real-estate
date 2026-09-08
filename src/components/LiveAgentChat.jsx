import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Phone,
  CheckCheck,
  Sparkles,
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Maximize2,
  ShieldCheck,
  Lock
} from "lucide-react";
import { sfx } from "../utils/effects";

export const LiveAgentChat = ({ agent, property }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [chatLog, setChatLog] = useState([
    {
      id: 1,
      sender: "agent",
      text: `Hello! I'm ${agent.name}, the listing advisor for "${property.title}". How can I help you today?`,
      time: "Just now"
    }
  ]);

  // Video call duration counter
  useEffect(() => {
    let interval;
    if (isVideoCallActive) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [isVideoCallActive]);

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

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                type="button"
                onClick={() => {
                  sfx.playPop();
                  setIsVideoCallActive(true);
                }}
                style={{
                  background: "rgba(16, 185, 129, 0.25)",
                  border: "1px solid #10b981",
                  color: "#ffffff",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  padding: "5px 10px",
                  borderRadius: "20px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "pointer"
                }}
              >
                <Video size={13} color="#86efac" />
                <span>Live Video HD</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                style={{ color: "#ffffff", cursor: "pointer", padding: "4px", background: "none", border: "none" }}
                aria-label="Close live chat"
              >
                <X size={18} />
              </button>
            </div>
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

      {/* 1-on-1 Encrypted Video Walkthrough Consultation Modal */}
      {isVideoCallActive && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            background: "rgba(0, 0, 0, 0.92)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px"
          }}
          onClick={() => setIsVideoCallActive(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "880px",
              height: "85vh",
              maxHeight: "620px",
              background: "#080d16",
              borderRadius: "24px",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.9), 0 0 50px rgba(245, 158, 11, 0.2)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              color: "#ffffff"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Call Header */}
            <div
              style={{
                padding: "14px 20px",
                background: "rgba(15, 23, 42, 0.9)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#ef4444",
                    boxShadow: "0 0 10px #ef4444",
                    animation: "pulse-dot 1.2s infinite"
                  }}
                />
                <div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800 }}>
                    Live Walkthrough: {property.title}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
                    Connected to Advisor {agent.name} • 256-Bit Encrypted WebRTC
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontFamily: "monospace",
                    fontSize: "0.85rem",
                    color: "#38bdf8"
                  }}
                >
                  {String(Math.floor(callDuration / 60)).padStart(2, "0")}:{String(callDuration % 60).padStart(2, "0")}
                </div>

                <button
                  onClick={() => setIsVideoCallActive(false)}
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "none",
                    borderRadius: "8px",
                    color: "#ffffff",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer"
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Video Stage with PIP Overlay */}
            <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#050811" }}>
              <img
                src={property.images?.[0] || property.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"}
                alt={property.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />

              {/* Property Details Ribbon */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  background: "rgba(15, 23, 42, 0.85)",
                  backdropFilter: "blur(10px)",
                  padding: "8px 14px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  fontSize: "0.8rem"
                }}
              >
                <div style={{ color: "#fbbf24", fontWeight: 800 }}>{property.location || property.city}</div>
                <div style={{ color: "#ffffff", fontWeight: 700 }}>₹{(property.price / 10000000).toFixed(2)} Cr • {property.bedrooms || 3} BHK</div>
              </div>

              {/* Agent PIP Video Camera Stream */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
                  width: "160px",
                  height: "120px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  border: "2px solid #10b981",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
                  background: "#0f172a"
                }}
              >
                <img
                  src={agent.image}
                  alt={agent.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "4px",
                    left: "6px",
                    right: "6px",
                    background: "rgba(0,0,0,0.7)",
                    borderRadius: "4px",
                    padding: "2px 4px",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    textAlign: "center",
                    color: "#86efac"
                  }}
                >
                  {agent.name.split(" ")[0]} (Speaking)
                </div>
              </div>
            </div>

            {/* Call Controls Footer */}
            <div
              style={{
                padding: "16px 24px",
                background: "rgba(15, 23, 42, 0.95)",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px"
              }}
            >
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "none",
                  background: isMuted ? "#ef4444" : "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer"
                }}
                title={isMuted ? "Unmute Mic" : "Mute Mic"}
              >
                {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
              </button>

              <button
                type="button"
                onClick={() => setIsVideoOn(!isVideoOn)}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "none",
                  background: !isVideoOn ? "#ef4444" : "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer"
                }}
                title={isVideoOn ? "Turn Camera Off" : "Turn Camera On"}
              >
                {isVideoOn ? <Video size={18} /> : <VideoOff size={18} />}
              </button>

              <button
                type="button"
                onClick={() => {
                  alert(`Unit reserved provisionally during live call with ${agent.name}! Token lock opened.`);
                  setIsVideoCallActive(false);
                }}
                style={{
                  padding: "10px 20px",
                  borderRadius: "24px",
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  border: "none",
                  color: "#ffffff",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <Lock size={15} />
                <span>Reserve Unit Now</span>
              </button>

              <button
                type="button"
                onClick={() => setIsVideoCallActive(false)}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "none",
                  background: "#ef4444",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer"
                }}
                title="End Video Walkthrough Call"
              >
                <PhoneOff size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveAgentChat;
