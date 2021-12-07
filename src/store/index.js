import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import allReducers from '../reducer'

/**
 * Redux store for our webapp
 * For chrome dev tools installation, please see:
 * https://github.com/zalmoxisus/redux-devtools-extension#installation
 *
 */

const middleware = [thunk]

let composedEnhancer
if (process.env.BUILD) {
  composedEnhancer = compose(applyMiddleware(...middleware))
} else {
  // dev environment, activate redux dev tools
  composedEnhancer = compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}

const store = createStore(
  allReducers,
  undefined,
  composedEnhancer
)

export default store
