import * as React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { styled } from '@linaria/react';

import { BranchCreate } from './BranchCreate';

import { BranchDescription } from './BranchDescription';
import { BranchStatusButtonsSelector } from './StatusChangeButtonsSelector';
import { ActionButton } from '../common/ActionButton';
import { RemoveConfirmation } from '../common/RemoveConfirmation';

import { faPlusSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

import { treeDBInstance, BranchRecord } from '../../indexedDB/database.config';

import { removeBranch as removeBranchFunction } from '../../indexedDB/branchQueries';

const BranchItemWarpper = styled.div<{ isSubBranch: boolean; }>`
    display: flex;
    flex-direction: column;

    font-size: ${({ isSubBranch }) => isSubBranch ? '.9em' : '1em'};
    margin-left: ${({ isSubBranch }) => isSubBranch ? '24px' : '0'};
`;

const BranchDetailsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    min-height: 38px;
    align-items: center;
    margin: .4em 0;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-left: .6em;
`;

const Description = styled.div`
    max-width: 780px;
    margin-left: .6em;
`;

interface BranchItemStructureProps {
    branch: BranchRecord;
}

export function BranchItemStructure({branch}: BranchItemStructureProps): JSX.Element {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isSubBranchInputAcitve, setIsSubBranchInputAcitve] = React.useState(false);
    const [isRemoveTriggered, setIsRemoveTriggered] = React.useState(false);
    const inputTriggerButton = React.useRef<HTMLButtonElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const subBranches = useLiveQuery(() => treeDBInstance.branch.where('parentBranchId').equals(branch.id!).toArray());

    const handleClickOutside = React.useCallback((event: MouseEvent) => {
        if(!inputRef.current?.contains(event.target as Node) && !inputTriggerButton.current?.contains(event.target as Node)) {
            setIsSubBranchInputAcitve(false);
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyPress);
        }
    }, []);
    const handleKeyPress = React.useCallback((event: KeyboardEvent) => {
        if(event.key === "Escape") {
            setIsSubBranchInputAcitve(false);
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyPress);
        }
    }, []);
    const handleClickIn = React.useCallback(() => {
        setIsSubBranchInputAcitve(true);
        inputRef.current?.focus();
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyPress);
    }, []);

    const removeBranch = React.useCallback(() => {
        setIsRemoveTriggered(true);
    }, []);

    const disableRemoveBranch = React.useCallback(() => {
        setIsRemoveTriggered(false);
    }, []);

    const handleMouseOver = React.useCallback(() => setIsHovered(true), []);
    const handleMouseOut = React.useCallback(() => setIsHovered(false), []);

    if (!branch.id) return <div>Invalid Branch</div>

    return (
        <BranchItemWarpper isSubBranch={!!branch.parentBranchId}>
            <BranchDetailsWrapper onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <ActionButton ref={inputTriggerButton} icon={faPlusSquare} handleClick={handleClickIn} colorTheme="success"/>
                <ActionButton icon={faTrashCan} handleClick={removeBranch} colorTheme="error"/>
                <BranchDescription status={branch.status} description={branch.description}/>
                {isHovered &&
                    <ButtonsWrapper>
                        <BranchStatusButtonsSelector branchId={branch.id} currentStatus={branch.status}/>
                    </ButtonsWrapper>
                }
            </BranchDetailsWrapper>
            {isRemoveTriggered && <RemoveConfirmation itemId={branch.id} parentId={branch.parentBranchId} remove={removeBranchFunction} disableConfirmation={disableRemoveBranch}/>}
            {subBranches && subBranches.map(branch => <BranchItemStructure key={branch.id} branch={branch}/>)}
            {isSubBranchInputAcitve && <BranchCreate ref={inputRef} treeId={branch.treeId} parentBranchId={branch.id}/>}
        </BranchItemWarpper>
    )
}