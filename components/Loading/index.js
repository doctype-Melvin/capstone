import styled from "styled-components";

const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  font-size: 2rem;
`;

export default function Loading() {
  return (
    <Overlay>
      <Content>Loading...</Content>
    </Overlay>
  );
}
