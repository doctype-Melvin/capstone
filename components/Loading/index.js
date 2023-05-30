import styled, { css } from "styled-components";

const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpinAnimation = css`
  @keyframes spin-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Content = styled.div`
  width: 3rem;
  height: 3rem;
  border: 1rem solid;
  border-color: var(--mid-blue) transparent var(--light-blue) transparent;
  border-radius: 50%;
  animation: spin-animation 1.2s linear infinite;
  ${SpinAnimation}
`;

export default function Loading() {
  return (
    <Overlay>
      <Content />
    </Overlay>
  );
}
