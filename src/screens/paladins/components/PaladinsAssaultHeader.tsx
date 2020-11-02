import React from 'react'
import { css } from '@emotion/core'
import { useSelector } from 'react-redux'
import { SettingsButton } from '../../../components/header/SettingsButton'
import { SpellsButton } from '../../../components/header/SpellsButton'
import { PaladinsAssaultPhase, ResourceType } from '../../../config/constants'
import { ResourceButton } from '../../../components/resources/ResourceButton'
import { getSouls } from '../../../data/resources/selectors'
import { buttonBase } from '../../../styles/buttons'
import { Image } from '../../../components/images/Image'
import assaultInfoIcon from '../../../assets/images/paladins/assault-info.png'

const headerWrapper = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.5rem 1rem',
})

const headerRight = css({
  display: 'flex',
  alignItems: 'center',
})

const buttonSpacing = css({
  marginLeft: '0.5rem',
})

export type PaladinsAssaultHeaderProps = {
  assaultPhase: PaladinsAssaultPhase
}

export const PaladinsAssaultHeader = ({ assaultPhase }: PaladinsAssaultHeaderProps) => {
  const souls = useSelector(getSouls)

  return (
    <div css={headerWrapper}>
      {(assaultPhase === PaladinsAssaultPhase.Preparing || assaultPhase === PaladinsAssaultPhase.Fighting) && (
        <button css={buttonBase} type="button">
          <Image block src={assaultInfoIcon} size="3.5rem" />
        </button>
      )}
      <div css={headerRight}>
        <ResourceButton type={ResourceType.Souls} color="#83B9D6" text={souls} />
        <SpellsButton css={buttonSpacing} />
        <SettingsButton css={buttonSpacing} />
      </div>
    </div>
  )
}
