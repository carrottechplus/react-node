import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 * {
  margin:0; padding:0; box-sizing: border-box;
  }
  body {
    background:#efefef;
  }
  ul,ol,li {
    list-style: none;
  }
  a {
    text-decoration: none; color:#777;
  } 
`;

export default GlobalStyle;
