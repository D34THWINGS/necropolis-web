import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../ui/Modal/Modal'
import { ModalColor } from '../ui/Modal/modalStyles'
import { useTranslation } from '../../lang/useTranslation'
import { h2Title } from '../../styles/base'
import { PaladinsAssaultPhase } from '../../config/constants'
import { castSpell } from '../../data/spells/actions'
import { SpellBox } from './SpellBox'
import { getSouls } from '../../data/resources/selectors'
import { layers } from '../../config/theme'
import {
  canCast,
  canCastInAssaultFight,
  canCastInExpeditions,
  canCastInPaladinsReveal,
  canCastOnOssuary,
  Spell,
} from '../../data/spells/helpers'
import { getLearntSpells } from '../../data/spells/selectors'
import { useGetSpellDetails } from './useGetSpellDetails'
import { getPaladinsAssaultPhase } from '../../data/paladins/selectors'
import { getIsInExpedition } from '../../data/expeditions/selectors'
import { OSSUARY } from '../../config/routes'

export type SpellsModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const SpellsModal = ({ isOpen, onClose }: SpellsModalProps) => {
  const { t } = useTranslation()
  const souls = useSelector(getSouls)
  const spells = useSelector(getLearntSpells)
  const dispatch = useDispatch()
  const getSpellDetails = useGetSpellDetails()
  const assaultPhase = useSelector(getPaladinsAssaultPhase)
  const isInExpedition = useSelector(getIsInExpedition)
  const match = useRouteMatch(OSSUARY)

  const isOnOssuary = match && match.isExact

  const handleCastSpell = (spell: Spell) => () => {
    dispatch(castSpell(spell))
    onClose()
  }

  const getCanCastSpell = (spell: Spell) => {
    if (assaultPhase === PaladinsAssaultPhase.Revealing && canCastInPaladinsReveal(spell)) {
      return true
    }
    if (assaultPhase === PaladinsAssaultPhase.Fighting && canCastInAssaultFight(spell)) {
      return true
    }
    if (isInExpedition && canCastInExpeditions(spell)) {
      return true
    }
    if (isOnOssuary && canCastOnOssuary(spell)) {
      return true
    }
    return false
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} color={ModalColor.BLUE} priority={layers.SPELLS_MODAL}>
      <h2 css={h2Title}>{t('spells')}</h2>
      {spells.map(spell => {
        const spellDetails = getSpellDetails(spell)
        return (
          <SpellBox
            key={spell.key}
            imageUrl={spellDetails.imageUrl}
            label={spellDetails.label}
            description={spellDetails.description}
            soulCost={spell.cost}
            disabled={!canCast(spell, souls)}
            onClick={getCanCastSpell(spell) ? handleCastSpell(spell) : undefined}
          />
        )
      })}
    </Modal>
  )
}
