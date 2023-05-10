import styled from "styled-components"

const StyledHeader = styled.h1`
text-align: center;
font-size: .8rem;
font-weight: 200;
padding: 0;
margin: 0;
padding-top: 5px;
`

const StyledLine = styled.hr`
color: #e9e9ed;
width: 100%;
border-width: 1px;
`

export default function Header(){
    return (
        <>
        <StyledHeader>
            Where am I?
        <StyledLine></StyledLine>
        </StyledHeader>
        </>
    )
}