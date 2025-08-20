// server.js
import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import cors from "cors";

// Load .env variables first
import db from './config/database.js'; 
import routes from './routes/routes.js';


const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors());

// http://localhost:3000/api/getClient
///http://localhost:3000/api/newClientandCase
app.use("/api", routes);
app.use("/uploads", express.static("uploads"));


app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
  res.send('Hello from the backend with nodemon');
});
