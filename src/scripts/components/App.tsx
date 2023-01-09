import * as React from 'react';
import { css } from '@linaria/core';

import { MainLayout } from './MainLayout';

const globals = css`
    :global() {
        :root {
            --color-background-dark: #080808;
            --color-background: #121212;
            --color-background-light: #1C1C1C;
            --color-background-lighter: #262626;
            --color-text: #BCC0C3;
            --color-text-dark: #4b4d4e;
            --color-strong: #D94B46;
            --color-accent: #D99836;
        }
        body {
            background-color: var(--color-background);
            color: var(--color-text);
            font-family: monospace;

            box-sizing: border-box;
            margin: 0;

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
        return <MainLayout />;
    }
}
