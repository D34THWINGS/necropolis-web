/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from '../../lang/useTranslation'
import reanimateIconUrl from '../../assets/images/icons/reanimate.png'
import lockIconUrl from '../../assets/images/icons/lock.png'
import { BuildingType, ResourceType } from '../../config/constants'
import { getSouls } from '../../data/resources/selectors'
import { getMaxUndeadRaising, getRaiseUndeadSoulCost } from '../../data/buildings/helpers'
import { getRaisedUndeadCount } from '../../data/undeads/selectors'
import { Image } from '../../components/images/Image'
import { raiseUndead } from '../../data/undeads/actions'
import { BuildingDetails } from './components/BuildingDetails'
import { BuildingAction } from './components/BuildingAction'
import { ResourceIcon } from '../../components/images/ResourceIcon'

export const Catacombs = () => {
  const { t } = useTranslation()
  const raisedUndead = useSelector(getRaisedUndeadCount)
  const souls = useSelector(getSouls)
  const dispatch = useDispatch()
  const handleRaiseUndead = () => dispatch(raiseUndead())

  return (
    <BuildingDetails
      type={BuildingType.Catacombs}
      renderSpecialAction={(level, isCollapsed) =>
        level === 0 ? null : (
          <BuildingAction
            onClick={handleRaiseUndead}
            disabled={
              level === 0 ||
              getRaiseUndeadSoulCost(level) > souls ||
              raisedUndead >= getMaxUndeadRaising(level) ||
              isCollapsed
            }
            action={
              isCollapsed ? <Image src={lockIconUrl} size="2.5rem" /> : <Image src={reanimateIconUrl} size="2.5rem" />
            }
          >
            {t('catacombDescription', raisedUndead, getMaxUndeadRaising(level))}
            <br />
            {t('cost')}&nbsp;
            <ResourceIcon type={ResourceType.Souls} text={getRaiseUndeadSoulCost(level)} />
          </BuildingAction>
        )
      }
      renderUpgradeDescription={level =>
        level === 1 ? t('catacombUnlock') : t('catacombUpgrade', getMaxUndeadRaising(level))
      }
    />
  )
}
