import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import allReducers from '../reducer'

/**
 * Redux store for our webapp
 * For chrome dev tools installation, please see:
 * https://github.com/zalmoxisus/redux-devtools-extension#installation
 *
 */
const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

export default store
