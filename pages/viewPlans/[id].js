import styled from "styled-components"
import useSWR from "swr"
import { useRouter } from "next/router"
import WorkoutDay from "@/components/WorkoutDay/WorkoutDay"

const sharedStyleRules = `
    width: 100vw;
`

const PlanContainer = styled.section`
    border: 1px solid red;
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

        const router = useRouter()
        const { id } = router.query

        const { data, error } = useSWR(`/api/plans/${id}`, fetcher)

    if (!data) return <p>Loading...</p>
    if (error) return <p>Something went wrong</p>


    return (
        <PlanContainer>
            <PlanHead>
            {data.name}
            </PlanHead>
            <PlanBody>
                {data.routine.map(day => <WorkoutDay key={day.id} number={day.day} />)}
            </PlanBody>
        </PlanContainer>
    )
}