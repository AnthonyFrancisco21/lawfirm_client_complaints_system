// server.js
import dotenv from 'dotenv';
dotenv.config()
import express from 'express';

// Load .env variables first
import db from './config/database.js'; 
import testRouter from './routes/testRoutes.js';


const PORT = 3000;
const app = express();
app.use(express.json());

// http://localhost:3000/api/getAllData
app.use("/api", testRouter);





app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
  res.send('Hello from the backend with nodemon');
});
