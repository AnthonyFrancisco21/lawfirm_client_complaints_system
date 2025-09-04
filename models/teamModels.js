import db from "../config/database.js";

export const getTeam = async (search) => {

    let query = `
        SELECT 
            admin_id,
            first_name,
            last_name,
            email_address,
            contact_number,
            DATE_FORMAT(date_created, '%Y-%m-%d') AS date_created,
            role,
            specialization
        FROM admin_tbl 
        WHERE (role = 'lawyer' || role = 'staff')
    `;

    if(search){
        query+=`
            AND (first_name LIKE ? OR last_name LIKE ?)
        `
    }

    const param = search ? [`%${search}%`, `%${search}%`] : [];

    const [result] = await db.query(query, param)

    return result;

} 