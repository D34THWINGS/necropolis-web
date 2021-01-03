import React, { useState } from 'react'
import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import { SpellsButton } from '../../../components/header/SpellsButton'
import { SettingsButton } from '../../../components/header/SettingsButton'
import { buttonBase } from '../../../styles/buttons'
import { UndeadPortrait } from '../../../components/undeads/UndeadPortrait'
import { getAliveUndeads } from '../../../data/undeads/selectors'
import { UndeadDetailsModal } from '../../../components/undeads/UndeadDetailsModal'
import { Undead } from '../../../data/undeads/helpers'

const footer = css({
  display: 'flex',
  flexDirection: 'row-reverse',
  padding: '0.5rem',
})

const undeadList = css({
  display: 'flex',
  justifyContent: 'space-around',
  flex: 1,
})

export const ExpeditionsFooter = () => {
  const undeads = useSelector(getAliveUndeads)
  const [openedUndead, setOpenedUndead] = useState<Undead | null>(null)

  const handleOpenUndeadDetails = (undead: Undead) => () => setOpenedUndead(undead)
  const handleCloseDetails = () => setOpenedUndead(null)

  return (
    <div css={footer}>
      <SettingsButton />
      <SpellsButton />
      <div css={undeadList}>
        {undeads.map(undead => (
          <button key={undead.type} type="button" css={buttonBase} onClick={handleOpenUndeadDetails(undead)}>
            <UndeadPortrait type={undead.type} size="3rem" />
          </button>
        ))}
      </div>
      <UndeadDetailsModal undead={openedUndead} onClose={handleCloseDetails} showExpedition />
    </div>
  )
}
