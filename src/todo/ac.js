import { ADD_TODO } from './constants'

export const addTodo = (text) => {
  const id = (Date.now() + Math.random()).toString()
  return {
    type: ADD_TODO,
    payload: { id, text }
  }
}
