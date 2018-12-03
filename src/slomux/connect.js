import React from 'react'
import SlomuxContext from './Context'
import selectorFactory from './selectorFactory'

export default (
  mapStateToProps = () => ({}),
  mapDispatchToProps = () => ({})
) => (Component) => {
  class Connect extends React.Component {
    constructor(props, context) {
      super(props, context)
      this.store = context
      this.initSelector()
    }

    componentDidMount() {
      this.unsubscribe = this.store.subscribe(this.handleChange)
    }

    // Cleanup subscription
    componentWillUnmount() {
      if (this.unsubscribe) this.unsubscribe()
    }

    initSelector() {
      this.selector = selectorFactory(
        this.store.dispatch,
        mapStateToProps,
        mapDispatchToProps
      )
    }

    // Added usage of setState instead of forceUpdate
    // setState will check shouldComponentUpdate while the forceUpdate won’t,
    // which gives a chance for further optimization when re-render is unnecessary
    handleChange = () => {
      this.setState({})
    }

    render() {
      const mergedProps = this.selector(this.store.getState(), this.props)

      return <Component {...mergedProps} />
    }
  }

  // Added context usage instead of usage global variable (window.store)
  Connect.contextType = SlomuxContext

  return Connect
}
