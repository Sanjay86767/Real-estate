import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Gavel,
  Flame,
  Clock,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  IndianRupee,
  BellRing,
  Building2
} from "lucide-react";

// Mock Active Live Auctions for India's Prime Real Estate
const INITIAL_AUCTIONS = [
  {
    id: "auc-1",
    title: "The Imperial Sky Penthouse — 54th Floor",
    location: "Worli Sea Face, South Mumbai",
    developer: "Oberoi Realty & Sovereign Estates",
    reservePrice: 185000000, // ₹18.50 Cr
    currentBid: 194500000, // ₹19.45 Cr
    minIncrement: 500000, // ₹5 Lacs
    bidsCount: 28,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
    reraId: "P51900001889",
    specs: "5 BHK • 6,400 Sq.Ft • Private Infinity Pool • Arabian Sea Panoramic View",
    endTime: Date.now() + 1000 * 60 * 42 + 1000 * 18, // 42m 18s from now
    hotBadge: "🔥 HIGH DEMAND AUCTION",
    bidsHistory: [
      { name: "Rajiv S. (NRI London)", city: "London / Mumbai", amount: 194500000, time: "42s ago" },
      { name: "Anand M. (Tech Founder)", city: "Bengaluru", amount: 194000000, time: "2m ago" },
      { name: "Kunal S. (Private Equity)", city: "South Mumbai", amount: 193000000, time: "5m ago" },
      { name: "Deepak B. (Industrialist)", city: "Ahmedabad", amount: 191500000, time: "9m ago" }
    ]
  },
  {
    id: "auc-2",
    title: "The Royal Haveli Estate & Mango Orchards",
    location: "Darbhanga Heritage Belt, Bihar",
    developer: "Curated by Founder Sanjay Kumar Advisory",
    reservePrice: 42000000, // ₹4.20 Cr
    currentBid: 48500000, // ₹4.85 Cr
    minIncrement: 250000, // ₹2.5 Lacs
    bidsCount: 19,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80",
    reraId: "BRERAP00921-2024",
    specs: "8 Suites • 2.5 Acres Private Land • Teakwood Architecture • Helipad Approved",
    endTime: Date.now() + 1000 * 60 * 85 + 1000 * 30, // 1h 25m
    hotBadge: "👑 ROYAL HERITAGE EXCLUSIVE",
    bidsHistory: [
      { name: "Dr. Vikramaditya J.", city: "Patna", amount: 48500000, time: "1m ago" },
      { name: "Suresh P. (Sugar Mills Corp)", city: "Muzaffarpur", amount: 48000000, time: "6m ago" },
      { name: "Sunil N. (Delhi NRI)", city: "New Delhi", amount: 47500000, time: "14m ago" }
    ]
  },
  {
    id: "auc-3",
    title: "Signature Oceanfront Villa Assagao",
    location: "Assagao-Vagator Coast, North Goa",
    developer: "Vianaar Luxury Homes & Escrow",
    reservePrice: 120000000, // ₹12.00 Cr
    currentBid: 131000000, // ₹13.10 Cr
    minIncrement: 500000, // ₹5 Lacs
    bidsCount: 34,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
    reraId: "GOARERA0421098",
    specs: "4 BHK Luxury Villa • 4,800 Sq.Ft • Private Lap Pool • Fully Designer Furnished",
    endTime: Date.now() + 1000 * 60 * 19 + 1000 * 45, // 19m 45s
    hotBadge: "⚡ CLOSING SOON",
    bidsHistory: [
      { name: "Tanya C. (Hospitality Group)", city: "Delhi NCR", amount: 131000000, time: "18s ago" },
      { name: "Rohit V. (Venture Capital)", city: "Bengaluru", amount: 130000000, time: "3m ago" },
      { name: "Aditya G. (Film Producer)", city: "Mumbai", amount: 128500000, time: "8m ago" }
    ]
  }
];

const formatCrore = (num) => {
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)} Cr`;
  }
  if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)} Lac`;
  }
  return `₹${num.toLocaleString("en-IN")}`;
};

