import LoggingForm from "../LoggingForm"
import { useState } from "react"
import styled from "styled-components"

const StyledContainer = styled.section`
        display: grid;
        width: 100%;
        grid-template-columns: 1fr 1fr .5fr;
`

export default function SetCard({exercise}) {

    const [ showLogForm, setShowLogForm ] = useState(false)
    const handleButtonClick = () => setShowLogForm(prevState => !prevState)

    return (
        <>
        <StyledContainer>
        <span>{exercise.exercise}</span>
        <span>{exercise.sets} x {exercise.reps} @ {exercise.weight} </span>
        { !showLogForm ? <button type="button" onClick={handleButtonClick}>Add Set</button> : null}
        </StyledContainer>
        {
            showLogForm ? (
                <LoggingForm exercise={exercise} toggleForm={handleButtonClick} />
            ) : (
                null
            )
        }
        </>
    )
}