import { updateStatus, assignLawyer /* , assignedLawyer */  } from "../models/caseModels.js";

export const assignment = async (req, res) => {

    try{

        const { case_id, lawyer_id } = req.body;
        const case_status = 'assigning';
        const admin_id = req.session.user.admin_id;
        const admin_role = req.session.user.role;

        if(!admin_id || admin_role !== "super_admin"){
            return res.status(401).json({success: false , message: 'Not authenticated'})
        }

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

/* export const assigned = async (req, res) => {

    try{
        const result = await assignedLawyer();
        res.status(200).json(result)

    }catch(err){
        console.log(err)
    }

}
 */