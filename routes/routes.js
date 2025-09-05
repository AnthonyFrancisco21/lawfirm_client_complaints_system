import express from "express";
import multer from "multer";

import { getclient, newClientAndCase, waitingList } from "../controllers/clientController.js";
import {assignment} from "../controllers/caseController.js";
import {lawyer} from "../controllers/lawyerController.js"
import{team, addMember, changeDeleteValue} from "../controllers/teamController.js"
import {reqAuth, reqRole} from "../middleware/auth.js"

const router = express.Router();


router.get("/getClient", reqAuth, reqRole("super_admin", "lawyer", "staff"), getclient);
router.get("/waitingList", reqAuth, reqRole("super_admin"), waitingList)
router.post("/assignment", reqAuth, reqRole("super_admin", "lawyer"), assignment)
router.get("/lawyers", reqAuth, reqRole("super_admin", "lawyer", "staff"), lawyer)
router.get("/team", reqAuth, reqRole("super_admin"), team )
router.post("/newMember", reqAuth, reqRole("super_admin"), addMember)
router.post("/deleteMember", reqAuth, reqRole("super_admin"), changeDeleteValue)

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

// POST client + case + file all in one go
router.post("/newClientandCase", upload.single("attachment"), newClientAndCase);


export default router;
