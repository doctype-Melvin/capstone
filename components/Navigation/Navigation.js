import Link from "next/link"
import styled from "styled-components"

const NavBar = styled.nav`
width: 100%;
display: flex;
justify-content: space-around;
position: absolute;
bottom: 0;
`

export default function Navigation() {

    return (
        <NavBar>
            <Link href="/">Home</Link>
            <Link href="/viewPlans">All Templates</Link>
        </NavBar>
    )
}