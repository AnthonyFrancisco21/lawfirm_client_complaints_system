import db from "../config/database.js";

export const getTeam = async () => {

    const [result] = await db.query(` 
        SELECT 
            first_name,
            last_name,
            email_address,
            contact_number,
            DATE_FORMAT(date_created, '%Y-%m-%d') AS date_created,
            role,
            specialization
        FROM admin_tbl WHERE role = 'lawyer' || role = 'staff' `)
    return result;

} 