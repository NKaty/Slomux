import { ADD_TODO, DELETE_TODO } from './constants'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      // Update state immutably
      return [...state, action.payload]

    case DELETE_TODO:
      return state.filter(item => item.id !== action.payload.id)

    default:
      return state
  }
}
