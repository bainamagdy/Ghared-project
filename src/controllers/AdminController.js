// controllers/AdminController.js
import pool from "../config/db.js";
import asyncWrapper from "../middleware/asyncWrapper.js";
import httpStatusText from "../utils/httpStatusText.js";
import appError from "../utils/appError.js";

// إضافة كلية جديدة
export const addCollege = asyncWrapper(async (req, res, next) => {
    const { college_name } = req.body;

    if (!college_name) {
        return next(appError.create("اسم الكلية مطلوب", 400, httpStatusText.FAIL));
    }

    const query = `
        INSERT INTO "College" (college_name)
        VALUES ($1)
        RETURNING college_id, college_name
    `;

    const result = await pool.query(query, [college_name]);

    return res.status(201).json({
        status: httpStatusText.SUCCESS,
        message: "تمت إضافة الكلية بنجاح",
        data: result.rows[0],
    });
});

// إضافة قسم جديد
export const addDepartment = asyncWrapper(async (req, res, next) => {
    const { department_name, college_id } = req.body;

    if (!department_name || !college_id) {
        return next(appError.create("اسم القسم ورقم الكلية مطلوبين", 400, httpStatusText.FAIL));
    }

    const query = `
        INSERT INTO "Department" (department_name, college_id)
        VALUES ($1, $2)
        RETURNING department_id, department_name, college_id
    `;

    const result = await pool.query(query, [department_name, college_id]);

    return res.status(201).json({
        status: httpStatusText.SUCCESS,
        message: "تمت إضافة القسم بنجاح",
        data: result.rows[0],
    });
});
