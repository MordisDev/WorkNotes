import * as React from 'react';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

function getColors(color: TriggerProps['colorTheme']): string {
    switch (color) {
        case "success":
            return "var(--color-success)";
        case "error":
            return "var(--color-error)";
        default:
            return "var(--color-text)";
    }
}

interface TriggerProps {
    colorTheme?: "success" | "error";
    variant?: "icon" | "bordered";
}

const IconVariant = css`
    border: none;
    padding: .4em .4em;
`;

const BorderedVariant = css`
    border: 1px solid var(--color-text-dark);
    border-radius: 6px;
    padding: .3em .9em;

    &:hover {
        border-color: ${getColors(undefined)};
    }
`;

const Trigger = styled.button<TriggerProps>`
    background: none;
    cursor: pointer;
    font-size: 12px;

    color: var(--color-text-dark);

    &:hover {
        color: ${({ colorTheme }) => getColors(colorTheme)};
    }
`;

interface ActionButtonProps extends TriggerProps {
    icon: IconDefinition;
    handleClick?: () => void;
}

export const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(({ icon, variant, handleClick, ...props }, ref ): JSX.Element => {
    return (
        <Trigger ref={ref} onMouseDown={handleClick} className={variant === "bordered" ? BorderedVariant : IconVariant} {...props}>
            <FontAwesomeIcon icon={icon}/>
        </Trigger>
    );
});