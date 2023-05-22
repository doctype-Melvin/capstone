import styled from "styled-components";
import { useState } from "react";

const CardContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #b8f28d;
  padding: 10px 5px;
`;

const ExerciseName = styled.span`
  margin-left: 0.8rem;
`;

const DetailsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
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

  const handleEditClick = () => {
    handleCollapseExpand();
    toggleForm();
    toggleEditMode();
    setEditExercise(exercise);
  };

  const handleDeleteClick = (event) => console.log(event.target.id);

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
              <button
                type="button"
                id={exercise.id}
                onClick={handleDeleteClick}
              >
                Delete
              </button>
              <button type="button" onClick={handleEditClick}>
                Edit
              </button>
            </ButtonContainer>
          ) : null}
        </CardContainer>
      ) : null}
    </>
  );
}
