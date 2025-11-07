import jwt from "jsonwebtoken";
import httpStatusText from "../utils/httpStatusText.js";
import appError from "../utils/appError.js";

export const verifyToken = (req, res, next) => {
    const authentication = req.headers['authorization'] || req.headers['Authorization'];

    if (!authentication) {
        const error = appError.create("Token is required", 401, httpStatusText.ERROR);
        return next(error);
    }

    const token = authentication.split(' ')[1]; // "Bearer <token>"

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        const error = appError.create("Invalid token", 401, httpStatusText.ERROR);
        return next(error);
    }
};
