import * as React from 'react';

import { ActionButton } from '../common/ActionButton';

import { treeDBInstance, TaskStatus } from '../../indexedDB/database.config';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface StatusChangeButtonProps {
    icon: IconDefinition;
    branchId: number;
    newStatus: TaskStatus;
}

export function StatusChangeButton({ icon, branchId, newStatus }: StatusChangeButtonProps): JSX.Element {
    
    const handleStatusChange = React.useCallback(() => {
        treeDBInstance.branch.update(branchId, {status: newStatus});
    }, [branchId, newStatus]);
    
    return <ActionButton icon={icon} handleClick={handleStatusChange} variant="bordered"/>
}