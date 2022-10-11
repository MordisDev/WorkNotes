import * as React from 'react';

import { BranchCreate } from '../../Branch/component/BranchCreate';
import { StructureBranch } from '../../Branch/component/StructureBranch';

import { TreeRecord, BranchRecord } from '../../../indexedDB/database';

import { getTopLevelBranches } from '../utils/dbHandlers';

interface PresentTreeProps {
    tree: TreeRecord;
}

export function PresentTree({ tree }: PresentTreeProps): JSX.Element {
    const [branches, setBranches] = React.useState<BranchRecord[]>();

    const loadBranches = React.useCallback(() => {
        if(!tree.id) throw new Error('There is an issue with tree id.');
        getTopLevelBranches(tree.id).then(result => setBranches(result));
    }, [tree]);

    React.useEffect(() => {
        loadBranches();
    }, [tree]);

    if (!tree.id) return <div>Failed to find tree id.</div>;

    return (
        <div>
            <h2>{tree.name}</h2>
            <ul className="main-list">
                {branches?.map(branch => (
                    <StructureBranch
                        key={branch.id}
                        branch={branch}
                        childLevel={1}
                        reloadBranches={loadBranches}
                    />
                ))}
            </ul>
            <BranchCreate treeId={tree.id} reloadBranches={loadBranches}/>
        </div>
    );
}