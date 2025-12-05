// src/app.js
import express from "express";
import cors from "cors";
import transactionRoutes from "./routes/transactionRoutes.js";
import userRoutes from "./routes/userRouter.js";
import httpStatusText from "./utils/httpStatusText.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js"
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// ✅ Middlewares أولاً
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes بعد الـ middlewares
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/notifications", notificationRoutes); 
app.use("/api/Admin",AdminRoutes)


app.get("/", (req, res) => {
  res.send("🚀 Server is running and ready!");
});

// ✅ Error handler آخر حاجة
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});

export default app;

// src/app.js 
