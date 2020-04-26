/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { ReactNode } from 'react'
import { colors, shadows } from '../../config/theme'
import { ModalColor, modalColorsMap } from './Modal'

const panel = css({
  border: '2px solid #0E4039',
  borderRadius: '15px',
  margin: '0.8rem 0',
  padding: '5px',
  boxShadow: 'inset 0px 1px 1px rgba(255, 255, 255, 0.5)',
  backgroundColor: modalColorsMap[ModalColor.GREEN][0],
})

const panelInner = css({
  padding: '0.5rem',
  borderRadius: '10px',
  boxShadow: 'inset 0px 3px 0px #0E4039, 0px 1px 1px rgba(255, 255, 255, 0.5)',
  background: modalColorsMap[ModalColor.GREEN][1],
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
