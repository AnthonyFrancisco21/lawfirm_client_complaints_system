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

    query += `AND (isDeleted = 0)`

    const param = search ? [`%${search}%`, `%${search}%`] : [];

    const [result] = await db.query(query, param)

    return result;

}

export const insertMember = async (newMemberData) => {

    const [result] = await db.query(`INSERT INTO admin_tbl (first_name, last_name, email_address, password, contact_number, role,specialization, created_by_id) VALUES (?,?,?,?,?,?,?,?)`,
    [newMemberData.firstname, newMemberData.lastname, newMemberData.email, newMemberData.password, newMemberData.contact, newMemberData.role, newMemberData.specialization, newMemberData.admin_id])

    return result;
}

export const deleteMember = async (deletedMember) => {

    const [result] = await db.query(`UPDATE admin_tbl SET isDeleted = ? WHERE admin_id = ?`, 
        [deletedMember.isDeleted, deletedMember.admin_id]
    )

    return [result]

}