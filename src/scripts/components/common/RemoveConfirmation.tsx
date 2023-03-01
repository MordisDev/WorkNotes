import * as React from 'react';
import { styled } from '@linaria/react';

const Wrapper = styled.div`
    padding: 0 0.4em;
    border: 2px groove var(--color-text-dark);
    border-radius: 0.6em;
    background: black;
    color: var(--color-text-dark);
    font-size: 12px;
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

interface RemoveConfirmationProps {
    itemId: number;
    parentId?: number;
    remove: (id: number, parentId?: number) => void;
    disableConfirmation: () => void;
}

export function RemoveConfirmation({ itemId, parentId, remove, disableConfirmation }: RemoveConfirmationProps): JSX.Element {
    const confirmRef = React.useRef<HTMLButtonElement>(null);

    const handleRemove = React.useCallback(async () => {
        await remove(itemId, parentId);
    }, [itemId, parentId, remove]);

    const handleMouseConfirmation = React.useCallback((event: MouseEvent) => {
        if(confirmRef.current?.contains(event.target as Node)) handleRemove();

        disableConfirmation();
    }, [itemId, disableConfirmation]);

    const handleKeyboardConfirmation = React.useCallback((event: KeyboardEvent) => {
        if(event.key === 'Enter' || event.key === 'y') handleRemove();
        disableConfirmation();
    }, [itemId, disableConfirmation]);

    React.useEffect(() => {
        document.addEventListener('mousedown', handleMouseConfirmation, true);
        document.addEventListener('keydown', handleKeyboardConfirmation);

        return () => {
            document.removeEventListener('mousedown', handleMouseConfirmation, true);
            document.removeEventListener('keydown', handleKeyboardConfirmation);
        }
    }, []);

    return <Wrapper>Are you sure? ... <Trigger ref={confirmRef}>Yes</Trigger></Wrapper>;
}