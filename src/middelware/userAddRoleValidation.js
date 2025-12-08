import { body } from "express-validator";

export const userAddRoleValidation = [
 


    body("roleId")
    .notEmpty().withMessage("يجب اختيار الوظيفة")
    .isInt().withMessage("معرف الوظيفة يجب أن يكون رقماً صحيحاً"),

  // ✅ التحقق من القسم (Department)
  body("departmentId")
    .notEmpty().withMessage("يجب اختيار القسم")
    .isInt().withMessage("معرف القسم يجب أن يكون رقماً صحيحاً"),

 
];
