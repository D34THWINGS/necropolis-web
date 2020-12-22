import React from 'react'
import { css } from '@emotion/react'
import { Image } from './Image'
import hpIcon from '../../assets/images/paladins/paladins-hp.png'
import extraHpIcon from '../../assets/images/paladins/paladins-hp-extra.png'

const usedHealthPoint = css({ filter: 'grayscale(1)' })

export type HealthPointProps = {
  isExtra?: boolean
  isMissing?: boolean
  marginRight?: string
  marginLeft?: string
  'data-test-id'?: string
}

export const HealthPoint = ({
  isExtra,
  isMissing,
  marginRight,
  marginLeft,
  'data-test-id': testId,
}: HealthPointProps) => (
  <Image
    css={isMissing ? usedHealthPoint : undefined}
    src={isExtra ? extraHpIcon : hpIcon}
    marginRight={marginRight}
    marginLeft={marginLeft}
    data-test-id={testId}
  />
)
