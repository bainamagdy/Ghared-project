import appError from '../utils/appError.js';

export const allowedTo = (...roles) => {
    return (req, res, next) => {
        if (!req.currentUser) {
            return next(appError.create('الرجاء تسجيل الدخول أولاً', 401));
        }

        if (!roles.includes(req.currentUser?.roleLevel || req.user?.roleLevel)) {
            return next(appError.create('ليس لديك الصلاحية لإضافة مسؤول', 403));
        }
        next();
    }
}
