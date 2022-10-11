import * as React from 'react';

import { removeTreeWithBranches } from '../utils/dbHandlers';

interface RemoveTreeProps {
    treeId: number;
    resetAndReload: () => void;
}

export function RemoveTree({ treeId, resetAndReload }: RemoveTreeProps): JSX.Element {
    const [isAwaitingConfirmation, setIsAwaitingConfirmation] = React.useState(false);
    const confirmRef = React.useRef<HTMLButtonElement>(null);

    const handleMouseConfirmation = React.useCallback((event: MouseEvent) => {
        if(confirmRef.current?.contains(event.target as Node)) {
            removeTreeWithBranches(treeId);
            resetAndReload();
        }
        document.removeEventListener('mousedown', handleMouseConfirmation);
        document.removeEventListener('keydown', handleKeyboardConfirmation);
        setIsAwaitingConfirmation(false);
    }, [treeId]);

    const handleKeyboardConfirmation = React.useCallback((event: KeyboardEvent) => {
        if(event.key === 'Enter' || event.key === 'y') {
            removeTreeWithBranches(treeId);
            resetAndReload();
        }
        document.removeEventListener('mousedown', handleMouseConfirmation);
        document.removeEventListener('keydown', handleKeyboardConfirmation);
        setIsAwaitingConfirmation(false);
    }, [treeId]);

    const initiateRemove = React.useCallback(() => {
        setIsAwaitingConfirmation(true);
        document.addEventListener('mousedown', handleMouseConfirmation);
        document.addEventListener('keydown', handleKeyboardConfirmation);
    }, []);

    if (isAwaitingConfirmation) return (
        <div>Are you sure you want to delete this tree? <button ref={confirmRef}>Yes</button></div>
    )
    return <button onClick={initiateRemove}>Remove Tree</button>
}