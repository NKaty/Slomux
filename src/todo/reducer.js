import { ADD_TODO } from './constants'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      // Update state immutably
      return [...state, action.payload]
    default:
      return state
  }
}
