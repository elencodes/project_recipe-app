import './styles/index.css';
import './styles/fonts.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { configureTestMode } from '~/utils/configure-test-mode.ts';

import { App } from './app/App';
import { store } from './redux/configure-store';

configureTestMode();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
);
