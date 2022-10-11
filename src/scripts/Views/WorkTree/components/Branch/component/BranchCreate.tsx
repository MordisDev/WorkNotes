import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import { addBranch } from '../../../utils/dbHandlers';

interface BranchCreateProps {
    treeId: number;
    parentBranchId?: number;
    deactivate?: () => void;
    reloadBranches: () => void;
}

export function BranchCreate({ treeId, parentBranchId, deactivate, reloadBranches }: BranchCreateProps): JSX.Element {
    const [newBranchDescription, setNewBranchDescription] = React.useState<string>('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleBranchInputChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBranchDescription(event.target.value);
    },[]);

    const handleSubmit = React.useCallback(() => {
        addBranch(newBranchDescription, treeId, parentBranchId)
            .then(() => {
                setNewBranchDescription('');
                reloadBranches();
            });
    }, [newBranchDescription, treeId, parentBranchId]);

    const handleKeyPress = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter' && newBranchDescription.length > 2) handleSubmit();
        if(event.key === 'Escape'){
            setNewBranchDescription('');
            deactivate ? deactivate() : event.currentTarget.blur();
        }
    }, [newBranchDescription]);

    React.useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div>
            <input ref={inputRef} value={newBranchDescription} onChange={handleBranchInputChange} onKeyDown={handleKeyPress} onBlur={deactivate}/>
            <button onClick={handleSubmit} disabled={newBranchDescription.length < 3}><FontAwesomeIcon icon={faRightToBracket} /></button>
        </div>
    );
}
