/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from '../../lang/useTranslation'
import researchIconUrl from '../../assets/images/icons/research.png'
import lockIconUrl from '../../assets/images/icons/lock.png'
import { buildingSpecialActionButton } from './helpers/buildingsStyles'
import { BuildingType, OSSUARY_BONES_COST } from '../../config/constants'
import { getBones } from '../../data/resources/selectors'
import {
  getOssuaryBonesCost,
  getOssuaryUpgradeBonusBones,
  getOssuaryUpgradeBonusMeat,
} from '../../data/buildings/helpers'
import { Image } from '../../components/images/Image'
import { discoverSpell } from '../../data/spells/actions'
import { getHasDiscoverableSpells } from '../../data/spells/selectors'
import { BuildingDetails } from './components/BuildingDetails'

export const Ossuary = () => {
  const { t } = useTranslation()
  const bones = useSelector(getBones)
  const hasDiscoverableSpells = useSelector(getHasDiscoverableSpells)
  const dispatch = useDispatch()
  const handleDiscoverSpell = () => dispatch(discoverSpell())

  return (
    <BuildingDetails
      type={BuildingType.Ossuary}
      renderDescription={level => t('ossuaryDescription', OSSUARY_BONES_COST[level])}
      renderUpgradeDescription={level =>
        level === 1
          ? t('ossuaryUnlock')
          : t('ossuaryUpgrade', getOssuaryUpgradeBonusMeat(level), getOssuaryUpgradeBonusBones(level))
      }
      renderSpecialAction={(level, isCollapsed) => (
        <button
          type="button"
          disabled={getOssuaryBonesCost(level) > bones || level === 0 || !hasDiscoverableSpells || isCollapsed}
          css={buildingSpecialActionButton}
          onClick={handleDiscoverSpell}
        >
          {level === 0 && <Image src={lockIconUrl} size="3rem" />}
          {level > 0 && <Image src={researchIconUrl} size="3rem" />}
        </button>
      )}
    />
  )
}
