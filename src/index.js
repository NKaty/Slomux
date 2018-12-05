import React from 'react'
import ReactDOM from 'react-dom'
import Provider from './slomux/Provider'
import createStore from './slomux/createStore'
import applyMiddleware from './slomux/applyMiddleware'
import logger from './middleware/logger'
import thunk from './middleware/thunk'
import todoReducer from './todo/reducer'
import tobuyReducer from './tobuy/reducer'
import Menu from './menu/Menu'
import * as serviceWorker from './serviceWorker'

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action)
      return nextState
    }, {})
  }
}

const store = createStore(
  combineReducers({
    todos: todoReducer,
    tobuys: tobuyReducer
  }),
  {},
  applyMiddleware(thunk, logger)
)

ReactDOM.render(
  <Provider
    store={store}
  >
    <Menu />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
