import { usePlan } from "@/utils/helpers";
import LoggingForm from "../LoggingForm";
import { useState } from "react";
import styled from "styled-components";
import Loading from "../Loading";
import { useRouter } from "next/router";
import ResultCard from "../ResultCard";

const StyledContainer = styled.section`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 0.5fr;
`;

const ResultList = styled.ul`
  width: 100%;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export default function SetCard({ exercise, templateId }) {
  // Render mutated data
  const { data, isLoading } = usePlan(templateId);
  const [showLogForm, setShowLogForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editSet, setEditSet] = useState("");

  const router = useRouter();
  const { id } = router.query;

  const toggleForm = () => setShowLogForm((prevState) => !prevState);
  const toggleEditMode = () => setIsEditMode((prevState) => !prevState);

  if (!data || isLoading) return <Loading />;

  return (
    <>
      <StyledContainer>
        <span>{exercise.exercise}</span>
        <span>
          {exercise.sets} x {exercise.reps} @ {exercise.weight}{" "}
        </span>
        {!showLogForm ? (
          <button type="button" onClick={toggleForm}>
            Add Set
          </button>
        ) : null}
      </StyledContainer>
      {showLogForm ? (
        <LoggingForm
          exercise={exercise}
          toggleForm={toggleForm}
          templateId={templateId}
          isEdit={isEditMode}
          toggleEditMode={toggleEditMode}
          editSet={editSet}
        />
      ) : null}

      <ResultList>
        {data.logs
          .filter((log) => log.dayId === id)
          .map((log, index) => (
            <li key={log.setId}>
              <ResultCard
                templateId={templateId}
                toggleForm={toggleForm}
                log={log}
                setNumber={index + 1}
                toggleEditMode={toggleEditMode}
                isEdit={isEditMode}
                setEditSet={setEditSet}
              />
            </li>
          ))}
      </ResultList>
    </>
  );
}
