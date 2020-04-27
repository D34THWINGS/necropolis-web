import React from 'react'
import { render } from 'react-dom'
import { Root } from './containers/Root'

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
  })
}

const rootElement = document.getElementById('react-root')

render(<Root />, rootElement)
