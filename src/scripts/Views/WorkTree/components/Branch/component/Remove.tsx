import * as React from 'react';

import { removeBranch } from '../utils/removeBranch';

interface RemoveProps {
    branchId: number;
    parentId?: number;
    reloadDataFunction: () => void;
}

export function Remove({ branchId, parentId, reloadDataFunction }: RemoveProps): JSX.Element {
    const [isConfirmationActive, setIsConfirmationActive] = React.useState(false);
    const confirmRef = React.useRef<HTMLButtonElement>(null);

    const handleRemove = React.useCallback(() => {
        removeBranch(branchId, parentId).then(() => reloadDataFunction());
    }, [branchId, parentId, reloadDataFunction]);

    const handleMouseConfirmation = React.useCallback((event: MouseEvent) => {
        if(confirmRef.current?.contains(event.target as Node)) handleRemove();

        document.removeEventListener('mousedown', handleMouseConfirmation);
        document.removeEventListener('keydown', handleKeyboardConfirmation);
        setIsConfirmationActive(false);
    }, []);

    const handleKeyboardConfirmation = React.useCallback((event: KeyboardEvent) => {
        if(event.key === 'Enter' || event.key === 'y') handleRemove();
        
        document.removeEventListener('mousedown', handleMouseConfirmation);
        document.removeEventListener('keydown', handleKeyboardConfirmation);
        setIsConfirmationActive(false);
    }, []);

    const initiateRemove = React.useCallback(() => {
        setIsConfirmationActive(true);
        document.addEventListener('mousedown', handleMouseConfirmation);
        document.addEventListener('keydown', handleKeyboardConfirmation);
    }, []);


    if (isConfirmationActive) return <div>Please confirm removal request <button ref={confirmRef} onClick={handleRemove}>Confirm</button></div>

    return <button onClick={initiateRemove}>Remove</button>;
}