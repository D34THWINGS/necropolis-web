import React, { ReactNode } from 'react'
import { css } from '@emotion/react'
import { Image } from '../images/Image'
import lootUrl from '../../assets/images/expeditions/loot.png'

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
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  filter: 'brightness(1.3)',
})

export type ResourceLootProps = {
  children?: ReactNode
}

export const ResourceLoot = ({ children }: ResourceLootProps) => (
  <div css={lootWrapper}>
    <Image src={lootUrl} size="10rem" />
    <div css={lootInner}>{children}</div>
  </div>
)
