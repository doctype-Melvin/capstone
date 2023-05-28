import SetCard from "../SetCard"
import styled from "styled-components"
import { useState } from "react"
import useLocalStorageState from "use-local-storage-state"
import Link from "next/link"

const ExerciseList = styled.ul`
    display: grid;
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
`

const Title = styled.p`
    text-align: center;
    width: 100%;
    background-color: hotpink;
    padding: .5rem 0;
`

const Preview = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-left: 2rem;
`

export default function SessionCard({day}){

     return (
        <Link href={`/sessionView/${day.id}`}>
        <Title>Day {day.day}</Title>
        <ExerciseList>
        {day.exercises.map(exercise => <li key={exercise.id}>
            <Preview>
            <span>{exercise.exercise}</span>
            <span>{exercise.sets} x {exercise.reps} @ {exercise.weight} Kg</span>
            </Preview>
        </li>)}
        </ExerciseList>
        </Link>
    )
}