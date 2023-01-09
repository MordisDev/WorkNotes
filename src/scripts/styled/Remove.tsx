import * as React from 'react';
import { styled } from '@linaria/react';

const Wrapper = styled.div`
    padding: 0 0.4em;
    border: 2px groove var(--color-text-dark);
    border-radius: 0.6em;
    background: black;
    color: var(--color-text-dark);
    font-size: 0.7em;
    letter-spacing: 0.2em;
    width: fit-content;
`;

const Trigger = styled.button`
    border: none;
    background: transparent;
    color: var(--color-text);
    opacity: 0.5;
    cursor: pointer;

    font-size: 1em;
    letter-spacing: 0.2em;

    &:hover {
        opacity: 0.65;
        text-decoration: underline;
    }
`;

interface RemoveTreeProps {
    removeItemId: number;
    removeFunction: (id: number) => void;
    refreshFunction: () => void;
}

export function Remove({ removeItemId, removeFunction, refreshFunction }: RemoveTreeProps): JSX.Element {
    const [isAwaitingConfirmation, setIsAwaitingConfirmation] = React.useState(false);
    const confirmRef = React.useRef<HTMLButtonElement>(null);

    const handleRemove = React.useCallback(async () => {
        await removeFunction(removeItemId);
        refreshFunction();
    }, [removeItemId, removeFunction, refreshFunction]);

    const handleMouseConfirmation = React.useCallback((event: MouseEvent) => {
        if(confirmRef.current?.contains(event.target as Node)) handleRemove();

        document.removeEventListener('mousedown', handleMouseConfirmation);
        document.removeEventListener('keydown', handleKeyboardConfirmation);
        setIsAwaitingConfirmation(false);
    }, [removeItemId]);

    const handleKeyboardConfirmation = React.useCallback((event: KeyboardEvent) => {
        if(event.key === 'Enter' || event.key === 'y') handleRemove();
        
        document.removeEventListener('mousedown', handleMouseConfirmation);
        document.removeEventListener('keydown', handleKeyboardConfirmation);
        setIsAwaitingConfirmation(false);
    }, [removeItemId]);

    const initiateRemove = React.useCallback(() => {
        setIsAwaitingConfirmation(true);
        document.addEventListener('mousedown', handleMouseConfirmation);
        document.addEventListener('keydown', handleKeyboardConfirmation);
    }, [removeItemId]);

    if (isAwaitingConfirmation) return (
        <Wrapper>Are you sure? ... <Trigger ref={confirmRef}>Yes</Trigger></Wrapper>
    )

    return <Wrapper><Trigger onClick={initiateRemove}>Remove</Trigger></Wrapper>
}