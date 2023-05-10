import Link from "next/link";
import { GlobalContext } from "@/components/GlobalProvider";
import { useContext } from "react";

export default function HomePage() {
  const [globalState, setGlobalState] = useContext(GlobalContext)
  return (
    <section>
      <Link href="/create-plan">Create Plan</Link>
    </section>
  );
}
