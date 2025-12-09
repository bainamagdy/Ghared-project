// src/controllers/authController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const register = async (req, res) => {
    const { name, email, password, role = "user", level = 2, department = null } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const exists = await findUserByEmail(email);
    if (exists) return res.status(400).json({ error: "Email already exists" });

    const user = await createUser(name, email, password, role, level, department);
    res.status(201).json({ message: "Registered successfully", user });
};

export const login = async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) return res.status(400).json({ error: "Invalid email or password" });

    // Validate role selection: if provided, must match user's role
    const selectedRole = role || user.role;
    if (role && role !== user.role) {
        return res.status(400).json({ error: "Invalid role selection" });
    }

    const token = jwt.sign({ id: user.id, role: selectedRole, email: user.email, roleLevel: user.level, roleName: selectedRole }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ message: "Login successful", user: { id: user.id, email: user.email, role: selectedRole }, token });
};
