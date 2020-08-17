/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from '../../lang/useTranslation'
import reanimateIconUrl from '../../assets/images/icons/reanimate.png'
import lockIconUrl from '../../assets/images/icons/lock.png'
import { BuildingType, ResourceType } from '../../config/constants'
import { getSouls } from '../../data/resources/selectors'
import { getMaxUndeadRaising, getRaiseUndeadSoulCost } from '../../data/buildings/helpers'
import { getRaisableUndeadTypes, getRaisedUndeadCount } from '../../data/undeads/selectors'
import { Image } from '../../components/images/Image'
import { BuildingDetails } from './components/BuildingDetails'
import { BuildingAction } from './components/BuildingAction'
import { ResourceIcon } from '../../components/resources/ResourceIcon'
import { ReanimatedUndeadModal } from './components/ReanimatedUndeadModal'
import { useModalState } from '../../components/ui/Modal/Modal'
import { createUndead, Undead } from '../../data/undeads/helpers'
import { raiseUndead } from '../../data/undeads/actions'

export const Catacombs = () => {
  const { t } = useTranslation()
  const raisedUndead = useSelector(getRaisedUndeadCount)
  const souls = useSelector(getSouls)
  const types = useSelector(getRaisableUndeadTypes)
  const dispatch = useDispatch()
  const raisedUndeadRef = useRef<Undead | null>(null)
  const { isOpen, open, close } = useModalState()

  const handleRaiseUndead = () => {
    raisedUndeadRef.current = createUndead(types[Math.round(Math.random() * (types.length - 1))], true)
    open()
  }

  const handleAcknowledge = () => {
    if (raisedUndeadRef.current) {
      dispatch(raiseUndead(raisedUndeadRef.current))
    }
    close()
  }

  return (
    <BuildingDetails
      type={BuildingType.Catacombs}
      renderSpecialAction={(level, isCollapsed) =>
        level === 0 ? null : (
          <Fragment>
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
            <ReanimatedUndeadModal isOpen={isOpen} onAcknowledge={handleAcknowledge} undead={raisedUndeadRef.current} />
          </Fragment>
        )
      }
      renderUpgradeDescription={level =>
        level === 1 ? t('catacombUnlock') : t('catacombUpgrade', getMaxUndeadRaising(level))
      }
    />
  )
}
