import dbConnect from "@/database/connect";
import Plan from "@/database/models/Plan";

export default async function handler(request, response) {
  await dbConnect();

  const { isLog, isEdit, isDelete, initialWeeklyLog, id } = request.query;
  const currentPlan = await Plan.findById(id);

  if (request.method === "GET") {
    try {
      response.status(200).json(currentPlan);
    } catch (error) {
      return response.status(404).json({ status: "Plan not found" });
    }
  }

  if (request.method === "POST") {
    try {
      const exerciseData = request.body;
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
      if (isLog) {
        const newLog = request.body;

        await Plan.findByIdAndUpdate(id, { logs: newLog });
        response.status(200).json({ status: "Added set to workout session" });
      } else if (isEdit) {
        const editedSet = request.body;

        const updatedLogsArray = currentPlan.logs.map((set, index) => {
          if (set.id === editedSet.id) {
            const currentSet = currentPlan.logs[index];
            const updatedSet = {
              ...currentSet,
              ...editedSet,
            };
            return updatedSet;
          }
          return set;
        });
        await Plan.findByIdAndUpdate(id, { logs: updatedLogsArray });
        response.status(200).json({ status: "Set successfully updated" });
      } else if (isDelete) {
        const deleteThisSet = request.body;
        const updatedLogsArray = currentPlan.logs.filter(
          (set) => set.id !== deleteThisSet
        );
        await Plan.findByIdAndUpdate(id, { logs: updatedLogsArray });
        response.status(200).json({ status: "Set successfully deleted" });
      } else if (initialWeeklyLog) {
        const initialWeeklyLog = request.body;
        await Plan.findByIdAndUpdate(id, {
          $set: { "logs.0.log": initialWeeklyLog },
        });
        response
          .status(200)
          .json({ status: "Created new weekly logging container" });
      } else {
        const updatedExercise = request.body;
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
      }
    } catch (error) {
      return response.status(404).json({ status: "Couldn't update plan" });
    }
  }

  if (request.method === "PUT") {
    try {
      const deleteExercise = request.body;
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
    await Plan.findByIdAndDelete(id);
    response.status(200).json({ status: "Plan successfully deleted" });
  }
}
