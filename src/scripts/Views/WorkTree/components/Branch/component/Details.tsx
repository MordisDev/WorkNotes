import * as React from 'react';

import { BranchRecord, TaskStatus } from '../../../indexedDB/database';

import { removeBranch } from '../utils/removeBranch';

function StatusButtonGroup({status}: {status: TaskStatus}): JSX.Element {
    return (
        <div>
            <button>Queue</button>
            <button>Progress</button>
            <button>Done</button>
        </div>
    );
}

interface DetailsProps {
    branch: BranchRecord;
    subbranchInput?: () => void;
}

export function Details({ branch, subbranchInput }: DetailsProps): JSX.Element {
    const [extendedView, setExtendedView] = React.useState(false);
    const detailsRef = React.useRef<HTMLLIElement>(null);

    const enableExtendedInfo = React.useCallback(() => {
        setExtendedView(true);
        document.addEventListener('click', handleClickOutside);
    }, []);

    const disableExtendedInfo = React.useCallback(() => {
        setExtendedView(false);
        document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleClickOutside = React.useCallback((event: MouseEvent) => {
        if(!detailsRef.current?.contains(event.target as Node)) disableExtendedInfo();
    }, []);

    return (
        <li ref={detailsRef}>
            {branch.description}
            <button onClick={extendedView ? disableExtendedInfo : enableExtendedInfo}>Full Info</button>
            {subbranchInput && <button onClick={subbranchInput}>Subbranch Input</button>}
            {branch.status !== TaskStatus.inherit && <StatusButtonGroup status={branch.status}/>}
        </li>
    );
}