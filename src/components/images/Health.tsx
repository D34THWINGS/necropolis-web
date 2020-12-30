import React from 'react'
import { HealthPoint } from './HealthPoint'

const getTestId = (index: number, health: number, maxHealth: number) => {
  if (index >= health) {
    return 'missingHealthPoint'
  }
  if (index >= maxHealth) {
    return 'extraHealthPoint'
  }
  return 'remainingHealthPoint'
}

export type HealthProps = {
  className?: string
  health: number
  maxHealth: number
}

export const Health = ({ className, health, maxHealth }: HealthProps) => (
  <div className={className}>
    {Array.from({ length: Math.max(maxHealth, health) })
      .map((_, index) => index)
      .map((index, _, healthArray) => (
        <HealthPoint
          key={index}
          isExtra={index >= maxHealth}
          isMissing={index >= health}
          marginRight={index < healthArray.length - 1 ? '0.5rem' : ''}
          data-test-id={getTestId(index, health, maxHealth)}
        />
      ))}
  </div>
)
