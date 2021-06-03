import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { css } from '@emotion/react'
import { ActionSheet } from '../../../components/ui/ActionSheet'
import { useModalState } from '../../../components/ui/Modal/Modal'
import { Frame, FrameColor } from '../../../components/ui/Frame'
import { getAliveUndeads } from '../../../data/undeads/selectors'
import { buttonBase } from '../../../styles/buttons'
import { UndeadPortrait } from '../../../components/undeads/UndeadPortrait'
import { frameColors } from '../../../config/theme'
import { UndeadDetails } from '../../../components/undeads/UndeadDetails'
import { Image } from '../../../components/images/Image'
import spellsIconUrl from '../../../assets/images/resources/souls.png'
import inventoryIconUrl from '../../../assets/images/expeditions/inventory.png'
import { UndeadId } from '../../../data/undeads/helpers'
import { useTranslation } from '../../../lang/useTranslation'
import { getLearntSpells } from '../../../data/spells/selectors'
import { useGetSpellDetails } from '../../../components/spells/useGetSpellDetails'
import { SpellBox } from '../../../components/spells/SpellBox'
import { addUndeadToObstacle } from '../../../data/expeditions/actions'

const tabsList = css({
  display: 'flex',
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '0 1.5rem',
  width: '100%',
  transform: 'translateY(-100%)',
})

const baseTab = [
  ...buttonBase,
  css({
    marginRight: '0.5rem',
    border: '2px solid rgba(0, 0, 0, 0.5)',
    borderBottom: 'none',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
    width: '4rem',
    height: '2.5rem',
  }),
]

const undeadTab = [
  ...baseTab,
  css({
    backgroundColor: frameColors.PURPLE,
  }),
]

const spellsTab = [
  ...baseTab,
  css({
    backgroundColor: frameColors.BLUE,
  }),
]

const inventoryTab = [
  ...baseTab,
  css({
    backgroundColor: frameColors.DARK_BROWN,
  }),
]

const tabBody = css({
  alignItems: 'stretch',
  padding: '1rem 2rem',
})

enum TabType {
  Undead = 'undead',
  Inventory = 'inventory',
  Spells = 'spells',
}

type Tab = { type: TabType.Undead; undeadId: UndeadId } | { type: TabType.Inventory } | { type: TabType.Spells }

export const ExpeditionActionSheet = () => {
  const { t } = useTranslation()
  const { isOpen, close, open } = useModalState()
  const [selectedTab, setSelectedTab] = useState<Tab | null>(null)
  const undeads = useSelector(getAliveUndeads)
  const spells = useSelector(getLearntSpells)
  const getSpellDetails = useGetSpellDetails({ showExpedition: true })
  const dispatch = useDispatch()

  const selectedUndead =
    selectedTab?.type === TabType.Undead && undeads.find(undead => undead.id === selectedTab.undeadId)

  const handleUndeadTabClick = (undeadId: string) => () => {
    setSelectedTab({ type: TabType.Undead, undeadId })
    open()
  }

  const handleOpenTab = (type: TabType.Spells | TabType.Inventory) => () => {
    setSelectedTab({ type })
    open()
  }

  const handleRollDices = (undeadId: string) => () => {
    dispatch(addUndeadToObstacle(undeadId))
    close()
  }

  const getFrameColor = () => {
    if (!selectedTab) {
      return FrameColor.GREEN
    }
    switch (selectedTab.type) {
      case TabType.Undead:
        return FrameColor.PURPLE
      case TabType.Inventory:
        return FrameColor.BROWN
      case TabType.Spells:
        return FrameColor.BLUE
    }
  }

  return (
    <ActionSheet isOpen={isOpen} onClose={close}>
      <nav css={tabsList}>
        {undeads.map(undead => (
          <button
            key={undead.id}
            type="button"
            css={undeadTab}
            onClick={handleUndeadTabClick(undead.id)}
            data-test-id="undeadTab"
          >
            <UndeadPortrait type={undead.type} size="1.3rem" />
          </button>
        ))}
        <button type="button" css={inventoryTab} onClick={handleOpenTab(TabType.Inventory)}>
          <Image src={inventoryIconUrl} size="1.8rem" />
        </button>
        <button type="button" css={spellsTab} onClick={handleOpenTab(TabType.Spells)}>
          <Image src={spellsIconUrl} size="1.5rem" />
        </button>
      </nav>
      <Frame color={getFrameColor()} fullPage css={tabBody}>
        {selectedUndead && (
          <UndeadDetails
            undead={selectedUndead}
            onCastAbility={close}
            onRollDices={handleRollDices(selectedUndead.id)}
            showExpedition
          />
        )}
        {selectedTab?.type === TabType.Inventory && <span>{t('inventoryEmpty')}</span>}
        {selectedTab?.type === TabType.Spells &&
          spells.map(spell => {
            const spellDetails = getSpellDetails(spell)
            return (
              <SpellBox
                key={spell.key}
                imageUrl={spellDetails.imageUrl}
                label={spellDetails.label}
                description={spellDetails.description}
                soulCost={spell.cost}
              />
            )
          })}
      </Frame>
    </ActionSheet>
  )
}
