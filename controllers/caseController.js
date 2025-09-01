import { updateStatus, assignLawyer, assignedLawyer  } from "../models/caseModels.js";

export const assignment = async (req, res) => {

    try{

        const { case_status,case_id, lawyer_id , admin_id } = req.body;
        const result = await updateStatus(case_status, case_id);
        const assigned = await  assignLawyer (case_id, lawyer_id, admin_id)

        if (result.affectedRows > 0 && assigned.affectedRows > 0) {
            res.status(200).json({
                success: true,
                message: `Case assigned successfully!`
            });
        } else {
            res.status(404).json({
                success: false,
                message: `Something went wrong, please try again!`
            });
        }

    }catch(err){
        res.status(500).json({ error: err.message });
    }

}

export const assigned = async (req, res) => {

    try{
        const result = await assignedLawyer();
        res.status(200).json(result)

    }catch(err){
        console.log(err)
    }

}
