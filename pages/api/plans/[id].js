import dbConnect from "@/database/connect";
import Plan from "@/database/models/Plan";

export default async function handler(request, response) {
  await dbConnect();

  const { isCreate, isEdit, isDelete, id } = request.query;
  const currentPlan = await Plan.findById(id);

  switch (request.method) {
    case "GET":
      try {
        response.status(200).json(currentPlan);
      } catch (error) {
        return response.status(404).json({ status: "Plan not found" });
      }
      break;

    case "POST":
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
      break;
    case "PATCH":
      try {
        if (isCreate) {
          const newLog = request.body;

          await Plan.findByIdAndUpdate(id, { logs: newLog });
          response.status(200).json({ status: "Added set to workout session" });
        } else if (isEdit) {
          const updatedLogsArray = request.body;

          await Plan.findByIdAndUpdate(id, { logs: updatedLogsArray });
          response.status(200).json({ status: "Set successfully updated" });
        } else if (isDelete) {
          const updatedLogs = request.body;
          await Plan.findByIdAndUpdate(id, { logs: updatedLogs });
          response.status(200).json({ status: "Set successfully deleted" });
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

      break;

    case "PUT":
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
        return response
          .status(500)
          .json({ status: "Couldn't delete exercise" });
      }

      break;

    case "DELETE":
      await Plan.findByIdAndDelete(id);
      response.status(200).json({ status: "Plan successfully deleted" });
  }
}
