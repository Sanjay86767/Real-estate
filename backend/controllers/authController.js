import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getDbStatus } from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "estatehub_super_secret_jwt_key_2026";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: "30d" });
};

// In-memory fallback users
const inMemoryUsers = [
  {
    _id: "mem-user-1",
    name: "Sanjay Kumar",
    email: "sanjay@estatehub.in",
    password: "$2a$10$abcdefghijklmnopqrstuvwxyz123456", // dummy hash
    role: "admin",
    phone: "+91 8809604880",
    favorites: [1, 2, 3],
  },
];

// @desc    Register a new user
// @route   POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password, role = "buyer", phone } = req.body;
    const { connected } = getDbStatus();

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please provide name, email, and password" });
    }

    if (connected) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ success: false, message: "User with this email already exists" });
      }

      const user = await User.create({ name, email, password, role, phone });
      const token = generateToken(user._id, user.role);

      return res.status(201).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          favorites: user.favorites,
        },
      });
    }

    // In-memory register
    const existing = inMemoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ success: false, message: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      _id: `mem-user-${Date.now()}`,
      name,
      email,
      password: hashedPassword,
      role,
      phone: phone || "",
      favorites: [],
    };
    inMemoryUsers.push(newUser);

    const token = generateToken(newUser._id, newUser.role);
    return res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
        favorites: newUser.favorites,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login user & get token
// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { connected } = getDbStatus();

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    if (connected) {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }

      const token = generateToken(user._id, user.role);

      return res.json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          favorites: user.favorites,
        },
      });
    }

    // In-memory login
    const user = inMemoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      // Allow seamless guest/admin demo login
      const demoToken = generateToken("demo-user", "buyer");
      return res.json({
        success: true,
        token: demoToken,
        user: {
          id: "demo-user",
          name: email.split("@")[0] || "Estate Investor",
          email,
          role: "buyer",
          phone: "+91 98000 00000",
          favorites: [1, 2],
        },
      });
    }

    const token = generateToken(user._id, user.role);
    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        favorites: user.favorites,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected && req.user) {
      const user = await User.findById(req.user.id);
      return res.json({ success: true, user });
    }
    return res.json({ success: true, user: req.user || null });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
