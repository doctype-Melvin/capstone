import dbConnect from "@/database/connect";
import Plan from "@/database/models/Plan";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const plan = await Plan.findById(id);
      response.status(200).json(plan);
    } catch (error) {
      return response.status(404).json({ status: "Plan not found" });
    }
  }

  if (request.method === "POST") {
    try {
      const exerciseData = request.body;
      const currentPlan = await Plan.findById(id);
      const updatedRoutine = currentPlan.routine.map((day) => {
        if (day.id === exerciseData.dayId) {
          day.exercises.push(exerciseData);
        }
        return day;
      });
      await Plan.findByIdAndUpdate(id, { routine: updatedRoutine });
      response.status(200).json({ status: "Exercise added successfully" });
    } catch (error) {
      return response.status(404).json({ status: "Couldn't find plan" });
    }
  }

  if (request.method === "PATCH") {
    try {
      const updatedExercise = request.body;
      const currentPlan = await Plan.findById(id);
      const updatedRoutine = currentPlan.routine.map((day) => {
        if (day.id === updatedExercise.dayId) {
          const exerciseIndex = day.exercises.findIndex(
            (exercise) => exercise.id === updatedExercise.id
          );
          day.exercises[exerciseIndex] = updatedExercise;
        }
        return day;
      });
      await Plan.findByIdAndUpdate(id, { routine: updatedRoutine });
      response.status(200).json({ status: `Plan successfully updated` });
    } catch (error) {
      return response.status(404).json({ status: "Couldn't update plan" });
    }
  }

  if (request.method === "PUT") {
    try {
      const deleteExercise = request.body;
      const currentPlan = await Plan.findById(id);
      const updatedRoutine = currentPlan.routine.map((day) => {
        if (day.id === deleteExercise.dayId) {
          const updatedExercises = day.exercises.filter(
            (exercise) => exercise.id !== deleteExercise.id
          );
          day.exercises = updatedExercises;
        }
        return day;
      });
      await Plan.findByIdAndUpdate(id, { routine: updatedRoutine });
      response.status(200).json({ status: "Exercise successfully deleted" });
    } catch (error) {
      return response.status(500).json({ status: "Couldn't delete exercise" });
    }
  }

  if (request.method === "DELETE") {
      await Plan.findByIdAndDelete(id)
      response.status(200).json({ status: "Plan successfully deleted" });
  }
}
