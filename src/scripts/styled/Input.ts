import { styled } from '@linaria/react';

export const Input = styled.input`
    width: 280px;
    box-sizing: border-box;
    background: transparent;
    border: none;
    border-radius: 0.3em;
    box-shadow: -2px -2px 4px var(--color-background), 2px 2px 4px var(--color-background-lighter);
    outline: 0;

    color: white;
    padding: 0.1em 0.5em;
    margin: 0.4em 0.8em;
    font-family: inherit;
    font-size: 1.4em;
`;