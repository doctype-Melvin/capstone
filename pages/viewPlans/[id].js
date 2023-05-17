import styled from "styled-components"
import useSWR from "swr"
import { useRouter } from "next/router"
import WorkoutDay from "@/components/WorkoutDay/WorkoutDay"
import useLocalStorageState from "use-local-storage-state"
import { useEffect } from "react"
import PlanContext from "@/utils/PlanContext/PlanContext"

const sharedStyleRules = `
    width: 100vw;
`

const PlanContainer = styled.section`
    height: 100vh;
`

const PlanHead = styled.p`
    ${sharedStyleRules}
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.5rem;    
`

const PlanBody = styled.section`
    ${sharedStyleRules}
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem
`

const fetcher = (...args) => fetch(...args).then((response) => response.json())

export default function SinglePlanView() {

    const [ plan, setPlan ] = useLocalStorageState("plan", {
        defaultValue: "",
    })

        const router = useRouter()
        const { id } = router.query

        const { data, error } = useSWR(`/api/plans/${id}`, fetcher)
        
        useEffect(() => {
            if (data && !plan) {
                setPlan(data)
            }
        }, [data, plan])

    if (!data) return <p>Loading...</p>
    if (error) return <p>Something went wrong</p>



    return (
        <PlanContext.Provider value={{ plan, setPlan}}>
        <PlanContainer>
            <PlanHead>
            {data.name}
            </PlanHead>
            <PlanBody>
                {data.routine.map(day => <WorkoutDay key={day.id} number={day.day} dayId={day.id} setPlan={setPlan} />)}
            </PlanBody>
        </PlanContainer>
        </PlanContext.Provider>
    )
}