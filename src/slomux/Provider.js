import React from 'react'

export default class Provider extends React.Component {
  componentWillMount() {
    window.store = this.props.store
  }

  render() {
    return this.props.children
  }
}
