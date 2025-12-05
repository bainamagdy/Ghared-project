import asyncWrapper from "../middelware/asyncwraper.js";
import httpStatusText from "../utils/httpStatusText.js";
import appError from "../utils/appError.js";
// لاحظي: استدعينا دالة جديدة اسمها GetUnreadCount
import { GetNotificationData, GetUnreadCount ,updateNotificationReadStatus} from "../data/notificationData.js"; 

export const getNotification = asyncWrapper(async (req, res, next) => {

    const userId = req.userId;

    // ✅ التأكد من وجود userId
    if (!userId) {
        const error = appError.create(
            "معرّف المستخدم مطلوب",
            400,
            httpStatusText.FAIL
        );
        return next(error);
    }

    // ✅ تنفيذ العمليتين معاً (جلب القائمة + جلب العدد)
    // استخدمنا await مرة واحدة عشان نضمن ان الداتا جت
    const notifications = await GetNotificationData(userId);
    const unreadCount = await GetUnreadCount(userId);

    // ✅ الرد النهائي (Response)
    return res.status(200).json({
        status: httpStatusText.SUCCESS, // "success"
        message: "تم جلب الإشعارات بنجاح",
        data: {
            unreadCount: unreadCount,    // العداد الأحمر (مثال: 5)
            notifications: notifications // قائمة الإشعارات نفسها
        }
    });

});



export const markAsRead = asyncWrapper(async (req, res, next) => {
    
    // 1. استخراج البيانات
    const notificationId = req.params.id; // جاي من الرابط /:id
    const userId = req.userId;            // جاي من التوكن (للحماية)

    // 2. استدعاء دالة التحديث
    const isUpdated = await updateNotificationReadStatus(notificationId, userId);

    // 3. التحقق من النتيجة
    if (!isUpdated) {
        // لو مفيش حاجة اتعدلت، ده معناه ان الاشعار مش موجود او مش بتاع اليوزر
        const error = appError.create(
            "الإشعار غير موجود أو لا تملك صلاحية تعديله",
            404,
            httpStatusText.FAIL
        );
        return next(error);
    }

    // 4. الرد بنجاح
    return res.status(200).json({
        status: httpStatusText.SUCCESS,
        message: "تم تحديث حالة الإشعار إلى مقروء",
        data: null 
    });
});

