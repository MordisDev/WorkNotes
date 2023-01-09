import * as React from 'react';

import { TopBar } from '../Views/TimerBar/components/TopBar';
import { WorkTreeRoot } from '../Views/WorkTree/components/WorkTreeRoot';

export function MainLayout(): JSX.Element {
    return (
        <div>
            <TopBar />
            <WorkTreeRoot />
        </div>
    );
}