import React from 'react'
import SlomuxContext from './Context'

export default (mapStateToProps, mapDispatchToProps) => (Component) => {
  class Connect extends React.Component {
    store = this.context

    componentDidMount() {
      this.unsubscribe = this.store.subscribe(this.handleChange)
    }

    // Cleanup subscription
    componentWillUnmount() {
      if (this.unsubscribe) this.unsubscribe()
    }

    // Added usage of setState instead of forceUpdate
    // setState will check shouldComponentUpdate while the forceUpdate won’t,
    // which gives a chance for further optimization when re-render is unnecessary
    handleChange = () => {
      this.setState({})
    }

    render() {
      return (
        <Component
          {...mapStateToProps(this.store.getState(), this.props)}
          {...mapDispatchToProps(this.store.dispatch, this.props)}
          // Inject ownProps into wrapped component
          {...this.props}
        />
      )
    }
  }

  // Added context usage instead of usage global variable (window.store)
  Connect.contextType = SlomuxContext

  return Connect
}
