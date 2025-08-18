import * as Test from "../models/text.js";


//This is where we grab the extension for router
export const getTest = async (req,res) => {

    try{

        const [rows] = await Test.getAlltest();
        res.json(rows);

    }catch(err){
        console.log(`Controller error`, err)
    }

}

export const getById = async (req, res) => {

    const {id} = req.params;
    try{

        const [rows] = await Test.getById(id);
        if (rows.length == 0) return res.status(404).json({ message: "Id cant found" });
        res.json(rows[0]);
    }catch(err){
        res.status(500).json({message: "Error finding a id"});
    }

};

