/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../ui/Modal/Modal'
import { ModalColor } from '../ui/Modal/modalStyles'
import { getRequiredSacrifices, getUndeads } from '../../data/undeads/selectors'
import { h2Title } from '../../styles/base'
import { useTranslation } from '../../lang/useTranslation'
import { UndeadBox } from './UndeadBox'
import { killUndead } from '../../data/undeads/actions'
import { UndeadType } from '../../config/constants'
import { layers } from '../../config/theme'

export const UndeadSacrifice = () => {
  const { t } = useTranslation()
  const requiredSacrifices = useSelector(getRequiredSacrifices)
  const undeads = useSelector(getUndeads)
  const dispatch = useDispatch()

  const handleBan = (type: UndeadType) => () => dispatch(killUndead(type))

  return (
    <Modal isOpen={requiredSacrifices > 0} color={ModalColor.PURPLE} priority={layers.SACRIFICE}>
      <h2 css={h2Title}>{t('sacrificeRequiredTitle')}</h2>
      <p>{t('sacrificeRequiredDescription', requiredSacrifices)}</p>
      {undeads.map(undead => (
        <UndeadBox key={undead.type} undead={undead} onBan={handleBan(undead.type)} />
      ))}
    </Modal>
  )
}
