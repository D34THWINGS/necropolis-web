import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { css, SerializedStyles } from '@emotion/react'
import ReactModal from 'react-modal'
import { blueRoundButton, cyanRoundButton, purpleRoundButton, redRoundButton } from '../../../styles/buttons'
import closeIconUrl from '../../../assets/images/icons/close.png'
import { ModalAlignment, modalCloseButton, modalCloseIcon, ModalColor, modalOverlay } from './modalStyles'
import { FrameColor, FrameInner, FrameWrapper } from '../Frame'
import { wobbleOnAppearing } from '../../../styles/animations'

const modalCloseButtonMap: Record<ModalColor, SerializedStyles[]> = {
  [ModalColor.GREEN]: cyanRoundButton,
  [ModalColor.PURPLE]: purpleRoundButton,
  [ModalColor.BLUE]: blueRoundButton,
  [ModalColor.RED]: redRoundButton,
}

const modalColorsMap: Record<ModalColor, FrameColor> = {
  [ModalColor.BLUE]: FrameColor.BLUE,
  [ModalColor.GREEN]: FrameColor.GREEN,
  [ModalColor.PURPLE]: FrameColor.PURPLE,
  [ModalColor.RED]: FrameColor.RED,
}

const modalPanelWrapper = css({
  outline: 'none',
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
  className?: string
  color?: ModalColor
  isOpen: boolean
  onClose?: () => void
  children: ReactNode
  priority?: number
  noWobble?: boolean
  align?: ModalAlignment
}

export const Modal = ({
  className,
  color = ModalColor.GREEN,
  isOpen,
  onClose,
  children,
  priority,
  noWobble,
  align,
}: ModalProps) => {
  const lastContent = useRef(children)

  useEffect(() => {
    if (isOpen) {
      lastContent.current = children
    }
  }, [isOpen, children])

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      closeTimeoutMS={200}
      overlayElement={({ className: _, style, ...overlayProps }, overlayChildren) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <div {...overlayProps} css={modalOverlay(isOpen, priority, align)}>
          {overlayChildren}
        </div>
      )}
      contentElement={({ ref, className: _, style, ...contentProps }, contentChildren) => (
        <FrameWrapper
          ref={ref}
          color={modalColorsMap[color]}
          css={noWobble ? [modalPanelWrapper] : [modalPanelWrapper, wobbleOnAppearing]}
          otherProps={contentProps}
        >
          {contentChildren}
        </FrameWrapper>
      )}
    >
      <FrameInner color={modalColorsMap[color]} className={className}>
        {isOpen ? children : lastContent.current}
      </FrameInner>
      {onClose && (
        <button
          css={[...modalCloseButtonMap[color], modalCloseButton]}
          onClick={onClose}
          type="button"
          data-test-id="modalCloseButton"
        >
          <img css={modalCloseIcon} src={closeIconUrl} alt="" />
        </button>
      )}
    </ReactModal>
  )
}
