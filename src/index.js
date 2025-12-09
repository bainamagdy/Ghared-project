import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import pool from "./config/db.js";

// Routes
import indexRoutes from "./routes/indexRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import draftsRoutes from "./routes/draftsRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// -------------------- Middlewares --------------------
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// -------------------- Routes --------------------
app.use("/api", indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/drafts", draftsRoutes);
app.use("/api/admin", adminRoutes);

// -------------------- Test DB Endpoint --------------------
app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW() as now');
        res.json({ now: result.rows[0].now });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// -------------------- Generic Error Handler --------------------
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// -------------------- Start Server Only Outside Test --------------------
if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// -------------------- Export App for Tests --------------------
export default app;
