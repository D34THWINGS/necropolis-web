/** @jsx jsx */
import { jsx, ClassNames, SerializedStyles } from '@emotion/core'
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import ReactModal from 'react-modal'
import { blueRoundButton, cyanRoundButton, purpleRoundButton, redRoundButton } from '../../../styles/buttons'
import closeIconUrl from '../../../assets/images/icons/close.png'
import { modalCloseButton, modalCloseIcon, ModalColor, modalInner, modalOverlay, modalPanel } from './modalStyles'

const modalCloseButtonMap: Record<ModalColor, SerializedStyles[]> = {
  [ModalColor.GREEN]: cyanRoundButton,
  [ModalColor.PURPLE]: purpleRoundButton,
  [ModalColor.BLUE]: blueRoundButton,
  [ModalColor.RED]: redRoundButton,
}

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
  noWobble?: boolean
}

export const Modal = ({ color = ModalColor.GREEN, isOpen, onClose, children, priority, noWobble }: ModalProps) => {
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
          className={scopedCss(modalPanel(color, !onClose && !noWobble))}
          overlayClassName={scopedCss(modalOverlay(isOpen, priority))}
          isOpen={isOpen}
          onRequestClose={onClose}
          ariaHideApp={false}
          closeTimeoutMS={200}
        >
          <div css={modalInner(color)}>{isOpen ? children : lastContent.current}</div>
          {onClose && (
            <button css={[...modalCloseButtonMap[color], modalCloseButton]} onClick={onClose} type="button">
              <img css={modalCloseIcon} src={closeIconUrl} alt="" />
            </button>
          )}
        </ReactModal>
      )}
    </ClassNames>
  )
}