import { ADD_TOBUY } from './constants'

export const addTobuy = (text) => {
  const id = (Date.now() + Math.random()).toString()

  return {
    type: ADD_TOBUY,
    payload: { id, text }
  }
}
