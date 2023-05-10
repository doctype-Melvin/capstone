import PlanForm from "@/components/plan-form/PlanForm";
import { GlobalContext } from "@/components/GlobalProvider";
import { useContext } from "react";

export default function CreatePlanView() {
    const [globalState, setGlobalState] = useContext(GlobalContext)
   
    return (
        <section>
            <PlanForm />
        </section>
    )
}