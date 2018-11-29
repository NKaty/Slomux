export default (reducer, initialState) => {
  let currentState = initialState
  const listeners = []

  const getState = () => currentState
  const dispatch = (action) => {
    currentState = reducer(currentState, action)
    listeners.forEach((listener) => listener())
  }

  const subscribe = (listener) => listeners.push(listener)

  return { getState, dispatch, subscribe }
}
