import React from 'react'
import SlomuxContext from './Context'

export default function Provider({ store, children }) {
  // Added context usage instead of using global variable (window.store)
  return (
    <SlomuxContext.Provider value={store}>{children}</SlomuxContext.Provider>
  )
}
