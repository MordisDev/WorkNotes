import * as React from 'react';

import { BranchCreate } from './BranchCreate'; 
import { StatusButtons } from './StatusButtons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTurnDown, faTrashCan, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

import { BranchRecord, TaskStatus } from '../../../indexedDB/database';

import { BRANCH_DEPT_LIMIT } from '../constants/branchDeptLimit';
import { getChildBranches, removeBranch, setBranchStatus } from '../../../utils/dbHandlers';

interface StructureBranchProps {
    branch: BranchRecord;
    childLevel: number;
    isChildBranchSubmitActive?: boolean;
    reloadBranches: () => void;
}

function isSubBranchCreateViable(level: number, isActive?: boolean): boolean {
    return level <= BRANCH_DEPT_LIMIT && (isActive ?? false);
}

export function StructureBranch({ branch, childLevel, isChildBranchSubmitActive, reloadBranches }: StructureBranchProps): JSX.Element {
    const [childBranches, setChildBranches] = React.useState<BranchRecord[]>();
    const [isChildInputActive, setIsChildInputActive] = React.useState(isChildBranchSubmitActive);

    const activateInput = React.useCallback(() => {
        setIsChildInputActive(true);
    }, []);

    const deactivateInput = React.useCallback(() => {
        setIsChildInputActive(false);
    }, []);

    const returnToQueue = React.useCallback(() => {
        setBranchStatus(branch.id!, TaskStatus.queued).then(() => reloadBranches());
    }, [branch]);

    const reloadChildBranches = React.useCallback(() => {
        getChildBranches(branch.id!).then(result => setChildBranches(result));
    }, [branch]);

    const deleteBranch = React.useCallback(() => {
        removeBranch(branch);
        reloadBranches();
    }, [branch, childBranches]);

    React.useEffect(() => {
        reloadChildBranches();
    }, [branch]);

    return (
        <React.Fragment>
            <li>
                {branch.status === TaskStatus.done ? <><s>{branch.description}</s><FontAwesomeIcon icon={faRotateLeft} onClick={returnToQueue}/></> : branch.description}{' '}
                {(childLevel <= BRANCH_DEPT_LIMIT) && !isChildInputActive && (branch.status !== TaskStatus.done) && <FontAwesomeIcon icon={faTurnDown} size="xs" onClick={activateInput}/>}
                {!childBranches?.length && branch.status !== TaskStatus.done && <StatusButtons branchId={branch.id!} currentStatus={branch.status} reload={reloadBranches}/>}
                <FontAwesomeIcon icon={faTrashCan} onClick={deleteBranch} />
            </li>
            {childBranches && (
                <ul>
                    {childBranches.map(subBranch => (
                        <StructureBranch
                            key={subBranch.id}
                            branch={subBranch}
                            childLevel={childLevel + 1}
                            reloadBranches={reloadBranches}
                        />
                    ))}
                </ul>
            )}
            {isSubBranchCreateViable(childLevel, isChildInputActive) && (
                <BranchCreate
                    deactivate={deactivateInput}
                    treeId={branch.treeId}
                    parentBranchId={branch.id}
                    reloadBranches={childLevel === 1 ? reloadChildBranches : reloadBranches}
                />
            )}
        </React.Fragment>
    );
}