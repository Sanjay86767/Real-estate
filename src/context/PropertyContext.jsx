import React, { createContext, useContext, useState, useEffect } from "react";
import propertiesData from "../data/properties";
import agentsData from "../data/agents";

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  // Properties: default + user-submitted custom properties from localStorage
  const [properties, setProperties] = useState(() => {
    try {
      const customProps = localStorage.getItem("estatehub_custom_properties");
      if (customProps) {
        const parsed = JSON.parse(customProps);
        return [...parsed, ...propertiesData];
      }
      return propertiesData;
    } catch (e) {
      return propertiesData;
    }
  });

  const [agents] = useState(agentsData);

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
      id: Date.now(),
      yearBuilt: newProperty.yearBuilt || new Date().getFullYear(),
      featured: false,
      agentId: 1
    };

    setProperties((prev) => {
      const updated = [formattedNewProp, ...prev];
      try {
        const customProps = JSON.parse(localStorage.getItem("estatehub_custom_properties") || "[]");
        localStorage.setItem("estatehub_custom_properties", JSON.stringify([formattedNewProp, ...customProps]));
      } catch (e) {
        console.error("Could not persist custom property", e);
      }
      return updated;
    });

    addToast(`"${formattedNewProp.title}" published live successfully! 🎉`, "success");
    return formattedNewProp.id;
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
        removeToast
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
