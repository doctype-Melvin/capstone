import Loading from "@/components/Loading";
import { usePlan } from "@/utils/helpers";
import { useRouter } from "next/router";

export default function HistoryPage() {
    const router = useRouter()
    const { id } = router.query
    const { data: sessionHistory, isLoading } = usePlan(id)

    if (isLoading || !sessionHistory) return <Loading />

    return (
        <>
        Render list here
        </>
    )
}