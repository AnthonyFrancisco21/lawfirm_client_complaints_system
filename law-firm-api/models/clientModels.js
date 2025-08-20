import db from "../config/database.js";

export const getAllClient = async () => {
    return db.query("SELECT * from client_tbl")
}

export const newClient = async (clientData) => {
  const [result] = await db.query(
    `INSERT INTO client_tbl (first_name, last_name, age, gender, email_address, address, contact_number, admin_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      clientData.firstname,
      clientData.lastname,
      clientData.age,
      clientData.gender,
      clientData.email_address,
      clientData.address,
      clientData.contact_number,
      clientData.adminId
    ]
  );
  return result.insertId; // client_id
};

export const newCase = async (caseData, clientId) => {
  const [result] = await db.query(
    `INSERT INTO case_tbl (client_id, request_type, complaint_description, preferred_date, preferred_lawyer)
     VALUES (?, ?, ?, ?, ?)`,
    [
      clientId,
      caseData.requestType,
      caseData.compDescription,
      caseData.preferredDate,
      caseData.preferredLawyer,
      
    ]
  );
  return result.insertId; // case_id
};
