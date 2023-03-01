import * as React from 'react';
import { styled } from '@linaria/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

import { addBranch } from '../../indexedDB/branchQueries';

const InputBox = styled.div<{ isValid: boolean; isSubBranch: boolean; }>`
    font-size: ${({ isSubBranch }) => isSubBranch ? '.7em' : '.9em'};

    width: 24em;
    margin-top: .6em;
    box-sizing: border-box;
    border-radius: .1em;
    border-bottom: 1.5px solid ${({ isValid }) => isValid ? 'var(--color-success)' : 'var(--color-text-dark)'};
    display: flex;

    input {
        background: transparent;
        border: none;
        flex: 1;

        color: inherit;
        padding: 0.4em 0.5em;
        font-family: inherit;
        font-size: 1em;

        outline: 0;

        &::placeholder {
            opacity: .5;
        }
    }

    button {
        background: transparent;
        border: none;
        color: var(--color-success);
        cursor: pointer;

        &:disabled {
            color: var(--color-text-dark);
        }
    }
`;

interface BranchCreateProps {
    treeId: number;
    parentBranchId?: number;
}

export const BranchCreate = React.forwardRef<HTMLInputElement, BranchCreateProps>(({ treeId, parentBranchId }, ref): JSX.Element => {
    const [newBranchDescription, setNewBranchDescription] = React.useState<string>('');

    const handleBranchInputChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBranchDescription(event.target.value);
    },[]);

    const handleSubmit = React.useCallback(() => {
        addBranch(newBranchDescription, treeId, parentBranchId)
            .then(() => {
                setNewBranchDescription('');
            });
    }, [newBranchDescription, treeId, parentBranchId]);

    const handleKeyPress = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter' && newBranchDescription.length > 2) handleSubmit();
        if(event.key === 'Escape'){
            setNewBranchDescription('');
        }
    }, [newBranchDescription]);

    const handleButtonClick = React.useCallback(() => handleSubmit(), [newBranchDescription]);

    return (
        <InputBox isValid={newBranchDescription.length > 2} isSubBranch={!!parentBranchId}>
            <input ref={ref} value={newBranchDescription} placeholder="new branch" onChange={handleBranchInputChange} onKeyDown={handleKeyPress} />
            <button onClick={handleButtonClick} disabled={newBranchDescription.length < 3}><FontAwesomeIcon icon={faPlusSquare}/></button>
        </InputBox>
    );
});
