export default function SessionPreview({template}) {
    // This is all just a bandaid for the current user story

    const dayCount = template.logs.length

    return (
        <section>
            <section>{template.name}</section>
            <section>
                {`It's Day ${dayCount + 1}`}
            </section>
            <section>
                {
                    template.routine[0].exercises.map(exercise => <div key={exercise.id}>{exercise.exercise}</div>)
                }
            </section>
        </section>
    )
}