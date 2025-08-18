import {getAllClient} from "../models/clientModels.js";


export const getclient = async (req, res) => {
    try{
        const [rows] = await getAllClient();
        res.json(rows);

    }catch(err){
        console.log(err)
    }
}