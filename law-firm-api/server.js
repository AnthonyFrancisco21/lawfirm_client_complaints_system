// server.js
import dotenv from 'dotenv';
dotenv.config()
import express from 'express';

// Load .env variables first
import db from './config/database.js'; 
import routes from './routes/routes.js';


const PORT = 3000;
const app = express();
app.use(express.json());

// http://localhost:3000/api/getClient
app.use("/api", routes);





app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
  res.send('Hello from the backend with nodemon');
});
