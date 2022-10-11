import * as React from 'react';

import { CreateTree } from './Tree/component/CreateTree';
import { SelectTree } from './Tree/component/SelectTree';
import { PresentTree } from './Tree/component/PresentTree';
import { RemoveTree } from './Tree/component/RemoveTree';

import { TreeRecord } from '../indexedDB/database';

import { getTree, getTrees } from '../utils/dbHandlers';

export function WorkTreeRoot(): JSX.Element {
    const [treeArray, setTreeArray] = React.useState<TreeRecord[]>();
    const [selectedTree, setSelectedTree] = React.useState<TreeRecord>();

    const loadTrees = React.useCallback(() => {
        getTrees().then(result => setTreeArray(result));
    }, []);

    const handleTreeSelect = React.useCallback((id: number) => {
        getTree(id).then(tree => setSelectedTree(tree));
    }, []);

    const resetAndReload = React.useCallback(() => {
        loadTrees();
        setSelectedTree(undefined);
    }, []);

    React.useEffect(() => {
        loadTrees();
    }, []);

    return (
    <div>
        {treeArray?.map(tree => (
            <SelectTree
                key={tree.id}
                tree={tree}
                handleSelect={handleTreeSelect}
            />))}
        <CreateTree
            reloadTrees={loadTrees}
            selectTree={handleTreeSelect}
        />
        {selectedTree && <PresentTree tree={selectedTree} />}
        {selectedTree?.id && <RemoveTree treeId={selectedTree.id} resetAndReload={resetAndReload} />}
    </div>
    );
}