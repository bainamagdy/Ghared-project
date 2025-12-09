// src/routes/AdminRoutes.js
import express from "express";
import { body, param } from "express-validator";
import { verifyToken } from "../middleware/verifyToken.js";
import { setCurrentUser } from "../middleware/setCurrentUser.js";
import { allowedTo } from "../middleware/AllowedTo.js";

import * as AdminController from "../controllers/AdminController.js";
import * as CollegeController from "../controllers/CollegeController.js";
import * as DepartmentController from "../controllers/DepartmentController.js";

import {
    addCollegeValidation,
    updateCollegeValidation,
    deleteCollegeValidation,
    getCollegeValidation,
    getDepartmentsByCollegeValidation,
    addDepartmentValidation,
    updateDepartmentValidation,
    deleteDepartmentValidation,
    getDepartmentValidation,
    getAllCollegesValidation,
    getAllDepartmentsValidation
} from "../middleware/collegeValidation.js";

const router = express.Router();

// ------------------- COLLEGES -------------------

// إنشاء كلية (Super Admin only)
router.post(
    "/colleges",
    verifyToken,
    setCurrentUser,
    allowedTo(0),
    addCollegeValidation,
    CollegeController.addCollege
);

// جلب كل الكليات
router.get(
    "/colleges",
    verifyToken,
    setCurrentUser,
    allowedTo(1, 0),
    getAllCollegesValidation,
    CollegeController.getColleges
);

// جلب كلية واحدة
router.get(
    "/colleges/:id",
    verifyToken,
    setCurrentUser,
    allowedTo(1, 0),
    getCollegeValidation,
    CollegeController.getCollegeById
);

// تحديث كلية
router.put(
    "/colleges/:id",
    verifyToken,
    setCurrentUser,
    allowedTo(0),
    updateCollegeValidation,
    CollegeController.updateCollege
);

// حذف كلية
router.delete(
    "/colleges/:id",
    verifyToken,
    setCurrentUser,
    allowedTo(0),
    deleteCollegeValidation,
    CollegeController.deleteCollege
);

// جلب أقسام كلية محددة
router.get(
    "/colleges/:collegeId/departments",
    verifyToken,
    setCurrentUser,
    allowedTo(1, 0),
    getDepartmentsByCollegeValidation,
    DepartmentController.getDepartmentsByCollege
);

// ------------------- DEPARTMENTS -------------------

// إنشاء قسم وربطه بكلية
router.post(
    "/departments",
    verifyToken,
    setCurrentUser,
    allowedTo(0),
    addDepartmentValidation,
    DepartmentController.addDepartment
);

// جلب كل الأقسام
router.get(
    "/departments",
    verifyToken,
    setCurrentUser,
    allowedTo(1, 0),
    getAllDepartmentsValidation,
    DepartmentController.getDepartments
);

// جلب قسم واحد
router.get(
    "/departments/:id",
    verifyToken,
    setCurrentUser,
    allowedTo(1, 0),
    getDepartmentValidation,
    DepartmentController.getDepartmentById
);

// تحديث قسم
router.put(
    "/departments/:id",
    verifyToken,
    setCurrentUser,
    allowedTo(0),
    updateDepartmentValidation,
    DepartmentController.updateDepartment
);

// حذف قسم
router.delete(
    "/departments/:id",
    verifyToken,
    setCurrentUser,
    allowedTo(0),
    deleteDepartmentValidation,
    DepartmentController.deleteDepartment
);

export default router;
