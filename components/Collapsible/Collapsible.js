import { useState } from "react";
import styled from "styled-components";
import ExerciseForm from "../ExerciseForm/ExerciseForm";


const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: ${({ expand }) => (expand ? "column" : "row")};
  align-items: center;
  position: relative;
`;

const StyledParameters = styled.div`
  margin: 0 0.8rem;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
  margin-top: 1rem;
`;

const StyledExpandControl = styled.span`
  position: absolute;
  top: 0;
  right: 0;

  &:hover {
    cursor: pointer;
  }
`;

export default function Collapsible({
  id,
  sets,
  reps,
  weight,
  dayId,
  handleUpdateExercise,
}) {
  const [expand, setExpand] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editExercise, setEditExercise] = useState("");

  const handleCollapseExpand = () => setExpand((prevState) => !prevState);

  const handleEditClick = () => {
    handleCollapseExpand();
    setEditMode((prevState) => !prevState);
    
    const currentData = JSON.parse(localStorage.getItem("plan"));
    const editTarget = currentData.routine
      .find((day) => day.id === dayId)
      .exercises.find((exercise) => exercise.id === id);
    
      setEditExercise(editTarget);
  };

  return (
    <section>
      <StyledContainer expand={expand}>
        {!editMode && (
          <>
            <StyledParameters>Sets: {sets}</StyledParameters>
            <StyledParameters>Reps: {reps}</StyledParameters>
            <StyledParameters>Weight: {weight}</StyledParameters>
            <StyledExpandControl onClick={handleCollapseExpand}>
              {expand ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
            </StyledExpandControl>
          </>
        )}
        {expand && !editMode && (
          <StyledButtonContainer>
            <button onClick={handleEditClick}>Edit</button>
            <button>Delete</button>
          </StyledButtonContainer>
        )}
        {editMode && (
          <ExerciseForm
            edit={editMode}
            dayId={dayId}
            onToggleEdit={setEditMode}
            editExercise={editExercise}
            onUpdate={handleUpdateExercise}
          />
        )}
      </StyledContainer>
    </section>
  );
}
