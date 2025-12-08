import { body } from "express-validator";

export const userAddRoleValidation = [
    
    // 💡 التحقق من المستخدم الهدف (Target User ID)
    body("userId")
        .notEmpty().withMessage("يجب تحديد معرّف المستخدم المراد إضافة الدور له")
        .isInt().withMessage("معرف المستخدم يجب أن يكون رقماً صحيحاً"),

    // ✅ التحقق من الدور (Role)
    body("roleId")
        .notEmpty().withMessage("يجب اختيار الوظيفة")
        .isInt().withMessage("معرف الوظيفة يجب أن يكون رقماً صحيحاً"),

    // ✅ التحقق من القسم (Department)
    body("departmentId")
        .notEmpty().withMessage("يجب اختيار القسم")
        .isInt().withMessage("معرف القسم يجب أن يكون رقماً صحيحاً"),
];