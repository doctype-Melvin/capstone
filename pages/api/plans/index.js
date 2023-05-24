import dbConnect from "@/database/connect";
import Plan from "@/database/models/Plan";

export default async function handler(request, response) {
  // Try to connect to database
  await dbConnect();
  
  // Request methods POST
  // and GET as per US 2
  if (request.method === "POST") {
    try {
      const planData = request.body;
      const newPlan = await Plan.create(planData);
      // Successful response sets the
      // plan's id to mongoDB document id
      return response.status(200).json({
        status: "Plan created successfully",
        id: newPlan._id,
      });
    } catch (error) {
      return response.status(500).json({
        error: "Internal Server Error",
      });
    }
  } else if (request.method === "GET") {
    try {
      // Get all plans from DB
      const plans = await Plan.find();
      response.status(200).json(plans);
    } catch (error) {
      response.status(500).json({
        error: "Internal Server Error",
      });
    }
  } else if (request.method === "PATCH") {
    try {
      // We need the id of the current plan
      const plans = await Plan.find()
      const planId = request.body

      const triggerPromises = plans.map( async (plan) => {
        if (plan.id === planId) {
          return Plan.findByIdAndUpdate(plan.id, {isCurrent: true})
        } else {
          return Plan.findByIdAndUpdate(plan.id, {isCurrent: false})
        }
      })

      await Promise.all(triggerPromises)

      const updatedData = await Plan.find()
      response.status(200).json(updatedData)
    } catch (error) {
      response.status(500).json({error: "Internal Server Error"}) 
    }
  }
}
