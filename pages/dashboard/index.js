import { useRouter } from "next/router";
import { usePlan } from "@/utils/helpers";
import SessionPreview from "@/components/SessionPreview";
import Loading from "@/components/Loading";

export default function Dashboard() {
  const router = useRouter();
  const { templateId } = router.query;

  const { data: template, isLoading } = usePlan(templateId);

  if (isLoading || !template) return <Loading />;
  return (
    <section>
      <SessionPreview template={template} />
    </section>
  );
}
