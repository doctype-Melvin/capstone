import Link from "next/link"
// import { useState } from "react"
// import { GlobalContext } from "@/components/GlobalProvider";
// import { useContext } from "react";
import styled from "styled-components"
import { useRouter } from "next/router"

const FormContainer = styled.section`
width: 100vw;
`

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
    const handleSave = (event) => {
        event.preventDefault()

        // const formData = new FormData(event.target)
        // const nameAndDays = Object.fromEntries(formData)
        // const routineArray = addWorkoutDays(Number(nameAndDays.days))
        
        // updatePlanData(draft => {
        //     draft.name = nameAndDays.name
        //     draft.days = nameAndDays.days
        //     draft.routine = routineArray
        // })


    }

    return (
        <FormContainer>
            <FormCreatePlan onSubmit={(event) => handleSave(event)}>
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
        </FormContainer>
    )
}