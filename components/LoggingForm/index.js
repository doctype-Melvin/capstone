import styled from "styled-components";
import { useState } from "react";
import { nanoid } from "nanoid";
import { usePlan } from "@/utils/helpers";
import { createUpdateDelete } from "@/utils/helpers";
import Loading from "../Loading";

const StyledForm = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  ${({ isEdit }) =>
    isEdit &&
    css`
      grid-template-columns: repeat(6, 1fr);
    `}
`;

const StyledInput = styled.input`
  width: 3rem;
`;

export default function LoggingForm({
  exercise,
  toggleForm,
  templateId,
  isEdit,
  toggleEditMode,
  editSet,
}) {
  const { data, isLoading, mutate } = usePlan(templateId);

  const [attributes, setAttributes] = useState({
    exercise: exercise.exercise,
    reps: isEdit ? editSet.reps : exercise.reps,
    weight: isEdit ? editSet.weight : exercise.weight,
    exerciseId: exercise.id,
    dayId: exercise.dayId,
  });

  const handleCloseClick = () => {
    toggleEditMode();
    toggleForm();
  };

  const handleSubmit = () => {
    if (isEdit) {
      const previousSetData = data.logs.find(
        (log) => log.setId === editSet.setId
      );
      const previousSetDataIndex = data.logs.findIndex(
        (log) => log.setId === editSet.setId
      );
      const updatedLogs = [...data.logs];
      updatedLogs[previousSetDataIndex] = { ...previousSetData, ...attributes };
      const updatedData = { ...data, logs: updatedLogs };
      mutate(updatedData, false);
      toggleEditMode();
    } else {
      attributes.setId = nanoid(5);
      const updatedLogs = [...data.logs, attributes];
      const updatedData = { ...data, logs: updatedLogs };
      mutate(updatedData, false);
      createUpdateDelete(templateId, updatedLogs, "isCreate");
    }

    toggleForm();
  };

  const handleInputchange = (event) => {
    const { name, value } = event.target;
    setAttributes((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (!data || isLoading) return <Loading />;

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="reps">Reps</label>
      <StyledInput
        type="number"
        name="reps"
        value={attributes.reps}
        onChange={handleInputchange}
      />
      <label htmlFor="weight">Weight</label>
      <StyledInput
        type="number"
        name="weight"
        value={attributes.weight}
        onChange={handleInputchange}
      />
      {isEdit && (
        <button type="button" onClick={handleCloseClick}>
          Close
        </button>
      )}
      <button>Save</button>
    </StyledForm>
  );
}
