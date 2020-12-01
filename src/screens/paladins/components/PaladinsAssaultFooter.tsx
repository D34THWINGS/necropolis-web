import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { css } from '@emotion/react'
import { getUndeads } from '../../../data/undeads/selectors'
import { UndeadPortrait } from '../../../components/undeads/UndeadPortrait'
import { buttonBase } from '../../../styles/buttons'
import { breakpoints } from '../../../config/theme'
import { UndeadDetailsModal } from './UndeadDetailsModal'
import { Undead } from '../../../data/undeads/helpers'

const footerWrapper = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: '0.5rem 1rem',

  [breakpoints.SM]: {
    padding: '0.5rem 2rem',
  },
})

export const PaladinsAssaultFooter = () => {
  const undeads = useSelector(getUndeads)
  const [openedUndead, setOpenedUndead] = useState<Undead | null>(null)

  const handleOpenUndeadDetails = (undead: Undead) => () => setOpenedUndead(undead)
  const handleCloseDetails = () => setOpenedUndead(null)

  return (
    <div css={footerWrapper}>
      {undeads.map(undead => (
        <button key={undead.type} type="button" css={buttonBase} onClick={handleOpenUndeadDetails(undead)}>
          <UndeadPortrait type={undead.type} size="3rem" />
        </button>
      ))}
      <UndeadDetailsModal undead={openedUndead} onClose={handleCloseDetails} />
    </div>
  )
}
