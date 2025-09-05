import { getTeam , insertMember, deleteMember} from "../models/teamModels.js";
import bcrypt from "bcrypt";

export const team = async (req, res) => {

    try{

        const search = req.query.search
        const result = await getTeam(search);

        if(result){
            res.status(200).json(result)
        }

    }catch(err){

        res.status(500).json({Error: err})

    }

}

export const addMember = async (req, res) => {
    try {


        const hash_pass = await bcrypt.hash(req.body.enter_password, 10);

        const newMemberData = {
            firstname: req.body.first_name,
            lastname: req.body.last_name,
            email: req.body.email_address,
            role: req.body.role,
            specialization: req.body.specialization || null,
            contact: req.body.contact_number,
            password: hash_pass,
            admin_id: req.session.user.admin_id
        }

        const response = await insertMember(newMemberData); 

        if (response) {
            res.status(201).json({
                success: true,
                message: "New member added successfully!",
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Error adding a new member!",
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error while adding member",
        });
    }
};

export const changeDeleteValue = async (req, res) => {

    try{

        const newMemberData = {
            isDeleted : parseInt(1),
            admin_id : req.body.admin_id
        };

        const response = await deleteMember(newMemberData);

        if (response) {
            res.status(201).json({
                success: true,
                message: "Member Deleted Successfully!",
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Error deleting a new member!",
            });
        }



    }catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error while adding member",
        });
    }

}
