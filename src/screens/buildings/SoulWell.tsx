/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useDispatch } from 'react-redux'
import { useTranslation } from '../../lang/useTranslation'
import { BuildingType, Spell } from '../../config/constants'
import { getSoulWellSoulProduction } from '../../data/buildings/helpers'
import { addSpell } from '../../data/spells/actions'
import { BuildingDetails } from './components/BuildingDetails'

export const SoulWell = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const handleUpgrade = (level: number) => {
    if (level === 2) {
      dispatch(addSpell(Spell.SoulStorm))
    }
  }

  return (
    <BuildingDetails
      type={BuildingType.SoulWell}
      renderDescription={level => t('soulWellDescription', getSoulWellSoulProduction(level))}
      renderUpgradeDescription={level => {
        switch (level) {
          case 1:
            return t('soulWellUnlock', getSoulWellSoulProduction(level))
          case 2:
            return t('soulWellUpgradeStorm')
          default:
            return t('soulWellUpgrade', getSoulWellSoulProduction(level))
        }
      }}
      onUpgrade={handleUpgrade}
    />
  )
}
