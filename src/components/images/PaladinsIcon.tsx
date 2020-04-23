import React from 'react'
import { useSelector } from 'react-redux'
import { Image } from './Image'
import { getPaladinsStrength } from '../../data/paladins/selectors'
import paladin1IconUrl from '../../assets/images/paladins/paladins-1.png'
import paladin2IconUrl from '../../assets/images/paladins/paladins-2.png'
import paladin3IconUrl from '../../assets/images/paladins/paladins-3.png'

const paladinIcons = [paladin1IconUrl, paladin1IconUrl, paladin2IconUrl, paladin3IconUrl]

export type PaladinsIconProps = {
  className?: string
}

export const PaladinsIcon = ({ className }: PaladinsIconProps) => {
  const paladinsStrength = useSelector(getPaladinsStrength)
  return <Image className={className} src={paladinIcons[Math.min(paladinsStrength, paladinIcons.length)]} size="8rem" />
}
