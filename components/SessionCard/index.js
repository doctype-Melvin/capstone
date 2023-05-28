import SetCard from "../SetCard"
import styled from "styled-components"

const ExerciseList = styled.ul`
    display: grid;
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
    
    
`

export default function SessionCard({day}){
    return (
        <>
        <p>Day {day.day}</p>
        <ExerciseList>
        {day.exercises.map(exercise => <li key={exercise.id}>
            <SetCard  exercise={exercise} />
        </li>)}
        </ExerciseList>
        </>
    )
}