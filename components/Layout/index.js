import Navigation from "../Navigation";
import styled from "styled-components";

const LayoutContainer = styled.section`
height: 100vh;
`

export default function Layout({ children }) {
  return (
    <LayoutContainer>
      {children}
      <Navigation />
    </LayoutContainer>
  );
}
