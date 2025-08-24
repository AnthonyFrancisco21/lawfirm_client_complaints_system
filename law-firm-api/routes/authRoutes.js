import express from "express";

import {login, logout, me} from "../controllers/authController.js"
import {AdminController} from "../controllers/adminController.js"
import {reqAuth, reqRole} from "../middleware/auth.js"

const authRouter = express.Router();
//Authentication and Authorization routes
authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.get("/me", me)


authRouter.get('/statistics', reqAuth, reqRole("super_admin"), AdminController.statistics);

export default authRouter