import React from 'react'
import ReactDOM from 'react-dom'
import Provider from './slomux/Provider'
import createStore from './slomux/createStore'
import todoReducer from './todo/reducer'
import tobuyReducer from './tobuy/reducer'
import Menu from './menu/Menu'
import * as serviceWorker from './serviceWorker'

const reducer = (state = {}, action) => {
  return {
    todos: todoReducer(state.todos, action),
    tobuys: tobuyReducer(state.tobuys, action)
  }
}

ReactDOM.render(
  <Provider store={createStore(reducer, {})}>
    <Menu />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
