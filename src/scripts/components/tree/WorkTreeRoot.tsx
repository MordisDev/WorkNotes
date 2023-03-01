import * as React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { styled } from '@linaria/react';

import { TreeStructure } from './TreeStructure';
import { TreeCreate } from './TreeCreate';
import { TreeSelect } from './TreeSelect';

import { treeDBInstance } from '../../indexedDB/database.config';

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
    const [selectedTreeId, setSelectedTreeId] = React.useState(0);

    const selectedTree = useLiveQuery(
        () => treeDBInstance.tree.get(selectedTreeId),
        [selectedTreeId]);
    
    const treeArray = useLiveQuery(
        () => treeDBInstance.tree.toArray());


    const handleTreeSelect = React.useCallback((id: number) => {
        setSelectedTreeId(id);
    }, []);

    return (
    <MainContainer>
        <TreesMenuContainer>
            {treeArray?.map(tree => (
                <TreeSelect
                    key={tree.id}
                    tree={tree}
                    handleSelect={handleTreeSelect}
                    isSelected={tree.id === selectedTree?.id}
                />))}
            <TreeCreate
                selectTree={handleTreeSelect}
            />
        </TreesMenuContainer>
        {selectedTree && <TreeStructure tree={selectedTree}/>}
    </MainContainer>
    );
}