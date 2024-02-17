import styled, { css } from "styled-components";

// Since we using template literals, we can move in to JS mode
const Heading = styled.h1`
    /* To accept props from Heading */
    ${props =>
        props.as === "h1" &&
        css`
            font-size: 3rem;
            font-weight: 600;
        `}

    ${props =>
        props.as === "h2" &&
        css`
            font-size: 2rem;
            font-weight: 600;
        `}

    ${props =>
        props.as === "h3" &&
        css`
            font-size: 2rem;
            font-weight: 500;
        `}
    ${props =>
        props.as === "h4" &&
        css`
            font-size: 3rem;
            font-weight: 600;
            text-align: center;
        `}
`;

export default Heading;
