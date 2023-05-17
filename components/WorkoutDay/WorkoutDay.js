import styled from "styled-components"
import ExerciseForm from "../ExerciseForm/ExerciseForm"
import { useState } from "react"
import ExerciseCard from "../ExerciseCard/ExerciseCard"

const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
    width: 100%;
    padding: .3rem;
    border-radius: 3px;
    gap: .3rem
`

const StyledTitle = styled.h1`
    padding: .5rem 0 0 0;
    margin: 0;
    font-size: .9rem;
`

const StyledButton = styled.button`
    border: none;
    fontSize: 1rem;
    width: fit-content;
`

export default function WorkoutDay({number,dayId, setPlan}){
    const [ toggleForm, setToggleForm ] = useState(false)
    const [exercises, setExercises] = useState([]);

    const handleToggle = () => setToggleForm(prevState => !prevState)

     const handleNewExercise = (data) => {
    setExercises((prevState) => [...prevState, data]);
  };

  const handleUpdateExercise = (data) => {
    setExercises((prevState) => {
      const index = prevState.findIndex((exercise) => exercise.id === data.id);
      if (index !== -1) {
        const updatedExercises = prevState.slice();
        updatedExercises[index] = data;
        return updatedExercises;
      } else {
        return prevState;
      }
    });
  };

    return (
        <StyledSection>
            <StyledTitle>
                Day {number}
            </StyledTitle>
            {
                exercises.map(exercise => (
                    <ExerciseCard
                    key={exercise.id}
                    id={exercise.id}
                    dayId={dayId}
                    name={exercise.exercise}
                    sets={exercise.sets}
                    reps={exercise.reps}
                    weight={exercise.weight}
                    handleUpdateExercise={handleUpdateExercise}
                    />
                ))
            }
            { !toggleForm ? (
            <StyledButton type="button" onClick={handleToggle}>
                Add Exercise
            </StyledButton> 
            ) : (
                <ExerciseForm 
                onToggle={handleToggle}
                setPlan={setPlan}
                dayId={dayId}
                onAdd={handleNewExercise}
                />
            )
            }
        </StyledSection>
    )
}