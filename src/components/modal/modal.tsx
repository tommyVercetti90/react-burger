import { createPortal } from 'react-dom'
import { useEffect,FC } from "react"
import modal from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay' 
import { TModalProps } from '../../services/types/types'

const documentBody = document.querySelector('#modals')

const Modal: FC<TModalProps> = ({onClose, children, title}) => {

  useEffect(() => {
      const closeModal = (event: KeyboardEvent): void => {
        if(onClose !== undefined) {
          event.key === "Escape" && onClose()
        }
      }
      document.addEventListener('keydown', closeModal)
      return () => {
        document.removeEventListener('keydown', closeModal)
      }
  }, [onClose])

  return createPortal(
      <>
        <div className={modal.modalWrapper}>
          <div className={`${modal.header} p-10`} data-testid="modal">
              <p className='text text_type_main-large'>{title}</p>
              <div className={modal.close}>
                <CloseIcon type='primary' onClick={onClose}/>              
              </div> 
          </div>
            {children} 
        </div>
          <ModalOverlay onClose={onClose}/>
      </>,
        documentBody!
    )
}

export default Modal