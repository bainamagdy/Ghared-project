import appError from "../utils/appError.js";
import httpStatusText from '../utils/httpStatusText.js';
const globalErrorHandler = (err, req, res, next) => {
    
    // --- (A) التعامل مع خطأ التكرار (Database Error) ---
    if (err.code === 11000) {
        
        // استخراج اسم الحقل (email/phone)
        const field = Object.keys(err.keyValue)[0];
        const message = `عفواً، الـ ${field} مستخدم بالفعل`;

        // 🔥 هنا النقطة المهمة:
        // احنا بنلغي الايرور القديم بتاع الداتا بيز، وبنعمل واحد جديد من الكلاس بتاعك
        const customError = appError.create(message, 400, httpStatusText.FAIL);
        
        // بنبدل الايرور الأصلي (err) بالايرور بتاعنا (customError)
        // عشان ينزل تحت ويتبعت بنفس الشكل الموحد
        err = customError;
    }

    // --- (B) التعامل مع أخطاء التحقق (Validation Error) - اختياري ---
    // لو عندك Mongoose Validations تانية غير الـ Unique
    if (err.name === 'ValidationError') {
         const message = Object.values(err.errors).map(val => val.message).join(', ');
         const customError = appError.create(message, 400, httpStatusText.FAIL);
         err = customError;
    }

    // --- (C) إرسال الرد النهائي ---
    // هنا بنستخدم القيم اللي جوا (err) سواء كانت جاية من الكونترولر أو احنا لسه محولينها فوق
    res.status(err.statusCode || 500).json({
        status: err.statusText || httpStatusText.ERROR,
        message: err.message || 'Something went wrong',
        code: err.statusCode || 500,
        data: null
    });
};

export default globalErrorHandler;
