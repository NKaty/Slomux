export default (mapDispatchToProps) => {
  if (typeof mapDispatchToProps === 'function') return mapDispatchToProps


  if (typeof mapDispatchToProps !== 'object') {
    mapDispatchToProps = undefined
  }

  if (mapDispatchToProps === null || mapDispatchToProps === undefined)
    return (dispatch) => dispatch

  return (dispatch) => Object.keys(mapDispatchToProps).reduce(
    (creators, key) => {
      creators[key] = function() {
        return dispatch(mapDispatchToProps[key].apply(this, arguments))
      }
      return creators
    },
    {}
  )
}
