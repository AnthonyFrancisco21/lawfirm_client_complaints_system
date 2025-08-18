import express from "express";

/* import {getTest, getById} from "../controllers/testController.js" */

import {getclient} from "../controllers/clientController.js"

const router = express.Router();

router.get("/getClient", getclient);

/* router.get("/getAllData", getTest);
router.get("/getById/:id", getById) */

export default router;