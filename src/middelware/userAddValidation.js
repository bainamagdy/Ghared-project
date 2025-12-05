import { body } from "express-validator";

export const userAddValidation = [
 

  body("email")
    .isEmail().withMessage("يرجى إدخال بريد إلكتروني صحيح"),

  body("password")
    .isLength({ min: 6 }).withMessage("يجب أن تتكون كلمة المرور من 6 أحرف على الأقل"),

    body("roleId")
    .notEmpty().withMessage("يجب اختيار الوظيفة")
    .isInt().withMessage("معرف الوظيفة يجب أن يكون رقماً صحيحاً"),

  // ✅ التحقق من القسم (Department)
  body("departmentId")
    .notEmpty().withMessage("يجب اختيار القسم")
    .isInt().withMessage("معرف القسم يجب أن يكون رقماً صحيحاً"),

 
];
