import * as React from 'react';

import { Button } from '../../../../../styled/Button';

import { TreeRecord } from '../../../indexedDB/database';

interface SelectTreeProps {
    tree: TreeRecord;
    handleSelect: (id: number) => void;
    isSelected: boolean;
}

export function SelectTree({ tree, handleSelect, isSelected }: SelectTreeProps): JSX.Element {
    const handleClick = React.useCallback(() => {
        if(!tree.id) throw new Error('There is an issue with tree id.');
        handleSelect(tree.id);
    }, [tree]);

    return <Button onClick={handleClick} isSelected={isSelected} width="280px" outline="menu">{tree.name}</Button>
}