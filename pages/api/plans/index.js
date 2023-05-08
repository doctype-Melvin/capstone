import dbConnect from "../../../db";
import Plan from "../../../db/models/Plan.js";

export default async function handler(req, res) {
    try {
        console.log('Connecting to DB');
        await dbConnect();
        console.log('Connection established')
    
        console.log('Fetching data')
        const exercises = await Plan.find();
        console.log('Done fetching data')
        console.log(exercises)
    
        return res.status(200).json(exercises)
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
    }
