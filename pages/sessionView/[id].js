import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import { useAllPlans } from "@/utils/helpers";
import styled, { css } from "styled-components";
import Link from "next/link";
import SetCard from "@/components/SetCard";
import format from "date-fns/format";
import { TemplateName as DayNumber } from "../dashboard";

const PageContent = styled.section`
  min-height: 100vh;
`;

const ControlsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
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

`

export default function SessionView() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useAllPlans();

  const handleSaveClick = () => {
    const session = {
      sessionDate: format(new Date(), "MM/dd/yy"),
      result: activeDaySession,
    };
  };

  if (isLoading || !data) return <Loading />;

  const currentTemplate = data.find((template) => template.isCurrent === true);
  const activeDay = currentTemplate.routine.find((day) => day.id === id);
  const activeDaySession = currentTemplate.logs.filter(
    (log) => log.dayId === id
  );

  return (
    <PageContent>
      <DayNumber>Day {activeDay.day}</DayNumber>
        <SetCardList>
        {activeDay.exercises.map((exercise) => (
          <li key={exercise.id}>
            <SetCard exercise={exercise} templateId={currentTemplate._id} />
          </li>
        ))}
        </SetCardList>
      <ControlsContainer>
        <StyledLink href="/dashboard">Dashboard</StyledLink>
        <SaveSessionButton type="button" onClick={handleSaveClick}>
          Save Session
        </SaveSessionButton>
      </ControlsContainer>
    </PageContent>
  );
}
