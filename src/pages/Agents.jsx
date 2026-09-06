import React, { useState, useMemo } from "react";
import { usePropertyContext } from "../context/PropertyContext";
import AgentCard from "../components/AgentCard";
import { Users, Search, MapPin, X, Send, CheckCircle2, Award } from "lucide-react";

export const Agents = () => {
  const { agents, addToast } = usePropertyContext();

  const [agentSearch, setAgentSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [activeModalAgent, setActiveModalAgent] = useState(null);

  // Modal Inquiry Form
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientMessage, setClientMessage] = useState("");

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const matchSearch =
        agent.name.toLowerCase().includes(agentSearch.toLowerCase()) ||
        agent.role.toLowerCase().includes(agentSearch.toLowerCase()) ||
        agent.specialties.some((s) => s.toLowerCase().includes(agentSearch.toLowerCase()));

      const matchCity = selectedCity === "" || agent.city.toLowerCase() === selectedCity.toLowerCase();

      return matchSearch && matchCity;
    });
  }, [agents, agentSearch, selectedCity]);

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      addToast("Please provide your name and phone number", "warning");
      return;
    }
    addToast(`Inquiry sent to ${activeModalAgent.name}! They will call you at ${clientPhone}.`, "success");
    setActiveModalAgent(null);
    setClientName("");
    setClientPhone("");
    setClientEmail("");
    setClientMessage("");
  };

  return (
    <div className="agents-page" style={{ padding: "40px 0 80px", minHeight: "80vh" }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 40px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--accent-primary)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
            <Users size={18} />
            <span>Expert Team</span>
          </div>
          <h1 style={{ fontSize: "2.5rem", marginTop: "6px" }}>Our Real Estate Advisors</h1>
          <p style={{ marginTop: "8px" }}>
            Connect with seasoned industry professionals with deep hyperlocal knowledge, verified track records, and zero-pressure consultation.
          </p>
        </div>

        {/* Filter / Search Bar */}
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            padding: "20px 24px",
            marginBottom: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            boxShadow: "var(--shadow-sm)"
          }}
        >
          {/* Search Input */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: "260px" }}>
            <Search size={18} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search agent by name, specialty, or villa consultant..."
              value={agentSearch}
              onChange={(e) => setAgentSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 0",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--text-primary)",
                fontSize: "0.95rem"
              }}
            />
          </div>

          {/* City Filter Buttons */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["All", "Chandigarh", "Mohali", "Delhi NCR", "Amritsar", "Bangalore"].map((city) => {
              const cityKey = city === "All" ? "" : city === "Delhi NCR" ? "Delhi" : city;
              const isActive = selectedCity === cityKey;
              return (
                <button
                  key={city}
                  onClick={() => setSelectedCity(cityKey)}
                  className={`chip-btn ${isActive ? "active" : ""}`}
                  style={{ padding: "6px 14px" }}
                >
                  {city}
                </button>
              );
            })}
          </div>
        </div>

        {/* Agents Grid */}
        {filteredAgents.length > 0 ? (
          <div className="agents-grid">
            {filteredAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onContactClick={(ag) => setActiveModalAgent(ag)}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-secondary)" }}>
            <h3>No agents match your search criteria.</h3>
            <button
              onClick={() => { setAgentSearch(""); setSelectedCity(""); }}
              className="btn btn-primary btn-sm"
              style={{ marginTop: "16px" }}
            >
              Reset Search
            </button>
          </div>
        )}

        {/* Advisor Partner Banner */}
        <div
          style={{
            marginTop: "80px",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            padding: "48px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px"
          }}
        >
          <div style={{ maxWidth: "600px" }}>
            <span style={{ color: "var(--accent-gold)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}>
              Career Opportunities
            </span>
            <h3 style={{ fontSize: "1.8rem", margin: "6px 0 10px" }}>Are You An Experienced Real Estate Consultant?</h3>
            <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
              Join EstateHub's verified advisor network. Enjoy premier client leads, digital marketing support, and the highest commission payouts in the region.
            </p>
          </div>
          <button
            onClick={() => addToast("Advisor onboarding portal opens in Q4 2026. Contact careers@estatehub.com", "info")}
            className="btn btn-gold btn-lg"
          >
            Apply To Join Network
          </button>
        </div>
      </div>

      {/* Inquiry Modal */}
      {activeModalAgent && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
          onClick={() => setActiveModalAgent(null)}
        >
          <div
            style={{
              background: "var(--bg-surface)",
              borderRadius: "var(--radius-lg)",
              maxWidth: "500px",
              width: "100%",
              padding: "32px",
              boxShadow: "var(--shadow-lg)",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalAgent(null)}
              className="btn-icon"
              style={{ position: "absolute", top: "18px", right: "18px", width: "34px", height: "34px" }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
              <img
                src={activeModalAgent.image}
                alt={activeModalAgent.name}
                style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" }}
              />
              <div>
                <h3 style={{ fontSize: "1.2rem", margin: 0 }}>Connect with {activeModalAgent.name}</h3>
                <span style={{ fontSize: "0.85rem", color: "var(--accent-primary)", fontWeight: 600 }}>
                  {activeModalAgent.role} ({activeModalAgent.city})
                </span>
              </div>
            </div>

            <form onSubmit={handleModalSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <input
                type="text"
                placeholder="Your Full Name *"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-light)",
                  background: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem",
                  outline: "none"
                }}
              />

              <input
                type="tel"
                placeholder="Phone Number / WhatsApp *"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-light)",
                  background: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem",
                  outline: "none"
                }}
              />

              <input
                type="email"
                placeholder="Email Address (optional)"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-light)",
                  background: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem",
                  outline: "none"
                }}
              />

              <textarea
                rows="3"
                placeholder="I am interested in properties around..."
                value={clientMessage}
                onChange={(e) => setClientMessage(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-light)",
                  background: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem",
                  outline: "none",
                  resize: "vertical"
                }}
              />

              <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "6px" }}>
                <Send size={16} />
                <span>Submit Inquiry</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agents;
