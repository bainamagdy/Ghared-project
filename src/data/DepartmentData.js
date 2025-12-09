// src/data/DepartmentData.js

import pool from "../config/db.js";

// 🔹 إنشاء قسم
export const addDepartment = async (department_name, department_type, college_id) => {
    const query = `
        INSERT INTO departments (department_name, department_type, college_id)
        VALUES ($1, $2, $3)
        RETURNING *`;
    const { rows } = await pool.query(query, [department_name, department_type, college_id]);
    return rows[0];
};

// 🔹 الحصول على قسم بالاسم والكلية (لمنع التكرار)
export const getDepartmentByNameAndCollege = async (name, college_id) => {
    const query = `SELECT * FROM departments WHERE department_name = $1 AND college_id = $2`;
    const { rows } = await pool.query(query, [name, college_id]);
    return rows[0];
};

// 🔹 الحصول على جميع الأقسام
export const getDepartments = async () => {
    const query = `SELECT d.*, c.college_name FROM departments d LEFT JOIN colleges c ON d.college_id = c.id ORDER BY d.id ASC`;
    const { rows } = await pool.query(query);
    return rows;
};

// 🔹 الحصول على قسم واحد
export const getDepartmentById = async (id) => {
    const query = `SELECT d.*, c.college_name FROM departments d LEFT JOIN colleges c ON d.college_id = c.id WHERE d.id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

// 🔹 تحديث قسم
export const updateDepartment = async (id, name, type) => {
    const query = `
        UPDATE departments
        SET department_name = $1, department_type = $2
        WHERE id = $3
        RETURNING *`;
    const { rows } = await pool.query(query, [name, type, id]);
    return rows[0];
};

// 🔹 حذف قسم
export const deleteDepartment = async (id) => {
    const query = `DELETE FROM departments WHERE id = $1 RETURNING *`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

// 🔹 جلب أقسام كلية معينة
export const getDepartmentsByCollege = async (collegeId) => {
    const query = `SELECT * FROM departments WHERE college_id = $1 ORDER BY id ASC`;
    const { rows } = await pool.query(query, [collegeId]);
    return rows;
};
