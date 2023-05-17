import styled from "styled-components";
import Collapsible from "../Collapsible/Collapsible";

const CardContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: lightgray;
  padding: 10px 5px;
`;

const ExerciseName = styled.span`
  margin-left: 0.8rem;
`;

export default function ExerciseCard({
  id,
  name,
  sets,
  reps,
  weight,
  dayId,
  handleUpdateExercise,
}) {
  return (
    <CardContainer>
      <ExerciseName aria-label="exercise-name">
        {name.toUpperCase()}
      </ExerciseName>
      <Collapsible
        id={id}
        sets={sets}
        reps={reps}
        weight={weight}
        dayId={dayId}
        handleUpdateExercise={handleUpdateExercise}
      />
    </CardContainer>
  );
}
