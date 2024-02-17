import styled from "styled-components";

const ButtonIcon = styled.button`
    background: none;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0.7rem;
    border-radius: var(--border-radius-sm);
    transition: all 0.2s;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;

    &:hover {
        background-color: var(--color-brand-600);
        color: white;

        & svg {
            color: white;
        }
    }

    & svg {
        width: 2.2rem;
        height: 2.2rem;
        color: var(--color-brand-600);
        margin: 0 5px 0 0;
    }
`;

export default ButtonIcon;
