import { createContext, useContext } from 'react'

export const resourcesModalControlsContext = createContext({
  open: () => {
    // Do nothing by default
  },
})

export const useResourcesModalControls = () => useContext(resourcesModalControlsContext)
