/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { ReactNode } from 'react'
import panelBackgroundUrl from '../../assets/images/panel.png'
import { colors, shadows } from '../../config/theme'

const panel = css({
  margin: '0.5rem 0',
  border: '15px solid transparent',
  borderImage: `url(${panelBackgroundUrl}) 80 round`,
})

const panelInner = css({
  backgroundColor: colors.GREEN,
  margin: '-0.2rem',
  paddingBottom: '0.3rem',
  color: colors.WHITE,
  textShadow: shadows.TEXT_FLAT,
})

export type PanelProps = {
  className?: string
  children: ReactNode
}

export const Panel = ({ className, children }: PanelProps) => (
  <div className={className} css={panel}>
    <div css={panelInner}>{children}</div>
  </div>
)
