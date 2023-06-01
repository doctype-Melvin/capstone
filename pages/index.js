import Loading from "@/components/Loading";
import { useAllPlans } from "@/utils/helpers";
import Link from "next/link";
import styled, { css } from "styled-components";
import { TemplateName as AppName } from "./dashboard";

const HomeScreen = styled.section`
  min-height: 100vh;
  display: grid;
  grid-template-rows: repeat(3, .3fr);
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  padding-bottom: calc(var(--navbar-height) + .5rem);
`;

const linkStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 0 10px;
  height: 66%;
  opacity: 0.85;
  font-size: 1.5rem;
  transition: 0.2s;

  &:active {
    opacity: 1;
  }

  &:hover {
    opacity: 1;
    transition: 0.2s;
  }
`;

const CreateTemplateLink = styled(Link)`
  ${linkStyles}
  color: var(--dark-main);
`;

const ToCurrentTemplateLink = styled(Link)`
  ${linkStyles}
  color: var(--dark-main);
`;

const AllTemplatesLink = styled(Link)`
  ${linkStyles}
  color: var(--dark-main);
`;

const SharedImageContainerStyles = css`
height: 100%;
width: 100%;
padding: 1rem;
position: relative;
color: #fff;
`

const CreateContainer = styled.div`
${SharedImageContainerStyles}
background-image: url('/barbell.jpg');
`

const CurrentContainer = styled.div`
${SharedImageContainerStyles}
background-image: url('/lifting.jpg');
background-size: cover;
`

const ViewAllContainer = styled.div`
${SharedImageContainerStyles}
background-image: url('/running.jpg');
background-position: left;
`

const ImageCaption = styled.p`
  position: absolute;
  bottom: 0;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #000;
  font-weight: 600;
`

export default function HomePage() {
  const { data: allPlans, isLoading } = useAllPlans();

  if (isLoading || !allPlans) return <Loading />;

  return (
    <>
      <AppName style={{position: "sticky", top: 0, zIndex: 1}}>Flex ❚█══█❚ Flow </AppName>
    <HomeScreen>
      <CreateTemplateLink href="/createPlan">
        <CreateContainer>
        <ImageCaption>
          Create Workout Template
        </ImageCaption>
  
        </CreateContainer>
      </CreateTemplateLink>
      <ToCurrentTemplateLink
        href={
          !allPlans.find((plan) => plan.isCurrent === true) > 0
          ? `/dashboard`
          : `/dashboard?id=${
            allPlans.find((plan) => plan.isCurrent === true)._id
          }`
        }
        >
        <CurrentContainer>
        <ImageCaption>
          Go to current Template
        </ImageCaption>
        </CurrentContainer>
      </ToCurrentTemplateLink>
      <AllTemplatesLink href="/viewPlans">
        <ViewAllContainer>
          <ImageCaption>View all Templates</ImageCaption>
        </ViewAllContainer>
        </AllTemplatesLink>
    </HomeScreen>
      </>
  );
}
