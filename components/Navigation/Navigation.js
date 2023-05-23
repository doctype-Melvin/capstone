import { useRouter } from "next/router"
import Link from "next/link"

export default function Navigation() {
    const router = useRouter()

    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/viewPlans">All Templates</Link>
        </nav>
    )
}