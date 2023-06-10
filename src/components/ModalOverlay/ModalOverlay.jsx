import { useCallback } from 'react';
import styles from './ModalOverlay.module.css';
import { popupCurrentValue } from '../../services/ConstructorSlice/ConstructorSlice';
import { useDispatch } from 'react-redux';

export function ModalOverlay({ onMouseDown, closeModal }) {
  const dispatch = useDispatch

  const handleClose = useCallback(() => {
    dispatch(popupCurrentValue(false))
  },[dispatch])

  return (
    <div onClick={handleClose} className={styles.overlay} onMouseDown={onMouseDown}>
    </div>
  )
}