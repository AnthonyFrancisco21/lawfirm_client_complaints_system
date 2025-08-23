import express from "express";
import multer from "multer";

import { getclient, newClientAndCase, waitingList } from "../controllers/clientController.js";
import {assignment, assigned} from "../controllers/caseController.js";
import {lawyer} from "../controllers/lawyerController.js"
import{team} from "../controllers/teamController.js"

const router = express.Router();


router.get("/getClient", getclient);
router.get("/waitingList", waitingList)
router.post("/assignment", assignment)
router.get("/lawyers", lawyer)
router.get("/assigned", assigned)
router.get("/team", team )

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

// POST client + case + file all in one go
router.post("/newClientandCase", upload.single("attachment"), newClientAndCase);

export default router;
