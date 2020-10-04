import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    background: #0a0b25;
    font-family: 'Poppins', sans-serif;
    color: #fff;
    padding: 16px;
  }
`;
