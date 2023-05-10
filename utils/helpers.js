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

