import { getAllClient, newClient, newCase } from "../models/clientModels.js";
import { insertAttachment } from "../models/caseFileModels.js";

export const getclient = async (req, res) => {
  try {
    const [rows] = await getAllClient();
    res.json(rows);
  } catch (err) {
    console.log(err);
  }
};

export const newClientAndCase = async (req, res) => {
  try {

    //const clientData = JSON.parse(req.body.client); // since FormData sends as string
    //const caseData = JSON.parse(req.body.case);
    //Might need later when working with front end

    // Access text fields directly
    const clientData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      gender: req.body.gender,
      email_address: req.body.email_address,
      address: req.body.address,
      contact_number: req.body.contact_number,
      adminId: req.body.admin_id, 
    };

    const caseData = {
      requestType: req.body.requestType,
      compDescription: req.body.compDescription,
      preferredDate: req.body.preferred_date,
      preferredLawyer: req.body.preferred_lawyer,
    };

    // 1. Insert client
    const clientId = await newClient(clientData);

    // 2. Insert case (linked to client)
    const caseId = await newCase(caseData, clientId);

    // 3. If file uploaded, save it
    if (req.file) {
      const filePath = `/uploads/${req.file.filename}`;
      await insertAttachment(caseId, filePath, clientData.adminId);
    }

    res.status(201).json({
      message: "Client, Case, and Attachment created successfully!",
      clientId,
      caseId,
    });
  } catch (err) {
    console.error("❌ Error inserting client/case:", err);
    res.status(500).json({
      message: "Error creating client and case",
      error: err.message,
    });
  }
};