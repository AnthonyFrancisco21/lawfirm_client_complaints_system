// config/database.js
import dotenv from 'dotenv';
dotenv.config()
import mysql from 'mysql2/promise';


const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected successfully!");
  connection.release(); // release back to the pool
})

export default db; 
 