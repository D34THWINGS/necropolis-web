import React from 'react'
import { css, Global } from '@emotion/core'
import greywallNormalUrl from '../assets/fonts/greywall-webfont.woff2'

const fonts = css({
  '@font-face': {
    fontFamily: 'Greywall',
    src: `url(${greywallNormalUrl}) format('woff2')`,
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
})

export const Fonts = () => <Global styles={fonts} />
