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
  // Mutate cached data here in the form
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
      data.logs[previousSetDataIndex] = { ...previousSetData, ...attributes };
      mutate(data, true);
      toggleEditMode();
    } else {
      attributes.setId = nanoid(5);
      const logsArray = data.logs;
      const updatedLogs = [...logsArray, attributes];
      data.logs = updatedLogs;
    }

    toggleForm();
    mutate(data, true);
    createUpdateDelete(templateId, data.logs, "isCreate");
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
