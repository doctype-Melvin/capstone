import styled from "styled-components";

const PreviewContainer = styled.section`
  width: 100%;
  text-align: center;
  padding: 0.5rem 1rem;
`;

const DayDisplay = styled.section`
  background-color: hotpink;
`;

const ExercisesPreviewContainer = styled.section`
  display: flex;
  justify-content: space-evenly;
`;

export default function SessionPreview({ template }) {
  // This is all just a bandaid to match current user story

  const dayCount = template.logs.length;

  return (
    <PreviewContainer>
      <section>{template.name}</section>
      <DayDisplay>{`Day ${dayCount + 1}`}</DayDisplay>
      <ExercisesPreviewContainer>
        {template.routine[0].exercises.map((exercise) => (
          <div key={exercise.id}>{exercise.exercise}</div>
        ))}
      </ExercisesPreviewContainer>
    </PreviewContainer>
  );
}
