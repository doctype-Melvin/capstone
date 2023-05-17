import styled from "styled-components";
import { nanoid } from "nanoid";
import PlanContext from "@/utils/PlanContext/PlanContext";
import { useContext, useEffect, useState } from "react";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-items: flex-end;
  margin: 0 auto;
  gap: 0.5rem;

  & > label {
    margin-right: 1rem;
  }

  & > label > input {
    margin-left: 0.3rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${({ edit }) => (edit ? "center" : "space-between")};
  padding: 0.7rem 0;
`;

export default function ExerciseForm({
  onToggle,
  onAdd,
  dayId,
  edit,
  onToggleEdit,
  editExercise,
  onUpdate,
}) {
  const { setPlan } = useContext(PlanContext);
  const [exerciseData, setExercisesData] = useState({
    exercise: "",
    sets: "",
    reps: "",
    weight: "",
  });

  // Receives workout day's id , form data and data from localStorage
  // Updates the exercise array of the matching workout day
  // Updates the plan's routine array
  const addExercise = (dayId, exerciseData, storageData) => {
    const workoutDay = storageData.routine.find((day) => day.id === dayId);
    if (workoutDay) {
      storageData.routine = storageData.routine.map((day) => {
        if (day.id === workoutDay.id) {
          const existingExerciseIndex = workoutDay.exercises.findIndex(
            (exercise) => {
              return exercise.id === exerciseData.id;
            }
          );
          if (existingExerciseIndex !== -1) {
            workoutDay.exercises[existingExerciseIndex] = exerciseData;
            return workoutDay;
          } else {
            day.exercises = [...day.exercises, exerciseData];
            return day;
          }
        } else {
          return day;
        }
      });
      setPlan(storageData);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const storageData = JSON.parse(localStorage.getItem("plan"));

    const formData = new FormData(event.target);
    const exerciseData = Object.fromEntries(formData);

    if (edit) {
      exerciseData.id = editExercise.id;

      addExercise(event.target.id, exerciseData, storageData);
      onUpdate(exerciseData);
      onToggleEdit((prevState) => !prevState);
    } else {
      exerciseData.id = nanoid(5);

      addExercise(event.target.id, exerciseData, storageData);
      onAdd(exerciseData);
      onToggle();
    }
  };

  useEffect(() => {
    if (editExercise) {
      setExercisesData(editExercise);
    }
  }, [editExercise]);

  return (
    <StyledForm onSubmit={handleSubmit} id={dayId}>
      <label htmlFor="exercise">
        Exercise
        <input
          type="text"
          name="exercise"
          value={exerciseData.exercise}
          onChange={(event) =>
            setExercisesData((prevState) => ({
              ...prevState,
              exercise: event.target.value,
            }))
          }
          required
        />
      </label>
      <label htmlFor="sets">
        Sets
        <input
          type="number"
          name="sets"
          min={1}
          max={30}
          pattern="/d+"
          required
          value={exerciseData.sets}
          onChange={(event) =>
            setExercisesData((prevState) => ({
              ...prevState,
              sets: event.target.value,
            }))
          }
        />
      </label>
      <label htmlFor="reps">
        Reps
        <input
          type="number"
          name="reps"
          min={1}
          max={100}
          pattern="/d+"
          required
          value={exerciseData.reps}
          onChange={(event) =>
            setExercisesData((prevState) => ({
              ...prevState,
              reps: event.target.value,
            }))
          }
        />
      </label>
      <label htmlFor="weight">
        Weight
        <input
          type="number"
          name="weight"
          min={0}
          max={800}
          pattern="/d+"
          required
          value={exerciseData.weight}
          onChange={(event) =>
            setExercisesData((prevState) => ({
              ...prevState,
              weight: event.target.value,
            }))
          }
        />
      </label>
      <ButtonContainer edit={edit}>
        <button type="submit">{edit ? "Save" : "Add"}</button>
        {!edit && (
          <button type="button" onClick={() => onToggle()}>
            Cancel
          </button>
        )}
      </ButtonContainer>
    </StyledForm>
  );
}
