import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import { useAllPlans, usePlan } from "@/utils/helpers";
import styled from "styled-components";
import Link from "next/link";
import SetCard from "@/components/SetCard";
import format from "date-fns/format";
import { TemplateName as DayNumber } from "../dashboard";

const PageContent = styled.section`
  height: 100vh;
`;

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
      {activeDay.exercises.map((exercise) => (
        <li key={exercise.id}>
          <SetCard exercise={exercise} templateId={currentTemplate._id} />
        </li>
      ))}
      <Link href="/dashboard">Back</Link>
      <button type="button" onClick={handleSaveClick}>
        Save Session
      </button>
    </PageContent>
  );
}
