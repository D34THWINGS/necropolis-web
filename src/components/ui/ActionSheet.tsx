import React, { ReactNode } from 'react'
import { css } from '@emotion/react'
import { useOutsideClickHandler } from '../../hooks/useOutsideClickHandler'
import { transitions } from '../../config/theme'

const actionSheetWrapper = (isOpen: boolean) =>
  css({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
    transition: `transform ${transitions.FAST}`,

    '&::before': {
      display: 'block',
      content: '" "',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '10rem',
      transform: isOpen ? 'translateY(-100%)' : 'translateY(-100%) scaleY(0.1)',
      transformOrigin: 'bottom center',
      background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)',
      opacity: isOpen ? 1 : 0,
      transition: `opacity ${transitions.FAST}, transform ${transitions.FAST}`,
      pointerEvents: 'none',
    },
  })

type ActionSheetProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const ActionSheet = ({ isOpen, onClose, children }: ActionSheetProps) => {
  const ref = useOutsideClickHandler<HTMLDivElement>(onClose)

  return (
    <div ref={ref} css={actionSheetWrapper(isOpen)}>
      {children}
    </div>
  )
}
