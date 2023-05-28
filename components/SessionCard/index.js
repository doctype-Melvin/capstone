import SetCard from "../SetCard"
import styled from "styled-components"
import { useState } from "react"
import useLocalStorageState from "use-local-storage-state"

const ExerciseList = styled.ul`
    display: grid;
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
`

export default function SessionCard({day}){

    const [ sessionResults, setSessionResults ] = useLocalStorageState('session', {
        defaultValue: []
    })

    return (
        <>
        <p>Day {day.day}</p>
        <ExerciseList>
        {day.exercises.map(exercise => <li key={exercise.id}>
            <SetCard  exercise={exercise} />
        </li>)}
        </ExerciseList>
        <button type="button" onClick={() => console.log(sessionResults)}>Save Session</button>
        </>
    )
}