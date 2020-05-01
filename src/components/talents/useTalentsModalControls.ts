import { createContext, useContext } from 'react'

export const talentsModalControlsContext = createContext({
  open: () => {
    // Do nothing by default
  },
})

export const useTalentsModalControls = () => useContext(talentsModalControlsContext)
