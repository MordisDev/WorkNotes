import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePause, faCircleCheck, faCirclePlay } from '@fortawesome/free-regular-svg-icons';

import { TaskStatus } from '../../../indexedDB/database';

import { setBranchStatus } from '../../../utils/dbHandlers';

interface StatusButtonsProps {
    branchId: number;
    currentStatus: TaskStatus;
    reload: () => void;
}

export function StatusButtons({ branchId, currentStatus, reload }: StatusButtonsProps): JSX.Element {
    const handlePause = React.useCallback(() => {
        setBranchStatus(branchId, TaskStatus.queued).then(() => reload());
    }, [branchId]);

    const handlePlay = React.useCallback(() => {
        setBranchStatus(branchId, TaskStatus.working).then(() => reload());;
    }, [branchId]);

    const handleCheck = React.useCallback(() => {
        setBranchStatus(branchId, TaskStatus.done).then(() => reload());;
    }, [branchId]);

    return (
        <React.Fragment>
            {currentStatus !== TaskStatus.queued && <FontAwesomeIcon icon={faCirclePause} onClick={handlePause}/>}
            {currentStatus !== TaskStatus.working && <FontAwesomeIcon icon={faCirclePlay} onClick={handlePlay}/>}
            <FontAwesomeIcon icon={faCircleCheck} onClick={handleCheck}/>
        </React.Fragment>
    );
}