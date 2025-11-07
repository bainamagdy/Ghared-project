// src/app.js
import express from "express";
import cors from "cors";
import transactionRoutes from "./routes/transactionRoutes.js";

import userRoutes from "./routes/userRouter.js";
import httpStatusText from "./utils/httpStatusText.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();



app.use("/api/users", userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});



// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Server is running and ready!");
});

export default app;