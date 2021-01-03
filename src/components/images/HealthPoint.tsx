import React, { useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import anime from 'animejs'
import { Image } from './Image'
import hpIcon from '../../assets/images/paladins/paladins-hp.png'
import extraHpIcon from '../../assets/images/paladins/paladins-hp-extra.png'

const healthPoint = css({ display: 'inline-block' })

const usedHealthPoint = css({ display: 'inline-block', filter: 'grayscale(1)' })

export type HealthPointProps = {
  isExtra?: boolean
  isMissing?: boolean
  size?: string
  marginRight?: string
  marginLeft?: string
  'data-test-id'?: string
}

export const HealthPoint = ({
  isExtra,
  isMissing,
  size,
  marginRight,
  marginLeft,
  'data-test-id': testId,
}: HealthPointProps) => {
  const wasMissingRef = useRef(isMissing)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (isMissing && !wasMissingRef.current && imageRef.current) {
      anime({
        targets: imageRef.current,
        direction: 'alternate',
        autoplay: true,
        duration: 300,
        scale: 1.3,
        easing: 'easeInOutSine',
      })
    }
    wasMissingRef.current = isMissing
  }, [isMissing])

  return (
    <Image
      ref={imageRef}
      css={isMissing ? usedHealthPoint : healthPoint}
      src={isExtra ? extraHpIcon : hpIcon}
      size={size}
      marginRight={marginRight}
      marginLeft={marginLeft}
      data-test-id={testId}
    />
  )
}
