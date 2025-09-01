import db from "../config/database.js";

export const getAllClient = async (limit, offset, search) => {


  let query = `
    SELECT 
      c.first_name, 
      c.last_name, 
      c.age, 
      c.gender, 
      c.email_address, 
      c.address, 
      c.contact_number, 
      DATE(c.date_added) AS date_added,
      cs.case_status
    FROM client_tbl c
    LEFT JOIN case_tbl cs
      ON c.client_id = cs.client_id
  `;

  if (search) {
    query += `
      WHERE 
        c.first_name LIKE ? 
        OR c.last_name LIKE ? 
    `;
  }

  query+= `
    ORDER BY c.client_id
    LIMIT ? OFFSET ?
  `

  const params = search 
  ? [`%${search}%`, `%${search}%`, limit, offset]
  : [limit, offset];

  const [clientRows] = await db.query(query, params);

  return clientRows;
};

export const getWaitingList = async() =>{

  const [waitingListRows] = await db.query(` 
    SELECT
      c.client_id,
      c.first_name,
      c.last_name,
      c.age,
      c.gender,
      c.email_address,
      c.address,
      c.contact_number,
      DATE(c.date_added) AS date_added,
      cs.case_id,
      cs.case_status,
      cs.preferred_date,
      cs.preferred_lawyer,
      GROUP_CONCAT(cf.file_path) AS file_path
    FROM client_tbl c
    LEFT JOIN case_tbl cs
      ON c.client_id = cs.client_id
    LEFT JOIN case_file cf
      ON cs.case_id = cf.case_id
    WHERE cs.case_status = "pending"
    GROUP BY c.client_id
    ORDER BY c.client_id;
    `);

  return waitingListRows;

}


export const getClientCount = async (search) => {
  let query = `
    SELECT COUNT(*) AS total 
    FROM client_tbl
  `;

  let params = [];

  if (search) {
    query += `
      WHERE first_name LIKE ? 
      OR last_name LIKE ?
    `;
    params = [`%${search}%`, `%${search}%`];
  }

  const [clientCountRows] = await db.query(query, params);
  return clientCountRows[0].total;
};


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
