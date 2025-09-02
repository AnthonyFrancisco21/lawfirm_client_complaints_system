import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2/promise";

// Promise-based pool for queries
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

async function testConnection() {
  try {
    const conn = await db.getConnection();
    console.log("✅ Connected to DB (promise pool)!");
    conn.release();
  } catch (err) {
    console.error("❌ DB connection failed:", err);
  }
}

testConnection();

export default db;