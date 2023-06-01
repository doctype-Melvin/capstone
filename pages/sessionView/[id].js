import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import { usePlan } from "@/utils/helpers";
import styled, { css } from "styled-components";
import Link from "next/link";
import SetCard from "@/components/SetCard";
import format from "date-fns/format";
import { TemplateName as DayNumber } from "../dashboard";

const PageContent = styled.section`
  min-height: 100vh;
  padding-bottom: calc(var(--navbar-height) + 1rem);
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

export default function SessionView() {
  const router = useRouter();
  const { id, plan } = router.query;

  const { data: currentTemplate, isLoading } = usePlan(plan);

  const handleSaveClick = () => {
    const session = {
      sessionDate: format(new Date(), "dd.MM.yy"),
      result: activeDaySession,
    };
    alert(`Saved session for ${session.sessionDate}`)
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
        <SaveSessionButton type="button" onClick={handleSaveClick}>
          Save Session
        </SaveSessionButton>
      </ControlsContainer>
    </PageContent>
  );
}
