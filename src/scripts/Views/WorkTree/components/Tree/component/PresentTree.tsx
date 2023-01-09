import * as React from 'react';
import { styled } from '@linaria/react';

import { BranchCreate } from '../../Branch/component/BranchCreate';
import { Structure as BranchStructure } from '../../Branch/component/Structure';
import { Remove } from '../../../../../styled/Remove';
import { Divider } from '../../../../../styled/Divider'; 

import { TreeRecord, BranchRecord } from '../../../indexedDB/database';

import { getTopLevelBranches } from '../utils/getBranches';
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
    const [branches, setBranches] = React.useState<BranchRecord[]>();

    const loadBranches = React.useCallback(() => {
        if(!tree.id) throw new Error('There is an issue with tree id.');
        getTopLevelBranches(tree.id).then(result => {
            setBranches(result);
        });
    }, [tree]);

    React.useEffect(() => {
        loadBranches();
    }, [tree]);

    if (!tree.id) return <div>Failed to find tree id.</div>;

    return (
        <TreePresentationWrapper>
            <TitleWrapper>
                <Title>{tree.name}</Title>
                <Remove removeItemId={tree.id} removeFunction={removeTree} refreshFunction={deselectAndReloadTrees}/>
            </TitleWrapper>
            <Divider />
            <ul className="main-list">
                {branches?.map(branch => (
                    <BranchStructure
                        key={branch.id}
                        branch={branch}
                        childLevel={1}
                        reloadBranches={loadBranches}
                    />
                ))}
            </ul>
            <BranchCreate treeId={tree.id} reloadBranches={loadBranches}/>
        </TreePresentationWrapper>
    );
}