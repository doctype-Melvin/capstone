import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import { usePlan } from "@/utils/helpers";
import styled, { css } from "styled-components";
import Link from "next/link";
import SetCard from "@/components/SetCard";
import format from "date-fns/format";
import { TemplateName as DayNumber } from "../dashboard";
import { useState } from "react";

const PageContent = styled.section`
  min-height: 100vh;
  padding-bottom: calc(var(--navbar-height) + 1rem);
  position: relative;
`;

const ControlsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding-top: 1rem;
`;

const SharedButtonStyle = css`
  padding: 0.5rem 1rem;
  border-radius: 3px;
  font-size: 1rem;
`;

const StyledLink = styled(Link)`
  ${SharedButtonStyle}
  text-decoration: none;
  background-color: var(--lightest-blue);
  color: var(--dark-main);
`;

const SaveSessionButton = styled.button`
  ${SharedButtonStyle}
  border: none;
  background-color: var(--soft-green);
  &:hover {
    cursor: pointer;
  }
`;

const SetCardList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const TempModal = styled.div`
  height: 10rem;
  width: 20rem;
  background-color: var(--sand);
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  opacity: ${({visible }) => (visible ? 1 : 0)};
  transition: opacity 0.7s ease-in-out;
  position: absolute;
  text-align: center;
  top: 15%;
  left: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border-radius: 5px;
`

export default function SessionView() {
  const router = useRouter();
  const { id, plan } = router.query;
  const [ showModal, setShowModal ] = useState(false)

  const { data: currentTemplate, isLoading } = usePlan(plan);

  const handleSaveClick = () => {
    const session = {
      sessionDate: format(new Date(), "dd.MM.yy"),
      result: activeDaySession,
    };

    setShowModal(true)
    setTimeout(() => {
      setShowModal(false);
    }, 2800)
    
  };

  if (isLoading || !currentTemplate) return <Loading />;

  const activeDay = currentTemplate.routine.find((day) => day.id === id);
  const activeDaySession = currentTemplate.logs.filter(
    (log) => log.dayId === id
  );

  return (
    <PageContent>
      <DayNumber>Session Day {activeDay.day}</DayNumber>
      <TempModal visible={showModal}>
        {`This feature will be available soon :)`}
      </TempModal>
      <SetCardList>
        {activeDay.exercises.map((exercise) => (
          <li key={exercise.id}>
            <SetCard exercise={exercise} templateId={currentTemplate._id} />
          </li>
        ))}
      </SetCardList>
      <ControlsContainer>
        <StyledLink href={`/dashboard?id=${plan}`}>Dashboard</StyledLink>
        <SaveSessionButton type="button" onClick={handleSaveClick}>
          Save Session
        </SaveSessionButton>
      </ControlsContainer>
    </PageContent>
  );
}
