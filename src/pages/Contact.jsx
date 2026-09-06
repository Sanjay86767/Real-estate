import React, { useState } from "react";
import { usePropertyContext } from "../context/PropertyContext";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MessageSquare
} from "lucide-react";

export const Contact = () => {
  const { addToast } = usePropertyContext();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "Do you charge homebuyers any brokerage or consulting fee?",
      a: "For new residential and developer-partnered projects, we charge zero brokerage to buyers. For secondary re-sale properties, transparent standard RERA-guided consulting fees apply upfront."
    },
    {
      q: "How does EstateHub verify property titles?",
      a: "Our certified legal empanelment team conducts a rigorous 30-year title search, verifies GMADA / RERA clearance numbers, and inspects municipal property tax records prior to publishing."
    },
    {
      q: "Can you assist NRI buyers residing in the UK, USA, or UAE?",
      a: "Yes, over 30% of our luxury clientele are NRIs. We facilitate power of attorney (POA) advisory, NRE/NRO bank account home loan processing, and high-definition virtual live video tours."
    },
    {
      q: "How soon can I schedule a physical site inspection?",
      a: "In most cases, site visits can be arranged on the same day or scheduled at your convenience, including weekend site inspections with our dedicated property advisors."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      addToast("Please fill all required fields", "warning");
      return;
    }
    setSubmitted(true);
    addToast("✅ Your message has been sent successfully! Our team will contact you shortly.", "success");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="contact-page" style={{ padding: "40px 0 80px" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 50px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--accent-primary)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
            <MessageSquare size={18} />
            <span>Get In Touch</span>
          </div>
          <h1 style={{ fontSize: "2.6rem", marginTop: "6px" }}>Contact EstateHub</h1>
          <p style={{ marginTop: "8px" }}>
            Have questions about a property, site visits, home loans, or selling your estate? We are here to assist you 6 days a week.
          </p>
        </div>

        {/* Contact Layout: Info Cards + Form */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "40px",
            alignItems: "start",
            marginBottom: "70px"
          }}
          className="contact-layout-grid"
        >
          {/* Left: Contact Info */}
          <div>
            <h3 style={{ fontSize: "1.4rem", marginBottom: "20px" }}>Office Information</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-md)",
                  padding: "20px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                  boxShadow: "var(--shadow-xs)"
                }}
              >
                <div style={{ padding: "12px", background: "var(--accent-primary-light)", borderRadius: "var(--radius-sm)", color: "var(--accent-primary)" }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1rem", margin: "0 0 4px" }}>Headquarters</h4>
                  <p style={{ fontSize: "0.9rem", margin: 0, color: "var(--text-secondary)" }}>
                    EstateHub Tower, Level 4, Sector 17-C, Chandigarh 160017, India
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-md)",
                  padding: "20px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                  boxShadow: "var(--shadow-xs)"
                }}
              >
                <div style={{ padding: "12px", background: "var(--accent-emerald-light)", borderRadius: "var(--radius-sm)", color: "var(--accent-emerald)" }}>
                  <Phone size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1rem", margin: "0 0 4px" }}>Direct Phone & WhatsApp</h4>
                  <p style={{ fontSize: "0.9rem", margin: 0, color: "var(--text-secondary)" }}>
                    <a href="tel:+918809604880" style={{ color: "var(--accent-primary)", fontWeight: 700 }}>+91 8809604880</a> (Founder & Client Desk)<br />
                    <span>Mon - Sat: 9:00 AM - 8:00 PM IST</span>
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-md)",
                  padding: "20px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                  boxShadow: "var(--shadow-xs)"
                }}
              >
                <div style={{ padding: "12px", background: "var(--accent-gold-light)", borderRadius: "var(--radius-sm)", color: "var(--accent-gold)" }}>
                  <Mail size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1rem", margin: "0 0 4px" }}>Direct Email & Support</h4>
                  <p style={{ fontSize: "0.9rem", margin: 0, color: "var(--text-secondary)" }}>
                    <a href="mailto:sanjay12012005@gmail.com" style={{ color: "var(--accent-primary)", fontWeight: 700 }}>sanjay12012005@gmail.com</a><br />
                    <span>inquiries@estatehub.com</span>
                  </p>
                </div>
              </div>

              <div
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-md)",
                  padding: "20px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                  boxShadow: "var(--shadow-xs)"
                }}
              >
                <div style={{ padding: "12px", background: "var(--accent-rose-light)", borderRadius: "var(--radius-sm)", color: "var(--accent-rose)" }}>
                  <Clock size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: "1rem", margin: "0 0 4px" }}>Working Hours</h4>
                  <p style={{ fontSize: "0.9rem", margin: 0, color: "var(--text-secondary)" }}>
                    Mon - Sat: 9:00 AM - 7:30 PM IST<br />
                    Sunday: Prior Appointment Only
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Contact Form */}
          <div
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-lg)",
              padding: "36px",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <h3 style={{ fontSize: "1.4rem", marginBottom: "8px" }}>Send Us A Direct Message</h3>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginBottom: "24px" }}>
              Fill out the form below and one of our dedicated property relationship managers will get back to you within 2 business hours.
            </p>

            {submitted ? (
              <div
                style={{
                  background: "var(--accent-emerald-light)",
                  border: "1px solid var(--accent-emerald)",
                  color: "var(--accent-emerald)",
                  padding: "24px",
                  borderRadius: "var(--radius-md)",
                  textAlign: "center"
                }}
              >
                <CheckCircle2 size={36} style={{ margin: "0 auto 12px" }} />
                <h4 style={{ fontSize: "1.2rem", margin: "0 0 6px" }}>Message Sent Successfully!</h4>
                <p style={{ margin: 0, color: "inherit", fontSize: "0.95rem" }}>
                  Thank you for reaching out. We have logged your inquiry and assigned an advisor to your request.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: "18px" }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-row-dual">
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Verma"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="rahul@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-row-dual">
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      Phone / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 00000"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      Inquiry Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Schedule Villa Visit, Sell Plot..."
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                    Message / Requirements *
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Tell us about your preferred location, budget, or timeline..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      outline: "none",
                      resize: "vertical"
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%" }}>
                  <Send size={18} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <h2 style={{ fontSize: "2.2rem" }}>Frequently Asked Questions</h2>
            <p style={{ marginTop: "6px" }}>Everything you need to know about buying and investing with EstateHub.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    boxShadow: "var(--shadow-xs)"
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    style={{
                      width: "100%",
                      padding: "18px 24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textAlign: "left",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: "var(--text-primary)"
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={20} color="var(--accent-primary)" /> : <ChevronDown size={20} />}
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 24px 20px", color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.7" }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .form-row-dual {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
