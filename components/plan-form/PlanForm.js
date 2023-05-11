import styled from "styled-components"
import { useRouter } from "next/router"

const FormCreatePlan = styled.form`
width: 100%;
display: flex;
flex-direction: column;
padding: 20px;

& > button {
    width: fit-content;
    margin-top: 25px;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
}
`

export default function PlanForm() {
    // const [planData, updatePlanData] = useContext(GlobalContext)
    const router = useRouter()
  

    return (
            <FormCreatePlan>
                <label htmlFor="name">Name</label>
                <input 
                type="text" 
                name="name" 
                minLength={2}
                maxLength={20}
                required />
                <label htmlFor="days">Days</label>
                <input 
                type="number" 
                name="days"
                min={1}
                max={7}
                required />
                <button type="submit">Save</button>
                <button type="button" onClick={() => router.push('/')}>Back</button>
            </FormCreatePlan>
    )
}