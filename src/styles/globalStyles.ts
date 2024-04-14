"use client"

import { createGlobalStyle } from "styled-components";
import { reset } from "./reset";


const GlobalStyles = createGlobalStyle`
/* To reset the default styles */
${reset}

body {
    font-family: 'Open Sans', sans-serif;
    transition: all 0.25s linear;
    background-color:${(props) => props.theme.body}
}


`;

export default GlobalStyles;
