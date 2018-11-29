import React from 'react'

export default (mapStateToProps, mapDispatchToProps) => (Component) => {
  return class extends React.Component {
    componentDidMount() {
      this.unsubscribe = window.store.subscribe(this.handleChange)
    }

    componentWillUnmount() {
      this.unsubscribe()
    }

    handleChange = () => {
      this.forceUpdate()
    }

    render() {
      return (
        <Component
          {...mapStateToProps(window.store.getState(), this.props)}
          {...mapDispatchToProps(window.store.dispatch, this.props)}
          {...this.props}
        />
      )
    }


  }
}
