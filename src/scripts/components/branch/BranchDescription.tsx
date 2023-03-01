import * as React from 'react';
import { styled } from '@linaria/react';

import { BranchRecord, TaskStatus } from '../../indexedDB/database.config';

const Description = styled.div`
    max-width: 780px;
    margin-left: .6em;
    
    &[data-status=${TaskStatus.working}] {
        color: var(--color-accent);
    }

    &[data-status=${TaskStatus.done}] {
        opacity: .3;
    }
`;

interface BranchDescriptionProps {
    description: BranchRecord['description'];
    status: BranchRecord['status'];
}

export function BranchDescription({ description, status }: BranchDescriptionProps): JSX.Element{
    return (
        <Description data-status={status}>
            {description}
        </Description>
    );
}