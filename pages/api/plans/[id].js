import dbConnect from "@/database/connect";
import Plan from "@/database/models/Plan";

export default async function handler (request, response){
    await dbConnect()

    const { id } = request.query

    if (request.method === "GET") {
        try {
            const plan = await Plan.findById(id)
            response.status(200).json(plan)
        } catch (error) {
            return response.status(404).json({status: "Plan not found"})
        }
    }
}