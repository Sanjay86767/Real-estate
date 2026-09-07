/**
 * EstateHub Full-Stack API Service
 * Connects frontend to the Node.js + Express + MongoDB backend
 * Features automatic fallback for 100% resilient offline experience
 */

const API_BASE = "/api";

export const apiService = {
  // Health & Database Probe
  async getHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      if (!res.ok) throw new Error("Backend not responding");
      return await res.json();
    } catch (err) {
      console.warn("MERN Backend offline or unreachable, using client store:", err.message);
      return { status: "offline", mode: "client-local" };
    }
  },

  // Properties API
  async getProperties(params = {}) {
    try {
      const query = new URLSearchParams();
      if (params.search) query.append("search", params.search);
      if (params.type && params.type !== "All") query.append("type", params.type);
      if (params.city && params.city !== "All") query.append("city", params.city);
      if (params.minPrice) query.append("minPrice", params.minPrice);
      if (params.maxPrice) query.append("maxPrice", params.maxPrice);
      if (params.bedrooms && params.bedrooms !== "All") query.append("bedrooms", params.bedrooms);
      if (params.sort) query.append("sort", params.sort);
      if (params.featured) query.append("featured", "true");

      const queryString = query.toString();
      const url = `${API_BASE}/properties${queryString ? `?${queryString}` : ""}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch properties from server");
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      console.warn("Using local properties fallback:", err.message);
      return null; // Signals context to use local memory/localStorage
    }
  },

  async getPropertyById(id) {
    try {
      const res = await fetch(`${API_BASE}/properties/${id}`);
      if (!res.ok) throw new Error("Property not found on server");
      const data = await res.json();
      return data.data;
    } catch (err) {
      return null;
    }
  },

  async createProperty(propertyData) {
    try {
      const res = await fetch(`${API_BASE}/properties`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propertyData),
      });
      if (!res.ok) throw new Error("Failed to post property to backend");
      return await res.json();
    } catch (err) {
      console.warn("Backend unavailable, persisting property locally:", err.message);
      return null;
    }
  },

  async deleteProperty(id) {
    try {
      const res = await fetch(`${API_BASE}/properties/${id}`, { method: "DELETE" });
      return await res.json();
    } catch (err) {
      console.warn("Error deleting property:", err);
      return { success: false, message: err.message };
    }
  },

  async updatePropertyStatus(id, status) {
    try {
      const res = await fetch(`${API_BASE}/properties/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async getAnalytics() {
    try {
      const res = await fetch(`${API_BASE}/properties/analytics`);
      if (!res.ok) throw new Error("Failed to fetch analytics");
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async seedDatabase() {
    try {
      const res = await fetch(`${API_BASE}/properties/seed`, { method: "POST" });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  // Visits API
  async getVisits() {
    try {
      const res = await fetch(`${API_BASE}/visits`);
      if (!res.ok) throw new Error("Failed to fetch visits");
      const data = await res.json();
      return data.data;
    } catch (err) {
      return null;
    }
  },

  async createVisit(visitData) {
    try {
      const res = await fetch(`${API_BASE}/visits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visitData),
      });
      if (!res.ok) throw new Error("Failed to create visit");
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async cancelVisit(id) {
    try {
      const res = await fetch(`${API_BASE}/visits/${id}`, { method: "DELETE" });
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Deals / Offers API
  async getDeals() {
    try {
      const res = await fetch(`${API_BASE}/deals`);
      if (!res.ok) throw new Error("Failed to fetch deals");
      const data = await res.json();
      return data.data;
    } catch (err) {
      return null;
    }
  },

  async createDeal(dealData) {
    try {
      const res = await fetch(`${API_BASE}/deals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dealData),
      });
      if (!res.ok) throw new Error("Failed to create deal offer");
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  async updateDealStatus(id, status) {
    try {
      const res = await fetch(`${API_BASE}/deals/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // Auth API
  async login(credentials) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async register(userData) {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: err.message };
    }
  },
};

export default apiService;
