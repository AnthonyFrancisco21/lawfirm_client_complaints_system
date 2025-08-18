import express from "express";

import {getTest, getById} from "../controllers/testController.js"

const router = express.Router();

router.get("/getAllData", getTest);
router.get("/getById/:id", getById)

export default router;