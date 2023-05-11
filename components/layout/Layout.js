import Navigation from "../navigation/Navigation"
import Header from "../header/Header"
import styled from "styled-components"


const StyledMain = styled.main`
max-height: 100vh;
`

const StyledSection = styled.section`
position: relative;
height: 100vh;
`


export default function Layout({children}) {
    return (
    <StyledSection>
    {/* <Header /> */}
    <StyledMain>
        {children}
    </StyledMain>
    {/* <Navigation /> */}
    </StyledSection>)
}