export default function compose(...funcs) {
  if (funcs.length === 0) {
    return dispatch => dispatch
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (next) => a(b(next)))
}
