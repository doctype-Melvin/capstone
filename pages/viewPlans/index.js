import { useAllPlans } from "@/utils/helpers";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ViewAllPlans() {
  const router = useRouter()
  const { data } = useAllPlans()

  if (!data) return <p>Loading ...</p>

  return (
    <div>
      <p>You've saved {data.length} {data.length === 1 ? 'template' : 'templates'}</p>
      {data.map(plan => <div key={plan._id}><Link href={`viewPlans/${plan._id}`}>{plan.name}</Link></div>)}
      <button type="button" onClick={() => router.push(`/createPlan`)}>New Template</button>
    </div>
  );
}
