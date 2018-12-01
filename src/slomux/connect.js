import React from 'react'
import SlomuxContext from './Context'

export default (mapStateToProps, mapDispatchToProps) => (Component) => {
  class Connect extends React.Component {
    store = this.context

    componentDidMount() {
      this.unsubscribe = this.store.subscribe(this.handleChange)
    }

    componentWillUnmount() {
      if (this.unsubscribe) this.unsubscribe()
    }

    handleChange = () => {
      this.setState({})
    }

    render() {
      return (
        <Component
          {...mapStateToProps(this.store.getState(), this.props)}
          {...mapDispatchToProps(this.store.dispatch, this.props)}
          {...this.props}
        />
      )
    }
  }

  Connect.contextType = SlomuxContext

  return Connect
}
