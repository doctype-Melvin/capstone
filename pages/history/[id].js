import Loading from "@/components/Loading";
import { usePlan } from "@/utils/helpers";
import { useRouter } from "next/router";


export default function HistoryPage() {
    const router = useRouter()
    const { id } = router.query
    const { data: sessionHistory, isLoading } = usePlan(id)

    if (isLoading || !sessionHistory) return <Loading />

    return (
        <section>
            <ul>
                {
                    sessionHistory.sessions.map(week => (
                        <li key={week.week}>
                            <div>Week {week.week}</div>
                            <ul>
                                {
                                    week.sessions.map(session => (
                                        <li key={session.id}>
                                            <span>{session.sessionDate}</span>
                                            <ul>
                                                {
                                                    session.result.map((set, index) => (
                                                        <li key={set.setId}>
                                                            <p>{set.exercise}</p>
                                                            <span>Set {index+1}</span>
                                                            <span>Reps {set.reps}</span>
                                                            <span>Weight {set.weight}</span>
                                                        </li>
                                                    ))
                                                }    
                                            </ul>
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}