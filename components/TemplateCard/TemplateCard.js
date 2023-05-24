import styled from "styled-components";
import { AiOutlineDelete as Delete } from "react-icons/ai";
import Link from "next/link";
import { deleteTemplate, useAllPlans } from "@/utils/helpers";
import { setCurrentTemplate } from "@/utils/helpers";

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

export default function TemplateCard({ data }) {

  const handleSetCurrentClick = (id) => {
    setCurrentTemplate(`/api/plans/`, id)
  }

  return (
    <TemplateContainer>
      <StyledLink href={`/viewPlans/${data._id}`}>
        {data.name.toUpperCase()}{" "}
      </StyledLink>
      <button type="button" onClick={() => handleSetCurrentClick(data._id)}>Set Current</button>
      <span>
        {data.days} {data.days > 1 ? "Days" : "Day"}
      </span>
      <IconContainer>
        <Delete color="crimson" onClick={() => deleteTemplate(data._id)} />
      </IconContainer>
    </TemplateContainer>
  );
}
