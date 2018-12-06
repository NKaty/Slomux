import { CHANGE_FILTER } from './constants'

export default (state = '', action) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return action.payload
    default:
      return state
  }
}
