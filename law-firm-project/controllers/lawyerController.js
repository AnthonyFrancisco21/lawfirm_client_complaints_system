import { getLawyer } from "../models/lawyerModels.js";

export const lawyer = async  (req, res) => {

    try{

        const lawyersData = await getLawyer()

        res.json(lawyersData);


    }catch(err){
        console.log(err)
    }

}