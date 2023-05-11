import Link from "next/link";
import { GlobalContext } from "@/components/GlobalProvider";
import { useContext } from "react";

export default function HomePage() {

  return (
         <Link href="/create-plan">Create Plan</Link>
  );
}
