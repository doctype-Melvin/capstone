import styled from "styled-components";

const StyledForm = styled.form`
width: 100%;
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-template-rows: 1fr; 

& > label {
    width: 1rem;
}
`

export default function LoggingForm({exercise, toggleForm}){

    const handleSubmit = () => toggleForm()

    return (
        <StyledForm onSubmit={handleSubmit}>
            <label htmlFor="reps">Reps
                <input type="number" name="reps" />
            </label>
            <label htmlFor="weight">Weight
                <input type="number" name="weight" />
            </label>
            <button>Save</button>
        </StyledForm>
    )
}