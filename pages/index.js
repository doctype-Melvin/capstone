import Link from "next/link";
import styled from "styled-components";

const HomeScreen = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledLinkCreate = styled(Link)`
  text-decoration: none;
  color: #000;
  border: solid 3px hotpink;
  border-radius: 5px;
  padding: 0 10px;

  &:active {
    border: solid 2px black;
    background-color: hotpink;
    color: #fff;
  }
`

export default function HomePage() {
  return (
    <HomeScreen>
    <StyledLinkCreate href="/createPlan">Create Plan</StyledLinkCreate>
    </HomeScreen>
  )
}
