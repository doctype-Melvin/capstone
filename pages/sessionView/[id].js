import { useRouter } from "next/router"
import Loading from "@/components/Loading";
import { useAllPlans } from "@/utils/helpers";
import styled from "styled-components";
import Link from "next/link";
import SetCard from "@/components/SetCard";
import useLocalStorageState from "use-local-storage-state";

const PageContent = styled.section`
    height: 100vh;
`

export default function SessionView() {
    const router = useRouter()
    const { id } = router.query
    const { data, isLoading } = useAllPlans();
    
    const [ sessionData, setSessionData ] = useLocalStorageState('sessionData', {
      defaultValue: []
    })

    const handleSaveClick = () => localStorage.clear()

    if (isLoading || !data) return <Loading />;

  const currentTemplate = data.find((template) => template.isCurrent === true);
  const activeDay = currentTemplate.routine.find(day => day.id === id)


    return (
        <PageContent>
        <div>Day {activeDay.day}</div>
        { activeDay.exercises.map(exercise => <li key={exercise.id}>
            <SetCard exercise={exercise} setSessionData={setSessionData} />
        </li>)}
        <Link href="/dashboard">Back</Link>
        <button type="button" onClick={handleSaveClick}>Save Session</button>
        </PageContent>
    )

}