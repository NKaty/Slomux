import React from 'react'
import Todo from '../todo/Todo'
import Tobuy from '../tobuy/Tobuy'
import connect from '../slomux/connect'

class Menu extends React.Component {
  state = {
    todoOpen: false,
    tobuyOpen: false
  }

  todoToggle = () =>
    this.setState((state) => ({
      todoOpen: !state.todoOpen
    }))

  tobuyToggle = () =>
    this.setState((state) => ({
      tobuyOpen: !state.tobuyOpen
    }))

  render() {
    return (
      <>
        <h2>Менеджер задач</h2>
        <button onClick={this.todoToggle}>
          {this.state.todoOpen ? 'Закрыть' : 'Открыть'}
        </button>
        {this.state.todoOpen ? <Todo title="Список задач" /> : null}
        <h2>Менеджер покупок</h2>
        <button onClick={this.tobuyToggle}>
          {this.state.tobuyOpen ? 'Закрыть' : 'Открыть'}
        </button>
        {this.state.tobuyOpen ? <Tobuy title="Список покупок" /> : null}
        <h2>Все задачи и покупки</h2>
        <ul>
          {this.props.todos.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
          {this.props.tobuys.map((tobuy) => (
            <li key={tobuy.id}>{tobuy.text}</li>
          ))}
        </ul>
      </>
    )
  }
}

export default connect((state) => {
  return {
    todos: state.todos,
    tobuys: state.tobuys
  }
})(Menu)
