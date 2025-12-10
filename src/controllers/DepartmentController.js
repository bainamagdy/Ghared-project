// src/controllers/DepartmentController.js

import * as Department from "../data/DepartmentData.js";
import * as College from "../data/CollegeData.js";
import asyncWrapper from "../middleware/asyncWrapper.js";
import appError from "../utils/appError.js";
import httpStatusText from "../utils/httpStatusText.js";
import { validationResult } from "express-validator";

// 📌 إنشاء قسم
export const addDepartment = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg).join("، ");
        return next(appError.create(errorMessages, 400, httpStatusText.FAIL));
    }

    const { department_name, college_id, department_type } = req.body;

    // التأكد إن الكلية موجودة
    const existingCollege = await College.getCollegeById(college_id);
    if (!existingCollege) {
        return next(appError.create("الكلية غير موجودة", 404, httpStatusText.FAIL));
    }

    // التأكد إن القسم مش موجود في الكلية دي
    const existing = await Department.getDepartmentByNameAndCollege(department_name, college_id);
    if (existing) {
        return next(appError.create("اسم القسم موجود بالفعل في هذه الكلية", 409, httpStatusText.FAIL));
    }

    const newDepartment = await Department.addDepartment(department_name, department_type, college_id);

    return res.status(201).json({
        status: httpStatusText.SUCCESS,
        message: "تم إضافة القسم بنجاح",
        data: newDepartment
    });
});

// 📌 جلب جميع الأقسام
export const getDepartments = asyncWrapper(async (req, res, next) => {
    const departments = await Department.getDepartments();
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        results: departments.length,
        data: departments
    });
});

// 📌 جلب قسم واحد
export const getDepartmentById = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    const department = await Department.getDepartmentById(id);
    if (!department) {
        return next(appError.create("القسم غير موجود", 404, httpStatusText.FAIL));
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: department
    });
});

// 📌 تحديث قسم
export const updateDepartment = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { department_name, department_type } = req.body;

    const updated = await Department.updateDepartment(id, department_name, department_type);

    if (!updated) {
        return next(appError.create("القسم غير موجود", 404, httpStatusText.FAIL));
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        message: "تم تحديث القسم بنجاح",
        data: updated
    });
});

// 📌 حذف قسم
export const deleteDepartment = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    const deleted = await Department.deleteDepartment(id);

    if (!deleted) {
        return next(appError.create("القسم غير موجود", 404, httpStatusText.FAIL));
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        message: "تم حذف القسم بنجاح"
    });
});

// 📌 جلب أقسام كلية معينة
export const getDepartmentsByCollege = asyncWrapper(async (req, res, next) => {
    const { collegeId } = req.params;

    const departments = await Department.getDepartmentsByCollege(collegeId);

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        results: departments.length,
        data: departments
    });
});
