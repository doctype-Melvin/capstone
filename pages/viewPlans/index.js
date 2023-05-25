import { useAllPlans } from "@/utils/helpers";
import TemplateCard from "@/components/TemplateCard";
import Link from "next/link";
import styled from "styled-components";

const OverviewContainer = styled.section`
  min-height: 100vh;
`;

const NewTemplateLink = styled(Link)`
  padding: 0.15rem 0.5rem;
  border: 1px solid hotpink;
  border-radius: 5px;
  text-decoration: none;
  color: black;
  background-color: yellow;
`;

const StyledParagraph = styled.p`
  margin: 0;
  padding: 1rem 0;
  text-align: center;
`;

const StyledList = styled.ul`
  margin: 0;
  padding: 0;

  & > li {
    list-style-type: none;
  }
`;

export default function ViewAllPlans() {
  const { data } = useAllPlans();

  if (!data) return <p>Loading ...</p>;

  return (
    <OverviewContainer>
      <StyledParagraph>
        {data.length === 1
          ? `There is ${data.length} template in your vault`
          : `There are ${data.length} templates in your vault`}
      </StyledParagraph>
      <StyledList>
        {data.map((plan) => (
          <li key={plan._id}>
            <TemplateCard templateData={plan} />
          </li>
        ))}
      </StyledList>
      <NewTemplateLink href={`/createPlan`}>New Template</NewTemplateLink>
    </OverviewContainer>
  );
}
