import React from 'react'
import SlomuxContext from './Context'

export default function Provider({ store, children }) {
  return (
    <SlomuxContext.Provider value={store}>{children}</SlomuxContext.Provider>
  )
}
