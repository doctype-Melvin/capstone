import styled from "styled-components"
import useSWR from "swr"
import { useRouter } from "next/router"
import Link from "next/link"
import WorkoutDay from "@/components/workoutDay/WorkoutDay"


const PlanContainer = styled.section`
    border: 1px solid red;
`

const sharedStyleRules = `
    width: 100vw;
`

const PlanHead = styled.section`
    ${sharedStyleRules}
    
`

const PlanBody = styled.section`
    ${sharedStyleRules}
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
                <div>{data.name}</div>
            </PlanHead>
            <PlanBody>
                {data.routine.map(day => <WorkoutDay key={day.id} day={day.day} />)}
            </PlanBody>
        </PlanContainer>
    )
}