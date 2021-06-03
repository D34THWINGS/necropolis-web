import React, { ReactNode } from 'react'
import { css } from '@emotion/react'
import { Image } from '../images/Image'
import lootUrl from '../../assets/images/expeditions/loot.png'
import { shine } from '../../styles/animations'
import { transitions } from '../../config/theme'

const lootWrapper = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  padding: '0.5rem 0',
})

const lootInner = css({
  position: 'absolute',
  top: '50%',
  left: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  maxWidth: '7rem',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  filter: 'brightness(1.3)',
  animation: `${shine} ${transitions.SLOW_DURATION * 2}ms alternate infinite ease-in-out`,
})

export type ResourceLootProps = {
  className?: string
  children?: ReactNode
}

export const ResourceLoot = ({ className, children }: ResourceLootProps) => (
  <div className={className} css={lootWrapper}>
    <Image src={lootUrl} size="10rem" />
    <div css={lootInner}>{children}</div>
  </div>
)
