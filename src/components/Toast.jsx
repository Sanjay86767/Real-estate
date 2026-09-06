import React from "react";
import { usePropertyContext } from "../context/PropertyContext";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export const Toast = () => {
  const { toasts, removeToast } = usePropertyContext();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item ${toast.type}`}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {toast.type === "success" && <CheckCircle size={18} color="var(--accent-emerald)" />}
            {toast.type === "warning" && <AlertCircle size={18} color="var(--accent-gold)" />}
            {toast.type === "info" && <Info size={18} color="var(--accent-primary)" />}
            <span>{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            style={{ color: "var(--text-muted)", cursor: "pointer", display: "flex" }}
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
