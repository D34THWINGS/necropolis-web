import React from 'react'
import { css, Global } from '@emotion/core'
import { fonts } from '../config/theme'

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
    fontFamily: fonts.CORPUS,
    fontStyle: 'normal',
    fontSize: '1rem',
    overflow: 'hidden',
  },

  'html, body, #react-root': {
    height: '100%',
  },
})

export const ResetCSS = () => <Global styles={reset} />
