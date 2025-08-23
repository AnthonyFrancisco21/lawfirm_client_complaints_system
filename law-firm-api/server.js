// server.js
import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import cors from "cors";

// Load .env variables first
import db from './config/database.js'; 
import routes from './routes/routes.js';



const app = express();
app.use(express.json());
app.use(cors());

//http://localhost:3000/api/getClient
///http://localhost:3000/api/newClientandCase
//http://localhost:3000/api/waitingListForClients
//http://localhost:3000/api/assignment
//http://localhost:3000/api/lawyers
//http://localhost:3000/api/assigned
//http://localhost:3000/api/team
app.use("/api", routes);
app.use("/uploads", express.static("uploads"));



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello from the backend with nodemon');
});
