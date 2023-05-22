import styled from "styled-components";
import useSWR from "swr";
import { useRouter } from "next/router";
import WorkoutDay from "@/components/WorkoutDay/WorkoutDay";
import { fetcher } from "@/utils/helpers";

const PlanContainer = styled.section`
  height: 100vh;
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

export default function SinglePlanView() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/plans/${id}`, fetcher);

  if (!data) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <PlanContainer>
      <PlanHead>{data.name}</PlanHead>
      <PlanBody>
        {data.routine.map((day) => (
          <WorkoutDay key={day.id} number={day.day} dayId={day.id} />
        ))}
      </PlanBody>
    </PlanContainer>
  );
}
