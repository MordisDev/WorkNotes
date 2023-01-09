import * as React from 'react';
import { styled } from '@linaria/react';

import { CreateTree } from './Tree/component/CreateTree';
import { SelectTree } from './Tree/component/SelectTree';
import { PresentTree } from './Tree/component/PresentTree';

import { TreeRecord } from '../indexedDB/database';

import { getTrees } from '../utils/getTrees';

const MainContainer = styled.div`
    display: flex;
    font-size: 18px;
`;

const TreesMenuContainer = styled.div`
    background-color: var(--color-background-light);
    max-width: 320px;
    min-height: calc(100vh - 52px);
    padding-top: 20px;
    border-right: 1px solid black;
    box-shadow: inset -1px 0px 5px var(--color-background),
    inset 0px 1px 5px var(--color-background);
`;

export function WorkTreeRoot(): JSX.Element {
    const [treeArray, setTreeArray] = React.useState<TreeRecord[]>();
    const [selectedTree, setSelectedTree] = React.useState<TreeRecord>();

    const loadTrees = React.useCallback(async () => {
        const result = (await getTrees()).filter((item): item is TreeRecord => item !== undefined);
        setTreeArray(result);
    }, []);

    const handleTreeSelect = React.useCallback(async (id: number) => {
        const tree = (await getTrees([id]))[0];
        setSelectedTree(tree);
    }, []);

    const deselectAndReloadTrees = React.useCallback(() => {
        setSelectedTree(undefined);
        loadTrees();
    }, []);

    React.useEffect(() => {
        loadTrees();
    }, []);

    return (
    <MainContainer>
        <TreesMenuContainer>
            {treeArray?.map(tree => (
                <SelectTree
                    key={tree.id}
                    tree={tree}
                    handleSelect={handleTreeSelect}
                    isSelected={tree.id === selectedTree?.id}
                />))}
            <CreateTree
                reloadTrees={loadTrees}
                selectTree={handleTreeSelect}
            />
        </TreesMenuContainer>
        {selectedTree && <PresentTree tree={selectedTree} deselectAndReloadTrees={deselectAndReloadTrees}/>}
    </MainContainer>
    );
}