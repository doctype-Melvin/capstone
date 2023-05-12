import styled from "styled-components";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 80vw;
    align-items: flex-end;
    gap: 0.5rem;
    
        & > label {
            margin-right: 1rem;
        }

        & > label > input {
            margin-left: 0.3rem;
        }
`

const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding: 0.7rem 0;
`

export default function ExerciseForm({onToggle}) {

    const handleToggle = () => onToggle();

    const handleSubmit = () => onToggle();

      return (
        <StyledForm onSubmit={handleSubmit}>
            <label htmlFor="exercise">
                Exercise
            <input type="text" name="exercise" required/>
            </label>
            <label htmlFor="sets">
                Sets
            <input type="number" name="exercise" min={1} max={30} required/>
            </label>
            <label htmlFor="reps">
                Reps
            <input type="number" name="reps" min={1} max={100} required/>
            </label>
            <label htmlFor="weight">
                Weight
            <input type="number" name="weight" min={0} max={800} required/>
            </label>
            <ButtonContainer>
            <button type="submit">Add</button>
            <button type="button" onClick={handleToggle}>Cancel</button>
            </ButtonContainer>
        </StyledForm>
        
    )
}