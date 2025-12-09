// src/middleware/setCurrentUser.js
import jwt from "jsonwebtoken";
import appError from "../utils/appError.js";

export const setCurrentUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        req.currentUser = null;
        return next();
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.currentUser = {
            id: decoded.id,
            email: decoded.email,
            roleLevel: decoded.roleLevel,
            roleName: decoded.roleName,
        };

        next();
    } catch (err) {
        req.currentUser = null;
        return next(appError.create("جلسة الدخول انتهت. يرجى تسجيل الدخول مجدداً.", 401));
    }
};
