import { nanoid } from "nanoid";
import useSWR from "swr";
import { mutate } from "swr";

export const addWorkoutDays = (number) => {
  let store = [];
  for (let i = 0; i < number; i++) {
    store.push({
      day: i + 1,
      id: nanoid(),
      exercises: [],
    });
  }
  return store;
};

export const workoutWeek = {
  week: 1,
  get nextWeek() {
    return this.week + 1;
  },
  log: [],
};

export const fetcher = (...args) =>
  fetch(...args).then((response) => response.json());

export const usePlan = (id) => useSWR(`/api/plans/${id}`, fetcher);

export const useAllPlans = () => useSWR(`/api/plans`, fetcher);

export const sendPostRequest = async (url, { arg }) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  const { id } = await response.json();
  return id;
};

export const sendPatchRequest = async (url, payload) => {
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    console.error("Couldn't send request");
  }
};

export const sendPutRequest = async (url, payload) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    console.error("Couldn't send delete request");
  }
};

export const createUpdateDelete = async (planId, data, mode) => {
  const modes = {
    isEdit: "isEdit",
    isCreate: "isCreate",
    isDelete: "isDelete",
    saveWeek: "saveWeek",
    saveSession: "saveSession",
  };

  const url = `/api/plans/${planId}?${modes[mode]}=true&id=${planId}`;
  await sendPatchRequest(url, data);

  mutate();
};

const weekObject = {
  week: 1,
  sessions: [],
  nextWeek: 2,
};

export const weeklySessionsHandler = async (currentPlan, sessionObject) => {
  if (currentPlan.sessions.length > 0) {
    // Session count is greater than 0
    const [lastWeek] = currentPlan.sessions.slice(-1);
    const [lastSession] = lastWeek.sessions.slice(-1);

    if (lastSession.dayId === sessionObject.dayId) {
      // Prevent dupes
      console.log("Session already saved!");
      return;
    }
    if (lastWeek.sessions.length < currentPlan.days) {
      await createUpdateDelete(currentPlan._id, sessionObject, "saveSession");
      await createUpdateDelete(currentPlan._id, [], "isDelete");
    } else {
      const newWeek = weekObject;
      newWeek.sessions = [sessionObject];
      newWeek.week = lastWeek.nextWeek;
      newWeek.nextWeek = lastWeek.nextWeek + 1;
      console.log(`New Week`);
      await createUpdateDelete(currentPlan._id, newWeek, "saveWeek");
      await createUpdateDelete(currentPlan._id, [], "isDelete");
    }
  } else {
    const updatedWeek = weekObject;
    updatedWeek.sessions = [sessionObject];
    console.log(updatedWeek);
    await createUpdateDelete(currentPlan._id, updatedWeek, "saveWeek");
    await createUpdateDelete(currentPlan._id, [], "isDelete");
  }
  mutate(`/api/plans/`);
};

export const setCurrentTemplate = async (planId) => {
  await sendPatchRequest(`/api/plans`, planId);
  mutate(`/api/plans`);
};

export const mutateExercise = async (dayId, planId, newData) => {
  await sendPatchRequest(`/api/plans/${planId}`, newData);
  mutate(
    `/api/plans/${planId}`,
    (data) => {
      const updatedData = { ...data };
      const dayIndex = updatedData.routine.findIndex((day) => day.id === dayId);
      const exerciseIndex = updatedData.routine[dayIndex].exercises.findIndex(
        (exercise) => exercise.id === newData.id
      );
      updatedData.routine[dayIndex].exercises[exerciseIndex] = newData;
      return updatedData;
    },
    false
  );
};

// Start deletion section
export const findDayAndIndex = (data, deleteExercise) => {
  const targetDay = data.routine.find((day) => day.id === deleteExercise.dayId);
  const targetDayIndex = data.routine.findIndex(
    (day) => day.id === deleteExercise.dayId
  );
  const updatedExercises = targetDay.exercises.filter(
    (exercise) => exercise.id !== deleteExercise.id
  );
  targetDay.exercises = updatedExercises;
  return [targetDay, targetDayIndex];
};

export const removeExercise = async (planId, data, deleteExercise) => {
  await sendPutRequest(`/api/plans/${planId}`, deleteExercise);
  const [updatedDay, atIndex] = findDayAndIndex(data, deleteExercise);
  const updatedData = { ...data };
  updatedData.routine[atIndex] = updatedDay;
  mutate(`/api/plans/${planId}`, updatedData, true);
};

export const deleteTemplate = async (id) => {
  await fetch(`/api/plans/${id}`, {
    method: "DELETE",
  });
  mutate(`/api/plans`);
};

// End deletion section
