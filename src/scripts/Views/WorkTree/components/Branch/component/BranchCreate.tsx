import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import { addBranch } from '../utils/dbHandlers';

interface BranchCreateProps {
    treeId: number;
    parentBranchId?: number;
    deactivate?: () => void;
    reloadBranches: () => void;
}

export function BranchCreate({ treeId, parentBranchId, deactivate, reloadBranches }: BranchCreateProps): JSX.Element {
    const [newBranchDescription, setNewBranchDescription] = React.useState<string>('');
    const inputRef = React.useRef<HTMLInputElement>(null);
    const boxRef = React.useRef<HTMLDivElement>(null);

    const handleBranchInputChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBranchDescription(event.target.value);
    },[]);

    const handleSubmit = React.useCallback(() => {
        addBranch(newBranchDescription, treeId, parentBranchId)
            .then(() => {
                setNewBranchDescription('');
                reloadBranches();
                inputRef.current?.focus();
            });
    }, [newBranchDescription, treeId, parentBranchId]);

    const handleKeyPress = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter' && newBranchDescription.length > 2) handleSubmit();
        if(event.key === 'Escape'){
            setNewBranchDescription('');
            deactivate ? deactivate() : event.currentTarget.blur();
        }
    }, [newBranchDescription]);

    const handleClickOutside = React.useCallback((event: MouseEvent) => {
        if (!boxRef.current?.contains(event.target as Node)) deactivate && deactivate();
    }, [boxRef]);

    React.useEffect(() => {
        inputRef.current?.focus();
        document.addEventListener('mouseup', handleClickOutside);

        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        }
    }, []);

    return (
        <div ref={boxRef}>
            <input ref={inputRef} value={newBranchDescription} onChange={handleBranchInputChange} onKeyDown={handleKeyPress}/>
            <button onClick={handleSubmit} disabled={newBranchDescription.length < 3}><FontAwesomeIcon icon={faRightToBracket} /></button>
        </div>
    );
}
