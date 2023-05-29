import styled from "styled-components";
import { useState } from "react";
import { removeExercise } from "@/utils/helpers";
import { useRouter } from "next/router";
import { usePlan } from "@/utils/helpers";
import { AddButton, AddButton as EditButton } from "../ExerciseForm";
import { CancelButton as DeleteButton } from "../ExerciseForm";

const CardContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--lightest-blue);
  padding: 10px 5px;
`;

const ExerciseName = styled.span`
  margin-left: 0.8rem;
  font-size: 1.25rem;
`;

const DetailsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  font-size: 1.2rem;
  & > span:hover {
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
`;

export default function ExerciseCard({
  exercise,
  toggleForm,
  toggleEditMode,
  isEdit,
  setEditExercise,
}) {
  const [expanded, setExpanded] = useState(false);
  const handleCollapseExpand = () => setExpanded((prevState) => !prevState);
  const router = useRouter();
  const { id } = router.query;
  const { data } = usePlan(id);

  const handleEditClick = () => {
    handleCollapseExpand();
    toggleForm();
    toggleEditMode();
    setEditExercise(exercise);
  };

  const handleDeleteClick = async (exercise) => {
    await removeExercise(id, data, exercise);
  };

  return (
    <>
      {!isEdit ? (
        <CardContainer>
          <ExerciseName aria-label="exercise-name">
            {exercise.exercise.toUpperCase()}
          </ExerciseName>
          <DetailsContainer>
            <div>Sets: {exercise.sets}</div>
            <div>Reps: {exercise.reps}</div>
            <div>Weight: {exercise.weight}</div>
            {expanded ? (
              <span onClick={handleCollapseExpand}>&#x25B2;</span>
            ) : (
              <span onClick={handleCollapseExpand}>&#x25BC;</span>
            )}
          </DetailsContainer>
          {expanded ? (
            <ButtonContainer>
              <DeleteButton type="button" onClick={() => handleDeleteClick(exercise)}>
                Delete
              </DeleteButton>
              <AddButton type="button" onClick={handleEditClick}>
                Edit
              </AddButton>
            </ButtonContainer>
          ) : null}
        </CardContainer>
      ) : null}
    </>
  );
}
