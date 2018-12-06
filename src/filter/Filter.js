import React from 'react'
import connect from '../slomux/connect'
import { filteredItemsSelector, filterSelector } from '../selectors'
import { changeFilter } from './ac'

class FilterComponent extends React.Component {
  changeFilterHandler = (e) => {
    const { value } = e.target
    this.props.changeFilter(value.trim())
  }

  render() {
    return (
      <>
        <h2>Все задачи и покупки</h2>
        <input
          value={this.props.filter}
          placeholder="Фильтер"
          onChange={this.changeFilterHandler}
        />
        <ul>
          {this.props.items.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </>
    )
  }
}

export default connect(
  (state) => {
    console.log('filter mapStateToProp call')
    return {
      items: filteredItemsSelector(state),
      filter: filterSelector(state)
    }
  },
  { changeFilter }
)(FilterComponent)
