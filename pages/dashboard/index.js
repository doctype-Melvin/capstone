import { useAllPlans } from "@/utils/helpers";
import SessionPreview from "@/components/SessionPreview";
import Loading from "@/components/Loading";
import styled from "styled-components";

const StyledMessage = styled.p`
  height: 100vh;
`;

export default function Dashboard() {
  const { data, isLoading } = useAllPlans();

  if (isLoading || !data) return <Loading />;

  const currentTemplate = data.find((template) => template.isCurrent === true);

  return (
    <section>
      {currentTemplate ? (
        <SessionPreview template={currentTemplate} />
      ) : (
        <StyledMessage>No current template found</StyledMessage>
      )}
    </section>
  );
}
