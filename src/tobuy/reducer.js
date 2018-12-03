import { ADD_TOBUY } from './constants'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TOBUY:
      return [...state, action.payload]
    default:
      return state
  }
}
