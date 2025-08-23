import db from "../config/database.js";

export const findByEmail = async (email_address) => {

    const [rows]  = await db.query('SELECT * FROM admin_tbl WHERE email_address = ?', [email]);
    return rows[0] || null;

}

export const userCount = async() => {
    const [rowsCount] = await db.query('SELECT COUNT(*) FROM admin_tbl');
    return rowsCount;
}