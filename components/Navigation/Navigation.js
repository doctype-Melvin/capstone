import Link from "next/link";
import styled from "styled-components";
import { BiHomeAlt2 as Home } from "react-icons/bi";
import { AiOutlineUnorderedList as AllTemplates } from "react-icons/ai";

const NavBar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: sticky;
  bottom: 0;
  background-color: hotpink;
`;

const NavIconContainer = styled.section`
  font-size: 1.6rem;
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
      <Link href="/viewPlans">
        <NavIconContainer>
          <AllTemplates />
        </NavIconContainer>
      </Link>
    </NavBar>
  );
}
