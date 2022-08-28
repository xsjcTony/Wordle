import ReactModal from 'react-modal'
import styles from './index.module.scss'
import type { PropsWithChildren } from 'react'
import type { Props } from 'react-modal'


interface ModalProps {
  isOpen: boolean
  closeModalHandler: () => void
  modalProps?: Omit<Props, 'isOpen' | 'onRequestClose'>
}


const Modal = ({
  isOpen,
  closeModalHandler,
  modalProps = void 0,
  children = void 0
}: PropsWithChildren<ModalProps>): JSX.Element => (
  <ReactModal
    className={styles.modal}
    isOpen={isOpen}
    overlayClassName={styles.modalOverlay}
    onRequestClose={closeModalHandler}
    {...modalProps}
  >
    {children}
  </ReactModal>
)

export default Modal
