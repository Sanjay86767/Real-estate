import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, VolumeX, Sparkles, X, ChevronRight, Command } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import { playClickSound, playSuccessSound } from "../utils/effects";

export const VoiceCommander = () => {
  const navigate = useNavigate();
  const {
    darkMode,
    toggleTheme,
    currency,
    setCurrency,
    unit,
    setUnit,
    addToast
  } = usePropertyContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [transcript, setTranscript] = useState("");
  const [lastAction, setLastAction] = useState("");
  const [waveformLevels, setWaveformLevels] = useState([30, 55, 40, 70, 45, 80, 50, 60]);

  const recognitionRef = useRef(null);

  // Text-to-speech helper
  const speakText = (text) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // cancel previous
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    // Prefer English voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find((v) => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha")));
    if (naturalVoice) utterance.voice = naturalVoice;
    window.speechSynthesis.speak(utterance);
  };

  // Setup Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);

        if (event.results[current].isFinal) {
          executeCommand(text.toLowerCase());
        }
      };

      recognition.onerror = (err) => {
        console.warn("Speech recognition error:", err);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [darkMode, currency, unit]);

  // Dynamic waveform simulation when listening
  useEffect(() => {
    let interval;
    if (isListening) {
      interval = setInterval(() => {
        setWaveformLevels([
          Math.floor(Math.random() * 60) + 20,
          Math.floor(Math.random() * 80) + 20,
          Math.floor(Math.random() * 70) + 20,
          Math.floor(Math.random() * 95) + 20,
          Math.floor(Math.random() * 85) + 20,
          Math.floor(Math.random() * 75) + 20,
          Math.floor(Math.random() * 65) + 20,
          Math.floor(Math.random() * 50) + 20
        ]);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const startListening = () => {
    playClickSound();
    setTranscript("");
    setLastAction("");
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        recognitionRef.current.stop();
      }
    } else {
      addToast("Speech recognition is not supported in this browser.", "warning");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  // Command Parser & Action Dispatcher
  const executeCommand = (cmd) => {
    playSuccessSound();

    if (cmd.includes("dark mode") || cmd.includes("night mode")) {
      if (!darkMode) toggleTheme();
      setLastAction("Switched to Dark Mode");
      speakText("Activated dark mode.");
    } else if (cmd.includes("light mode") || cmd.includes("day mode")) {
      if (darkMode) toggleTheme();
      setLastAction("Switched to Light Mode");
      speakText("Switched to light mode.");
    } else if (cmd.includes("dollar") || cmd.includes("usd")) {
      setCurrency("USD");
      setLastAction("Currency set to US Dollars ($)");
      speakText("Currency converted to US Dollars.");
    } else if (cmd.includes("rupee") || cmd.includes("inr")) {
      setCurrency("INR");
      setLastAction("Currency set to Indian Rupees (₹)");
      speakText("Currency converted to Indian Rupees.");
    } else if (cmd.includes("villa")) {
      navigate("/properties");
      setLastAction("Filtering luxury villas");
      speakText("Navigating to luxury villas catalog.");
    } else if (cmd.includes("apartment") || cmd.includes("flat")) {
      navigate("/properties");
      setLastAction("Showing apartment listings");
      speakText("Navigating to luxury apartments.");
    } else if (cmd.includes("chandigarh")) {
      navigate("/properties");
      setLastAction("Properties in Chandigarh");
      speakText("Showing all properties in Chandigarh.");
    } else if (cmd.includes("mohali")) {
      navigate("/properties");
      setLastAction("Properties in Mohali");
      speakText("Showing top properties in Mohali.");
    } else if (cmd.includes("valuation") || cmd.includes("price") || cmd.includes("worth")) {
      navigate("/valuation");
      setLastAction("Opening AI Property Valuer");
      speakText("Opening AI Property Valuation Engine.");
    } else if (cmd.includes("matchmaker") || cmd.includes("quiz") || cmd.includes("find home")) {
      navigate("/matchmaker");
      setLastAction("Opening AI Matchmaker");
      speakText("Opening AI Property Matchmaker quiz.");
    } else if (cmd.includes("agent") || cmd.includes("broker")) {
      navigate("/agents");
      setLastAction("Opening Senior Advisors directory");
      speakText("Here are our certified real estate advisors.");
    } else if (cmd.includes("favorite") || cmd.includes("saved")) {
      navigate("/favorites");
      setLastAction("Opening Saved Favorites");
      speakText("Opening your saved properties.");
    } else if (cmd.includes("list") || cmd.includes("sell")) {
      navigate("/list-property");
      setLastAction("Opening Property Listing wizard");
      speakText("Opening seller property submission portal.");
    } else if (cmd.includes("home") || cmd.includes("main page")) {
      navigate("/");
      setLastAction("Navigated to Home");
      speakText("Heading back to home page.");
    } else if (cmd.includes("scroll down")) {
      window.scrollBy({ top: 600, behavior: "smooth" });
      setLastAction("Scrolled Down");
    } else if (cmd.includes("scroll up")) {
      window.scrollBy({ top: -600, behavior: "smooth" });
      setLastAction("Scrolled Up");
    } else {
      setLastAction(`Processed: "${cmd}"`);
      speakText(`Searching for ${cmd}`);
      navigate(`/properties`);
    }
  };

  return (
    <>
      {/* Floating Voice Assistant Trigger Icon (Left side) */}
      <div
        className="voice-commander-trigger"
        style={{
          position: "fixed",
          bottom: "30px",
          left: "30px",
          zIndex: 800
        }}
      >
        <button
          onClick={() => {
            playClickSound();
            setIsOpen(!isOpen);
            if (!isOpen) {
              setTimeout(() => startListening(), 300);
            }
          }}
          className={`voice-trigger-btn ${isListening ? "listening-pulse" : ""}`}
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: isListening
              ? "linear-gradient(135deg, #ef4444, #f43f5e)"
              : "linear-gradient(135deg, #2563eb, #7c3aed)",
            color: "#ffffff",
            border: "none",
            boxShadow: "0 8px 24px rgba(37, 99, 235, 0.4)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
          title="AI Voice Assistant (Speak commands)"
        >
          {isListening ? <Mic size={24} /> : <Sparkles size={22} />}
        </button>
      </div>

      {/* Futuristic Voice Commander HUD Modal */}
      {isOpen && (
        <div
          className="voice-hud-overlay"
          style={{
            position: "fixed",
            bottom: "95px",
            left: "30px",
            width: "360px",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "0 20px 45px rgba(0,0,0,0.3)",
            padding: "22px",
            zIndex: 850,
            backdropFilter: "blur(16px)"
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "var(--accent-primary-light)",
                  color: "var(--accent-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Command size={15} />
              </div>
              <div>
                <strong style={{ fontSize: "0.95rem", display: "block" }}>EstateAI Voice Commander</strong>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Hands-Free UI Navigation</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "6px" }}>
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className="btn-icon"
                style={{ width: "30px", height: "30px" }}
                title={voiceEnabled ? "Mute voice replies" : "Enable voice replies"}
              >
                {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
              <button
                onClick={() => {
                  stopListening();
                  setIsOpen(false);
                }}
                className="btn-icon"
                style={{ width: "30px", height: "30px" }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Visualizer Waveform Bar */}
          <div
            style={{
              height: "70px",
              background: "var(--bg-secondary)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "0 20px",
              marginBottom: "16px",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {waveformLevels.map((lvl, idx) => (
              <span
                key={idx}
                style={{
                  width: "6px",
                  height: isListening ? `${lvl}%` : "12%",
                  background: isListening
                    ? "linear-gradient(to top, var(--accent-primary), #ec4899)"
                    : "var(--border-light)",
                  borderRadius: "3px",
                  transition: "height 0.1s ease"
                }}
              />
            ))}

            {/* Status pill overlay */}
            <div
              style={{
                position: "absolute",
                bottom: "6px",
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                color: isListening ? "var(--accent-rose)" : "var(--text-muted)",
                textTransform: "uppercase"
              }}
            >
              {isListening ? "Listening... Speak now" : "Microphone Idle"}
            </div>
          </div>

          {/* Live Transcript Display */}
          <div
            style={{
              minHeight: "44px",
              background: "var(--bg-primary)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-sm)",
              padding: "10px 14px",
              fontSize: "0.85rem",
              marginBottom: "14px",
              color: transcript ? "var(--text-primary)" : "var(--text-muted)",
              fontStyle: transcript ? "normal" : "italic"
            }}
          >
            {transcript || 'Try saying: "Show villas in Chandigarh" or "Switch to dark mode"'}
          </div>

          {/* Last Action Notification */}
          {lastAction && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.8rem",
                color: "var(--accent-emerald)",
                marginBottom: "14px",
                fontWeight: 600
              }}
            >
              <Sparkles size={14} />
              <span>{lastAction}</span>
            </div>
          )}

          {/* Quick Mic Control & Suggested Commands */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
            <button
              onClick={isListening ? stopListening : startListening}
              className={`btn ${isListening ? "btn-danger" : "btn-primary"}`}
              style={{ flex: 1, padding: "8px 14px", fontSize: "0.85rem", gap: "6px" }}
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              <span>{isListening ? "Stop Listening" : "Tap to Speak"}</span>
            </button>
          </div>

          {/* Quick Voice Prompt Shortcuts */}
          <div>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
              Sample Quick Prompts
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
              {[
                "Show luxury villas",
                "Toggle dark mode",
                "Switch currency to USD",
                "Open valuation"
              ].map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTranscript(sample);
                    executeCommand(sample.toLowerCase());
                  }}
                  style={{
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-full)",
                    padding: "4px 10px",
                    fontSize: "0.72rem",
                    color: "var(--text-secondary)",
                    cursor: "pointer"
                  }}
                >
                  "{sample}"
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceCommander;
