import express from 'express';
import { getNotification, markAsRead } from '../controllers/notificationController.js'; 
import { verifyToken } from "../middelware/verifyToken.js";

const router = express.Router();

// 1. رابط جلب الإشعارات + العداد (للصفحة)
// الرابط النهائي هيكون: GET /api/notifications
router.get('/',verifyToken, getNotification);

// 2. رابط تحديث الإشعار إنه اتقرأ (لما يدوس عليه)
// الرابط النهائي هيكون: PUT /api/notifications/:id/read
// ملاحظة: لازم تكوني عامله دالة markAsRead في الكنترولر زي ما شرحنا قبل كده
router.put('/:id/read',verifyToken, markAsRead); 

export default router;