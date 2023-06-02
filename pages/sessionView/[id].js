import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import { createUpdateDelete, usePlan } from "@/utils/helpers";
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
  background-color: ${(props) => props.isConfirm ?  "var(--soft-green)" : "var(--sand)"};
  &:hover {
    cursor: pointer;
  }
`;

const SetCardList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export default function SessionView() {
  const router = useRouter();
  const { id, plan } = router.query;
  const [isConfirm, setIsConfirm] = useState(false);

  const { data: currentTemplate, isLoading } = usePlan(plan);

  const handleSaveClick = async () => {
    /* The button for saving the session needs more work
    Users need to cancel the saving process */
    if (isConfirm) {

      const session = {
        sessionDate: format(new Date(), "dd.MM.yy"),
        result: activeDaySession,
        dayNumber: activeDay.day,
        dayId: activeDay.id,
      };
      if (session.sessionDate !== currentTemplate.sessions[currentTemplate.sessions.length - 1].sessionDate) {
        await createUpdateDelete(plan, session, "saveSession")
      }else {
        alert('Session already saved!')
      }
    }
    setIsConfirm(!isConfirm)
  };

  if (isLoading || !currentTemplate) return <Loading />;

  const activeDay = currentTemplate.routine.find((day) => day.id === id);
  const activeDaySession = currentTemplate.logs.filter(
    (log) => log.dayId === id
  );

  return (
    <PageContent>
      <DayNumber>Session Day {activeDay.day}</DayNumber>

      <SetCardList>
        {activeDay.exercises.map((exercise) => (
          <li key={exercise.id}>
            <SetCard exercise={exercise} templateId={currentTemplate._id} />
          </li>
        ))}
      </SetCardList>
      <ControlsContainer>
        <StyledLink href={`/dashboard?id=${plan}`}>Dashboard</StyledLink>
        <SaveSessionButton isConfirm={isConfirm} type="button" onClick={handleSaveClick}>
          { isConfirm ? "Save" : "Save Session" }
        </SaveSessionButton>
      </ControlsContainer>
    </PageContent>
  );
}
