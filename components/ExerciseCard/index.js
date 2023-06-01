import styled from "styled-components";
import { useState } from "react";
import { removeExercise } from "@/utils/helpers";
import { useRouter } from "next/router";
import { usePlan } from "@/utils/helpers";
import { AddButton, AddButton as EditButton } from "../ExerciseForm";
import { CancelButton as DeleteButton } from "../ExerciseForm";
import { AiOutlineCheck as Checkmark } from "react-icons/ai";
import { IconContainer } from "../TemplateCard";
import { AiOutlineDelete as Delete } from "react-icons/ai";
import { BsPencilFill as Edit } from "react-icons/bs";


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
  align-items: center;
  margin-top: 1rem;
  & > button {
    width: 4rem;
    height: fit-content;
    font-size: 1.25rem;
  }
`;

export default function ExerciseCard({
  exercise,
  toggleForm,
  toggleEditMode,
  isEdit,
  setEditExercise,
}) {
  const [expanded, setExpanded] = useState(false);
  const [ isDelete, setIsDelete ] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const { data } = usePlan(id);

  const handleCollapseExpand = () => {
    if (isDelete) {
      setIsDelete(false);
    }
    setExpanded((prevState) => !prevState)
  };

  const handleEditClick = () => {
    if (isDelete) {
      setIsDelete(false);
    }
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
      {!isEdit && (
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
          {expanded && (
            <ButtonContainer>
              <IconContainer
                type="button"
                style={{
          backgroundColor: isDelete ? "var(--sand)" : "var(--cancel-red)",
        }}
                onClick={() => {
                  if (isDelete) {
                    handleDeleteClick(exercise)
                  }
                  setIsDelete(prevState => !prevState)
                }}
              >
                { !isDelete ? <Delete /> : <Checkmark />} 
              </IconContainer>
              <IconContainer
               type="button"
               onClick={handleEditClick}
               style={{backgroundColor: "var(--soft-green)"}}
               >
                <Edit />
              </IconContainer>
            </ButtonContainer>
          )}
        </CardContainer>
  )}
    </>
  );
}