export const LiveAuctionHub = () => {
  const [auctions, setAuctions] = useState(INITIAL_AUCTIONS);
  const [activeAuctionIdx, setActiveAuctionIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});
  const [bidderName, setBidderName] = useState("");
  const [userPlacedBid, setUserPlacedBid] = useState(false);
  const [bidNotification, setBidNotification] = useState(null);

  const currentAuction = auctions[activeAuctionIdx];

  // Timer Tick
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const updatedTimes = {};
      auctions.forEach((auc) => {
        const diff = Math.max(0, auc.endTime - now);
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        updatedTimes[auc.id] = { hours, mins, secs, totalMs: diff };
      });
      setTimeLeft(updatedTimes);
    }, 1000);

    return () => clearInterval(timer);
  }, [auctions]);

  // Real-time simulated competitive bids arriving periodically
  useEffect(() => {
    const randomCities = ["Mumbai", "Bengaluru", "Dubai NRI", "New Delhi", "Hyderabad", "Singapore NRI", "Pune"];
    const randomNames = ["Vikram C.", "Priya N.", "Harshwardhan M.", "Sameer K.", "Meera R.", "Anish G."];

    const bidStreamInterval = setInterval(() => {
      // Pick an auction to receive an automated bid
      const targetAucIdx = Math.floor(Math.random() * auctions.length);
      const inc = targetAucIdx === 1 ? 250000 : 500000;
      const bidder = randomNames[Math.floor(Math.random() * randomNames.length)];
      const city = randomCities[Math.floor(Math.random() * randomCities.length)];

      setAuctions((prev) =>
        prev.map((auc, idx) => {
          if (idx !== targetAucIdx) return auc;
          const newBid = auc.currentBid + inc;
          const newHistory = [
            { name: `${bidder}`, city: `${city}`, amount: newBid, time: "Just now" },
            ...auc.bidsHistory.slice(0, 5)
          ];
          return {
            ...auc,
            currentBid: newBid,
            bidsCount: auc.bidsCount + 1,
            bidsHistory: newHistory
          };
        })
      );

      // Trigger temporary live flash banner
      setBidNotification(`⚡ Live Bid: ${bidder} from ${city} raised bid on ${auctions[targetAucIdx].title.slice(0, 24)}...`);
      setTimeout(() => setBidNotification(null), 5500);
    }, 14000);

    return () => clearInterval(bidStreamInterval);
  }, [auctions]);

  const handlePlaceBid = (incrementAmount) => {
    const name = bidderName.trim() || "You (Verified Buyer)";
    const newBid = currentAuction.currentBid + incrementAmount;

    setAuctions((prev) =>
      prev.map((auc, idx) => {
        if (idx !== activeAuctionIdx) return auc;
        return {
          ...auc,
          currentBid: newBid,
          bidsCount: auc.bidsCount + 1,
          bidsHistory: [
            { name: `${name} (High Bidder)`, city: "Your Location", amount: newBid, time: "Just now" },
            ...auc.bidsHistory.slice(0, 5)
          ]
        };
      })
    );

    setUserPlacedBid(true);
    setBidNotification(`🎉 Congratulations! You are now the Highest Bidder at ${formatCrore(newBid)}!`);
    setTimeout(() => setBidNotification(null), 7000);
  };

  const activeTime = timeLeft[currentAuction.id] || { hours: 0, mins: 0, secs: 0 };

  return (
    <section
      className="live-auction-hub"
      style={{
        position: "relative",
        background: "linear-gradient(180deg, #070e1a 0%, #0c1626 50%, #070e1a 100%)",
        padding: "80px 20px",
        color: "#ffffff",
        overflow: "hidden"
      }}
    >
      {/* Background Cyber Grid Accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "radial-gradient(circle at 50% 20%, rgba(245, 166, 35, 0.08) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.06) 0%, transparent 50%)",
          pointerEvents: "none"
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        {/* Top Header Badge */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "30px",
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              color: "#f87171",
              fontSize: "0.82rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "14px"
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#ef4444",
                boxShadow: "0 0 10px #ef4444",
                animation: "pulse-dot 1.2s infinite"
              }}
            />
            <span>India's 1st Real-Time Digital Property Auction Floor</span>
            <Gavel size={15} />
          </div>

          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 900,
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
              marginBottom: "14px",
              background: "linear-gradient(135deg, #ffffff 30%, #fde047 80%, #f59e0b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Live High-Stakes Property Bidding
          </h2>
          <p style={{ color: "#94a3b8", maxWidth: "700px", margin: "0 auto", fontSize: "1.05rem", lineHeight: 1.6 }}>
            Exclusive distress assets, penthouses & royal estates with 100% Title Green Shield & Bank Escrow.
            Bid in real-time with verified High-Net-Worth buyers nationwide.
          </p>

          {/* Dynamic Bid Alert Flash Notification */}
          {bidNotification && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "16px",
                padding: "8px 20px",
                borderRadius: "20px",
                background: "rgba(16, 185, 129, 0.2)",
                border: "1px solid rgba(16, 185, 129, 0.5)",
                color: "#6ee7b7",
                fontSize: "0.88rem",
                fontWeight: 700,
                boxShadow: "0 4px 20px rgba(16, 185, 129, 0.25)",
                animation: "fadeIn 0.3s ease"
              }}
            >
              <Sparkles size={16} />
              <span>{bidNotification}</span>
            </div>
          )}
        </div>

        {/* Tab Selection for Active Auctions */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "32px"
          }}
        >
          {auctions.map((auc, idx) => {
            const isActive = idx === activeAuctionIdx;
            return (
              <button
                key={auc.id}
                onClick={() => {
                  setActiveAuctionIdx(idx);
                  setUserPlacedBid(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 22px",
                  borderRadius: "14px",
                  border: isActive ? "2px solid #f59e0b" : "1px solid rgba(255, 255, 255, 0.1)",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(15, 23, 42, 0.9) 100%)"
                    : "rgba(15, 23, 42, 0.6)",
                  color: isActive ? "#ffffff" : "#94a3b8",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: isActive ? "0 8px 24px rgba(245, 158, 11, 0.25)" : "none"
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: isActive ? "#10b981" : "#64748b"
                  }}
                />
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "0.86rem", fontWeight: 800 }}>{auc.title.slice(0, 26)}...</div>
                  <div style={{ fontSize: "0.72rem", color: isActive ? "#fbbf24" : "#64748b" }}>
                    Current Bid: {formatCrore(auc.currentBid)} • {auc.bidsCount} Bids
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Live Bidding Showcase Card */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(245, 158, 11, 0.35)",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(245, 158, 11, 0.12)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))"
          }}
        >
          {/* Left Column: Property Visuals & Details */}
          <div style={{ position: "relative", minHeight: "380px" }}>
            <img
              src={currentAuction.image}
              alt={currentAuction.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(7, 14, 26, 0.2) 0%, rgba(7, 14, 26, 0.95) 100%)"
              }}
            />

            {/* Hot Badge */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                background: "rgba(239, 68, 68, 0.9)",
                backdropFilter: "blur(8px)",
                color: "#ffffff",
                fontSize: "0.74rem",
                fontWeight: 800,
                padding: "6px 14px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 4px 15px rgba(239, 68, 68, 0.4)"
              }}
            >
              <Flame size={14} />
              <span>{currentAuction.hotBadge}</span>
            </div>

            {/* RERA and Verification Badge */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(16, 185, 129, 0.9)",
                color: "#ffffff",
                fontSize: "0.72rem",
                fontWeight: 800,
                padding: "6px 12px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              <ShieldCheck size={14} />
              <span>RERA: {currentAuction.reraId}</span>
            </div>

            {/* Overlay Property Info */}
            <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px" }}>
              <div style={{ color: "#fbbf24", fontSize: "0.82rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "6px" }}>
                {currentAuction.developer}
              </div>
              <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#ffffff", marginBottom: "8px", lineHeight: 1.3 }}>
                {currentAuction.title}
              </h3>
              <p style={{ color: "#cbd5e1", fontSize: "0.88rem", marginBottom: "12px" }}>
                📍 {currentAuction.location}
              </p>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(10px)",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  fontSize: "0.8rem",
                  color: "#e2e8f0"
                }}
              >
                ✨ {currentAuction.specs}
              </div>
            </div>
          </div>

          {/* Right Column: Live Bidding Engine & Terminal */}
          <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              {/* Countdown Bar */}
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.12)",
                  border: "1px solid rgba(239, 68, 68, 0.35)",
                  borderRadius: "16px",
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "24px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#f87171" }}>
                  <Clock size={20} className="animate-spin" />
                  <div>
                    <div style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase" }}>Auction Ends In</div>
                    <div style={{ fontSize: "0.75rem", color: "#fca5a5" }}>Real-time timer extension enabled</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "6px", fontFamily: "monospace" }}>
                  <div style={{ background: "rgba(0,0,0,0.5)", padding: "4px 8px", borderRadius: "8px", textAlign: "center" }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "#ffffff" }}>
                      {String(activeTime.hours).padStart(2, "0")}
                    </span>
                    <div style={{ fontSize: "0.6rem", color: "#94a3b8" }}>HRS</div>
                  </div>
                  <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "#f87171" }}>:</span>
                  <div style={{ background: "rgba(0,0,0,0.5)", padding: "4px 8px", borderRadius: "8px", textAlign: "center" }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "#ffffff" }}>
                      {String(activeTime.mins).padStart(2, "0")}
                    </span>
                    <div style={{ fontSize: "0.6rem", color: "#94a3b8" }}>MIN</div>
                  </div>
                  <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "#f87171" }}>:</span>
                  <div style={{ background: "rgba(0,0,0,0.5)", padding: "4px 8px", borderRadius: "8px", textAlign: "center" }}>
                    <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "#f87171" }}>
                      {String(activeTime.secs).padStart(2, "0")}
                    </span>
                    <div style={{ fontSize: "0.6rem", color: "#94a3b8" }}>SEC</div>
                  </div>
                </div>
              </div>

              {/* Price & Bid Metrics */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "24px"
                }}
              >
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    padding: "16px",
                    borderRadius: "14px",
                    border: "1px solid rgba(255, 255, 255, 0.08)"
                  }}
                >
                  <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>
                    Reserve Price
                  </div>
                  <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#cbd5e1", marginTop: "4px" }}>
                    {formatCrore(currentAuction.reservePrice)}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#10b981", marginTop: "2px" }}>
                    Verified Minimum Valuation
                  </div>
                </div>

                <div
                  style={{
                    background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.05) 100%)",
                    padding: "16px",
                    borderRadius: "14px",
                    border: "1px solid rgba(245, 158, 11, 0.4)"
                  }}
                >
                  <div style={{ fontSize: "0.75rem", color: "#fbbf24", fontWeight: 800, textTransform: "uppercase" }}>
                    Current High Bid
                  </div>
                  <div style={{ fontSize: "1.45rem", fontWeight: 900, color: "#fde047", marginTop: "4px" }}>
                    {formatCrore(currentAuction.currentBid)}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#38bdf8", marginTop: "2px" }}>
                    {currentAuction.bidsCount} Verified Bids Placed
                  </div>
                </div>
              </div>

              {/* Live Bids History Stream */}
              <div style={{ marginBottom: "24px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px"
                  }}
                >
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase" }}>
                    🔴 Live Bid Stream ({currentAuction.bidsHistory.length} Recent)
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "#10b981", fontWeight: 700 }}>
                    100% Escrow Backed
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    maxHeight: "150px",
                    overflowY: "auto"
                  }}
                >
                  {currentAuction.bidsHistory.map((bid, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        background: i === 0 ? "rgba(245, 158, 11, 0.12)" : "rgba(255, 255, 255, 0.03)",
                        border: i === 0 ? "1px solid rgba(245, 158, 11, 0.3)" : "1px solid transparent",
                        fontSize: "0.8rem"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: i === 0 ? "#f59e0b" : "#64748b"
                          }}
                        />
                        <span style={{ fontWeight: 700, color: i === 0 ? "#ffffff" : "#cbd5e1" }}>
                          {bid.name}
                        </span>
                        <span style={{ color: "#64748b", fontSize: "0.72rem" }}>({bid.city})</span>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <strong style={{ color: i === 0 ? "#fde047" : "#cbd5e1" }}>
                          {formatCrore(bid.amount)}
                        </strong>
                        <span style={{ color: "#64748b", fontSize: "0.7rem", marginLeft: "6px" }}>{bid.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Bid Placement Terminal */}
            <div
              style={{
                background: "rgba(0, 0, 0, 0.35)",
                padding: "20px",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
            >
              <div style={{ marginBottom: "12px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    color: "#cbd5e1",
                    textTransform: "uppercase",
                    marginBottom: "6px"
                  }}
                >
                  Your Investor Name / Company
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rajiv Kumar (VIP Investor)"
                  value={bidderName}
                  onChange={(e) => setBidderName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                    fontSize: "0.85rem",
                    outline: "none"
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => handlePlaceBid(currentAuction.minIncrement)}
                  style={{
                    background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                    border: "none",
                    borderRadius: "12px",
                    padding: "12px 14px",
                    color: "#ffffff",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    boxShadow: "0 4px 16px rgba(245, 158, 11, 0.35)",
                    transition: "transform 0.15s ease"
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <Gavel size={16} />
                  <span>Bid +{formatCrore(currentAuction.minIncrement)}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePlaceBid(currentAuction.minIncrement * 2)}
                  style={{
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    border: "none",
                    borderRadius: "12px",
                    padding: "12px 14px",
                    color: "#ffffff",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    boxShadow: "0 4px 16px rgba(16, 185, 129, 0.35)",
                    transition: "transform 0.15s ease"
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <TrendingUp size={16} />
                  <span>Bid +{formatCrore(currentAuction.minIncrement * 2)}</span>
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  marginTop: "12px",
                  fontSize: "0.72rem",
                  color: "#94a3b8"
                }}
              >
                <ShieldCheck size={14} color="#10b981" />
                <span>All bids legally escrow-protected under RERA & RBI guidelines.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveAuctionHub;
