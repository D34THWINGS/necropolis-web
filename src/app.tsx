import React from 'react'
import { render } from 'react-dom'
import { Root } from './containers/Root'

const rootElement = document.getElementById('react-root')

render(<Root />, rootElement)

declare global {
  interface NodeModule {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hot: any
  }
}

if (module.hot) {
  module.hot.accept()
}
