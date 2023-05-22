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

export const fetcher = (...args) =>
  fetch(...args).then((response) => response.json());

export const usePlan = (id) => useSWR(`/api/plans/${id}`, fetcher);
