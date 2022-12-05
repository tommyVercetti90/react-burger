import { createPortal } from 'react-dom';
import { useEffect } from "react";
import modal from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay'; 
import PropTypes from 'prop-types';

const documentBody = document.body

const Modal = ({onClose, children, title}) => {

  useEffect(() => {
      const closeModal = (event) => {
        event.key === "Escape" && onClose();
      };
      document.addEventListener('keydown', closeModal);
      return () => document.removeEventListener('keydown', closeModal);
  }, [onClose]);

  return createPortal(
      <>
        <div className={modal.modalWrapper}>
          <div className={`${modal.header} pt-10 pl-10 pr-10`}>
              <p className='text text_type_main-large'>{title}</p>
              <div className={modal.close}>
                <CloseIcon type='primary' onClick={onClose}/>              
              </div> 
          </div>
            {children} 
        </div>
          <ModalOverlay onClose={onClose}/>
      </>,
        documentBody
    );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
};

export default Modal;