import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getUndeads } from '../../../data/undeads/selectors'
import { Modal, ModalColor, useModalState } from '../../../components/ui/Modal'
import { h2Title, smallMarginTop } from '../../../styles/base'
import { UndeadBox } from '../../../components/undeads/UndeadBox'
import { useTranslation } from '../../../lang/useTranslation'
import { Undead } from '../../../data/undeads/helpers'
import { darkPurpleSquareButton } from '../../../styles/buttons'

export const ReanimatedUndeadModal = () => {
  const { t } = useTranslation()
  const { isOpen, open, close } = useModalState()
  const undeads = useSelector(getUndeads)
  const previousUndeadsRef = useRef(undeads)
  const newUndeadRef = useRef<Undead | null>(null)

  useEffect(() => {
    const newSpell = undeads.find(undead => undead.raised && !previousUndeadsRef.current.includes(undead))
    if (newSpell !== undefined) {
      newUndeadRef.current = newSpell
      open()
    }
    previousUndeadsRef.current = undeads
  }, [undeads, open])

  return (
    <Modal color={ModalColor.PURPLE} isOpen={isOpen}>
      <h2 css={h2Title}>{t('reanimatedUndeadTitle')}</h2>
      {newUndeadRef.current && <UndeadBox undead={newUndeadRef.current} />}
      <button type="button" css={[...darkPurpleSquareButton, smallMarginTop]} onClick={close}>
        {t('reanimatedUndeadOk')}
      </button>
    </Modal>
  )
}
