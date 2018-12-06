function memorize(func) {
  let lastInput = null
  let lastOutput = null

  return function(...args) {
    if (!isArgumentsEqual(lastInput, args)) {
      lastOutput = func.apply(null, args)
      lastInput = args
    }

    return lastOutput
  }
}

function isArgumentsEqual(prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false
  }

  for (let i = 0; i < prev.length; i++) {
    if (prev[i] !== next[i]) return false
  }

  return true
}

export default function createSelector(...funcs) {
  const transformation = funcs.pop()
  const memorizedTransformation = memorize(transformation)

  return memorize(function(...args) {
    const params = funcs.map((func) => func.apply(null, args))
    return memorizedTransformation.apply(null, params)
  })
}
