import styled from "styled-components"
import ExerciseForm from "../ExerciseForm/ExerciseForm"
import { useState } from "react"

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
    width: fit-content;
`

export default function WorkoutDay({number}){
    const [ toggleForm, setToggleForm ] = useState(false)

    const handleToggle = () => setToggleForm(prevState => !prevState)

    return (
        <StyledSection>
            <StyledTitle>
                Day {number}
            </StyledTitle>
            { !toggleForm ? (
            <StyledButton type="button" onClick={handleToggle}>
                Add Exercise
            </StyledButton> 
            ) : (
                <ExerciseForm onToggle={handleToggle}/>
            )
            }
        </StyledSection>
    )
}