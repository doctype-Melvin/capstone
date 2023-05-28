import styled from "styled-components";
import { nanoid } from "nanoid";
import { useState } from "react";
import { format } from "date-fns";
import { createUpdateDelete } from "@/utils/helpers";

const StyledForm = styled.form`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
`;

const StyledInput = styled.input`
  width: 3.5rem;
`;

export default function LoggingForm({
  onLog,
  onSubmit,
  editMode,
  editSet,
  onEditSave,
  templateId,
  exercise,
}) {
  const [updatedSetValues, setUpdatedSetValues] = useState({
    reps: exercise.reps,
    weight: exercise.weight,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const setData = Object.fromEntries(formData);

    if (editMode) {
      const updatedSet = {
        ...editSet,
        ...updatedSetValues,
      };
      onSubmit((prevState) => {
        const updatedState = [...prevState];
        const indexOfSet = updatedState.findIndex(
          (set) => set.id === updatedSet.id
        );
        updatedState[indexOfSet] = updatedSet;
        return updatedState;
      });
      onEditSave((prevState) => !prevState);
      createUpdateDelete(templateId, updatedSet, "isEdit");
    } else {
      setData.id = nanoid(5);
      setData.date = format(new Date(), "dd-MM-yyyy");

      onSubmit((prevState) => [...prevState, setData]);
      createUpdateDelete(templateId, setData, "isCreate");
    }
    onLog((prevState) => !prevState);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedSetValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="reps">Reps</label>
      <StyledInput
        type="number"
        name="reps"
        min={1}
        max={1000}
        value={updatedSetValues.reps}
        onChange={handleInputChange}
      />
      <label htmlFor="weight">Weight</label>
      <StyledInput
        type="number"
        name="weight"
        min={0}
        max={1000}
        value={updatedSetValues.weight}
        onChange={handleInputChange}
      />
      <button type="submit">Save</button>
    </StyledForm>
  );
}
