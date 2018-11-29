import React from 'react'
import connect from '../slomux/connect'
import { addTodo } from './ac'

class ToDoComponent extends React.Component {
  state = {
    todoText: ''
  }

  updateText = (e) => {
    const { value } = e.target

    this.setState({ todoText: value })
  }

  addTodo = () => {
    this.props.addTodo(this.state.todoText)

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
            {this.props.todos.map((todo, idx) => (
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
