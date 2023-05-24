import { useRouter } from "next/router";
import { usePlan } from "@/utils/helpers";
import SessionPreview from "@/components/SessionPreview";
import styled from "styled-components";

const DashboardContainer = styled.section`
  min-height: 100vh;
`;

export default function Dashboard() {
  const router = useRouter();
  const { templateId } = router.query;

  const { data: template, isLoading } = usePlan(templateId);

  if (isLoading || !template) return <p>Loading...</p>;
  return (
    <DashboardContainer>
      <SessionPreview template={template} />
    </DashboardContainer>
  );
}
