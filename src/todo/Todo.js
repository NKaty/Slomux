import React from 'react'
import connect from '../slomux/connect'
import { addTodo } from './ac'

class ToDoComponent extends React.Component {
  state = {
    todoText: ''
  }

  // Used the arrow function not to lose this when assigning event handler
  // The arrow functions do not have own this and look up this in the outer lexical environment
  updateText = (e) => {
    const { value } = e.target

    // Used setState() instead of modifying state directly
    this.setState({ todoText: value })
  }

  // Used the arrow function not to lose this when assigning event handler
  // The arrow functions do not have own this and look up this in the outer lexical environment
  addTodo = () => {
    this.props.addTodo(this.state.todoText)

    // Used setState() instead of modifying state directly
    this.setState({ todoText: '' })
  }

  render() {
    return (
      <div>
        <label>{this.props.title || 'Без названия'}</label>
        <div>
          <input
            value={this.state.todoText}
            placeholder="Название задачи"
            onChange={this.updateText}
          />
          <button onClick={this.addTodo}>Добавить</button>
          <ul>
            {this.props.todos.map((todo) => (
              // Added special attribute key for array items
              // Keys should be unique.
              // And it is not recommended using indexes for keys if the order of items may change
              // So todo was turned into an object with two properties: id and text
              // Id was used as an unique key for array items
              <li key={todo.id}>{todo.text}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    todos: state
  }),
  (dispatch) => ({
    addTodo: (text) => dispatch(addTodo(text))
  })
)(ToDoComponent)
