import { BsPencilFill as Edit } from "react-icons/bs";
import { AiOutlineDelete as Delete } from "react-icons/ai";
import styled, { css } from "styled-components";
import LoggingForm from "../LoggingForm";
import { useState } from "react";
import { usePlan } from "@/utils/helpers";

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.2fr 0.2fr;
  margin-bottom: 0.45rem;
  & > button {
    font-size: 1.1rem;
  }
  & > span {
    padding-left: 1.5rem;
  }
`;

export default function ResultCard({
  templateId,
  log,
  setNumber,
  toggleForm,
  toggleEditMode,
  isEdit,
  setEditSet,
}) {
  const { data } = usePlan(templateId);

  const handleEditClick = (id) => {
    toggleEditMode((prevState) => !prevState);
    toggleForm();
    const targetSet = data.logs.find((log) => log.setId === id);
    setEditSet(targetSet);
  };

  return (
    <>
      {
        !isEdit ? (
          <ContentContainer>
            <span>
              Set# {setNumber} Reps: {log.reps} @ {log.weight} Kg
            </span>
            <button type="button" onClick={() => handleEditClick(log.setId)}>
              <Edit />
            </button>
            <button type="button">
              <Delete />
            </button>
          </ContentContainer>
        ) : null
        // <LoggingForm toggleForm={toggleForm} exercise={log} isEdit={isEditMode}/>
      }
    </>
  );
}
