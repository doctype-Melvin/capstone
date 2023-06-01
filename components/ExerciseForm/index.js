import styled, { css } from "styled-components";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";
import { sendPostRequest } from "@/utils/helpers";
import { mutateExercise } from "@/utils/helpers";

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  grid-template-rows: repeat(5, 0.5fr);
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 1rem;

  & > label {
    margin-right: 1rem;
    font-size: 1.5rem;
  }

  & > input {
    margin-left: 0.3rem;
    font-size: 1.5rem;
    width: 50vw;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: 0.7rem;
  grid-column: 1 / 3;
`;

const SharedButtonStyle = css`
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  font-size: 1rem;
`;

export const AddButton = styled.button`
  ${SharedButtonStyle}
  background-color: var(--soft-green);
  color: var(--dark-main);
`;

export const CancelButton = styled.button`
  ${SharedButtonStyle}
  background-color: var(--cancel-red);
  color: var(--lightest-blue);
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
    <StyledForm onSubmit={handleSubmit} autoComplete="off" id={dayId}>
      <label htmlFor="exercise">Exercise</label>
      <input
        type="text"
        name="exercise"
        id="exercise"
        value={newData.exercise}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="sets">Sets</label>
      <input
        type="number"
        name="sets"
        id="sets"
        min={1}
        max={30}
        value={newData.sets}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="reps">Reps</label>
      <input
        type="number"
        name="reps"
        id="reps"
        min={1}
        max={100}
        value={newData.reps}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="weight">Weight</label>
      <input
        type="number"
        name="weight"
        id="weight"
        min={0}
        max={800}
        value={newData.weight}
        onChange={handleInputChange}
        required
      />
      <ButtonContainer>
        {isEdit ? (
          <AddButton type="submit">Save</AddButton>
        ) : (
          <>
            <CancelButton type="button" onClick={() => toggleForm()}>
              Cancel
            </CancelButton>
            <AddButton type="submit">Add</AddButton>
          </>
        )}
      </ButtonContainer>
    </StyledForm>
  );
}
