import { useCallback } from 'react';
import styles from './ModalOverlay.module.css';

export function ModalOverlay({ onMouseDown, closeModal }) {


  const handleClose = useCallback(() => {
    closeModal()
  },[closeModal])

  return (
    <div onClick={handleClose} className={styles.overlay} onMouseDown={onMouseDown}>
    </div>
  )
}