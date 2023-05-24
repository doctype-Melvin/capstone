import styled from "styled-components";
import { AiOutlineDelete as Delete } from "react-icons/ai";
import Link from "next/link";
import { deleteTemplate } from "@/utils/helpers";
import { setCurrentTemplate } from "@/utils/helpers";
import { useRouter } from "next/router";

const TemplateContainer = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 0.75fr 0.75fr 0.5fr 0.25fr;
  align-items: center;
  padding-left: 0.75rem;
  margin-bottom: 0.75rem;
`;
const IconContainer = styled.div`
  font-size: 1.75rem;
  padding-top: 0.2rem;
  &:hover {
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default function TemplateCard({ templateData }) {

  const router = useRouter()

  const handleSetCurrentClick = (id) => {
    setCurrentTemplate(id)
    setTimeout(() => {
      router.push(`/dashboard?templateId=${id}`)
    }, 1500)
  }

  return (
    <TemplateContainer>
      <StyledLink href={`/viewPlans/${templateData._id}`}>
        {templateData.name.toUpperCase()}{" "}
      </StyledLink>
      { templateData.isCurrent ? (
        <div>Current Template</div> 
      ) : (
        <button type="button" onClick={() => handleSetCurrentClick(templateData._id)}>Set Current</button>
      )
      }
      <span>
        {templateData.days} {templateData.days > 1 ? "Days" : "Day"}
      </span>
      <IconContainer>
        <Delete color="crimson" onClick={() => deleteTemplate(templateData._id)} />
      </IconContainer>
    </TemplateContainer>
  );
}
