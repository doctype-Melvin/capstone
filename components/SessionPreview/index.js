import styled from "styled-components";
import ExercisePreview from "../ExercisePreview";

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

export default function SessionPreview({ template, setLogObject }) {

  return (
    <PreviewContainer>
      <StyledCard>
        <span>{template.name}</span>
        <DayDisplay>{`Week 1 - Day 1`}</DayDisplay>
        <ExercisesPreviewContainer>
          {template.routine[0].exercises.map((exercise) => (
            <li key={exercise.id}>
              <ExercisePreview
                exercise={exercise}
                templateId={template._id}
                setLogObject={setLogObject}
              />
            </li>
          ))}
        </ExercisesPreviewContainer>
      </StyledCard>
    </PreviewContainer>
  );
}
