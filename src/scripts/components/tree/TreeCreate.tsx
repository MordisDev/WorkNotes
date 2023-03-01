import * as React from 'react';
import { styled } from '@linaria/react';

import { addTree } from '../../indexedDB/treeQueries';

const Input = styled.input`
    width: 280px;
    box-sizing: border-box;
    background: transparent;
    border: none;
    border-radius: .1em;
    box-shadow: -2px -2px 4px var(--color-background), 2px 2px 4px var(--color-background-lighter);
    outline: 0;

    color: white;
    padding: 0.1em 0.5em;
    margin: 0.4em 0.8em;
    font-family: inherit;
    font-size: 1.4em;

    &::placeholder {
        opacity: .5;
    }
`;

interface CreateTreePropos {
    selectTree: (id: number) => void;
}

export function TreeCreate({ selectTree }: CreateTreePropos): JSX.Element {
    const [newTreeName, setNewTreeName] = React.useState<string>('');
    const ref = React.useRef({ skipBlurEvent: false });

    const handleNameChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTreeName(event.target.value);
    }, []);

    const saveAndReload = React.useCallback((withReload = false) => {
        addTree(newTreeName).then(id => {
            if (withReload) selectTree(id);
            setNewTreeName('');
        }).catch(err => console.log(err));
    }, [newTreeName]);

    const handleBlur = React.useCallback(() => {
        if(!ref.current.skipBlurEvent && newTreeName.length > 2) saveAndReload();
        ref.current.skipBlurEvent = false;
    }, [ref, newTreeName]);

    const handleKeyPress = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter' && newTreeName.length > 2) {
            saveAndReload(true);
            ref.current.skipBlurEvent = true;
            event.currentTarget.blur();
        }
        if(event.key === 'Escape') {
            setNewTreeName('');
            ref.current.skipBlurEvent = true;
            event.currentTarget.blur();
        }
    }, [ref, newTreeName]);

    return <Input onChange={handleNameChange} placeholder="New" value={newTreeName} onBlur={handleBlur} onKeyDown={handleKeyPress} maxLength={32}/>
}