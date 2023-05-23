import styled from "styled-components"

const TemplateContainer = styled.section`
    width: 100%;
    display: flex;
`

export default function TemplateCard({data}) {
    return (
        <TemplateContainer>
            {data.name}
        </TemplateContainer>
    )
}