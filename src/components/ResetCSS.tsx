import React from 'react'
import { css, Global } from '@emotion/core'

const reset = css({
  html: {
    boxSizing: 'border-box',
    fontSize: '100%',
  },

  '*': {
    boxSizing: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },

  'a, button': {
    lineHeight: 1,
  },

  body: {
    margin: 0,
    padding: 0,
    lineHeight: 1.5,
    fontFamily: '"Azo Sans", Arial, Helvetica, sans-serif',
    fontStyle: 'normal',
    fontSize: '1rem',
    overflow: 'hidden',
  },
})

export const ResetCSS = () => <Global styles={reset} />
