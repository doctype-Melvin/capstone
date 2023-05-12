import styled from "styled-components"

const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
    max-width: fit-content;
    padding: .3rem;
    border-radius: 3px;
`

const StyledTitle = styled.h1`
padding: .5rem 0 0 0;
margin: 0 0 .7rem 0;
font-size: .9rem;
`

const StyledButton = styled.button`
    border: none;
    fontSize: 1rem;
    max-width: fit-content;
`

export default function WorkoutDay({number}){
    return (
        <StyledSection>
            <StyledTitle>
                Day {number}
            </StyledTitle>
            <StyledButton type="button">
                Add Exercise
            </StyledButton>
        </StyledSection>
    )
}