import React from 'react'
import SlomuxContext from './Context'
import { selectorFactory, makeSelectorStateful } from './selectorFactory'

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

    componentWillReceiveProps(nextProps) {
      this.selector.run(nextProps)
    }

    shouldComponentUpdate() {
      return this.selector.shouldComponentUpdate
    }

    // Cleanup subscription
    componentWillUnmount() {
      if (this.unsubscribe) this.unsubscribe()
    }

    initSelector() {
      const selector = selectorFactory(
        this.store.dispatch,
        mapStateToProps,
        mapDispatchToProps
      )
      this.selector = makeSelectorStateful(selector, this.store)
      this.selector.run(this.props)
    }

    // Added usage of setState instead of forceUpdate
    // setState will check shouldComponentUpdate while the forceUpdate won’t,
    // which gives a chance for further optimization when re-render is unnecessary
    handleChange = () => {
      this.selector.run(this.props)
      if (this.selector.shouldComponentUpdate) {
        this.setState({})
      }
    }

    render() {
      console.log('render', this.props.title)
      const selector = this.selector
      selector.shouldComponentUpdate = false

      return <Component {...selector.props} />
    }
  }

  // Added context usage instead of usage global variable (window.store)
  Connect.contextType = SlomuxContext

  return Connect
}
