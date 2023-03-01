import * as React from 'react';
import { styled } from '@linaria/react';

const TopBarContainer = styled.div`
    height: 52px;
    width: 100%;
    background-color: var(--color-background-light);

    border-bottom: 1px solid black;
    box-shadow: inset 0px -1px 4px var(--color-background);

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 24px;
    font-weight: 700;
`;

export function TopBar(): JSX.Element {
    return <TopBarContainer>WorkNotes</TopBarContainer>;
}
