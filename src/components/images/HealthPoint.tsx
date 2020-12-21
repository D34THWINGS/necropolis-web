import React from 'react'
import { css } from '@emotion/react'
import { Image } from './Image'
import hpIcon from '../../assets/images/paladins/paladins-hp.png'
import extraHpIcon from '../../assets/images/paladins/paladins-hp-extra.png'

const usedHealthPoint = css({ filter: 'grayscale(1)' })

export type HealthPointProps = {
  isExtra?: boolean
  isMissing?: boolean
  marginRight?: number
  'data-test-id'?: string
}

export const HealthPoint = ({ isExtra, isMissing, marginRight, 'data-test-id': testId }) => (
  <Image
    css={isMissing ? usedHealthPoint : undefined}
    src={isExtra ? extraHpIcon : hpIcon}
    marginRight={marginRight}
    data-test-id={testId}
  />
)
