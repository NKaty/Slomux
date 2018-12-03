import React from 'react'
import connect from '../slomux/connect'
import { addTobuy } from './ac'

class ToBuyComponent extends React.Component {
  state = {
    tobuyText: ''
  }

  updateText = (e) => {
    const { value } = e.target

    this.setState({ tobuyText: value })
  }

  addTobuy = () => {
    this.props.addTobuy(this.state.tobuyText)

    this.setState({ tobuyText: '' })
  }

  render() {
    return (
      <div>
        <label>{this.props.title || 'Без названия'}</label>
        <div>
          <input
            value={this.state.tobuyText}
            placeholder="Название задачи"
            onChange={this.updateText}
          />
          <button onClick={this.addTobuy}>Добавить</button>
          <ul>
            {this.props.tobuys.map((tobuy) => (
              <li key={tobuy.id}>{tobuy.text}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    tobuys: state.tobuys
  }),
  (dispatch) => ({
    addTobuy: (text) => dispatch(addTobuy(text))
  })
)(ToBuyComponent)
