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

export default function SessionPreview({ templateId }) {
  const { data, isLoading } = useAllPlans();

  // const { data: template, isLoading } = usePlan(templateId)
  if (!data) return <Loading />;
  if (isLoading) return <Loading />;
  const currentTemplate = data.find((template) => template.isCurrent === true);
  const currentTemplateLogs = currentTemplate.logs;
  return (
    <PreviewContainer>
      <StyledCard>
        <span>{currentTemplate.name}</span>
        <DayDisplay>{`Day ${currentTemplate.logs.length + 1}`}</DayDisplay>
        <ExercisesPreviewContainer>
          {currentTemplate.routine[0].exercises.map((exercise) => (
            <li key={exercise.id}>
              <ExercisePreview
                exercise={exercise}
                templateId={currentTemplate._id}
                logs={currentTemplateLogs}
              />
            </li>
          ))}
        </ExercisesPreviewContainer>
      </StyledCard>
    </PreviewContainer>
  );
}
