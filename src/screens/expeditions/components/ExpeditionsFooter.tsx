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
import { Image } from '../../../components/images/Image'
import coolDownIconUrl from '../../../assets/images/icons/cooldown.png'

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

const portrait = css({
  position: 'relative',
})

const coolDownIcon = css({
  position: 'absolute',
  bottom: 0,
  right: 0,
  transform: 'translateX(40%)',
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
          <span key={undead.type} css={portrait}>
            <button
              key={undead.type}
              type="button"
              css={buttonBase}
              disabled={undead.ability.used}
              onClick={handleOpenUndeadDetails(undead)}
            >
              <UndeadPortrait type={undead.type} size="3rem" />
            </button>
            {undead.ability.used && <Image src={coolDownIconUrl} size="2.5rem" css={coolDownIcon} />}
          </span>
        ))}
      </div>
      <UndeadDetailsModal undead={openedUndead} onClose={handleCloseDetails} showExpedition />
    </div>
  )
}
