import styled from "styled-components"
import LoggingForm from "../LoggingForm"
import { useState } from "react"

const Wrapper = styled.section`
width: 100%;
`

const Container = styled.section`
    display: grid;
    grid-template-columns: 1fr .25fr;
`

const StyledList = styled.ul`
    margin: 0;
    padding: 0;

    & > li {
        background-color: hotpink;
        color: white;
        margin-bottom: .2rem;
    }
`

export default function ExercisePreview({exercise}) {

    const [ toggleForm, setToggleForm ] = useState(false)
    const [ allSets, setAllSets ] = useState([])

    const handleButtonClick = () => setToggleForm(prevState=>!prevState)

return (
    <Wrapper>
    <Container>
        {exercise.exercise} {" - "} {exercise.sets} {" x "} {exercise.reps} { " @ "} {exercise.weight} {"Kg"}
        {!toggleForm && <button onClick={handleButtonClick}>Log Set</button>}
        <StyledList>
        {!toggleForm && allSets.map((set, index) => <li key={set.id}>Set #{index+1} - Reps {set.reps} @ {set.weight} Kg</li>)}    
        </StyledList>       
    </Container>
    {toggleForm && <LoggingForm onLog={setToggleForm} onSubmit={setAllSets}/>}
    </Wrapper>
)
}