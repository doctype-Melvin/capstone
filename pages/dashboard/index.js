import { useAllPlans } from "@/utils/helpers";
import SessionPreview from "@/components/SessionPreview";
import Loading from "@/components/Loading";
import styled from "styled-components";
import { useState } from "react";

const StyledMessage = styled.p`
  height: 100vh;
`;

export default function Dashboard() {
  const [ logObject, setLogObject ] = useState({
    week: '',
    day: '',
    dayId: '',
    results: [],
  })

 const [allSets, setAllSets] = useState([]);

  const { data, isLoading } = useAllPlans();

  if (isLoading || !data) return <Loading />;

  const currentTemplate = data.find((template) => template.isCurrent === true);

  return (
    <section>
      {currentTemplate ? (
        <>
        <SessionPreview template={currentTemplate} setLogObject={setLogObject} setAllSets={setAllSets}/>
        </>
        ) : (
          <StyledMessage>No current template found</StyledMessage>
          )}
          <button type="button" onClick={() => console.log(logObject)}>Save Day</button>
    </section>
  );
}
