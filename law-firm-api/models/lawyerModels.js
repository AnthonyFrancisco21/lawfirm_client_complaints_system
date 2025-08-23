import db from "../config/database.js";

export const getLawyer = async () => {

    const [lawyerRows] = await db.query("SELECT admin_id, first_name, last_name, specialization FROM admin_tbl WHERE role = 'lawyer' ")

    return lawyerRows;

}