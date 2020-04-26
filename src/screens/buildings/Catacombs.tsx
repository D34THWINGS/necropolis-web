/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from '../../lang/useTranslation'
import reanimateIconUrl from '../../assets/images/icons/reanimate.png'
import lockIconUrl from '../../assets/images/icons/lock.png'
import { buildingSpecialActionButton } from './helpers/buildingsStyles'
import { BuildingType } from '../../config/constants'
import { getSouls } from '../../data/resources/selectors'
import { getMaxUndeadRaising, getRaiseUndeadSoulCost } from '../../data/buildings/helpers'
import { getRaisedUndeadCount } from '../../data/undeads/selectors'
import { Image } from '../../components/images/Image'
import { raiseUndead } from '../../data/undeads/actions'
import { BuildingDetails } from './components/BuildingDetails'

export const Catacombs = () => {
  const { t } = useTranslation()
  const raisedUndead = useSelector(getRaisedUndeadCount)
  const souls = useSelector(getSouls)
  const dispatch = useDispatch()
  const handleRaiseUndead = () => dispatch(raiseUndead())

  return (
    <BuildingDetails
      type={BuildingType.Catacombs}
      renderDescription={level =>
        t('catacombDescription', raisedUndead, getMaxUndeadRaising(level), getRaiseUndeadSoulCost(level))
      }
      renderUpgradeDescription={level =>
        level === 1 ? t('catacombUnlock') : t('catacombUpgrade', getMaxUndeadRaising(level))
      }
      renderSpecialAction={(level, isCollapsed) => (
        <button
          type="button"
          disabled={
            level === 0 ||
            getRaiseUndeadSoulCost(level) > souls ||
            raisedUndead >= getMaxUndeadRaising(level) ||
            isCollapsed
          }
          css={buildingSpecialActionButton}
          onClick={handleRaiseUndead}
        >
          {level === 0 && <Image src={lockIconUrl} size="3rem" />}
          {level > 0 && <Image src={reanimateIconUrl} size="3rem" />}
        </button>
      )}
    />
  )
}
