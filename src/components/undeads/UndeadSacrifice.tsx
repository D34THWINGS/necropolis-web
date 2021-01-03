import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../ui/Modal/Modal'
import { ModalColor } from '../ui/Modal/modalStyles'
import { getAliveUndeads, getRequiredSacrifices } from '../../data/undeads/selectors'
import { h2Title } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import { UndeadBox } from './UndeadBox'
import { sacrificeUndead } from '../../data/undeads/actions'
import { isUndeadAlive, Undead } from '../../data/undeads/helpers'
import { layers } from '../../config/theme'

export const UndeadSacrifice = () => {
  const { t } = useTranslation()
  const requiredSacrifices = useSelector(getRequiredSacrifices)
  const undeads = useSelector(getAliveUndeads)
  const dispatch = useDispatch()

  const handleSacrifice = (undeadId: Undead['id']) => () => dispatch(sacrificeUndead(undeadId))

  return (
    <Modal isOpen={requiredSacrifices > 0} color={ModalColor.PURPLE} priority={layers.SACRIFICE}>
      <h2 css={h2Title}>{t('sacrificeRequiredTitle')}</h2>
      <p>{t('sacrificeRequiredDescription', requiredSacrifices)}</p>
      {undeads.map(undead => (
        <UndeadBox
          key={undead.id}
          undead={undead}
          onClick={isUndeadAlive(undead) ? handleSacrifice(undead.id) : undefined}
          renderConfirmText={name => t('confirmUndeadSacrifice', name)}
        />
      ))}
    </Modal>
  )
}
