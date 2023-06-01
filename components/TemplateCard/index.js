import styled from "styled-components";
import { AiOutlineDelete as Delete } from "react-icons/ai";
import Link from "next/link";
import { deleteTemplate } from "@/utils/helpers";
import { setCurrentTemplate } from "@/utils/helpers";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { AiOutlineCheck as Checkmark } from "react-icons/ai";

const TemplateContainer = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 0.6fr 0.5fr 0.5fr 0.25fr;
  align-items: center;
  padding: 0.35rem 0.75rem;
  margin-bottom: 0.75rem;
  background-color: var(--lightest-blue);
  font-size: 1.25rem;

  & > span {
    padding-left: 0.5rem;
  }
`;
export const IconContainer = styled.button`
  font-size: 1.75rem;
  display: flex;
  justify-content: center;
  padding: 0.3rem 0;
  border-radius: 5px;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--dark-main);
  &:visited {
    color: var(--dark-blue);
  }
`;

const CurrentButton = styled.button`
  border: none;
  background-color: var(--dark-main);
  color: #fff;
  font-size: 1rem;
  border-radius: 3px;
  width: fit-content;
  padding: .1rem .75rem;
  margin: 0 auto;
`;

const CurrentIndicator = styled.div`
  border-radius: 5px;
  font-size: 1rem;
  text-align: center;
  margin: 0 auto;
  padding: 0 10px;
  background-color: var(--soft-green);
  color: var(--dark-main);
`;

export default function TemplateCard({ templateData }) {
  const [isDelete, setIsDelete] = useState(false);
  const deleteRef = useRef(null);
  const router = useRouter();

  const handleSetCurrentClick = (id) => {
    setCurrentTemplate(id);
    setTimeout(() => {
      router.push(`/dashboard?id=${id}`);
    }, 1500);
  };

  const handleDeleteClick = (id) => {
    deleteTemplate(id);
    setIsDelete(false);
  };

  useEffect(() => {
    const handleWindowClick = (event) => {
      if (
        isDelete &&
        deleteRef.current &&
        !deleteRef.current.contains(event.target)
      ) {
        setIsDelete(false);
      }
    };

    document.addEventListener("mousedown", handleWindowClick);

    return () => document.removeEventListener("mousedown", handleWindowClick);
  }, [isDelete]);

  return (
    <TemplateContainer>
      <StyledLink href={`/viewPlans/${templateData._id}`}>
        {templateData.name.toUpperCase()}{" "}
      </StyledLink>
      {templateData.isCurrent ? (
        <CurrentIndicator
          onClick={() => router.push(`/dashboard?id=${templateData._id}`)}
        >
          <Checkmark />
        </CurrentIndicator>
      ) : (
        <CurrentButton
          type="button"
          onClick={() => handleSetCurrentClick(templateData._id)}
        >
          Select
        </CurrentButton>
      )}
      <span>
        {templateData.days} {templateData.days > 1 ? "Days" : "Day"}
      </span>
      <IconContainer
      type="button"
        style={{
          backgroundColor: isDelete ? "var(--sand)" : "var(--cancel-red)",
        }}
        ref={deleteRef}
        onClick={() => {
          if (isDelete) {
            handleDeleteClick(templateData._id);
          }
          setIsDelete((prevState) => !prevState);
        }}
      >
        {!isDelete ? <Delete /> : <Checkmark />}
      </IconContainer>
    </TemplateContainer>
  );
}
