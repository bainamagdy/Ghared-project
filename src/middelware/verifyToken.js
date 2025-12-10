import jwt from 'jsonwebtoken';
import appError from '../utils/appError.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access token required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        // Normalized fields used across the codebase
        req.user = decoded;

        // populate currentUser for allowedTo / setCurrentUser compatibility
        req.currentUser = {
            id: decoded.id,
            email: decoded.email,
            roleLevel: (decoded.roleLevel ?? decoded.role) || decoded.level || null,
            roleName: (decoded.roleName ?? decoded.role) || null
        };

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export { verifyToken };
