import * as React from 'react';
import { styled } from '@linaria/react';

import { BranchRoot } from '../branch/BranchRoot';
import { TreeRemove } from './TreeRemove';

import { TreeRecord } from '../../indexedDB/database.config';

const TreePresentationWrapper = styled.div`
    margin: 3em;
`;

const TitleWrapper = styled.div`
    padding: 0.5em;
`;

const Title = styled.h2`
    margin-bottom: 0.3em;
`;

const Divider = styled.hr`
    border: 1px solid black;
    box-shadow: 0px 1px var(--color-background-lighter);
`;

interface PresentTreeProps {
    tree: TreeRecord;
}

export function TreeStructure({ tree }: PresentTreeProps): JSX.Element {

    if (!tree.id) return <div>Failed to find tree id.</div>;

    return (
        <TreePresentationWrapper>
            <TitleWrapper>
                <Title>{tree.name}</Title>
                <TreeRemove treeId={tree.id}/>
            </TitleWrapper>
            <Divider />
            <BranchRoot treeId={tree.id}/>
        </TreePresentationWrapper>
    );
}