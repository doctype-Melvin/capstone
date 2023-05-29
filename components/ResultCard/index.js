import { BsPencilFill as Edit } from "react-icons/bs";
import { AiOutlineDelete as Delete } from "react-icons/ai";
import styled, { css } from "styled-components";
import { createUpdateDelete, usePlan } from "@/utils/helpers";

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.2fr 0.2fr;
  margin-bottom: 0.45rem;
  align-items: center;
  & > span {
    padding-left: 1.5rem;
  }
`;

const SharedButtonStyle = css`
  border: none;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  padding: 0.3rem;
`;

const DeleteButton = styled.button`
  ${SharedButtonStyle}
  background-color: var(--cancel-red);
  margin: auto 5px;
`;

const EditButton = styled.button`
  ${SharedButtonStyle}
  background-color: var(--sand);
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
  const { data, mutate } = usePlan(templateId);

  const handleEditClick = (id) => {
    toggleEditMode((prevState) => !prevState);
    toggleForm();
    const targetSet = data.logs.find((log) => log.setId === id);
    setEditSet(targetSet);
  };

  const handleDeleteClick = (id) => {
    const updatedLogs = data.logs.filter((log) => log.setId !== id);
    const updatedData = { ...data, logs: updatedLogs };
    createUpdateDelete(templateId, updatedLogs, "isDelete");
    mutate(updatedData, false);
  };

  return (
    <>
      {
        !isEdit ? (
          <ContentContainer>
            <span>
              Set# {setNumber} Reps: {log.reps} @ {log.weight} Kg
            </span>
            <EditButton
              type="button"
              onClick={() => handleEditClick(log.setId)}
            >
              <Edit />
            </EditButton>
            <DeleteButton
              type="button"
              onClick={() => handleDeleteClick(log.setId)}
            >
              <Delete />
            </DeleteButton>
          </ContentContainer>
        ) : null
        // <LoggingForm toggleForm={toggleForm} exercise={log} isEdit={isEditMode}/>
      }
    </>
  );
}
