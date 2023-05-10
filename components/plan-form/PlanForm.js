import Link from "next/link"
import { useState } from "react"
import { GlobalContext } from "@/components/GlobalProvider";
import { useContext } from "react";
import WorkoutDay from "../workout-day/WorkoutDay";
import { nanoid } from "nanoid";
import { addWorkoutDays } from "@/utils/helpers";

export default function PlanForm() {
    const [planData, updatePlanData] = useContext(GlobalContext)
    
    const [ numberOfDays, setNumberOfDays ] = useState(0)



    const handleSave = (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)
        const nameAndDays = Object.fromEntries(formData)
        const routineArray = addWorkoutDays(numberOfDays)
        
        updatePlanData(draft => {
            draft.name = nameAndDays.name
            draft.days = nameAndDays.days
            draft.routine = routineArray
        })

        console.log(nameAndDays, planData, routineArray)
    }

    const handleChange = (event) => {
        setNumberOfDays(Number(event.target.value))
        
    }

    return (
        <section>
            <form onSubmit={(event) => handleSave(event)}>
                <label htmlFor="name">Name</label>
                <input 
                type="text" 
                name="name" 
                min={2}
                max={20}
                required />
                <label htmlFor="days">Days</label>
                <input 
                type="number" 
                name="days"
                min={1}
                max={7}
                onChange={(event) => handleChange(event)} 
                required />
                {/* { 
                numberOfDays ? (
                    Array.from(Array(numberOfDays).keys()).map(day => <WorkoutDay key={day} number={day+1} />)
                ) : null
                } */}
                <button type="submit">Save</button>
            </form>
            <Link href="/">Back</Link>
        </section>
    )
}