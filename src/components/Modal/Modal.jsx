import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from './Modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from "../../services/ModalSlice/ModalSlice";

const modalRootElement = document.querySelector('#modal');

const Modal = (props) => {
  const { isOpen } = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const closeByEsc = useCallback((e) => {
    if (e.key === 'Escape') {
      dispatch(closeModal())
    }
  }, [dispatch]);
  
  const handleClose = useCallback(() => {
    dispatch(closeModal())
  },[dispatch])

  useEffect(() => {
    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc)
  }, [closeByEsc]);
  
  if(!isOpen) {
    return null;
  }

  return createPortal(
    <>
      <ModalOverlay open={isOpen}></ModalOverlay>
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
