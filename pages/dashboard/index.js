import { useAllPlans, usePlan } from "@/utils/helpers";
import Loading from "@/components/Loading";
import styled from "styled-components";
import SessionCard from "@/components/SessionCard";
import { useRouter } from "next/router";
import Link from "next/link";
import { NewTemplateLink } from "../viewPlans";
import { ButtonContainer } from "../viewPlans";

export const TemplateName = styled.p`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  margin: 0;
  padding: 1rem 0;
  background-color: var(--light-blue);
  color: var(--lightest-blue);
  box-shadow: 1px 1px 5px 5px var(--lightest-blue);
`;

const StyledList = styled.ul`
  padding: 0;
  margin: 0;
`;

const ContentContainer = styled.section`
  min-height: 100vh;
`;

export default function Dashboard() {
  // const { data, isLoading } = useAllPlans();
  const router = useRouter();
  const { id } = router.query;

  const { data: currentPlan, isLoading, error } = usePlan(id);

  if (error)
    return (
      <ContentContainer>
        <TemplateName>No current template set</TemplateName>
        <ButtonContainer>
          <NewTemplateLink href="/createPlan">New Template</NewTemplateLink>
        </ButtonContainer>
      </ContentContainer>
    );
  if (isLoading || !currentPlan) return <Loading />;
  // const currentPlan = data.find((template) => template.isCurrent === true);

  return (
    <ContentContainer>
      <TemplateName>{currentPlan.name}</TemplateName>
      <StyledList>
        {currentPlan.routine.map((day) => (
          <li key={day.id}>
            <SessionCard day={day} planId={id} />
          </li>
        ))}
      </StyledList>
    </ContentContainer>
  );
}
