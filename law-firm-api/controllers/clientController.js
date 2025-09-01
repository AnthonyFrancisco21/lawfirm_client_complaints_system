import { getAllClient, getClientCount, newClient, newCase,  getWaitingList } from "../models/clientModels.js";
import { insertAttachment } from "../models/caseFileModels.js";


export const getclient = async (req, res) => {

  try {

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize);
    const search = req.query.name
    const offset = (page - 1) * pageSize;

    const dataRes = await getAllClient(pageSize, offset, search);

    const data = dataRes.map(row => ({
      ...row,
      date_added: row.date_added 
        ? row.date_added.toISOString().split("T")[0]
        : null
    }));

    const total = await getClientCount(search);
    const totalPages = Math.ceil(total / pageSize)

    res.json({
      page,
      pageSize,
      total,
      totalPages,
      data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const newClientAndCase = async (req, res) => {
  try {

    const toNull = (val) => (val === "" || val === undefined ? null : val);
  
    const clientData = {
      firstname: req.body.first_name,
      lastname: req.body.last_name,
      age: req.body.age,
      gender: req.body.gender,
      email_address: req.body.email_address,
      address: req.body.address,
      contact_number: req.body.contact_number,
      adminId: req.session.user.admin_id
    };

    const caseData = {
      requestType: req.body.request_type,
      compDescription: req.body.complaint_description,
      preferredDate: toNull(req.body.preferred_date),
      preferredLawyer: toNull(req.body.preferred_lawyer)
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
      success:true,
      message: "Client added successfully!",
      clientId,
      caseId,
    });
  } catch (err) {
    console.error("❌ Error inserting client/case:", err);
    res.status(500).json({
      success: false,
      message: "Error creating client and case",
      error: err.message,
    });
  }
};



export const waitingList = async(req, res) =>{

  try{

    const dataRes =  await getWaitingList();

    const waitingList = dataRes.map(row => ({
      ...row,
      date_added: row.date_added 
        ? row.date_added.toISOString().split("T")[0]
        : null
    }));

    res.json(waitingList)

  }catch(err){
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }

}