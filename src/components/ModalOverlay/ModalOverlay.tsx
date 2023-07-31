import { FC, useCallback } from 'react';
import styles from './ModalOverlay.module.css';
import { closeModal } from '../../services/ModalSlice/ModalSlice';
import { useAppDispatch } from '../../hooks/typeHook';

export const ModalOverlay: FC = () => {
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(closeModal())
  },[dispatch])

  return (
    <div onClick={handleClose} className={styles.overlay}>
    </div>
  )
}