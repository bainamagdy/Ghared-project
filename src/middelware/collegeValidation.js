// src/middleware/collegeValidation.js
import { body, param } from "express-validator";

// College Validations
export const addCollegeValidation = [
    body("college_name").notEmpty().withMessage("اسم الكلية مطلوب")
];

export const updateCollegeValidation = [
    param("id").isInt().withMessage("معرف الكلية يجب أن يكون رقمًا"),
    body("college_name").notEmpty().withMessage("اسم الكلية مطلوب")
];

export const deleteCollegeValidation = [
    param("id").isInt().withMessage("معرف الكلية يجب أن يكون رقمًا")
];

export const getCollegeValidation = [
    param("id").isInt().withMessage("معرف الكلية يجب أن يكون رقمًا")
];

export const getDepartmentsByCollegeValidation = [
    param("collegeId").isInt().withMessage("معرف الكلية يجب أن يكون رقم")
];

// Department Validations
export const addDepartmentValidation = [
    body("department_name").notEmpty().withMessage("اسم القسم مطلوب"),
    body("college_id").isInt().withMessage("معرف الكلية يجب أن يكون رقمًا"),
    body("department_type").optional().isString()
];

export const updateDepartmentValidation = [
    param("id").isInt().withMessage("معرف القسم يجب أن يكون رقمًا"),
    body("department_name").notEmpty().withMessage("اسم القسم مطلوب"),
    body("department_type").optional().isString()
];

export const deleteDepartmentValidation = [
    param("id").isInt().withMessage("معرف القسم يجب أن يكون رقمًا")
];

export const getDepartmentValidation = [
    param("id").isInt().withMessage("معرف القسم يجب أن يكون رقمًا")
];

// جديد: validations للـ GET requests (يمكن أن تكون فارغة)
export const getAllCollegesValidation = [];
export const getAllDepartmentsValidation = [];
