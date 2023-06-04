import styled, {css} from "styled-components";

const SharedListStyle = css`
list-style-type: none;
padding: 0;
margin: 0;
`

export const WeekList = styled.ul`
${SharedListStyle}
    & > li > div {
    background-color: var(--sand);
    font-weight: 600;
    font-size: 1.3rem;
    text-align: center;
    padding: .5rem 0;
}
`

export const DayList = styled.ul`
${SharedListStyle}
    & > li > div {
        text-align: center;
        background-color: var(--mid-blue);
        color: #fff;
        padding: .5rem 0;
        font-size: 1.2rem;
    }
`

export const ExerciseList = styled.ul`
${SharedListStyle}
    & > li > p {
        text-align: center;
        font-weight: 600;
        background-color: var(--lightest-blue);
        padding: .3rem 0;
    }
    & > li > div {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding-left: 1rem;
        font-size: 1.1rem;
    }

    & > li > div:last-child {
        margin-bottom: 1rem;
    }
`