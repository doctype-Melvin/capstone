import dbConnect from "@/database/connect";
import Plan from "@/database/models/Plan";

export default async function handler(request, response) {
    // Try to connect to database
    await dbConnect()
    
    // Request methods POST and GET as 
    // per US 2
    if (request.method === "POST") {
        try {
            const planData = req.body
            const newPlan = await Plan.create(planData)

            // Successful response sets the
            // plan's id to mongoDB document id
            response.status(200).json({
                status: "Plan created successfully", 
                id: newPlan._id
            })
        } catch (error) {
            return response.status(500).json({
                error: "Internal Server Error"
            })
        }
    } else if (request.method === "GET") {
        try {
            const plans = await Plan.find()
            response.status(200).json(plans)
        } catch (error) {
            response.status(500).json({
                error: "Internal Server Error"
            })
        }
    }
}