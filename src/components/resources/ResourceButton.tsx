import React, { forwardRef, ReactNode } from 'react'
import { css } from '@emotion/react'
import darken from 'polished/lib/color/darken'
import { resetButton } from '../../styles/buttons'
import { breakpoints, colors, shadows } from '../../config/theme'
import { ResourceType } from '../../config/constants'
import { useResourcesModalControls } from './useResourcesModalControls'
import { ResourceIcon } from './ResourceIcon'

const resourceIconButton = (backgroundColor: string) => [
  resetButton,
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    margin: '0.7rem 0.3rem 0.7rem 1.3rem',
    border: `2px solid ${darken(0.3, backgroundColor)}`,
    borderRadius: '26px',
    padding: '0.2rem 0.5rem 0.2rem 0',
    width: '3rem',
    flex: '0 0 auto',
    backgroundColor,
    boxSizing: 'border-box',
    boxShadow: `inset 0px -8px 0px ${darken(0.12, backgroundColor)}`,
    textAlign: 'right',
    fontSize: '1.3rem',
    lineHeight: '1',
    color: colors.WHITE,
    textShadow: shadows.TEXT,

    [breakpoints.SM]: {
      margin: '0.7rem 0.7rem 0.7rem 1.6rem',
      width: '4rem',
    },
  }),
]

const resourceIcon = css({
  position: 'absolute',
  left: 0,
  width: '2.5rem',
  transform: 'translateX(-50%)',

  [breakpoints.SM]: {
    width: '3rem',
  },
})

export type TalentButtonProps = {
  type: ResourceType
  color: string
  text: ReactNode
  className?: string
}

export const ResourceButton = forwardRef<HTMLButtonElement, TalentButtonProps>(
  ({ type, text, className, color }: TalentButtonProps, ref) => {
    const { open } = useResourcesModalControls()
    return (
      <button
        ref={ref}
        type="button"
        className={className}
        css={resourceIconButton(color)}
        onClick={open}
        data-test-id={`${type}Counter`}
      >
        <ResourceIcon css={resourceIcon} type={type} marginLeft="0.2rem" marginRight="0.2rem" />
        {text}
      </button>
    )
  },
)
