/**
 * This export file combines all reducers to be used for a single
 * redux store.
 */

import { combineReducers } from 'redux';
import pageStateReducer from './pageStateReducer.js';
import interfaceStackReducer from './interfaceStackReducer.js';

const allReducers = combineReducers({
  pageState : pageStateReducer,
  interfaceStack : interfaceStackReducer,
})

export default allReducers;
