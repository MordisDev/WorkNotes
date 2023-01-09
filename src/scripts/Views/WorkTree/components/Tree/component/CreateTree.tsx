import * as React from 'react';

import { Input } from '../../../../../styled/Input';

import { addTree } from '../utils/addTree';

interface CreateTreePropos {
    reloadTrees: () => void;
    selectTree: (id: number) => void;
}

export function CreateTree({ reloadTrees, selectTree }: CreateTreePropos): JSX.Element {
    const [newTreeName, setNewTreeName] = React.useState<string>('');
    const ref = React.useRef({ skipBlurEvent: false });

    const handleNameChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTreeName(event.target.value);
    }, []);

    const saveAndReload = React.useCallback((withReload = false) => {
        addTree(newTreeName).then(id => {
            if (withReload) selectTree(id);
            reloadTrees();
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