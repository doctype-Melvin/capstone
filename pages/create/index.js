import { useImmer } from "use-immer"
import { useState } from "react"
import { nanoid } from "nanoid"
import Link from "next/link"

export default function CreatePlan(){

    const [ toggleDays, setToggleDays ] = useState(false)

    // This object stores the plan
    const workoutObject = {
        name: '',
        days: '',
        routine: [],
    }

    // This sets the above object as immer state
    const [ planData, updatePlanData ] = useImmer(workoutObject)

    // This state is used to toggle between general form and workout schedule
    const [ toggleForm, setToggleForm ] = useState(false)

    // This function populates the routine array
    // in the workoutObject. Depending on the number of days
    // it will push workoutRoutine objects to the routine array
    const populateRoutine = (days) => {
        let store = []
        for (let i = 0; i < days; i++) {
            store.push({
                day: i + 1,
                exercises: [],
                id: nanoid(5)
            })
        }
        return store
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const inputData = Object.fromEntries(formData)
        
        inputData.days = Number(inputData.days)
        inputData.rotine = populateRoutine(inputData.days)
        
        setToggleDays(true)
        console.log(inputData)
    }

    return (
        <div>
            <div>Create a workout plan</div>
            { !toggleDays ? 
                (
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" min={2} max={30} name="name" required />
                    <label htmlFor="days">Days</label>
                    <input type="number" min={1} max={6} name="days" required />
                    <button type="submit">Save</button>
                </form>
                ) : (
                    <section>List workout details here</section>
                )
            }
            <Link href="/">
                Back
            </Link>
        </div>
    )
}