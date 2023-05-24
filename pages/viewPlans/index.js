import { useAllPlans } from "@/utils/helpers";
import TemplateCard from "@/components/TemplateCard/TemplateCard";
import Link from "next/link";
import styled from "styled-components";

const NewTemplateLink = styled(Link)`
  padding: 0.15rem 0.5rem;
  border: 1px solid hotpink;
  border-radius: 5px;
  text-decoration: none;
  color: black;
  background-color: yellow;
`;

export default function ViewAllPlans() {
  const { data } = useAllPlans();

  if (!data) return <p>Loading ...</p>;

  return (
    <div>
      <p>
        {`There are`} {data.length}{" "}
        {data.length === 1 ? "template" : "templates"} {`in your vault`}
      </p>
      {data.map((plan) => (
        <TemplateCard key={plan._id} templateData={plan} />
      ))}
      <NewTemplateLink href={`/createPlan`}>New Template</NewTemplateLink>
    </div>
  );
}
