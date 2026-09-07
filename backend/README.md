# 🏰 EstateHub - MERN Stack Backend API

Node.js, Express, and MongoDB backend for EstateHub Luxury PropTech.

## 🚀 Quick Start

### 1. Start Server
```bash
cd backend
npm run dev
```
The server will run on `http://localhost:5000`.

### 2. Connect to MongoDB Atlas (Cloud)
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Get your connection string: `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/estatehub?retryWrites=true&w=majority`
3. Open `backend/.env` and set:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/estatehub?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key
   ```
4. Run the one-click seeder to populate all 57+ luxury properties and certified agents:
   ```bash
   npm run seed
   ```

*(Note: Even without a MongoDB Atlas account, the backend features an auto-reconnecting MERN fallback so all APIs, property creations, bookings, and searches work out of the box!)*

## 📡 REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check & MongoDB connection status |
| `GET` | `/api/properties` | List properties with query filters (`search`, `city`, `type`, `minPrice`, `maxPrice`, `bedrooms`, `sort`) |
| `GET` | `/api/properties/:id` | Get single property dossier |
| `POST` | `/api/properties` | Create new property (Owner / Agent listing) |
| `POST` | `/api/properties/seed` | Auto-seed properties to MongoDB |
| `POST` | `/api/auth/register` | Register new user (Buyer, Seller, Agent) |
| `POST` | `/api/auth/login` | Login and get JWT token |
| `GET` | `/api/auth/me` | Get authenticated user profile |
| `GET` | `/api/visits` | Get scheduled inspection visits |
| `POST` | `/api/visits` | Schedule a VIP inspection tour |
| `DELETE` | `/api/visits/:id` | Cancel inspection visit |
| `GET` | `/api/deals` | Get Deal Desk active LOIs & offers |
| `POST` | `/api/deals` | Submit Deal Desk LOI offer |
| `PATCH` | `/api/deals/:id/status` | Update offer status (Under Review, Accepted, Countered) |
| `GET` | `/api/agents` | Get verified RERA advisory agents |
