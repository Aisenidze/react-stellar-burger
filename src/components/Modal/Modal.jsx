import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from './Modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import { popupCurrentValue } from '../../services/ConstructorSlice/ConstructorSlice';
import { useDispatch } from 'react-redux';

const modalRootElement = document.querySelector('#modal');

const Modal = (props) => {
  // const { open, closeModal } = props;
  // const { open } = props;
  const dispatch = useDispatch();
  const closeByEsc = ((e) => {
    if (e.key === 'Escape') {
      dispatch(popupCurrentValue(false))
    }
  }, [dispatch]);
  
  const handleClose = useCallback(() => {
    dispatch(popupCurrentValue(false))
  },[dispatch])

  useEffect(() => {
    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc)
  }, [closeByEsc]);
  
  // if(!open) {
  //   return null;
  // } else {
  // }
  

  return createPortal(
    <>
      <ModalOverlay onClick={handleClose} onMouseDown={closeByEsc}></ModalOverlay>
      <div className={styles.modal_card} >
        <div className={styles.close_icon}>
        <CloseIcon type="primary" onClick={handleClose}/>
        </div>
        {props.children}
      </div>
    </>,
    modalRootElement,
  );  
};



export default Modal;
