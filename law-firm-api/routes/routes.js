import express from "express";
import multer from "multer";

import { getclient, newClientAndCase } from "../controllers/clientController.js";

const router = express.Router();

// GET
router.get("/getClient", getclient);

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

// POST client + case + file all in one go
router.post("/newClientandCase", upload.single("attachment"), newClientAndCase);

export default router;
