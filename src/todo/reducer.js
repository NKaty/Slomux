import { ADD_TODO } from './constants'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      state.push(action.payload)
      return state
    default:
      return state
  }
}
