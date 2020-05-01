/** @jsx jsx */
import { jsx, ClassNames, css, SerializedStyles } from '@emotion/core'
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import ReactModal from 'react-modal'
import { blueRoundButton, cyanRoundButton, purpleRoundButton, redRoundButton } from '../../styles/buttons'
import { breakpoints, colors, shadows, transitions } from '../../config/theme'
import closeIconUrl from '../../assets/images/icons/close.png'
import { fadeIn, fadeOut, wobble } from '../../styles/animations'

export enum ModalColor {
  GREEN,
  PURPLE,
  BLUE,
  RED,
}

export const modalColorsMap: Record<ModalColor, [string, string]> = {
  [ModalColor.GREEN]: ['#448B84', '#1B655F'],
  [ModalColor.PURPLE]: ['#664991', '#3F216B'],
  [ModalColor.BLUE]: ['#457E8C', '#1C5766'],
  [ModalColor.RED]: ['#8C454E', '#661C25'],
}

const modalCloseButtonMap: Record<ModalColor, SerializedStyles[]> = {
  [ModalColor.GREEN]: cyanRoundButton,
  [ModalColor.PURPLE]: purpleRoundButton,
  [ModalColor.BLUE]: blueRoundButton,
  [ModalColor.RED]: redRoundButton,
}

const closeButton = css({
  position: 'absolute',
  top: '-0.5rem',
  right: '-0.5rem',
  padding: '0.3rem',
})

const closeIcon = css({
  display: 'block',
  width: '2rem',
})

const modalInner = (backgroundColor: string) =>
  css({
    padding: '1rem',
    overflowY: 'auto',
    maxHeight: '70vh',
    borderRadius: '10px',
    boxShadow: 'inset 0px 10px 0px rgba(0, 0, 0, 0.35), 0px 1px 1px rgba(255, 255, 255, 0.5)',
    backgroundColor,
    color: colors.WHITE,
    textShadow: shadows.TEXT_FLAT,

    [breakpoints.SM]: {
      maxHeight: '55vh',
    },
  })

export const useModalState = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState)
  return useMemo(
    () => ({
      isOpen,
      open: setIsOpen.bind(null, true),
      close: setIsOpen.bind(null, false),
      toggle: setIsOpen.bind(null, !isOpen),
    }),
    [isOpen, setIsOpen],
  )
}

export type ModalProps = {
  color?: ModalColor
  isOpen: boolean
  onClose?: () => void
  children: ReactNode
  priority?: number
}

export const Modal = ({ color = ModalColor.GREEN, isOpen, onClose, children, priority }: ModalProps) => {
  const lastContent = useRef(children)

  useEffect(() => {
    if (isOpen) {
      lastContent.current = children
    }
  }, [isOpen, children])

  return (
    <ClassNames>
      {({ css: scopedCss }) => (
        <ReactModal
          className={scopedCss({
            position: 'relative',
            outline: 0,
            border: '2px solid rgba(0, 0, 0, 0.5)',
            borderRadius: '15px',
            padding: '10px',
            width: '22rem',
            boxShadow: 'inset 0px 1px 1px rgba(255, 255, 255, 0.5)',
            background: modalColorsMap[color][0],
            ...(onClose
              ? undefined
              : {
                  animationName: wobble,
                  animationDelay: '50ms',
                  animationDuration: '200ms',
                  animationTimingFunction: 'ease-in-out',
                }),
          })}
          overlayClassName={scopedCss({
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: priority,
            animation: `${isOpen ? fadeIn : fadeOut} ${transitions.SLOW_DURATION}ms ${transitions.SLOW_EASING}`,

            [breakpoints.SM]: {
              alignItems: 'center',
            },
          })}
          isOpen={isOpen}
          onRequestClose={onClose}
          ariaHideApp={false}
          closeTimeoutMS={200}
        >
          <div css={modalInner(modalColorsMap[color][1])}>{isOpen ? children : lastContent.current}</div>
          {onClose && (
            <button css={[...modalCloseButtonMap[color], closeButton]} onClick={onClose} type="button">
              <img css={closeIcon} src={closeIconUrl} alt="" />
            </button>
          )}
        </ReactModal>
      )}
    </ClassNames>
  )
}
