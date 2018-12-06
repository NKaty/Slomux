import createSelector from '../slomux/reselect'

export const todoSelector = (state) => state.todos
export const tobuySelector = (state) => state.tobuys

export const filterSelector = (state) => state.filter

export const filteredItemsSelector = createSelector(
  todoSelector,
  tobuySelector,
  filterSelector,
  (todos, tobuys, filter) => {
    return [...todos, ...tobuys].filter((item) => item.text.includes(filter))
  }
)
