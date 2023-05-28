import Link from "next/link";
import styled, { css } from "styled-components";

const HomeScreen = styled.section`
  min-height: 100vh;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
`;

const linkStyles = css`
display: flex;
justify-content: center;
align-items: center;
  text-decoration: none;
  background-size: 100%;
  background-position: right;
  padding: 0 10px;
  height: 66%;
  opacity: .85;
  font-size: 1.5rem;
  transition: .2s;

  &:active {
    opacity: 1;
  }

  &:hover {
    opacity: 1;
    transition: .2s
  }
`;


const CreateTemplateLink = styled(Link)`
  ${linkStyles}
  /* background-image: url("/images/barbell.jpg"); */
  color: var(--dark-main);
`;

const ToCurrentTemplateLink = styled(Link)`
  ${linkStyles}
  /* background-image: url("/images/running.jpg"); */
  color: var(--dark-main);
`;

const AllTemplatesLink = styled(Link)`
  ${linkStyles}
  /* background-image: url("/images/shoulder-press.jpg"); */
  color: var(--dark-main);
`

export default function HomePage() {
  return (
    <HomeScreen>
      <CreateTemplateLink href="/createPlan">Create Workout Template</CreateTemplateLink>
      <ToCurrentTemplateLink href="/dashboard">Go to current Template</ToCurrentTemplateLink>
      <AllTemplatesLink href="/viewPlans">View all Templates</AllTemplatesLink>
    </HomeScreen>
  );
}
