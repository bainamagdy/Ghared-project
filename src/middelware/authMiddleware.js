// src/middleware/authMiddleware.js
import { verifyToken } from './verifyToken.js';

// simple alias to keep compatibility with code that imports protect
export const protect = (req, res, next) => {
    // delegate to verifyToken middleware
    return verifyToken(req, res, next);
};

export default protect;
