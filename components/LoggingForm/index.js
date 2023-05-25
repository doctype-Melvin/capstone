import styled from "styled-components";
import { nanoid } from "nanoid";

const StyledForm = styled.form`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(5, 1fr);
`

const StyledInput = styled.input`
    width: 3.5rem;
`

export default function LoggingForm({onLog, onSubmit}){

    const handleAddSet = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const setData = Object.fromEntries(formData)
        setData.id = nanoid(5);

        onSubmit(prevState => [...prevState, setData])
        onLog(prevState => !prevState)
        
        console.log(setData);
    }

    return (
        <StyledForm onSubmit={handleAddSet}>
            <label htmlFor="reps">Reps
            </label>
                <StyledInput type="number" name="reps" min={1} required />
            <label htmlFor="weight">Weight
            </label>
                <StyledInput type="number" name="weight" min={1} max={1000} required />
            <button type="submit">Save</button>
        </StyledForm>
    )
}