import db from "../config/database.js";

export const getAllClient = async () => {
    return db.query("SELECT * from client_tbl")
}