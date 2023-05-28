import { useAllPlans } from "@/utils/helpers";
import Loading from "@/components/Loading";
import styled from "styled-components";
import SessionCard from "@/components/SessionCard";

const TemplateName = styled.p`
width: 100%;
text-align: center;
font-size: 1.5rem;
margin: 0;
padding: 1rem 0;
background-color: var(--light-blue);
color: var(--lightest-blue);
`

const StyledList = styled.ul`
  padding: 0;
  margin: 0;
`

const ContentContainer = styled.section`
  height: 100vh;
`;

export default function Dashboard() {
  

  const { data, isLoading } = useAllPlans();

  if (isLoading || !data) return <Loading />;

  const currentTemplate = data.find((template) => template.isCurrent === true);

  return (
    <ContentContainer>
      {currentTemplate && <TemplateName>{currentTemplate.name}</TemplateName>}
      {
        currentTemplate ? (
          <StyledList>
          {currentTemplate.routine.map(day => <li key={day.id}>
            <SessionCard day={day}/>
          </li>)}
          </StyledList>
        ) : (
          <p>No current template set</p>
        )
      }
    </ContentContainer>
  );
}
