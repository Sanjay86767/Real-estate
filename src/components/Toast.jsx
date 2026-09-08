import React, { useEffect, useState } from "react";
import { usePropertyContext } from "../context/PropertyContext";
import { CheckCircle, AlertTriangle, Info, X, Zap } from "lucide-react";

const ICONS = {
  success: <CheckCircle size={17} />,
  warning: <AlertTriangle size={17} />,
  info: <Info size={17} />,
  error: <X size={17} />,
};

const COLORS = {
  success: { border: "#10b981", bg: "rgba(16,185,129,0.10)", icon: "#10b981", bar: "#10b981" },
  warning: { border: "#f59e0b", bg: "rgba(245,158,11,0.10)", icon: "#f59e0b", bar: "#f59e0b" },
  info:    { border: "#6366f1", bg: "rgba(99,102,241,0.10)", icon: "#6366f1", bar: "#6366f1" },
  error:   { border: "#ef4444", bg: "rgba(239,68,68,0.10)", icon: "#ef4444", bar: "#ef4444" },
};

const TIMEOUT_MS = 4500;

const ToastItem = ({ toast, onRemove }) => {
  const [progress, setProgress] = useState(100);
  const [visible, setVisible] = useState(false);

  // Slide-in animation
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  // Progress bar countdown
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.max(0, 100 - (elapsed / TIMEOUT_MS) * 100);
      setProgress(pct);
      if (pct > 0) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const c = COLORS[toast.type] || COLORS.info;

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onRemove(toast.id), 350);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        background: "var(--bg-surface-elevated)",
        border: `1px solid ${c.border}40`,
        borderLeft: `3px solid ${c.border}`,
        borderRadius: "var(--radius-md)",
        padding: "14px 16px",
        minWidth: "300px",
        maxWidth: "380px",
        boxShadow: `0 8px 30px rgba(0,0,0,0.25), 0 0 0 1px ${c.border}10`,
        backdropFilter: "blur(16px)",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0) scale(1)" : "translateX(40px) scale(0.96)",
        transition: "opacity 0.35s cubic-bezier(0.34,1.56,0.64,1), transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      {/* Icon */}
      <div style={{
        width: "34px", height: "34px", borderRadius: "50%",
        background: c.bg, display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, color: c.icon
      }}>
        {ICONS[toast.type] || ICONS.info}
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingRight: "20px" }}>
        <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4 }}>
          {toast.message}
        </div>
        {toast.sub && (
          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "3px" }}>
            {toast.sub}
          </div>
        )}
      </div>

      {/* Close btn */}
      <button
        onClick={handleClose}
        style={{
          position: "absolute", top: "10px", right: "10px",
          color: "var(--text-muted)", cursor: "pointer", background: "none", border: "none",
          display: "flex", padding: "2px", opacity: 0.7, transition: "opacity 0.2s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
        onMouseLeave={(e) => e.currentTarget.style.opacity = "0.7"}
        aria-label="Close notification"
      >
        <X size={14} />
      </button>

      {/* Progress bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, height: "2px",
        width: `${progress}%`, background: c.bar,
        transition: "width 0.1s linear",
        borderRadius: "0 0 0 var(--radius-md)"
      }} />
    </div>
  );
};

export const Toast = () => {
  const { toasts, removeToast } = usePropertyContext();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      className="toast-container"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: "clamp(16px, 3vw, 32px)",
        right: "clamp(16px, 3vw, 32px)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column-reverse",
        gap: "10px",
        pointerEvents: "none",
      }}
    >
      {toasts.map((toast) => (
        <div key={toast.id} style={{ pointerEvents: "all" }}>
          <ToastItem toast={toast} onRemove={removeToast} />
        </div>
      ))}
    </div>
  );
};

export default Toast;
