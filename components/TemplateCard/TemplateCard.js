import styled from "styled-components"
import { AiOutlineDelete as Delete } from "react-icons/ai"

const TemplateContainer = styled.section`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 0.5fr 0.25fr;
    align-items: center;
    padding-left: 0.75rem;
    margin-bottom: 0.75rem;
`
const IconContainer = styled.div`
font-size: 1.75rem;
padding-top: 0.2rem;
`


export default function TemplateCard({data}) {
    return (
        <TemplateContainer>
            {data.name.toUpperCase()} 
            <span>
                {data.days} {data.days > 1 ? 'Days' : 'Day'}
            </span>
            <IconContainer>
                <Delete color="crimson"/>
            </IconContainer>
        </TemplateContainer>
    )
}