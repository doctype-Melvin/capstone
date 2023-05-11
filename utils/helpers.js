import { nanoid } from "nanoid"

export const addWorkoutDays = (number) => {
    let store = []
    for( let i = 0; i < number; i++) {
        store.push({
            day: i + 1,
            id: nanoid(),
            exercises: []
        })
    }
    return store
}


export const sendPostRequest = async (url, { arg }) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(arg)
    })

    // This part will return the plan's
    // id for the redirect from form to plan view
    const { id } = await response.json()
    return id

}