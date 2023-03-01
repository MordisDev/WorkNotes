import * as React from 'react';

import { StatusChangeButton } from './StatusChangeButton';

import { faCirclePlay, faCirclePause, faCircleCheck, faBackwardStep } from '@fortawesome/free-solid-svg-icons';

import { TaskStatus } from '../../indexedDB/database.config';

interface BranchStatusButtonsSelectorProps {
    branchId: number;
    currentStatus: TaskStatus;
}

export function BranchStatusButtonsSelector(props: BranchStatusButtonsSelectorProps): JSX.Element | null {
    const { branchId, currentStatus } = props;

    switch (currentStatus) {
        case TaskStatus.queued:
            return (
                <>
                    <StatusChangeButton icon={faCirclePlay} branchId={branchId} newStatus={TaskStatus.working}/>
                    <StatusChangeButton icon={faCircleCheck} branchId={branchId} newStatus={TaskStatus.done}/>
                </>
            );
        
        case TaskStatus.working:
            return (
                <>
                    <StatusChangeButton icon={faCirclePause} branchId={branchId} newStatus={TaskStatus.queued}/>
                    <StatusChangeButton icon={faCircleCheck} branchId={branchId} newStatus={TaskStatus.done}/>
                </>
            );
            
        case TaskStatus.done:
            return <StatusChangeButton icon={faBackwardStep} branchId={branchId} newStatus={TaskStatus.queued}/>;

        default:
            return null;
    }
};