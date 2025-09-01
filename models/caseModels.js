import db from "../config/database.js";

export const updateStatus = async (case_status, case_id) => {
    const [result] = await db.query(
        "UPDATE case_tbl SET case_status = ? WHERE case_id= ?",
        [case_status, case_id]
    );
    return result; 
};

 export const assignLawyer = async (case_id, lawyer_id, admin_id) => {

    const [result] = await db.query("INSERT INTO case_assignment_tbl (case_id, lawyer_id, admin_id) VALUES (?, ?, ?)", [case_id, lawyer_id, admin_id])
    return result;

}

export const assignedLawyer = async () => {

    const [result] = await db.query(`
        SELECT 
            a.case_id,
            l.first_name,
            l.last_name,
            a.assignment_status,
            DATE_FORMAT(a.assigned_date, '%Y-%m-%d') AS assigned_date,
            a.decision_date
        FROM case_assignment_tbl a
        LEFT JOIN admin_tbl l
            ON a.lawyer_id = l.admin_id
        WHERE l.role = 'lawyer';
            
        `)

    return result

} 
