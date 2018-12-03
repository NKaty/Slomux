import React from 'react'
import Todo from '../todo/Todo'
import Tobuy from '../tobuy/Tobuy'

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
      </>
    )
  }
}

export default Menu
