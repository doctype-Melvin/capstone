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

export const sendPatchRequest = async (url, exercise) => {
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exercise),
  });
  if (!response.ok) {
    console.error("Couldn't send request");
  }
};

export const sendPatchRequestCurrentTemplate = async (url, planId) => {
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(planId),
  });
  if (!response.ok) {
    console.error("Setting current tamplate failed");
  }
};

export const setCurrentTemplate = async (planId) => {
  await sendPatchRequestCurrentTemplate(`/api/plans`, planId);
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
export const sendPutRequest = async (url, exercise) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exercise),
  });
  if (!response.ok) {
    console.error("Couldn't send delete request");
  }
};

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
