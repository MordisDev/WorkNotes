import * as React from 'react';

import { TopBar } from '../Views/TimerBar/components/TopBar';
import { WorkTreeRoot } from '../Views/WorkTree/components/WorkTreeRoot';

import { MainLayoutWrapper } from '../styles/MainLayoutWrapper';

export function MainLayout(): JSX.Element {
    return (
        <MainLayoutWrapper>
            <TopBar />
            <WorkTreeRoot />
        </MainLayoutWrapper>
    );
}