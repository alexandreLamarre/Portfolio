/**
 * This export file combines all reducers to be used for a single
 * redux store.
 */

import { combineReducers } from 'redux';
import pageStateReducer from './pageStateReducer.js';

const allReducers = combineReducers({
  pageState : pageStateReducer,
})

export default allReducers;
