import styled from "styled-components";
import { useState } from "react";
import { nanoid } from "nanoid";


const StyledForm = styled.form`
width: 100%;
display: grid;
grid-template-columns: repeat(5, 1fr);
`

const StyledInput = styled.input`
    width: 3rem;
`

export default function LoggingForm({exercise, toggleForm}){

    const [ attributes, setAttributes ] = useState({
        exercise: exercise.exercise,
        reps: exercise.reps,
        weight: exercise.weight,
        id: nanoid(5),
    })
    
    const handleSubmit = () => {
        toggleForm()
    }

    const handleInputchange = (event) => {
        const { name, value } = event.target
        setAttributes(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <label htmlFor="reps">Reps</label>
                <StyledInput type="number" name="reps" value={attributes.reps} onChange={handleInputchange} />
            <label htmlFor="weight">Weight</label>
                <StyledInput type="number" name="weight" value={attributes.weight} onChange={handleInputchange} />
            <button>Save</button>
        </StyledForm>
    )
}