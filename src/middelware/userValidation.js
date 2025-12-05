import { body } from "express-validator";

export const userValidation = [
  body("fullName")
    .notEmpty().withMessage("الاسم الكامل مطلوب")
    .isLength({ min: 3 }).withMessage("يجب أن يحتوي الاسم الكامل على 3 أحرف على الأقل"),

  body("email")
    .isEmail().withMessage("يرجى إدخال بريد إلكتروني صحيح"),

  body("password")
    .isLength({ min: 6 }).withMessage("يجب أن تتكون كلمة المرور من 6 أحرف على الأقل"),

  body("mobileNumber")
    .isNumeric().withMessage("يجب أن يحتوي رقم الهاتف على أرقام فقط")
    .isLength({ min: 10, max: 15 }).withMessage("طول رقم الهاتف غير صحيح"),
];
