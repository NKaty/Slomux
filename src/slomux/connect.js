import React from 'react'

export default (mapStateToProps, mapDispatchToProps) => (Component) => {
  return class extends React.Component {
    render() {
      return (
        <Component
          {...mapStateToProps(window.store.getState(), this.props)}
          {...mapDispatchToProps(window.store.dispatch, this.props)}
        />
      )
    }

    componentDidMount() {
      window.store.subscribe(this.handleChange)
    }

    handleChange = () => {
      this.forceUpdate()
    }
  }
}
