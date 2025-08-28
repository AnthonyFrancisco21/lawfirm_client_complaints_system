// server.js
import dotenv from 'dotenv';
import express from 'express';


import db from "./config/database.js";
import routes from './routes/routes.js';
import authRouter from './routes/authRoutes.js';


import helmet from 'helmet'
import morgan from 'morgan'


import sessionStore from "./config/session.js";
import session from "express-session";

import path from "path";

import { fileURLToPath } from "url";

dotenv.config()
const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "https://cdn.jsdelivr.net"]
    },
  })
);



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));


app.set('trust proxy', 1);

app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    httpOnly: true,
    secure: false,          
    sameSite: "lax",     
    maxAge: 1000 * 60 * 60
  }
}));



// Auth and API routes
//http://localhost:3000/auth/me
app.use('/auth', authRouter);
app.use("/api", routes);
app.use("/uploads", express.static("uploads"));


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello from the backend with nodemon');
});
