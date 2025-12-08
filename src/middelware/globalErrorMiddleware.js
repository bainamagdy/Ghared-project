import appError from "../utils/appError.js";
import httpStatusText from '../utils/httpStatusText.js';

const globalErrorHandler = (err, req, res, next) => {
    
    // طباعة الخطأ في الكونسول للمساعدة في معرفة السبب لو حصلت مشكلة
    // console.error(err); 

    // ---------------------------------------------------------
    // (A) التعامل مع خطأ التكرار (PostgreSQL Unique Violation)
    // الكود '23505' هو الكود الخاص بوجود بيانات مكررة في بوستجريس
    // ---------------------------------------------------------
    if (err.code === '23505') {
        
        let message = 'هذا السجل موجود مسبقاً';

        // في Postgres، تفاصيل الخطأ تأتي في نص داخل err.detail
        // مثال: Key (email)=(test@test.com) already exists.
        // نستخدم Regex لاستخراج الكلمة التي بين القوسين (مثل email)
        
        if (err.detail) {
            const fieldName = err.detail.match(/\((.*?)\)/); 
            if (fieldName && fieldName[1]) {
                message = `قيمة الـ ${fieldName[1]} مستخدمة بالفعل، يرجى استخدام قيمة أخرى`;
            }
        }

        // تحويل الخطأ إلى 409 Conflict (الأنسب للتكرار)
        const customError = appError.create(message, 409, httpStatusText.FAIL);
        err = customError;
    }

    // ---------------------------------------------------------
    // (B) التعامل مع أخطاء المدخلات (PostgreSQL Invalid Syntax)
    // مثال: إرسال نص في حقل يتطلب رقم (مثل ID)
    // ---------------------------------------------------------
    if (err.code === '22P02') {
         const message = "صيغة البيانات غير صحيحة (مثلاً إرسال نص في حقل رقمي)";
         const customError = appError.create(message, 400, httpStatusText.FAIL);
         err = customError;
    }

    // ---------------------------------------------------------
    // (C) إرسال الرد النهائي (JSON)
    // ---------------------------------------------------------
    const statusCode = err.statusCode || 500;
    const statusText = err.statusText || httpStatusText.ERROR;
    const errorMessage = err.message || 'Something went wrong';

    res.status(statusCode).json({
        status: statusText,
        message: errorMessage,
        code: statusCode,
        data: null
    });
};

export default globalErrorHandler;