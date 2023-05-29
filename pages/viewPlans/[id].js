import styled, { css } from "styled-components";
import useSWR from "swr";
import { useRouter } from "next/router";
import WorkoutDay from "@/components/WorkoutDay";
import { fetcher } from "@/utils/helpers";
import Loading from "@/components/Loading";

const PlanContainer = styled.section`
  min-height: 100vh;
  margin-bottom: 1rem;
`;

const PlanHead = styled.p`
  width: 100vw;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const PlanBody = styled.section`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const SaveButton = styled.button`
  border: none;
  padding: 0.45rem 1.75rem;
  font-size: 1.2rem;
  border-radius: 3px;
  background-color: var(--soft-green);
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

export default function SinglePlanView() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/plans/${id}`, fetcher);

  const handleSaveClick = () => router.push(`/viewPlans`);

  if (!data) return <Loading />;
  if (error) return <p>Something went wrong</p>;

  return (
    <PlanContainer>
      <PlanHead>{data.name}</PlanHead>
      <PlanBody>
        {data.routine.map((day) => (
          <WorkoutDay key={day.id} number={day.day} dayId={day.id} />
        ))}
      </PlanBody>
      <ButtonContainer>
        <SaveButton type="button" onClick={handleSaveClick}>
          Save
        </SaveButton>
      </ButtonContainer>
    </PlanContainer>
  );
}
