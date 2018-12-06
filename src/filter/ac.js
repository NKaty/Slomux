import { CHANGE_FILTER } from './constants'

export const changeFilter = (filter) => {
  return {
    type: CHANGE_FILTER,
    payload: filter
  }
}
