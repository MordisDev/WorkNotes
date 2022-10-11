import * as React from 'react';

import { TreeRecord } from '../../../indexedDB/database';

interface SelectTreeProps {
    tree: TreeRecord;
    handleSelect: (id: number) => void;
}

export function SelectTree({ tree, handleSelect }: SelectTreeProps): JSX.Element {
    const handleClick = React.useCallback(() => {
        if(!tree.id) throw new Error('There is an issue with tree id.');
        handleSelect(tree.id);
    }, [tree]);

    return <button onClick={handleClick}>{tree.name}</button>
}