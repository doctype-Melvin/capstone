import styled from "styled-components";
import LoggingForm from "../LoggingForm";
import { useState } from "react";
import SetCard from "../SetCard";
import { createUpdateDelete } from "@/utils/helpers";

const Wrapper = styled.section`
  width: 100%;
`;

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 0.25fr;
`;

const ExerciseDetails = styled.div`
  font-weight: 600;
`;

const LogButton = styled.button`
  margin-bottom: 0.3rem;
`;

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
  grid-column: 1 / span 2;

  & > li {
    background-color: hotpink;
    color: white;
    margin-bottom: 0.2rem;
    padding: 0.5rem;
    border-radius: 5px;
  }
`;

export default function ExercisePreview({ exercise, templateId, setLogObject }) {
  const [toggleForm, setToggleForm] = useState(false);
  const [allSets, setAllSets] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editSet, setEditSet] = useState({});

  const handleLogClick = () => setToggleForm((prevState) => !prevState);

  const handleEditClick = (id) => {
    setEditMode((prevState) => !prevState);
    setToggleForm((prevState) => !prevState);
    const editThis = allSets.find((set) => set.id === id);
    setEditSet(editThis);
  };

  const handleDeleteClick = (id) => {
    setAllSets((prevState) => {
      const updateSets = [...prevState];
      return updateSets.filter((set) => set.id !== id);
    });
    createUpdateDelete(templateId, id, "isDelete");
  };

  return (
    <Wrapper>
      <Container>
        <ExerciseDetails>
          {exercise.exercise} {" - "} {exercise.sets} {" x "} {exercise.reps}{" "}
          {" @ "} {exercise.weight} {"Kg"}
        </ExerciseDetails>
        {!toggleForm && <LogButton onClick={handleLogClick}>Log Set</LogButton>}
        <StyledList>
          {!toggleForm &&
            allSets.map((set, index) => (
              <li key={set.id}>
                <SetCard
                  set={set}
                  index={index}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                  editSet={editSet}
                  templateId={templateId}
                />
              </li>
            ))}
        </StyledList>
      </Container>
      {toggleForm && (
        <LoggingForm
          onLog={setToggleForm}
          onSubmit={setAllSets}
          editMode={editMode}
          editSet={editSet}
          onEditSave={setEditMode}
          templateId={templateId}
          exercise={exercise}
          setLogObject={setLogObject}
        />
      )}
    </Wrapper>
  );
}
