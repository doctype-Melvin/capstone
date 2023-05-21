import styled from "styled-components";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";
import { sendPostRequest } from "@/utils/helpers";
import { usePlan } from "@/utils/helpers";
import { mutateExercise } from "@/utils/helpers";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80vw;
  align-items: flex-end;
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
  justify-content: space-around;
  padding: 0.7rem 0;
`;

export default function ExerciseForm({
  toggleForm,
  dayId,
  isEdit,
  toggleEditMode,
  editExercise,
}) {
  const router = useRouter();
  const { id } = router.query;

  const [newData, setNewData] = useState({
    exercise: isEdit ? editExercise.exercise : "",
    sets: isEdit ? editExercise.sets : "",
    reps: isEdit ? editExercise.reps : "",
    weight: isEdit ? editExercise.weight : "",
  });

  const { trigger } = useSWRMutation(`/api/plans/${id}`, sendPostRequest);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const exerciseData = Object.fromEntries(formData);

    if (isEdit) {
      const updatedExercise = {
        ...editExercise,
        ...newData,
      };
      await mutateExercise(dayId, id, updatedExercise);
      toggleEditMode();
    } else {
      exerciseData.id = nanoid(5);
      exerciseData.dayId = dayId;
      trigger(exerciseData);
    }
    toggleForm();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <StyledForm onSubmit={handleSubmit} id={dayId}>
      <label htmlFor="exercise">
        Exercise
        <input
          type="text"
          name="exercise"
          value={newData.exercise}
          onChange={handleInputChange}
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
          value={newData.sets}
          onChange={handleInputChange}
          required
        />
      </label>
      <label htmlFor="reps">
        Reps
        <input
          type="number"
          name="reps"
          min={1}
          max={100}
          value={newData.reps}
          onChange={handleInputChange}
          required
        />
      </label>
      <label htmlFor="weight">
        Weight
        <input
          type="number"
          name="weight"
          min={0}
          max={800}
          value={newData.weight}
          onChange={handleInputChange}
          required
        />
      </label>
      <ButtonContainer>
        {isEdit ? (
          <button type="submit">Save</button>
        ) : (
          <>
            <button type="submit">Add</button>
            <button type="button" onClick={() => toggleForm()}>
              Cancel
            </button>
          </>
        )}
      </ButtonContainer>
    </StyledForm>
  );
}
