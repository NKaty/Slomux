import { ADD_TODO } from './constants'

export const addTodo = (text) => {
  // Generate id for using as key for array items
  const id = (Date.now() + Math.random()).toString()

  return {
    type: ADD_TODO,
    payload: { id, text }
  }
}
