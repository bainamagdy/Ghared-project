// src/utils/globalErrorHandler.js
import appError from "../utils/appError.js";
import httpStatusText from '../utils/httpStatusText.js';

const globalErrorHandler = (err, req, res, next) => {
    // handle PG unique violation
    if (err.code === '23505') {
        let message = 'هذا السجل موجود مسبقاً';
        if (err.detail) {
            const fieldNameMatch = err.detail.match(/\((.*?)\)/);
            if (fieldNameMatch && fieldNameMatch[1]) {
                const fieldName = fieldNameMatch[1];
                if (fieldName === 'email') {
                    message = 'عفواً، البريد الإلكتروني مسجل بالفعل لمستخدم آخر';
                } else if (fieldName === 'mobile_number' || fieldName === 'phone') {
                    message = 'عفواً، رقم الهاتف مسجل بالفعل لمستخدم آخر';
                } else {
                    message = `قيمة الـ (${fieldName}) مستخدمة بالفعل، يرجى استخدام قيمة أخرى`;
                }
            }
        }
        const customError = appError.create(message, 409, httpStatusText.FAIL);
        err = customError;
    }

    if (err.code === '22P02') {
        const message = "صيغة البيانات غير صحيحة (مثلاً إرسال نص في حقل رقمي)";
        const customError = appError.create(message, 400, httpStatusText.FAIL);
        err = customError;
    }

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
