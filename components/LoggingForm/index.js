import styled, { css } from "styled-components";
import { useState } from "react";
import { nanoid } from "nanoid";
import { usePlan } from "@/utils/helpers";
import { createUpdateDelete } from "@/utils/helpers";
import Loading from "../Loading";
import { AiOutlineCheck as Checkmark } from "react-icons/ai";
import { RxCross1 as Cross } from "react-icons/rx";

const StyledForm = styled.form`
  width: 100%;
  display: grid;
  align-items: center;
  gap: 0.3rem;
  grid-template-columns: 0.35fr 0.5fr 0.5fr 0.75fr 1fr;
  ${({ isEdit }) =>
    isEdit &&
    css`
      grid-template-columns: repeat(5, 0.5fr) 1fr;
    `};
  padding: 0 0.5rem 1rem 0.5rem;

  & > input {
    border: solid 1px var(--dark-blue);
    border-radius: 3px;
    font-size: 1.1rem;
    width: 100%;
  }
`;

const SharedButtonStyle = css`
  border: none;
  padding: 0.3rem 0.5rem;
  border-radius: 3px;
  width: 3rem;
  font-size: 1rem;
`;

const SaveButton = styled.button`
  ${SharedButtonStyle}
  background-color: var(--soft-green);
`;

const CloseButton = styled.button`
  ${SharedButtonStyle}
  background-color: var(--cancel-red);
`;

const ButtonContainer = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;
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
    if (isEdit) {
      toggleEditMode();
    }
    toggleForm();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEdit) {
      const previousSetData = data.logs.find(
        (log) => log.setId === editSet.setId
      );
      const previousSetDataIndex = data.logs.findIndex(
        (log) => log.setId === editSet.setId
      );
      const updatedLogs = [...data.logs];
      updatedLogs[previousSetDataIndex] = { ...previousSetData, ...attributes };
      console.log(updatedLogs);
      await createUpdateDelete(templateId, updatedLogs, "isEdit");
      mutate();
      toggleEditMode();
    } else {
      attributes.setId = nanoid(5);
      const updatedLogs = [...data.logs, attributes];
      await createUpdateDelete(templateId, updatedLogs, "isCreate");
      mutate();
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
        id="reps"
        value={attributes.reps}
        onChange={handleInputchange}
      />
      <label htmlFor="weight">Weight</label>
      <StyledInput
        type="number"
        name="weight"
        id="weight"
        value={attributes.weight}
        onChange={handleInputchange}
      />
      <ButtonContainer>
        <SaveButton type="submit">
          <Checkmark />
        </SaveButton>
        <CloseButton type="button" onClick={handleCloseClick}>
          <Cross />
        </CloseButton>
      </ButtonContainer>
    </StyledForm>
  );
}
