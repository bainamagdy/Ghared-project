// src/app.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Routes
import transactionRoutes from "./routes/transactionRoutes.js";
import userRoutes from "./routes/userRouter.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";

// Utils & Middlewares
import httpStatusText from "./utils/httpStatusText.js";
import appError from "./utils/appError.js"; // استدعي كلاس الايرور عشان الـ 404
import globalErrorHandler from "./middelware/globalErrorMiddleware.js"; // تأكدي من سبيلنج middleware

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// ✅ 1. Middlewares الأساسية
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ 2. Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ 3. Routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/notifications", notificationRoutes); 
app.use("/api/Admin", AdminRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Server is running and ready!");
});

// ✅ 4. Handling 404 Routes (اختياري بس مهم جداً)
// عشان لو حد طلب مسار غلط، يروح للـ globalErrorHandler
// ✅ الحل الصحيح (Regular Expression)
app.all(/(.*)/, (req, res, next) => {
   // كود معالجة الخطأ بتاعك زي ما هو
   // مثال:
   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)); 
});

// ✅ 5. Global Error Handler (هو ده بس اللي بنسيبه)
// هو المسؤول عن هندلة الداتا بيز وارسال الرد النهائي
app.use(globalErrorHandler);

export default app;