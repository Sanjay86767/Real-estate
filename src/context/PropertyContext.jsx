import React, { createContext, useContext, useState, useEffect } from "react";
import propertiesData from "../data/properties";
import agentsData from "../data/agents";
import { translations } from "../data/translations";
import apiService from "../services/api";

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  // Properties: default + user-submitted custom properties from localStorage
  const [properties, setProperties] = useState(() => {
    try {
      const customProps = localStorage.getItem("estatehub_custom_properties");
      if (customProps) {
        const parsed = JSON.parse(customProps);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Validate that parsed entries have required fields and mark them as custom
          const validCustom = parsed
            .filter((p) => p && p.id && p.title)
            .map((p) => ({ ...p, isCustom: true, featured: true }));
          if (validCustom.length > 0) {
            return [...validCustom, ...propertiesData];
          }
        }
      }
      return propertiesData;
    } catch (e) {
      console.warn("EstateHub: Clearing corrupted custom properties from localStorage");
      try { localStorage.removeItem("estatehub_custom_properties"); } catch (_) {}
      return propertiesData;
    }
  });

  const [agents] = useState(agentsData);

  // MERN Backend Status state
  const [backendStatus, setBackendStatus] = useState({
    status: "checking",
    mode: "Connecting to MERN...",
    connected: false
  });

  useEffect(() => {
    let isMounted = true;
    apiService.getHealth().then((res) => {
      if (!isMounted) return;
      if (res && res.status === "online") {
        setBackendStatus({
          status: "online",
          mode: res.database?.mode || "Node.js + MongoDB API",
          connected: res.database?.connected || false,
        });
      } else {
        setBackendStatus({
          status: "offline",
          mode: "Client Local Fallback",
          connected: false,
        });
      }
    });
    return () => { isMounted = false; };
  }, []);

  // Language: 'en' | 'hi' (persisted in localStorage)
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem("estatehub_lang") || "en";
    } catch (e) {
      return "en";
    }
  });

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === "en" ? "hi" : "en";
      try {
        localStorage.setItem("estatehub_lang", next);
      } catch (_) {}
      return next;
    });
  };

  // Translation helper
  const t = (key) => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    return key;
  };

  // Favorites (persisted in localStorage)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("estatehub_favorites");
      return saved ? JSON.parse(saved) : [1, 3]; // Default initial favorites for demo
    } catch (e) {
      return [1, 3];
    }
  });

  // Dark Mode (persisted in localStorage)
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("estatehub_theme");
      if (saved) return saved === "dark";
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch (e) {
      return false;
    }
  });

  // Auth User (persisted in localStorage)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("estatehub_user");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Scheduled Site Visits (persisted in localStorage)
  const [scheduledVisits, setScheduledVisits] = useState(() => {
    try {
      const saved = localStorage.getItem("estatehub_scheduled_visits");
      if (saved) return JSON.parse(saved);
      return [
        {
          id: "sv-1",
          propertyId: 1,
          propertyTitle: "Imperial Skyline Penthouse",
          location: "Worli Sea Face, Mumbai",
          date: "2026-09-12",
          time: "11:30 AM",
          agentName: "Vikramaditya Oberoi",
          agentPhone: "+91 98200 11223",
          status: "Confirmed",
          type: "VIP Private Inspection",
          createdDate: "2026-09-06"
        },
        {
          id: "sv-2",
          propertyId: 2,
          propertyTitle: "Raj Darbhanga Royal Heritage Kothi",
          location: "Kameshwari Complex, Darbhanga",
          date: "2026-09-15",
          time: "03:00 PM",
          agentName: "Sanjay Kumar (Founder Desk)",
          agentPhone: "+91 99312 87654",
          status: "Confirmed",
          type: "Architectural Heritage Walk",
          createdDate: "2026-09-07"
        }
      ];
    } catch (e) {
      return [];
    }
  });

  // Active Deals & Offers (persisted in localStorage)
  const [offers, setOffers] = useState(() => {
    try {
      const saved = localStorage.getItem("estatehub_active_offers");
      if (saved) return JSON.parse(saved);
      return [
        {
          id: "off-8910",
          propertyId: 1,
          propertyTitle: "Imperial Skyline Penthouse, Worli",
          askingPrice: 185000000,
          offerPrice: 177500000,
          deposit: 15000000,
          timeline: "30 Days",
          status: "Under Review",
          probability: "84%",
          date: "2026-09-06",
          loiCode: "LOI-ESTATE-MUM-2026-8910"
        }
      ];
    } catch (e) {
      return [];
    }
  });

  // Global search filters passed from Hero search to /properties
  const [heroSearchFilters, setHeroSearchFilters] = useState({
    location: "",
    type: "",
    priceRange: "",
    bedrooms: ""
  });

  // Property Comparison List (up to 3 properties)
  const [compareList, setCompareList] = useState([]);

  // Live Currency ('INR' | 'USD') and Unit ('sqft' | 'sqyd')
  const [currency, setCurrency] = useState("INR");
  const [unit, setUnit] = useState("sqft");

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync scheduled visits
  useEffect(() => {
    try {
      localStorage.setItem("estatehub_scheduled_visits", JSON.stringify(scheduledVisits));
    } catch (e) {
      console.error("Could not save scheduled visits", e);
    }
  }, [scheduledVisits]);

  // Sync active offers
  useEffect(() => {
    try {
      localStorage.setItem("estatehub_active_offers", JSON.stringify(offers));
    } catch (e) {
      console.error("Could not save offers", e);
    }
  }, [offers]);

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("estatehub_favorites", JSON.stringify(favorites));
    } catch (e) {
      console.error("Could not save favorites", e);
    }
  }, [favorites]);

  // Sync Dark Mode to DOM and localStorage
  useEffect(() => {
    try {
      localStorage.setItem("estatehub_theme", darkMode ? "dark" : "light");
      if (darkMode) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }
    } catch (e) {
      console.error("Could not set theme", e);
    }
  }, [darkMode]);

  // Sync User to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("estatehub_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("estatehub_user");
      }
    } catch (e) {
      console.error("Could not sync user", e);
    }
  }, [user]);

  const toggleFavorite = (propertyId) => {
    const numericId = Number(propertyId);
    const prop = properties.find((p) => p.id === numericId);
    const title = prop ? prop.title : "Property";

    if (favorites.includes(numericId)) {
      setFavorites((prev) => prev.filter((id) => id !== numericId));
      addToast(`"${title}" removed from favorites`, "info");
    } else {
      setFavorites((prev) => [...prev, numericId]);
      addToast(`"${title}" added to favorites ❤️`, "success");
    }
  };

  const isFavorite = (propertyId) => {
    return favorites.includes(Number(propertyId));
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    addToast("All favorites cleared", "info");
  };

  // Compare Feature
  const toggleCompare = (propertyId) => {
    const numericId = Number(propertyId);
    if (compareList.includes(numericId)) {
      setCompareList((prev) => prev.filter((id) => id !== numericId));
      addToast("Removed from comparison list", "info");
    } else {
      if (compareList.length >= 3) {
        addToast("You can compare maximum 3 properties at a time", "warning");
        return;
      }
      setCompareList((prev) => [...prev, numericId]);
      addToast("Added to property comparison! Click 'Compare' below to view", "success");
    }
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  // Schedule visit action
  const scheduleVisit = (visitData) => {
    const newVisit = {
      id: "sv-" + Date.now(),
      createdDate: new Date().toISOString().split("T")[0],
      status: "Confirmed",
      ...visitData
    };
    setScheduledVisits((prev) => [newVisit, ...prev]);
    // Asynchronously sync with MERN backend
    apiService.createVisit(newVisit).catch(err => console.warn("API Visit sync:", err));
    addToast(`Site inspection confirmed for ${newVisit.date} at ${newVisit.time}!`, "success");
    return newVisit;
  };

  const cancelVisit = (visitId) => {
    setScheduledVisits((prev) => prev.filter((v) => v.id !== visitId));
    apiService.cancelVisit(visitId).catch(err => console.warn("API Cancel sync:", err));
    addToast("Inspection visit cancelled", "info");
  };

  // Deal Desk Offer submit
  const submitOffer = (offerData) => {
    const newOffer = {
      id: "off-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().split("T")[0],
      status: "Under Review",
      loiCode: `LOI-ESTATE-${Date.now().toString().slice(-6)}`,
      ...offerData
    };
    setOffers((prev) => [newOffer, ...prev]);
    // Asynchronously sync with MERN backend
    apiService.createDeal(newOffer).catch(err => console.warn("API Deal sync:", err));
    addToast(`Offer submitted! LOI Term Sheet generated: ${newOffer.loiCode}`, "success");
    return newOffer;
  };

  const updateOfferStatus = (offerId, newStatus) => {
    setOffers((prev) =>
      prev.map((off) => (off.id === offerId ? { ...off, status: newStatus } : off))
    );
    apiService.updateDealStatus(offerId, newStatus).catch(err => console.warn("API Deal update:", err));
    addToast(`Offer status updated to ${newStatus}`, "info");
  };

  // Format Price based on real-time currency
  const formatPrice = (amount) => {
    if (!amount) return "Price on Request";
    if (currency === "USD") {
      const usdAmount = Math.round(amount / 83.5);
      return `$${usdAmount.toLocaleString("en-US")}`;
    }
    // Default INR format
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Crore`;
    }
    if (amount >= 100000) {
      return `₹${Math.round(amount / 100000)} Lakh`;
    }
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  // Format Area based on real-time unit
  const formatArea = (areaSqft) => {
    if (!areaSqft) return "N/A";
    if (unit === "sqyd") {
      return `${Math.round(areaSqft / 9)} sq.yd`;
    }
    return `${areaSqft} sq.ft`;
  };

  // Add New Property dynamically (List Property Feature)
  const addCustomProperty = (newProperty) => {
    const formattedNewProp = {
      ...newProperty,
      id: newProperty.id || Date.now(),
      yearBuilt: newProperty.yearBuilt || new Date().getFullYear(),
      featured: true,
      isCustom: true,
      isNew: true,
      createdAt: new Date().toISOString(),
      agentId: newProperty.agentId || 1
    };

    setProperties((prev) => {
      const filtered = prev.filter((p) => p.id !== formattedNewProp.id);
      const updated = [formattedNewProp, ...filtered];
      try {
        const customProps = JSON.parse(localStorage.getItem("estatehub_custom_properties") || "[]");
        const existingFiltered = customProps.filter((p) => p.id !== formattedNewProp.id);
        localStorage.setItem("estatehub_custom_properties", JSON.stringify([formattedNewProp, ...existingFiltered]));
      } catch (e) {
        console.error("Could not persist custom property", e);
      }
      return updated;
    });

    // Asynchronously save to MERN MongoDB
    apiService.createProperty(formattedNewProp).catch(err => console.warn("API Property sync:", err));

    addToast(`"${formattedNewProp.title}" published live successfully! 🎉`, "success");
    return formattedNewProp.id;
  };

  // Delete Custom Property (User-added property)
  const deleteCustomProperty = (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    try {
      const customProps = JSON.parse(localStorage.getItem("estatehub_custom_properties") || "[]");
      const updated = customProps.filter((p) => p.id !== id);
      localStorage.setItem("estatehub_custom_properties", JSON.stringify(updated));
    } catch (e) {
      console.error("Could not remove custom property", e);
    }
    addToast("Property listing removed successfully", "info");
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const loginUser = (userData) => {
    setUser(userData);
    addToast(`Welcome back, ${userData.name}!`, "success");
  };

  const logoutUser = () => {
    setUser(null);
    addToast("Logged out successfully", "info");
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        agents,
        addCustomProperty,
        deleteCustomProperty,
        favorites,
        toggleFavorite,
        isFavorite,
        clearAllFavorites,
        compareList,
        toggleCompare,
        clearCompare,
        currency,
        setCurrency,
        unit,
        setUnit,
        formatPrice,
        formatArea,
        darkMode,
        toggleTheme,
        user,
        loginUser,
        logoutUser,
        heroSearchFilters,
        setHeroSearchFilters,
        toasts,
        addToast,
        removeToast,
        language,
        setLanguage,
        toggleLanguage,
        t,
        scheduledVisits,
        scheduleVisit,
        cancelVisit,
        offers,
        submitOffer,
        updateOfferStatus,
        backendStatus
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("usePropertyContext must be used within a PropertyProvider");
  }
  return context;
};

export default PropertyContext;
