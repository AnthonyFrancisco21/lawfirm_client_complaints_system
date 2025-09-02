import { getTeam } from "../models/teamModels.js";

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