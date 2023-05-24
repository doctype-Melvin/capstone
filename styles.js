import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body, html {
    margin: 0;
    font-family: system-ui;
  }
`;
