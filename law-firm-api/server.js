// server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";

import db from "./config/database.js";
import routes from './routes/routes.js';
import authRouter from './routes/authRoutes.js';

import helmet from 'helmet'
import morgan from 'morgan'


import sessionStore from "./config/session.js";
import session from "express-session";

dotenv.config()
const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://127.0.0.1:5600",  
  credentials: true                // allow cookies to be sent
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", routes);
app.use("/uploads", express.static("uploads"));

app.set('trust proxy', 1);

app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 8,
  }
}));



// Auth routes
app.use('/auth', authRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello from the backend with nodemon');
});
