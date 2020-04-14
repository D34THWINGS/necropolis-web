/** @jsx jsx */
import ReactModal from 'react-modal'
import { jsx, ClassNames, css } from '@emotion/core'
import { Panel } from './Panel'
import { cyanRoundButton } from '../../styles/buttons'
import { ReactNode, useMemo, useState } from 'react'

const closeButton = [
  ...cyanRoundButton,
  css({
    position: 'absolute',
    top: 0,
    right: '-0.5rem',
  }),
]

const modalPanel = css({
  minWidth: '15rem',
  maxWidth: '20rem',
  borderWidth: 35,
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
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <ClassNames>
      {({ css }) => (
        <ReactModal
          className={css({
            position: 'relative',
            outline: 0,
          })}
          overlayClassName={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          })}
          isOpen={isOpen}
          onRequestClose={onClose}
          ariaHideApp={false}
        >
          <Panel css={modalPanel}>{children}</Panel>
          <button css={closeButton} onClick={onClose} />
        </ReactModal>
      )}
    </ClassNames>
  )
}
