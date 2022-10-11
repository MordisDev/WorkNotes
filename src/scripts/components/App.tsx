import * as React from 'react';
import { css } from '@linaria/core';

import { MainLayout } from './MainLayout';

const globals = css`
    :global() {
        :root {
            --color-background: #121212;
            --color-text: #BCC0C3;
            --color-strong: #D94B46;
            --color-accent: #D99836;
        }
        body {
            background-color: var(--color-background);
            color: var(--color-text);

            h2 {
                color: #D94B46;
            }

            .main-list > li {
                color: #D99836;
            }
        }
    }
`;

export class App extends React.Component {
    render(): JSX.Element {
        return (
            <div className='globals'>
                <MainLayout />
            </div>
        );
    }
}
