import db from "../config/database.js";

export const insertAttachment = async (caseId, filePath, adminId) => {
  const [result] = await db.query(
    "INSERT INTO case_file (case_id, file_path, admin_id) VALUES (?, ?, ?)",
    [caseId, filePath, adminId]
  );
  return result.insertId;
};

