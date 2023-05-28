import styled from "styled-components";
import ExercisePreview from "../ExercisePreview";
import { useAllPlans, usePlan } from "@/utils/helpers";
import Loading from "../Loading";

const PreviewContainer = styled.section`
  height: 100vh;
`;

const StyledCard = styled.section`
  width: 100%;
  text-align: center;
  padding: 0.5rem 1rem;
`;

const DayDisplay = styled.section`
  background-color: hotpink;
  margin-bottom: 0.25rem;
`;

const ExercisesPreviewContainer = styled.ul`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  margin: 0;
  padding: 0;
  gap: 0.5rem;

  & > li {
    list-style-type: none;
  }
`;

export default function SessionPreview({ template }) {
  const currentWeek = template.logs[template.logs.length - 1];
  const currentDay = currentWeek.log[currentWeek.log.length - 1];
  const currentDayExercises = template.routine.find(
    (day) => day.id === currentDay.id
  ).exercises;

  return (
    <PreviewContainer>
      <StyledCard>
        <span>{template.name}</span>
        <DayDisplay>{`Week ${currentWeek.week} - Day ${currentDay.day}`}</DayDisplay>
        <ExercisesPreviewContainer>
          {currentDayExercises.map((exercise) => (
            <li key={exercise.id}>
              <ExercisePreview
                exercise={exercise}
                templateId={template._id}
                logs={template.logs}
              />
            </li>
          ))}
        </ExercisesPreviewContainer>
      </StyledCard>
    </PreviewContainer>
  );
}
