import React from 'react'
import { Image } from './Image'
import paladin1IconUrl from '../../assets/images/paladins/paladins-1.png'
import paladin2IconUrl from '../../assets/images/paladins/paladins-2.png'
import paladin3IconUrl from '../../assets/images/paladins/paladins-3.png'

const paladinIcons = [paladin1IconUrl, paladin2IconUrl, paladin3IconUrl]

export type PaladinsIconProps = {
  counter: number
  className?: string
}

export const PaladinsIcon = ({ className, counter }: PaladinsIconProps) => {
  if (counter === 0) {
    return null
  }
  const iconUrl = paladinIcons[Math.min(counter - 1, paladinIcons.length - 1)]
  if (!iconUrl) {
    return null
  }
  return <Image className={className} src={iconUrl} size="8rem" />
}
