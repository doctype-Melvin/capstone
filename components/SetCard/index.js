import styled from "styled-components";
import { BsFillPencilFill as Edit } from "react-icons/bs";
import { ImCross as Delete } from "react-icons/im";

const Container = styled.section`
  display: flex;
  justify-content: space-between;
`;

export default function SetCard({ set, index, onEdit, onDelete }) {
  return (
    <Container>
      Set #{index + 1} - Reps {set.reps} @ {set.weight} Kg
      <section>
        <button type="button" onClick={() => onEdit(set.id)}>
          <Edit />
        </button>
        <button type="button" onClick={() => onDelete(set.id)}>
          <Delete />
        </button>
      </section>
    </Container>
  );
}
