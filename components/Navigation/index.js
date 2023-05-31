import Link from "next/link";
import styled from "styled-components";
import { BiHomeAlt2 as Home } from "react-icons/bi";
import { AiOutlineUnorderedList as AllTemplates } from "react-icons/ai";
import { MdOutlineDashboardCustomize as Dashboard } from "react-icons/md";
import { useAllPlans } from "@/utils/helpers";
import Loading from "../Loading";

const NavBar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  height: var(--navbar-height);
  background-color: var(--mid-blue);
`;

const NavIconContainer = styled.section`
  color: white;
  font-size: 2.25rem;
  padding-top: 0.5rem;
`;

export default function Navigation() {
  const { data: allPlans, isLoading } = useAllPlans()

  if (isLoading || !allPlans) return <Loading />

  return (
    <NavBar>
      <Link href="/">
        <NavIconContainer>
          <Home />
        </NavIconContainer>
      </Link>
      <Link href={allPlans.length > 0 ? `/dashboard?id=${allPlans.find(plan => plan.isCurrent === true)._id}` : `/dashboard`}>
        <NavIconContainer>
          <Dashboard />
        </NavIconContainer>
      </Link>
      <Link href="/viewPlans">
        <NavIconContainer>
          <AllTemplates />
        </NavIconContainer>
      </Link>
    </NavBar>
  );
}
