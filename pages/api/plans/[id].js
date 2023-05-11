import dbConnect from "@/database/connect";
import Plan from "@/database/models/Plan";

export default async function handler (request, response){
    await dbConnect()

    const { id } = request.query

    if (request.method === "GET") {
        const plan = await Plan.findById(id)
        if (!plan) {
            return response.status(404).json({status: "Plan not found"})
        }
        response.status(200).json(plan)
    }
}