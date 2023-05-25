import { useRouter } from "next/router";
import { usePlan } from "@/utils/helpers";
import SessionPreview from "@/components/SessionPreview";
import styled from "styled-components";

export default function Dashboard() {
  const router = useRouter();
  const { templateId } = router.query;

  const { data: template, isLoading } = usePlan(templateId);

  if (isLoading || !template) return <p>Loading...</p>;
  return (
    <section>
      <SessionPreview template={template} />
    </section>
  );
}
