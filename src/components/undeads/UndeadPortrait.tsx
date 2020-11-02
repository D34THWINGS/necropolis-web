import React from 'react'
import { UndeadType } from '../../config/constants'
import valetIconUrl from '../../assets/images/undeads/valet.png'
import brikolerIconUrl from '../../assets/images/undeads/brikoler.png'
import laMotteIconUrl from '../../assets/images/undeads/la-motte.png'
import skeletonIconUrl from '../../assets/images/undeads/skeleton.png'
import bloodPrinceIconUrl from '../../assets/images/undeads/blood-prince.png'
import { Image } from '../images/Image'

const undeadIconMap: Record<UndeadType, string> = {
  [UndeadType.Valet]: valetIconUrl,
  [UndeadType.Brikoler]: brikolerIconUrl,
  [UndeadType.LaMotte]: laMotteIconUrl,
  [UndeadType.Skeleton]: skeletonIconUrl,
  [UndeadType.BloodPrince]: bloodPrinceIconUrl,
}

export type UndeadPortraitProps = {
  type: UndeadType
  className?: string
  marginRight?: string
  size?: string
}

export const UndeadPortrait = ({ type, size = '4rem', className, marginRight }: UndeadPortraitProps) => (
  <Image src={undeadIconMap[type]} size={size} className={className} marginRight={marginRight} />
)
