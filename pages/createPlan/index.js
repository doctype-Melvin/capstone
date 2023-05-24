import PlanForm from "@/components/PlanForm/PlanForm";
import styled from "styled-components";

const StyledFormContainer = styled.section`
  min-height: 100vh;
`;

export default function CreatePlanView() {
  return (
    <StyledFormContainer>
      <PlanForm />
    </StyledFormContainer>
  );
}
