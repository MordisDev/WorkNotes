import * as React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { styled } from '@linaria/react';

import { BranchItemStructure } from './BranchItemStructure';
import { BranchCreate } from './BranchCreate';

import { treeDBInstance } from '../../indexedDB/database.config';

const BranchRootWarpper = styled.div`
    display: flex;
    flex-direction: column;

    font-size: 24px;
`;

interface RootProps {
    treeId: number;
}

export function BranchRoot({ treeId }: RootProps): JSX.Element {
    const branches = useLiveQuery(
        () => treeDBInstance.branch.where({treeId: treeId}).filter(branch => branch.parentBranchId === undefined).toArray(),
        [treeId]);

    return (
        <BranchRootWarpper>
            {branches?.map(branch => <BranchItemStructure key={branch.id} branch={branch}/>)}
            <BranchCreate treeId={treeId}/>
        </BranchRootWarpper>
    )
}