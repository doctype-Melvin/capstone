import styled from "styled-components"
import { AiOutlineDelete as Delete } from "react-icons/ai"
import Link from "next/link"

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

const StyledLink = styled(Link)`
text-decoration: none;
`


export default function TemplateCard({data}) {
    return (
        <TemplateContainer>
            <StyledLink href={`/viewPlans/${data._id}`}>{data.name.toUpperCase()} </StyledLink>
            <span>
                {data.days} {data.days > 1 ? 'Days' : 'Day'}
            </span>
            <IconContainer>
                <Delete color="crimson"/>
            </IconContainer>
        </TemplateContainer>
    )
}