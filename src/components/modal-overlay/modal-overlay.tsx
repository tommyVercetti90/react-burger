import modalOverlay from './modal-overlay.module.css'
import { FC } from 'react';
import { TModalProps } from '../../utils/types';

const ModalOverlay: FC<TModalProps> = ({  onClose }) => {
  return (
      <div className={ modalOverlay.overlay} onClick={onClose}></div>
  )
}

export default ModalOverlay;