import styled from "styled-components"
import useSWR from "swr"
import { useRouter } from "next/router"
import Link from "next/link"
import WorkoutDay from "@/components/workout-day/WorkoutDay"

const PlanContainer = styled.section`
    border: 1px solid red;
`

const sharedStyleRules = `
    width: 100vw;
    display: flex;
    flexDirection: column;
    alignItems: center;
`

const PlanHead = styled.section`
    ${sharedStyleRules}
    
`

const PlanBody = styled.section`
    ${sharedStyleRules}
`

const fetcher = (url) => fetch(url).then((response) => response.json())

export default function SinglePlanView() {

    const router = useRouter()
    const { id } = router.query

    const { data, error } = useSWR(`/api/plans/${id}`)

    if (!data) return <p>Loading...</p>
    if (error) return <p>Something went wrong</p>


    return (
        <PlanContainer>
            <PlanHead>
                <div>{data.name}</div>
                <div>{data.days}</div>
            </PlanHead>
            <PlanBody>
                {data.routine.map(day => <WorkoutDay key={day.id} day={day.day} />)}
            </PlanBody>
        </PlanContainer>
    )
}