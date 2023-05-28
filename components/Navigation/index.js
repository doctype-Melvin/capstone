import Link from "next/link";
import styled from "styled-components";
import { BiHomeAlt2 as Home } from "react-icons/bi";
import { AiOutlineUnorderedList as AllTemplates } from "react-icons/ai";
import { MdOutlineDashboardCustomize as Dashboard } from "react-icons/md";

const NavBar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: sticky;
  bottom: 0;
  background-color: var(--mid-blue);
`;

const NavIconContainer = styled.section`
  font-size: 2.2rem;
  color: white;
`;

export default function Navigation() {
  return (
    <NavBar>
      <Link href="/">
        <NavIconContainer>
          <Home />
        </NavIconContainer>
      </Link>
      <Link href="/dashboard">
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
