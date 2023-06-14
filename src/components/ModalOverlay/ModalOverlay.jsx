import { useCallback } from 'react';
import styles from './ModalOverlay.module.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../services/ModalSlice/ModalSlice';

export function ModalOverlay() {
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(closeModal())
  },[dispatch])

  return (
    <div onClick={handleClose} className={styles.overlay}>
    </div>
  )
}