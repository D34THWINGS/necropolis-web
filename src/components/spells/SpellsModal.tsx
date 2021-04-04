import React from 'react'
import { css } from '@emotion/react'
import { useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../ui/Modal/Modal'
import { ModalColor } from '../ui/Modal/modalStyles'
import { useTranslation } from '../../lang/useTranslation'
import { h2Title, textColor } from '../../styles/base'
import { ResourceType } from '../../config/constants'
import { castSpell } from '../../data/spells/actions'
import { getSouls } from '../../data/resources/selectors'
import { colors, frameColors, layers } from '../../config/theme'
import { canCast, canCastOnOssuary, Spell } from '../../data/spells/helpers'
import { useGetSpellDetails } from './useGetSpellDetails'
import { OSSUARY } from '../../config/routes'
import { ActionBox, buildingShopRowImage, buildingShopRowTitle } from '../ui/ActionBox'
import { ResourceIcon } from '../resources/ResourceIcon'
import coolDownIconUrl from '../../assets/images/icons/cooldown.png'
import { Image } from '../images/Image'
import { getPaladinsAssaultOngoing } from '../../data/paladins/selectors'
import { getIsInExpedition } from '../../data/expeditions/selectors'

const spellWrapper = css({ position: 'relative' })

const coolDownIcon = css({ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' })

export type SpellsModalProps = {
  spells: Spell[]
  isOpen: boolean
  onClose: () => void
}

export const SpellsModal = ({ spells, isOpen, onClose }: SpellsModalProps) => {
  const { t } = useTranslation()
  const souls = useSelector(getSouls)
  const dispatch = useDispatch()
  const isInExpedition = useSelector(getIsInExpedition)
  const isPaladinsAssaultOngoing = useSelector(getPaladinsAssaultOngoing)
  const getSpellDetails = useGetSpellDetails({ showAssault: isPaladinsAssaultOngoing, showExpedition: isInExpedition })
  const match = useRouteMatch(OSSUARY)

  const isOnOssuary = match && match.isExact

  const handleCastSpell = (spell: Spell) => () => {
    dispatch(castSpell(spell))
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} color={ModalColor.BLUE} priority={layers.SPELLS_MODAL}>
      <h2 css={h2Title}>{t('spells')}</h2>
      {spells.map(spell => {
        const spellDetails = getSpellDetails(spell)
        return (
          <div key={spell.key} css={spellWrapper}>
            <ActionBox
              leftCircleContent={<div css={buildingShopRowImage(spellDetails.imageUrl)} />}
              buttonContent={
                isOnOssuary && !canCastOnOssuary(spell) ? undefined : (
                  <ResourceIcon type={ResourceType.Souls} text={spell.cost} size="1.1rem" />
                )
              }
              disabledButton={!canCast(spell, souls)}
              disabled={spell.used}
              onClick={handleCastSpell(spell)}
              buttonColor={colors.LIGHT_BLUE}
              backgroundColor={colors.DARK_BLUE}
              borderColor={frameColors.DARK_BLUE}
              boxTestId="spellBox"
              buttonTestId="castSpellButton"
            >
              <h2 css={[buildingShopRowTitle, textColor('BLUE')]}>{spellDetails.label}</h2>
              <div>{spellDetails.description}</div>
            </ActionBox>
            {spell.used && <Image src={coolDownIconUrl} size="4rem" css={coolDownIcon} />}
          </div>
        )
      })}
    </Modal>
  )
}
