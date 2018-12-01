export default (reducer, initialState) => {
  let currentState = initialState
  const listeners = []

  const getState = () => currentState
  const dispatch = (action) => {
    currentState = reducer(currentState, action)
    listeners.forEach((listener) => listener())
  }

  const subscribe = (listener) => {
    listeners.push(listener)

    // Added unsubscribe method
    return function unsubscribe() {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  return { getState, dispatch, subscribe }
}
