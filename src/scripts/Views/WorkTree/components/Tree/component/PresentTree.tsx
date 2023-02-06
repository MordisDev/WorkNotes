import * as React from 'react';
import { styled } from '@linaria/react';

import { Remove } from '../../../../../styled/Remove';
import { Divider } from '../../../../../styled/Divider';
import { Root as BranchRoot } from '../../Branch/component/Root';

import { TreeRecord } from '../../../indexedDB/database';

import { removeTree } from '../utils/removeTree';

const TreePresentationWrapper = styled.div`
    margin: 3em;
`;

const TitleWrapper = styled.div`
    padding: 0.5em;
`;

const Title = styled.h2`
    margin-bottom: 0.3em;
`;

interface PresentTreeProps {
    tree: TreeRecord;
    deselectAndReloadTrees: () => void;
}

export function PresentTree({ tree, deselectAndReloadTrees }: PresentTreeProps): JSX.Element {

    if (!tree.id) return <div>Failed to find tree id.</div>;

    return (
        <TreePresentationWrapper>
            <TitleWrapper>
                <Title>{tree.name}</Title>
                <Remove removeItemId={tree.id} removeFunction={removeTree} refreshFunction={deselectAndReloadTrees}/>
            </TitleWrapper>
            <Divider />
            <BranchRoot treeId={tree.id}/>
        </TreePresentationWrapper>
    );
}