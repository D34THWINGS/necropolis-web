import React from 'react'
import { render } from 'react-dom'
import * as Sentry from '@sentry/react'
import { Root } from './containers/Root'
import { version } from '../package.json'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://d5d27e8c810f4dff96b596ebd01d9bfd@o435390.ingest.sentry.io/5394619',
    release: `necropolis-web@${version}`,
    normalizeDepth: 10,
  })
}

if (process.env.ENABLE_PRECACHE_SW && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
  })
}

const rootElement = document.getElementById('react-root')

render(<Root />, rootElement)
