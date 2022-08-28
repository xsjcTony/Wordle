import ReactModal from 'react-modal'
import styles from './index.module.scss'
import type { PropsWithChildren } from 'react'
import type { Props } from 'react-modal'


interface ModalProps {
  isOpen: boolean
  closeModalHandler: () => void
  modalProps?: Omit<Props, 'className' | 'isOpen' | 'onRequestClose' | 'overlayClassName'>
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
    <div
      className={styles.closeIcon}
      onClick={closeModalHandler}
    >
      <svg
        fill="currentColor"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
      </svg>
    </div>
  </ReactModal>
)

export default Modal
