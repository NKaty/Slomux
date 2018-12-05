export default (store) => (next) => (action) => {
  setTimeout(() => {
    next(action)
  }, 3000)
}
