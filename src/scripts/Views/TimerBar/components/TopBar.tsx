import * as React from 'react';
import { styled } from '@linaria/react';

const TopBarContainer = styled.div`
    position: relative;
    height: 52px;
    width: 100%;
    background-color: var(--color-background-light);

    border-bottom: 1px solid black;
    box-shadow: inset 0px -1px 4px var(--color-background);
`;

export function TopBar(): JSX.Element {
    return <TopBarContainer>This will be a top menu bar</TopBarContainer>;
}
