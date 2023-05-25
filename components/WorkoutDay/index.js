import styled from "styled-components";
import ExerciseForm from "../ExerciseForm";
import { useState } from "react";
import ExerciseCard from "../ExerciseCard";
import { usePlan } from "@/utils/helpers";
import { useRouter } from "next/router";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 0.3rem;
  border-radius: 3px;
  gap: 0.3rem;
`;

const StyledTitle = styled.h1`
  padding: 0.5rem 0 0 0;
  margin: 0;
  font-size: 0.9rem;
`;

const StyledButton = styled.button`
  border: none;
  font-size: 1rem;
  width: fit-content;
`;

export default function WorkoutDay({ number, dayId }) {
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editExercise, setEditExercise] = useState({});

  const router = useRouter();
  const { id } = router.query;
  const { data } = usePlan(id);

  const toggleForm = () => setShowForm((prevState) => !prevState);
  const toggleIsEdit = () => setIsEdit((prevState) => !prevState);

  return (
    <StyledSection>
      <StyledTitle>Day {number}</StyledTitle>
      {data.routine
        .find((day) => day.id === dayId)
        .exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            toggleForm={toggleForm}
            toggleEditMode={toggleIsEdit}
            isEdit={isEdit}
            setEditExercise={setEditExercise}
          />
        ))}
      {!showForm ? (
        <StyledButton type="button" onClick={toggleForm}>
          Add Exercise
        </StyledButton>
      ) : (
        <ExerciseForm
          toggleForm={toggleForm}
          dayId={dayId}
          isEdit={isEdit}
          toggleEditMode={toggleIsEdit}
          editExercise={editExercise}
        />
      )}
    </StyledSection>
  );
}
