# 🏰 EstateHub — Ultra-Luxury AI Real Estate & Property Platform

<div align="center">

[![Live Production](https://img.shields.io/badge/🌐_Live_Website-estatehub--rust.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://estatehub-rust.vercel.app)
[![React](https://img.shields.io/badge/React-18.x-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/Pure_CSS3-Zero_Tailwind-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Web Speech API](https://img.shields.io/badge/Web_Speech_API-Voice_AI-8B5CF6?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br/>

### 🌟 **[CLICK HERE TO EXPERIENCE THE LIVE PRODUCTION PLATFORM](https://estatehub-rust.vercel.app)** 🌟

**A next-generation, high-net-worth real estate technology suite featuring 16 full-fledged pages, interactive AI Virtual Staging, Hands-Free Voice Assistant, Neural Valuation Algorithms, 3D Parallax Cards, and Financial Engineering Engines — handcrafted with 100% Pure CSS3 & React.js.**

<br/>

<a href="https://estatehub-rust.vercel.app">
  <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80" alt="EstateHub Luxury Real Estate" width="100%" style="border-radius: 20px; box-shadow: 0 25px 60px rgba(0,0,0,0.45); border: 2px solid rgba(217, 119, 6, 0.3);" />
</a>

<br/><br/>

[🌐 Live Website](https://estatehub-rust.vercel.app) • [📱 16 Pages Showcase](#-complete-16-page-architecture) • [🧠 How It Works Under The Hood](#-how-it-works-under-the-hood-technical-deep-dive) • [✨ Flagship Innovations](#-flagship-innovations--ai-suite) • [🛠️ Tech Stack](#-technology-stack--architecture) • [📞 Contact Founder](#-project-lead--architect)

</div>

---

## 💎 Project Highlights at a Glance

| Metric | Specification | Real-World Capability |
|---|---|---|
| **Live Production URL** | `https://estatehub-rust.vercel.app` | Global edge CDN deployment on Vercel with 200 OK & zero 404s |
| **Total Pages** | **16 Dedicated Pages** | 100% fully implemented with client-side SPA routing |
| **Styling Architecture** | **100% Pure Vanilla CSS3** | Zero Tailwind, zero Bootstrap, 24KB custom high-performance design system |
| **Founder & Lead** | **Sanjay Kumar** | Direct VIP desk (`+91 8809604880`, `sanjay12012005@gmail.com`) |
| **Voice AI Navigator** | Web Speech STT + TTS | Voice command recognition + real-time speech feedback synthesis |
| **Virtual Staging** | Real-Time Split Slider | Interactive mouse/touch split divider with 5 architectural CSS LUTs |
| **Brochure Export** | 300 DPI Luxury PDF | Auto-formatted print stylesheet with RERA watermark & QR code |
| **Interactive Map** | Zero-dependency Topographic SVG | Interactive pan/zoom coordinate system with dynamic pin tooltips |

---

## 📸 Visual Showcase & Flagship Pages

<div align="center">

### 1. 🏠 Executive Hero & VIP Luxury Stories
*Live autocomplete search, floating trust badges, and Instagram-style auto-advancing reels modal.*

<img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="Executive Home Page" width="90%" style="border-radius: 14px; box-shadow: 0 15px 35px rgba(0,0,0,0.3);" />

<br/><br/>

### 2. 🎨 AI Interior Design & Staging Studio (`/interior-studio`)
*Interactive Before/After split drag comparison with Scandinavian, Neo-Classical, Cyberpunk, and Boho LUT filters.*

<img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80" alt="AI Interior Staging Studio" width="90%" style="border-radius: 14px; box-shadow: 0 15px 35px rgba(0,0,0,0.3);" />

<br/><br/>

### 3. 🏦 Financial Affordability Hub & Stamp Duty Calculator (`/affordability`)
*Home loan purchasing power estimator, bank APR comparison table, and Indian State Stamp Duty calculator.*

<img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80" alt="Affordability Hub" width="90%" style="border-radius: 14px; box-shadow: 0 15px 35px rgba(0,0,0,0.3);" />

<br/><br/>

### 4. 📈 Market Insights & Infrastructure Corridor Heatmap (`/market-insights`)
*Live macroeconomic indicators, capital appreciation leaderboard, and upcoming mega infrastructure trackers.*

<img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" alt="Market Insights" width="90%" style="border-radius: 14px; box-shadow: 0 15px 35px rgba(0,0,0,0.3);" />

<br/><br/>

### 5. 👨‍💼 Founder & Senior Advisor Portfolio (`/agent/1`)
*Dedicated advisor profile for Founder Sanjay Kumar with verified RERA registration, deal history, and direct call desk.*

<img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80" alt="Sanjay Kumar Advisor Portfolio" width="90%" style="border-radius: 14px; box-shadow: 0 15px 35px rgba(0,0,0,0.3);" />

</div>

---

## 🧠 How It Works Under The Hood (Technical Deep-Dive)

### 1. 🎙️ AI Voice Speech Recognition & Synthesis Pipeline
EstateHub integrates browser-native **Web Speech Recognition** (`webkitSpeechRecognition`) and **Speech Synthesis** (`speechSynthesis`) to provide a complete hands-free navigation assistant.

```
[ User Speaks ]
      │
      ▼
[ Web Speech API (webkitSpeechRecognition) ]
      │ (Transforms speech frequency into text string)
      ▼
[ Regex Intent & Keyword Parser ]
      ├─ "villas in chandigarh"  ──> Navigates to /properties?type=villa&city=chandigarh
      ├─ "dark mode" / "light"  ──> Dispatches toggleTheme() in PropertyContext
      ├─ "interior studio"      ──> Navigates to /interior-studio
      ├─ "call sanjay"          ──> Triggers tel:+918809604880 direct dial
      └─ "calculate loan"       ──> Navigates to /affordability
      │
      ▼
[ SpeechSynthesisUtterance ]
      │ (Synthesizes spoken audio feedback)
      ▼
[ Voice Speaks Reply Aloud to User: "Showing luxury villas in Chandigarh..." ]
```

* **Zero Latency**: Runs entirely in the client browser without sending raw microphone audio to third-party external servers.
* **Frequency Visualizer**: Real-time CSS waveform animation driven by audio state pulses.

---

### 2. 🎨 AI Virtual Stager & Dynamic LUT Engine
The Virtual Staging Studio (`AiInteriorStyler.jsx`) allows clients to drag a split slider over raw unfurnished property rooms to preview high-end interior concepts in real time.

* **Drag Physics**: Tracks relative coordinates:
  $$\text{Slider Position (\%)} = \left( \frac{\text{clientX} - \text{rect.left}}{\text{rect.width}} \right) \times 100$$
  Clamped strictly between $5\%$ and $95\%$ to guarantee smooth user experience across desktop mouse and mobile touch events.
* **Color Lookup Matrix (LUTs)**: Rather than heavy static image transfers, each architectural theme applies customized CSS filter pipelines:
  * **Scandinavian Minimal**: `contrast(1.05) brightness(1.08) saturate(0.85) sepia(0.08)`
  * **Neo-Classical Luxury**: `contrast(1.15) brightness(1.02) saturate(1.18) hue-rotate(-8deg)`
  * **Cyberpunk Midnight**: `contrast(1.3) brightness(0.85) saturate(1.4) hue-rotate(180deg)`
  * **Warm Earthy Boho**: `contrast(1.1) brightness(1.04) saturate(1.12) sepia(0.22)`
  * **Urban Industrial**: `contrast(1.25) brightness(0.95) saturate(0.7) grayscale(0.2)`
* **Turnkey Bill of Materials (BoM)**: Dynamically tabulates square-foot finishes cost, turnaround timeline (e.g., 35-45 days), and vendor procurement estimates with canvas confetti celebratory triggers.

---

### 3. 🏦 Financial Engineering & Amortization Math
EstateHub houses mathematical financial models designed specifically for real estate investment and home purchases:

#### A. Reducing-Balance EMI Formula
$$E = P \cdot r \cdot \frac{(1 + r)^n}{(1 + r)^n - 1}$$
* Where $P$ is principal loan amount, $r$ is monthly interest rate ($\text{APR} / 12 / 100$), and $n$ is total tenure in months ($y \times 12$).
* Generates an interactive month-by-month principal vs. interest breakdown chart.

#### B. Indian Stamp Duty & Registration Matrix
* Computes exact stamp duty based on state-specific municipal revenue acts:
  * **Chandigarh (UT)**: $5\%$ (Men) / $3\%$ (Women)
  * **Punjab**: $7\%$ (Men) / $6\%$ (Women)
  * **Haryana**: $7\%$ (Urban) / $5\%$ (Rural)
  * **Delhi NCR**: $6\%$ (Men) / $4\%$ (Women)
  * **Karnataka**: $5\%$ (Above ₹45L)
  * **Maharashtra**: $6\%$ (Includes Metro Cess)
* Automatically factors in the **1% Registration Fee** and female buyer legal concessions.

---

### 4. 🎴 3D Mouse Parallax Tilt Physics (`PropertyCard.jsx`)
Property cards feature realistic physics-based 3D orientation that tracks the user's cursor across the viewport:

```javascript
// Normalized coordinate offset (-0.5 to +0.5)
const xOffset = (clientX - cardRect.left) / cardRect.width - 0.5;
const yOffset = (clientY - cardRect.top) / cardRect.height - 0.5;

// Rotate up to 10 degrees on both axes
const rotateX = -yOffset * 10;
const rotateY = xOffset * 10;

card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
```
* **Specular Glare**: Dynamically positions a subtle radial reflection gradient based on light incident angle.
* **Web Audio API Clicks**: Generates synthetic acoustic feedback via `AudioContext` oscillated sine waves (zero external MP3 assets needed).

---

### 5. 🗺️ Zero-Dependency Interactive Topographic Map
* Built with pure **SVG Coordinate Mathematics** that renders city topography, major transit corridors, and property pins with real-time hover cards.
* Eliminates the need for expensive third-party Google Maps API billing or heavy Leaflet JS bundles while ensuring instant 60 FPS performance.

---

## 📱 Complete 16-Page Architecture

| # | Route | Page Title | Key Pro Features |
|---|---|---|---|
| **1** | `/` | **Home** | Luxury Hero, Autocomplete Search, Instagram Stories, AI Innovation Showcase, Curated Collections |
| **2** | `/properties` | **Properties Catalog** | Multi-Facet Filters, Grid / List / Interactive SVG Map Views, Dynamic Sorting |
| **3** | `/property/:id` | **Property Details** | 360° Virtual Tour, AI Styler, 2D Floor Plans, QoL Eco-Radar, Sun Position Simulator, EMI Calculator |
| **4** | `/interior-studio` | **AI Interior Studio** | Before/After Split Drag Comparison, 5 Theme LUTs, Materials Catalog, Hex Swatches |
| **5** | `/affordability` | **Loan & Affordability Hub**| Purchasing Power Estimator, Bank APR Table (SBI, HDFC, ICICI), State Stamp Duty Calculator |
| **6** | `/market-insights` | **Market Insights & Trends**| Macro Indicators (Repo Rate, APR), Appreciation Leaderboard, Mega Infrastructure Corridors |
| **7** | `/agent/:id` | **Advisor Portfolio** | Verified RERA License, Deals Closed, Exclusive Mandates, VIP Consultation Scheduler |
| **8** | `/agents` | **Verified Advisors Directory** | Advisor Directory, City Specializations, Direct Call / Email Modals |
| **9** | `/valuation` | **AI Valuation Engine** | Neural Valuation Model, Price/Sq.Ft Estimator, 3-Year Appreciation Projection Graph |
| **10**| `/matchmaker` | **AI Property Matchmaker**| 4-Step Lifestyle Quiz, Neural Weight Scoring, Personalized Ranked Property Recommendations |
| **11**| `/list-property` | **List Your Property** | 4-Step Listing Publisher Wizard with LocalStorage Persistence & Photo Preview |
| **12**| `/favorites` | **Shortlisted Favorites** | Saved Properties synchronized with LocalStorage, 1-Click Comparison Modal |
| **13**| `/about` | **About EstateHub** | Brand Heritage, AD100 Architecture Standards, Executive Founder Spotlight for Sanjay Kumar |
| **14**| `/contact` | **Contact Headquarters** | Verified Headquarters Desk (+91 8809604880, sanjay12012005@gmail.com), Validated Form, FAQ |
| **15**| `/login` | **VIP Access & Authentication**| Glassmorphic Auth Portal with 1-Click Instant Demo Login authenticating as Sanjay Kumar |
| **16**| `*` | **Custom Luxury 404** | Luxury Architectural 404 Page with Smart Navigation Fallbacks |

---

## 🛎️ Floating VIP Concierge Dock (`VipConciergeBar.jsx`)
Available on **every single page** of the platform:
* **Live Founder Status**: Pulsing `🟢 Online` indicator for **Sanjay Kumar**
* **Direct Call Action**: 1-Click direct dial `tel:+918809604880`
* **Instant WhatsApp Chat**: Direct message pre-filled with luxury property inquiry
* **Direct Email**: `mailto:sanjay12012005@gmail.com`
* **1-Click VIP Callback Request**: Interactive client phone input with instant confirmation animation

---

## 🛠️ Technology Stack & Architecture

```
EstateHub Architecture
├── Client-Side Presentation
│   ├── React 18 (Functional Components, Hooks)
│   ├── React Router v6 (Client-Side SPA Routing)
│   ├── Lucide React (Pixel-Perfect Icons)
│   └── Vanilla CSS3 (Custom Luxury Design Tokens, Glassmorphism, CSS LUTs)
├── State Management & Storage
│   ├── React Context API (PropertyContext: Filters, Favorites, User Auth, Currency, Unit)
│   └── LocalStorage Web API (Persisted User State & Custom Listings)
├── Advanced Browser APIs
│   ├── Web Speech Recognition API (Speech-to-Text Voice Commander)
│   ├── Web Speech Synthesis API (Spoken Voice AI Feedback)
│   ├── Web Audio API (OscillatorNode Acoustic Haptic Sound Effects)
│   └── HTML5 Canvas 2D (Celebratory Confetti Engine)
└── Deployment & CI/CD
    ├── Vercel Edge Cloud (https://estatehub-rust.vercel.app)
    ├── Vercel SPA Routing Configuration (vercel.json)
    └── GitHub (https://github.com/Sanjay86767/Real-estate)
```

---

## ⚡ Quick Start & Local Development

### 1. Clone the Repository
```bash
git clone https://github.com/Sanjay86767/Real-estate.git
cd Real-estate
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for Production
```bash
npm run build
```
Production assets will be generated in `/dist` in under **800ms**.

---

## 👨‍💻 Project Lead & Architect

<div align="center">

### **Sanjay Kumar**
*Founder & Principal Frontend Architect — EstateHub*

[![GitHub](https://img.shields.io/badge/GitHub-Sanjay86767-181717?style=for-the-badge&logo=github)](https://github.com/Sanjay86767)
[![Email](https://img.shields.io/badge/Email-sanjay12012005%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:sanjay12012005@gmail.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-%2B91_8809604880-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/918809604880)
[![Live Demo](https://img.shields.io/badge/Live_Website-estatehub--rust.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://estatehub-rust.vercel.app)

<br/>

🌐 **Official Live Production URL**: [https://estatehub-rust.vercel.app](https://estatehub-rust.vercel.app)  
📞 **Direct VIP Hotline / WhatsApp**: `+91 8809604880`  
✉️ **Executive Email**: `sanjay12012005@gmail.com`  
💼 **Specialization**: Ultra-Luxury Estates, Architectural Web Engineering, High-Yield NRI Real Estate Portfolios

</div>

---

## 📄 License

This project is licensed under the **MIT License** — feel free to explore, clone, star ⭐, and adapt for commercial or educational luxury applications.

<div align="center">
  <sub>Handcrafted with passion, precision, and state-of-the-art web technology by Sanjay Kumar.</sub>
</div>
