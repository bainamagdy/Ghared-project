// src/data/CollegeData.js

import pool from "../config/db.js";

// 🔹 إنشاء كلية
export const addCollege = async (college_name) => {
    const query = `
        INSERT INTO colleges (college_name)
        VALUES ($1)
        RETURNING *`;
    const { rows } = await pool.query(query, [college_name]);
    return rows[0];
};

// 🔹 الحصول على كلية بالاسم (لمنع التكرار)
export const getCollegeByName = async (name) => {
    const query = `SELECT * FROM colleges WHERE college_name = $1`;
    const { rows } = await pool.query(query, [name]);
    return rows[0];
};

// 🔹 الحصول على جميع الكليات
export const getColleges = async () => {
    const { rows } = await pool.query(`SELECT * FROM colleges ORDER BY id ASC`);
    return rows;
};

// 🔹 الحصول على كلية واحدة
export const getCollegeById = async (id) => {
    const query = `SELECT * FROM colleges WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

// 🔹 تحديث كلية
export const updateCollege = async (id, name) => {
    const query = `
        UPDATE colleges
        SET college_name = $1
        WHERE id = $2
        RETURNING *`;
    const { rows } = await pool.query(query, [name, id]);
    return rows[0];
};

// 🔹 حذف كلية
export const deleteCollege = async (id) => {
    const query = `DELETE FROM colleges WHERE id = $1 RETURNING *`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

// 🔹 جلب أقسام كلية معينة
export const getDepartmentsByCollege = async (collegeId) => {
    const query = `SELECT * FROM departments WHERE college_id = $1 ORDER BY id ASC`;
    const { rows } = await pool.query(query, [collegeId]);
    return rows;
};
