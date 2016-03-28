import 'babel-polyfill';

require('../../src/index.styl');

import logger       from 'revolt-logger';
import React        from 'react';
import { render }   from 'react-dom';
import { Provider } from 'react-redux';

logger.configure({
    name: 'Component',
    level: 'debug'
});

import configureStore from '../common/store';
import App            from '../common/container';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById('app');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);
