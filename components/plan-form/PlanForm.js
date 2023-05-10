import Link from "next/link"
import { useState } from "react"
import { GlobalContext } from "@/components/GlobalProvider";
import { useContext } from "react";
import { addWorkoutDays } from "@/utils/helpers";

export default function PlanForm() {
    const [planData, updatePlanData] = useContext(GlobalContext)
    
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
        <section>
            <form onSubmit={(event) => handleSave(event)}>
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
            </form>
            <Link href="/">Back</Link>
        </section>
    )
}