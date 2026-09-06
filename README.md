# 🏰 EstateHub — Ultra-Luxury AI Real Estate & Property Platform

<div align="center">

[![React](https://img.shields.io/badge/React-18.x-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/Pure_CSS3-Zero_Tailwind-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Web Speech API](https://img.shields.io/badge/Web_Speech_API-Voice_AI-8B5CF6?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**A cutting-edge, god-tier real estate platform built with React.js, Vanilla CSS3, Web Speech AI, Web Audio Synthesizer, and HTML5 Canvas with 100% real-time client intelligence.**

[🚀 Explore Live Demo](#-quick-start) • [✨ Key Innovations](#-flagship-innovations) • [📱 Pages Showcase](#-pages--routes-architecture) • [🛠️ Tech Stack](#-technology-stack)

<br/>

<img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80" alt="EstateHub Luxury Real Estate" width="100%" style="border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.3);" />

</div>

---

## 🌟 Flagship Innovations & AI Features

### 1. 🎨 AI Interior Styler & Renovation Visualizer (`AiInteriorStyler.jsx`)
* **Interactive Before/After Split Comparison Slider**: Mouse & touch-draggable vertical divider revealing real-time AI architectural transformations over raw layouts.
* **5 Architectural Theme Filters with Live CSS Color LUTs**:
  * **Scandinavian Minimal**: Smoky European white oak, pure limewash, linen drapery.
  * **Neo-Classical Luxury**: Italian Statuario marble, brushed champagne brass, fluted walnut.
  * **Cyberpunk Midnight**: Acoustic obsidian slats, indirect violet-blue neon glows, tinted glass.
  * **Warm Earthy Boho**: Handcrafted rattan, terracotta clay tiles, lush botanical greenery.
  * **Urban Industrial Loft**: Exposed micro-concrete, powder-coated matte black steel, Edison warm filaments.
* **Room Selector**: Grand Living Lounge, Master Sanctuary Suite, Gourmet Chef's Kitchen, Skyline Sunset Terrace.
* **Turnkey Bill of Materials**: Instant calculation of materials, turnaround timelines, and turnkey budget estimates with sound haptics and canvas confetti.

---

### 2. 🎙️ Global AI Voice Commander & Hands-Free Navigator (`VoiceCommander.jsx`)
* Floating HUD on the bottom-left powered by the **Web Speech Recognition API** (`webkitSpeechRecognition`) and **Speech Synthesis API** (`speechSynthesis`).
* **Real-Time Audio Waveform Visualizer**: Animates frequency bars while listening to the user's voice.
* **Voice Speech Feedback**: The assistant **speaks replies aloud** in natural English!
* **Supported Voice Commands**:
  * *"Show luxury villas in Chandigarh"* / *"Show apartments in Mohali"*
  * *"Turn on dark mode"* / *"Switch to light mode"*
  * *"Switch currency to USD"* / *"Convert to Indian Rupees"*
  * *"Open valuation engine"* / *"Find my dream home"*
  * *"Scroll down"* / *"Scroll up"*

---

### 3. 📱 VIP Luxury Stories & Video Reels Bar (`PropertyStoriesBar.jsx`)
* **Instagram / Reels Style Interactive Stories Bar** with animated rotating gradient rings:
  * *Golf Penthouses (Chandigarh Sec 8)*
  * *Waterfront Mansions (Sukhna Enclave)*
  * *Aerocity Smart Towers (High ROI 7.2%)*
  * *Golf Course Ext. Mansions (Gurugram NCR)*
  * *Silicon Tech Sanctuaries (Whitefield, Bangalore)*
* **Fullscreen Immersive Reel Modal**:
  * Auto-advancing multi-segment progress timer bars (6s per story).
  * Tap left/right to navigate or use floating glass chevron controls.
  * Live pricing, specs chips, AD100 architect quotes, and direct 1-click **VIP Showcase CTA**.

---

### 4. 🎴 3D Mouse Parallax Tilt & Multi-Photo Carousel Cards (`PropertyCard.jsx`)
* **3D Parallax Tilt Physics**: Property cards smoothly rotate in 3D space (`perspective(1000px) rotateX(...) rotateY(...) translateY(-6px)`) following cursor coordinates with realistic specular reflections.
* **Multi-Photo Hover Carousel**: Hovering over any card reveals photo navigation arrows and active indicator dots so buyers can browse multiple property photos directly without leaving the catalog.
* **AI Match Score Badge**: Glowing `✨ 98% AI Match` pill and RERA title badges on every card.
* **Web Audio Haptics**: Subtle synthesizer clicks when favoriting, comparing, or flipping photos.

---

### 5. 📈 Continuous Market Ticker Marquee (`MarketTicker.jsx`)
* Real-time financial ticker bar at the top of the application with continuous smooth marquee animation:
  * `Chandigarh Sec 8-11`: ▲ `+9.2% YoY` (`₹14,800/sq.ft`)
  * `Mohali Aerocity`: ▲ `+15.4% YoY` (`₹6,950/sq.ft`)
  * `Gurugram Golf Course`: ▲ `+18.7% YoY` (`₹24,500/sq.ft`)
  * `RBI Repo Rate Benchmark`: ⏸ `6.50% Unchanged`
  * `Prime Home Loan Rates`: 📉 `8.35% p.a.`
* Clickable items open an instant **Market Liquidity & Confidence Analysis** modal.

---

### 6. 📄 Official 300 DPI Luxury PDF Brochure Generator (`PropertyBrochureModal.jsx`)
* 1-Click "Official Brochure (PDF)" generator available for any property listing.
* Formatted in high-end editorial prospectus layout:
  * Official EstateHub seal & verified RERA registration watermark
  * Full architectural specifications and price-per-sq.ft
  * 3-Year projected rental yields and 5-year capital appreciation
  * Hyperlocal connectivity matrix and Senior Advisor signature block
  * Live QR Code for instant digital tour verification
* **Print Stylesheet (`@media print`)**: Automatically formats the page into a crisp, multi-page 300 DPI printable document without web navigation.

---

### 7. 🍃 Hyperlocal Eco & Quality of Life (QoL) Telemetry Radar (`EcoQualityMeter.jsx`)
* Real-time environmental and civic indicators embedded into property detail pages:
  * **Air Quality Index (AQI)**: Animated health dial (e.g. 58 AQI Clean Air)
  * **WalkScore® Index**: 88–94/100 (Walker's Paradise)
  * **Acoustic Decibel Level**: 36 dB (Quiet Residential Oasis)
  * **Rooftop Solar Potential**: 8.6 kW system / ₹1,12,000 yearly power savings
  * **EV Fast Charging Network** & Gigabit Optical Fiber readiness

---

### 8. 🏦 Home Buying Affordability & Pre-Approval Engine (`AffordabilityCalculator.jsx`)
* Underwriting intelligence engine based on RBI banking benchmarks.
* Evaluates monthly in-hand salary, existing EMIs, savings down payment, CIBIL credit score (650-850), and tenure horizon.
* **Calculates**:
  * Maximum Qualified Loan Eligibility
  * Total Safe Property Purchasing Power
  * Debt-to-Income (DTI) Health Meter (Safe vs Moderate vs Risky)
* **Instant Pre-Approval Certificate**: Generates official bank partner pre-approval letter for sellers and loan underwriting.
* **Live Inventory Mapping**: Directly displays properties matching the calculated budget with 1-click links.

---

### 9. 🧠 AI Property Valuation & Price Prediction Engine (`/valuation`)
* Machine learning inspired valuation assessing circle rates, builder grade, age, and historical comps.
* Computes **Fair Market Value Range**, **Estimated Rate / Sq.Ft**, **Monthly Rental Potential**, and **3-Year Compounded Forecast Graph (SVG)**.
* Includes a 1-click **"Print Official Valuation Certificate"** feature.

---

### 10. ⚡ AI Property Matchmaker Quiz (`/matchmaker`)
* Interactive 4-step lifestyle, budget, and family stage quiz.
* Neural scoring algorithm calculates personalized matching percentages (e.g. `98% Match`) and ranks top 3 ideal properties.

---

### 11. 💬 Live Agent Messenger (`LiveAgentChat.jsx`)
* Direct iMessage/WhatsApp style instant messenger with assigned property advisors.
* Real-time simulated typing indicators and responses answering price negotiations, RERA checks, and brochure queries.

---

### 12. ☀️ Natural Sunlight & Shadow Simulator (`SunLightingSimulator.jsx`)
* Interactive time-of-day slider (5 AM Dawn to 10 PM Night).
* Dynamically shifts ambient sunlight warmth, shadows, and window illumination based on property facing orientation.

---

### 13. 📐 Interactive Architectural Floor Plan Viewer (`FloorPlanViewer.jsx`)
* Interactive 2D architectural blueprint with clickable room sections (Living Lounge, Master Suite, Kitchen, Balcony) and exact dimensions breakdown.

---

### 14. 🧭 Hyperlocal Transit Radar (`NeighborhoodRadar.jsx`)
* Real-time distance and travel time calculator to International Airport, Metro, Hospitals, Schools, Malls, and IT Parks across **Drive**, **Transit**, and **Walk** modes.

---

### 15. 🎟️ Real-Time Site Visit & Video Tour Scheduler (`SiteVisitModal.jsx`)
* In-person and live HD video tour slot scheduler with instant **Digital Entry Pass (ID: EH-XXXXXX)** generation and EV cab pick-up option.

---

### 16. 🤖 AI Property Assistant ("EstateBot") (`AiChatbot.jsx`)
* Floating intelligent property assistant in the bottom-right corner for natural-language property discovery, location searches, and automated EMI calculations.

---

### 17. 🗺️ Interactive Topographic Map View
* Interactive SVG map displaying clickable property price badges, zoom controls, and floating property previews.

---

### 18. 🌐 360° Virtual Walkthrough Simulator
* Interactive 360° room walkthrough simulator on `PropertyDetails` with mouse drag-to-pan, multi-room switcher, and clickable pulsating hotspots.

---

### 19. 📝 Multi-Step "List Your Property" Portal (`/list-property`)
* 4-Step wizard for homeowners and builders to publish properties live with real-time state and LocalStorage sync.

---

### 20. ⚖️ 3-Property Comparison Matrix (`CompareModal.jsx`)
* Compare up to 3 properties side-by-side with sticky comparison bar and detailed 10+ feature matrix.

---

### 21. 💱 Live Currency & Measurement Converter
* Instant live toggle between **INR (₹ Lakh/Crore)** and **USD ($)**, and **Sq.Ft** and **Sq.Yards** across the entire platform.

---

## 📱 Pages & Routes Architecture

| Route | Page | Purpose |
| :--- | :--- | :--- |
| `/` | **Home** | Hero, search autocomplete, VIP stories bar, trust metrics, 6 featured properties, top city explorer, AI innovation cards, testimonials, CTA. |
| `/properties` | **Properties Catalog** | Multi-facet sidebar filters (city, type, price brackets, BHK, amenities), dynamic sorting, active filter chips, **3 view modes (Grid, List, Map)**. |
| `/property/:id` | **Property Details** | Photo gallery, 360° tour, AI Interior Styler, specs, floor plan, neighborhood radar, eco quality meter, sunlight simulator, EMI & investment calculators, agent chat, brochure generator. |
| `/valuation` | **AI Valuation Engine** | Instant valuation estimator, pricing benchmarks, 3-year growth forecast, printable appraisal certificate. |
| `/matchmaker` | **AI Matchmaker Quiz** | 4-step lifestyle quiz with match percentage ranking. |
| `/list-property` | **List Property** | 4-step wizard to publish new listings live into state and `localStorage`. |
| `/favorites` | **Saved Favorites** | Shortlisted properties synced with `localStorage`. |
| `/agents` | **Our Advisors** | Verified advisor profiles with ratings, deals closed, and direct inquiry modals. |
| `/about` | **About Us** | Brand heritage, leadership, core pillars, and milestone counters. |
| `/contact` | **Contact** | Office locations, interactive form with validation, and accordion FAQs. |
| `/login` | **Authentication** | Glassmorphic login/register with 1-Click Instant Demo Login. |

---

## 🛠️ Technology Stack

* **Frontend**: HTML5, CSS3 (Custom Design System with CSS Variables), JavaScript (ES6+)
* **Framework**: React.js 18+, React Router v6
* **State Management**: React Context API + LocalStorage persistence
* **Web APIs**:
  * Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)
  * Web Audio API (Synthesizer audio chords)
  * HTML5 Canvas 2D (Particle confetti & rendering)
* **Icons**: Lucide React
* **Build Tool**: Vite 6.x

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Sanjay86767/Real-estate.git

# 2. Navigate to project directory
cd Real-estate

# 3. Install dependencies
npm install

# 4. Launch development server
npm run dev
```

Visit **`http://localhost:5173`** in your browser.

### Production Build

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute for educational and commercial purposes.

---

<div align="center">
  <sub>Engineered with passion by <b>EstateHub Team</b> • 2026</sub>
</div>
