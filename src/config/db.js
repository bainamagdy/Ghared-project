// src/config/db.jsس
import pg from "pg";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// تحديد المسار الصحيح لملف .env
dotenv.config({ path: path.join(__dirname, '../../.env') });

const { Pool } = pg;

// التحقق من قراءة المتغيرات البيئية


export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),
  port: parseInt(process.env.DB_PORT, 10),
  // 💡 التعديل هنا: إضافة إعدادات SSL
  ssl: {
    rejectUnauthorized: false
    // في بيئات الاستضافة السحابية مثل Railway/Neon، غالبًا ما تكون الشهادة ذاتية التوقيع (self-signed)، 
    // لذا يتم تعيين rejectUnauthorized إلى false لتجاوز التحقق الصارم من الشهادة
  }
});

pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL database"))
  .catch((err) => console.error("❌ Database connection error:", err));
