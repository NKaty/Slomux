import { shallowEqual, strictEqual } from './utils'

export function selectorFactory(dispatch, mapStateToProps, mapDispatchToProps) {
  let state
  let ownProps
  let stateProps
  let dispatchProps
  let mergedProps
  let isFirstCall = true

  function mergeProps(stateProps, dispatchProps, ownProps) {
    return { ...stateProps, ...dispatchProps, ...ownProps }
  }

  return function selector(nextState, nextOwnProps) {
    const propsChanged = !shallowEqual(nextOwnProps, ownProps)
    const stateChanged = !strictEqual(nextState, state)

    state = nextState
    ownProps = nextOwnProps

    if (isFirstCall) {
      stateProps = mapStateToProps(state, ownProps)
      dispatchProps = mapDispatchToProps(dispatch, ownProps)
      mergedProps = mergeProps(stateProps, dispatchProps, ownProps)
      isFirstCall = false
      console.log(0, mergedProps)
      return mergedProps
    }

    if (propsChanged && stateChanged) {
      stateProps = mapStateToProps(state, ownProps)
      if (mapDispatchToProps.length !== 1)
        dispatchProps = mapDispatchToProps(dispatch, ownProps)
      mergedProps = mergeProps(stateProps, dispatchProps, ownProps)
      console.log(1, mergedProps)
      return mergedProps
    }

    if (propsChanged) {
      if (mapStateToProps.length !== 1)
        stateProps = mapStateToProps(state, ownProps)
      if (mapDispatchToProps.length !== 1)
        dispatchProps = mapDispatchToProps(dispatch, ownProps)
      mergedProps = mergeProps(stateProps, dispatchProps, ownProps)
      console.log(2, mergedProps)
      return mergedProps
    }

    if (stateChanged) {
      const nextStateProps = mapStateToProps(state, ownProps)
      const statePropsChanged = !shallowEqual(nextStateProps, stateProps)
      stateProps = nextStateProps
      if (statePropsChanged)
        mergedProps = mergeProps(stateProps, dispatchProps, ownProps)
      console.log(3, mergedProps)
      return mergedProps
    }

    console.log(4, mergedProps)
    return mergedProps
  }
}

export function makeSelectorStateful(selector, store) {
  const statefulSelector = {
    run: function(props) {
      const nextProps = selector(store.getState(), props)
      if (nextProps !== statefulSelector.props) {
        statefulSelector.shouldComponentUpdate = true
        statefulSelector.props = nextProps
      }
    }
  }

  return statefulSelector
}
