import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from '../../lang/useTranslation'
import researchIconUrl from '../../assets/images/icons/research.png'
import lockIconUrl from '../../assets/images/icons/lock.png'
import { BuildingType, OSSUARY_BONES_COST, ResourceType } from '../../config/constants'
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
import { BuildingAction } from './components/BuildingAction'
import { ResourceIcon } from '../../components/resources/ResourceIcon'

export const Ossuary = () => {
  const { t } = useTranslation()
  const bones = useSelector(getBones)
  const hasDiscoverableSpells = useSelector(getHasDiscoverableSpells)
  const dispatch = useDispatch()
  const handleDiscoverSpell = () => dispatch(discoverSpell())

  return (
    <BuildingDetails
      type={BuildingType.Ossuary}
      renderSpecialAction={(level, isCollapsed) =>
        level === 0 ? null : (
          <BuildingAction
            disabled={getOssuaryBonesCost(level) > bones || level === 0 || !hasDiscoverableSpells || isCollapsed}
            action={
              isCollapsed ? <Image src={lockIconUrl} size="2.5rem" /> : <Image src={researchIconUrl} size="2.5rem" />
            }
            onClick={handleDiscoverSpell}
          >
            {t('ossuaryDescription')}
            <br />
            {t('cost')}&nbsp;
            <ResourceIcon type={ResourceType.Bones} text={OSSUARY_BONES_COST[level]} />
          </BuildingAction>
        )
      }
      renderUpgradeDescription={level =>
        level === 1
          ? t('ossuaryUnlock')
          : t('ossuaryUpgrade', getOssuaryUpgradeBonusMeat(level), getOssuaryUpgradeBonusBones(level))
      }
    />
  )
}
