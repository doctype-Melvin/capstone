import { useAllPlans } from "@/utils/helpers";
import TemplateCard from "@/components/TemplateCard";
import Link from "next/link";
import styled from "styled-components";
import Loading from "@/components/Loading";
import { TemplateName as TemplateCount } from "../dashboard";

const OverviewContainer = styled.section`
  height: 100vh;
`;

const NewTemplateLink = styled(Link)`
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 3px;
  text-decoration: none;
  color: var(--lightest-blue);
  background-color: var(--light-blue);
`;

const StyledList = styled.ul`
  margin: 0;
  padding: 0;

  & > li {
    list-style-type: none;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 2rem;
`;

export default function ViewAllPlans() {
  const { data, isLoading } = useAllPlans();

  if (isLoading || !data) return <Loading />;

  return (
    <OverviewContainer>
      <TemplateCount>
        Found {data.length} {data.length === 1 ? `template` : `templates`}
      </TemplateCount>

      {data.length > 0 && (
        <StyledList>
          {data.map((plan) => (
            <li key={plan._id}>
              <TemplateCard templateData={plan} />
            </li>
          ))}
        </StyledList>
      )}
      <ButtonContainer>
        <NewTemplateLink href={`/createPlan`}>New Template</NewTemplateLink>
      </ButtonContainer>
    </OverviewContainer>
  );
}
