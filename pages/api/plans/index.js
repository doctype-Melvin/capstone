import dbConnect from "@/database/connect";
import Plan from "@/database/models/Plan";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const planData = request.body;
      const newPlan = await Plan.create(planData);

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
      const plans = await Plan.find();
      response.status(200).json(plans);
    } catch (error) {
      response.status(500).json({
        error: "Internal Server Error",
      });
    }
  } else if (request.method === "PATCH") {
    try {
      const plans = await Plan.find();
      const planId = request.body;

      const triggerPromises = plans.map(async (plan) => {
        if (plan.id === planId) {
          return Plan.findByIdAndUpdate(plan.id, { isCurrent: true });
        } else {
          return Plan.findByIdAndUpdate(plan.id, { isCurrent: false });
        }
      });

      await Promise.all(triggerPromises);

      const updatedData = await Plan.find();
      return response.status(200).json(updatedData);
    } catch (error) {
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
}
