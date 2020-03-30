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
  },

  'a, button': {
    lineHeight: 1,
  },

  body: {
    margin: 0,
    padding: 0,
    lineHeight: 1.5,
    fontFamily: '"Greywall", Arial, Helvetica, sans-serif',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '1rem',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    overflow: 'hidden',
  },
})

export const ResetCSS = () => <Global styles={reset} />
