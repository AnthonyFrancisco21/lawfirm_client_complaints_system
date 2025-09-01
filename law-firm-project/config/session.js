import session from "express-session";
import mysql from "mysql2";
import MySQLStoreFactory from "express-mysql-session";

const MySQLStore = MySQLStoreFactory(session);

// Callback-style connection for session store
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const sessionStore = new MySQLStore(
  {
    createDatabaseTable: true, // automatically create `sessions` table
    schema: {
      tableName: "sessions",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  connection // pass raw mysql connection here
);

export default sessionStore;
