import React from 'react'
import SlomuxContext from './Context'

export default (mapStateToProps, mapDispatchToProps) => (Component) => {
  class Connect extends React.Component {
    componentDidMount() {
      this.unsubscribe = this.props.store.subscribe(this.handleChange)
    }

    componentWillUnmount() {
      if (this.unsubscribe) this.unsubscribe()
    }

    handleChange = () => {
      this.forceUpdate()
    }

    render() {
      const {store, ...rest} = this.props
      return (
        <Component
          {...mapStateToProps(store.getState(), rest)}
          {...mapDispatchToProps(store.dispatch, rest)}
          {...rest}
        />
      )
    }
  }

  return function WithConnect (props) {
    return (
      <SlomuxContext.Consumer>
        {(store) => <Connect {...props} store={store} />}
      </SlomuxContext.Consumer>
    )
  }
}
