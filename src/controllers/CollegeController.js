// src/controllers/CollegeController.js

import * as College from "../data/CollegeData.js";
import asyncWrapper from "../middleware/asyncWrapper.js";
import appError from "../utils/appError.js";
import httpStatusText from "../utils/httpStatusText.js";
import { validationResult } from "express-validator";

// 📌 إنشاء كلية
export const addCollege = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg).join("، ");
        return next(appError.create(errorMessages, 400, httpStatusText.FAIL));
    }

    const { college_name } = req.body;

    // التأكد إن الكلية مش موجودة
    const existing = await College.getCollegeByName(college_name);
    if (existing) {
        return next(appError.create("اسم الكلية موجود بالفعل", 409, httpStatusText.FAIL));
    }

    const newCollege = await College.addCollege(college_name);

    return res.status(201).json({
        status: httpStatusText.SUCCESS,
        message: "تم إضافة الكلية بنجاح",
        data: newCollege
    });
});

// 📌 جلب جميع الكليات
export const getColleges = asyncWrapper(async (req, res, next) => {
    const colleges = await College.getColleges();
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        results: colleges.length,
        data: colleges
    });
});

// 📌 جلب كلية واحدة
export const getCollegeById = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    const college = await College.getCollegeById(id);
    if (!college) {
        return next(appError.create("الكلية غير موجودة", 404, httpStatusText.FAIL));
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: college
    });
});

// 📌 تحديث كلية
export const updateCollege = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { college_name } = req.body;

    const updated = await College.updateCollege(id, college_name);

    if (!updated) {
        return next(appError.create("الكلية غير موجودة", 404, httpStatusText.FAIL));
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        message: "تم تحديث الكلية بنجاح",
        data: updated
    });
});

// 📌 حذف كلية
export const deleteCollege = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    const deleted = await College.deleteCollege(id);

    if (!deleted) {
        return next(appError.create("الكلية غير موجودة", 404, httpStatusText.FAIL));
    }

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        message: "تم حذف الكلية بنجاح"
    });
});

// 📌 جلب أقسام كلية معينة
export const getDepartmentsByCollege = asyncWrapper(async (req, res, next) => {
    const { collegeId } = req.params;

    const departments = await College.getDepartmentsByCollege(collegeId);

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        results: departments.length,
        data: departments
    });
});
