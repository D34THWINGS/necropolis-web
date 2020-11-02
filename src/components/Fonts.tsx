import React from 'react'
import { css, Global } from '@emotion/core'
import greywallNormalUrl from '../assets/fonts/greywall-webfont.woff2'
import azoSansBoldUrl from '../assets/fonts/azo-sans-bold.woff2'

const injectedFonts = [
  css({
    '@font-face': {
      fontFamily: 'Greywall',
      src: `url(${greywallNormalUrl}) format('woff2')`,
      fontWeight: 500,
      fontStyle: 'normal',
    },
  }),
  css({
    '@font-face': {
      fontFamily: 'Azo Sans',
      src: `url(${azoSansBoldUrl}) format('woff2')`,
      fontWeight: 700,
      fontStyle: 'normal',
    },
  }),
]

export const Fonts = () => <Global styles={injectedFonts} />
