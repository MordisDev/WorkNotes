import * as React from 'react';

import { BranchRecord } from '../../../indexedDB/database';

import { getTopLevelBranches } from '../utils/getTopLevelBranches';

interface RootProps {
    treeId: number;
}

export function Root({ treeId }: RootProps): JSX.Element {

    const [branches, setBranches] = React.useState<BranchRecord[]>();

    const loadBranches = React.useCallback(() => {
        getTopLevelBranches(treeId).then(result => {
            setBranches(result);
        });
    }, [treeId]);

    React.useEffect(() => {
        loadBranches();
    }, [treeId]);

    return (
        <h1>Branch Root</h1>
    )
}