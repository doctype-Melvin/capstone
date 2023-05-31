import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body, html {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-family: system-ui;
    color: var(--dark-main)
  }

  :root {
    --dark-main: #414535;
    --light-blue: #1B98E0;
    --mid-blue: #247BA0;
    --dark-blue: #006494;
    --lightest-blue: #E8F1F2;
    --sand: #fce282;
    --soft-green: #7AE7C7;
    --cancel-red: crimson;
    --navbar-height: 61.5px
  }
`;
