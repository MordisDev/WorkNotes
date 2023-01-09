import * as React from 'react';

import { BranchCreate } from './BranchCreate';
import { Details } from './Details';
import { Remove } from './Remove';

import { BranchRecord, TaskStatus } from '../../../indexedDB/database';

import { BRANCH_DEPT_LIMIT } from '../constants/branchDeptLimit';
import { getBranch } from '../utils/getBranch';
import { getChildBranches } from '../utils/getChildBranches';
import { removeBranch, setBranchStatus } from '../../../utils/dbHandlers';

interface StructureProps {
    branch: BranchRecord;
    childLevel: number;
    isChildBranchSubmitActive?: boolean;
    reloadBranches: () => void;
}

function isSubBranchCreateViable(level: number, isActive?: boolean): boolean {
    return level <= BRANCH_DEPT_LIMIT && (isActive ?? false);
}

export function Structure({ branch, childLevel, isChildBranchSubmitActive, reloadBranches }: StructureProps): JSX.Element {
    const [currentBranch, setCurrentBranch] = React.useState(branch);
    const [childBranches, setChildBranches] = React.useState<BranchRecord[]>();
    const [isChildInputActive, setIsChildInputActive] = React.useState(isChildBranchSubmitActive);

    const activateInput = React.useCallback(() => {
        setIsChildInputActive(true);
    }, []);

    const deactivateInput = React.useCallback(() => {
        setIsChildInputActive(false);
    }, []);

    const reloadSubTree = React.useCallback(() => {
        getChildBranches(currentBranch.id!).then(resultBranches => {
            setChildBranches(resultBranches);
            if (!resultBranches.length || resultBranches.length === 1) getBranch(currentBranch.id!).then(result => setCurrentBranch(result));
        });
    }, [currentBranch.id]);

    React.useEffect(() => {
        getChildBranches(currentBranch.id!).then(result => setChildBranches(result));
    }, [currentBranch.id]);

    return (
        <React.Fragment>
            <Details
                branch={currentBranch}
                subbranchInput={(childLevel <= BRANCH_DEPT_LIMIT) ? activateInput : undefined}
            />
            <Remove branchId={currentBranch.id!} parentId={currentBranch.parentBranchId} reloadDataFunction={reloadBranches} />
            {childBranches && (
                <ul>
                    {childBranches.map(subBranch => (
                        <Structure
                            key={subBranch.id}
                            branch={subBranch}
                            childLevel={childLevel + 1}
                            reloadBranches={reloadSubTree}
                        />
                    ))}
                </ul>
            )}
            {isSubBranchCreateViable(childLevel, isChildInputActive) && (
                <BranchCreate
                    deactivate={deactivateInput}
                    treeId={currentBranch.treeId}
                    parentBranchId={currentBranch.id}
                    reloadBranches={reloadSubTree}
                />
            )}
        </React.Fragment>
    );
}