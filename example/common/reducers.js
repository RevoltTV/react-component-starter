import { combineReducers } from 'redux';

import { reducer } from '../../src';

let rootReducer = combineReducers({
    component: reducer
});

export default rootReducer;
