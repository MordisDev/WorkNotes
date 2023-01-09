import * as React from 'react';
import { styled } from '@linaria/react';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    isSelected?: boolean;
    outline?: 'main' | 'menu';
    width?: string;
}

function getShadowEffect(outline: ButtonProps['outline'], active?: boolean): string {
    switch (outline) {
        case "menu":
            if(active) return "-2px -2px 4px var(--color-background), 2px 2px 4px var(--color-background-lighter)";
            return "inset -3px -3px 6px var(--color-background), inset 3px 3px 6px var(--color-background-lighter)";
        
        case "main":
        default:
            if(active) return "-2px -2px 4px var(--color-background-dark), 2px 2px 4px var(--color-background-light)";
            return "inset -3px -3px 6px var(--color-background-dark), inset 3px 3px 6px var(--color-background-light)";
    }
}

export const Button = styled.button<ButtonProps>`
    width: ${({ width }) => width ? width : "auto"};
    color: ${({ isSelected }) => isSelected ? "var(--color-accent)" : "var(--color-text)"};
    transition: color 0.1s;
    background: none;
    border: none;
    border-radius: 0.4em;
    box-shadow: ${({ outline }) => getShadowEffect(outline, false)};

    cursor: pointer;
    padding: 0.5em;
    margin: 0.4em 0.8em;
    font-size: 1.2em;
    font-family: inherit;
    letter-spacing: 0.1em;
    text-align: left;

    &:hover {
        color: ${({ isSelected }) => isSelected ? "var(--color-accent)" : "white" };
    }

    &:active {
        box-shadow: ${({ outline }) => getShadowEffect(outline, true)};
    }
`;