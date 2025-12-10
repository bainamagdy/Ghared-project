import pool from './src/config/db.js';

async function updateAdmin() {
    const query = `
    UPDATE "User_Membership"
    SET dep_role_id = 1, roleLevel = 0
    WHERE user_id = (SELECT user_id FROM "User" WHERE email = 'admin@example.com')
  `;
    await pool.query(query);
    console.log('User updated to admin');
    process.exit(0);
}

updateAdmin().catch(console.error);
