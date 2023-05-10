import Link from "next/link";
import { GlobalContext } from "@/components/GlobalProvider";
import { useContext } from "react";

export default function HomePage() {

  const stylesForLink = {
    textDecoration: "none",
    borderRadius: "5px",
    padding: "5px 5px",
    color: "black",
    backgroundColor: '#e9e9ed',
    fontSize: ".8rem"
  }

  const sectionWidth = {
    widht: "100%",
    textAlign: "center",
  }

  const [globalState, setGlobalState] = useContext(GlobalContext)
  return (
    <section style={sectionWidth}>
      <Link style={stylesForLink} href="/create-plan">Create Plan</Link>
    </section>
  );
}
