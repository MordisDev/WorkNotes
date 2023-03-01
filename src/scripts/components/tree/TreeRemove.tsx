import * as React from 'react';
import { styled } from '@linaria/react';

import { RemoveConfirmation } from '../common/RemoveConfirmation';

import { removeTree } from '../../indexedDB/treeQueries';

const Wrapper = styled.div`
    padding: 0 0.4em;
    border: 2px groove var(--color-text-dark);
    border-radius: 0.6em;
    background: black;
    color: var(--color-text-dark);
    font-size: 0.7em;
    letter-spacing: 0.2em;
    width: fit-content;
`;

const Trigger = styled.button`
    border: none;
    background: transparent;
    color: var(--color-text);
    opacity: 0.5;
    cursor: pointer;

    font-size: 1em;
    letter-spacing: 0.2em;

    &:hover {
        opacity: 0.65;
        text-decoration: underline;
    }
`;

interface TreeRemoveProps {
    treeId: number;
}

export function TreeRemove({ treeId }: TreeRemoveProps): JSX.Element {
    const [isAwaitingConfirmation, setIsAwaitingConfirmation] = React.useState(false);

    const initiateRemove = React.useCallback(() => {
        setIsAwaitingConfirmation(true);
    }, []);

    const disableRemove = React.useCallback(() => {
        setIsAwaitingConfirmation(false);
    }, []);

    if (isAwaitingConfirmation) return (
        <RemoveConfirmation itemId={treeId} remove={removeTree} disableConfirmation={disableRemove}/>
    )

    return <Wrapper><Trigger onClick={initiateRemove}>Remove</Trigger></Wrapper>
}