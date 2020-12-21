import React from 'react'
import { css } from '@emotion/react'
import { Image } from './Image'
import hpIcon from '../../assets/images/paladins/paladins-hp.png'
import extraHpIcon from '../../assets/images/paladins/paladins-hp-extra.png'
import { HealthPoint } from './HealthPoint'

const usedHealthPoint = css({ filter: 'grayscale(1)' })

export type HealthProps = {
  health: number
  maxHealth: number
}

export const Health = ({ health, maxHealth }: HealthProps) =>
  Array.from({ length: Math.max(maxHealth, health) })
    .map((_, index) => index)
    .map((index, _, healthArray) => (
      <HealthPoint
        key={index}
        isExtra={index >= maxHealth}
        isMissing={index >= health}
        marginRight={index < healthArray.length - 1 ? '0.5rem' : ''}
        data-test-id={
          index > health ? 'missingHealthPoint' : index >= maxHealth ? 'extraHealthPoint' : 'remainingHealthPoint'
        }
      />
    ))
