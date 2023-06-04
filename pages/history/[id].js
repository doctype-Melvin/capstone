import Loading from "@/components/Loading";
import { usePlan } from "@/utils/helpers";
import { useRouter } from "next/router";
import { WeekList, DayList, ExerciseList } from "@/components/HistoryStyled";
import styled from "styled-components";

const PageContent = styled.section`
    padding-bottom: calc(1rem + var(--navbar-height));
`

export default function HistoryPage() {
    const router = useRouter()
    const { id } = router.query
    const { data: sessionHistory, isLoading } = usePlan(id)

    if (isLoading || !sessionHistory) return <Loading />

    return (
        <PageContent>
            {sessionHistory.sessions.length < 1 && <div>No sessions found</div>}
            <WeekList>
                {
                    sessionHistory.sessions.map(week => (
                        <li key={week.week}>
                            <div>Week {week.week}</div>
                            <DayList>
                                {
                                    week.sessions.map(session => (
                                        <li key={session.id}>
                                            <div>{session.sessionDate}</div>
                                            <ExerciseList>
                                                {
                                                    session.result.map((set, index) => (
                                                        <li key={set.setId}>
                                                            <p>{set.exercise.toUpperCase()}</p>
                                                            <div>
                                                            <span>Set {index+1}</span>
                                                            <span>Reps {set.reps}</span>
                                                            <span>Weight {set.weight}</span>
                                                            </div>
                                                        </li>
                                                    ))
                                                }    
                                            </ExerciseList>
                                        </li>
                                    ))
                                }
                            </DayList>
                        </li>
                    ))
                }
            </WeekList>
        </PageContent>
    )
}