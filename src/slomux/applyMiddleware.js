import compose from './compose'

export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, initialState) => {
    const store = createStore(reducer, initialState)

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI))

    // ((next) => a(b(next)))(store.dispatch)
    // b(next) - next for a, store.dispatch - next for b
    const dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
