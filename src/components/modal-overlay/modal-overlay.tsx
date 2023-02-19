import modalOverlay from './modal-overlay.module.css'
import { FC } from 'react';
import { TModalProps } from '../../services/types/types';

const ModalOverlay: FC<TModalProps> = ({  onClose }) => {
  return (
      <div className={ modalOverlay.overlay} onClick={onClose}></div>
  )
}

export default ModalOverlay;