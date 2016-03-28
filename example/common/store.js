import {
    applyMiddleware,
    createStore
} from 'redux';

import rootReducer from './reducers';

export default function(state) {
    const store = createStore(
        rootReducer,
        state,
        applyMiddleware()
    );

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
