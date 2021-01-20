import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { css } from '@emotion/react'
import { getAliveUndeads } from '../../../data/undeads/selectors'
import { UndeadPortrait } from '../../../components/undeads/UndeadPortrait'
import { buttonBase } from '../../../styles/buttons'
import { breakpoints } from '../../../config/theme'
import { UndeadDetailsModal } from '../../../components/undeads/UndeadDetailsModal'
import { Undead } from '../../../data/undeads/helpers'
import coolDownIconUrl from '../../../assets/images/icons/cooldown.png'
import { Image } from '../../../components/images/Image'

const footerWrapper = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: '0.5rem 1rem',

  [breakpoints.SM]: {
    padding: '0.5rem 2rem',
  },
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

export const PaladinsAssaultFooter = () => {
  const undeads = useSelector(getAliveUndeads)
  const [openedUndead, setOpenedUndead] = useState<Undead | null>(null)

  const handleOpenUndeadDetails = (undead: Undead) => () => setOpenedUndead(undead)
  const handleCloseDetails = () => setOpenedUndead(null)

  return (
    <div css={footerWrapper}>
      {undeads.map(undead => (
        <span key={undead.type} css={portrait}>
          <button
            type="button"
            css={buttonBase}
            disabled={undead.ability.used}
            onClick={handleOpenUndeadDetails(undead)}
            data-test-id="undeadDetailsButton"
          >
            <UndeadPortrait type={undead.type} size="3rem" />
          </button>
          {undead.ability.used && <Image src={coolDownIconUrl} size="2.5rem" css={coolDownIcon} />}
        </span>
      ))}
      <UndeadDetailsModal undead={openedUndead} onClose={handleCloseDetails} showAssault />
    </div>
  )
}
