import db from "../config/database.js";

export const findByEmail = async (email) => {

    const [rows]  = await db.query('SELECT * FROM admin_tbl WHERE email_address = ?', [email]);
    return rows[0] || null;

}

export const UserModel = {
  async countUsers() {
    const [rows] = await db.query("SELECT COUNT(*) AS total FROM admin_tbl");
    return rows[0].total;
  }
};