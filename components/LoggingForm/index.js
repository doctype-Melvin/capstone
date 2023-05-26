import styled from "styled-components";
import { nanoid } from "nanoid";
import { useState } from "react";

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
}) {
  const [newData, setNewData] = useState({
    reps: editMode ? editSet.reps : "",
    weight: editMode ? editSet.weight : "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const setData = Object.fromEntries(formData);

    if (editMode) {
      const updatedSet = {
        ...editSet,
        ...newData,
      };
      onSubmit((prevState) => {
        const updatedState = [...prevState];
        const indexOfSet = updatedState.findIndex(
          (set) => set.id === updatedSet.id
        );
        updatedState[indexOfSet] = updatedSet;
        console.log(updatedSet);
        return updatedState;
      });
      onEditSave((prevState) => !prevState);
    } else {
      setData.id = nanoid(5);
      onSubmit((prevState) => [...prevState, setData]);
    }
    onLog((prevState) => !prevState);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewData((prevState) => ({
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
        value={newData.reps}
        onChange={handleInputChange}
      />
      <label htmlFor="weight">Weight</label>
      <StyledInput
        type="number"
        name="weight"
        min={0}
        max={1000}
        value={newData.weight}
        onChange={handleInputChange}
      />
      <button type="submit">Save</button>
    </StyledForm>
  );
}
