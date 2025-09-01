import { getTeam } from "../models/teamModels.js";

export const team = async (req, res) => {

    try{

        const result = await getTeam();

        if(result){
            res.status(200).json(result)
        }

    }catch(err){

        res.status(500).json({Error: err})

    }

}