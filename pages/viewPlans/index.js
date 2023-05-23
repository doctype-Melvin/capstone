import { useAllPlans } from "@/utils/helpers";
import { useRouter } from "next/router";
import TemplateCard from "@/components/TemplateCard/TemplateCard";

export default function ViewAllPlans() {
  const router = useRouter()
  const { data } = useAllPlans()

  if (!data) return <p>Loading ...</p>

  return (
    <div>
      <p>{`There are`} {data.length} {data.length === 1 ? 'template' : 'templates'} {`in your vault`}</p>
      {data.map(plan => <TemplateCard key={plan._id} data={plan} />)}
      <button type="button" onClick={() => router.push(`/createPlan`)}>New Template</button>
    </div>
  );
}
