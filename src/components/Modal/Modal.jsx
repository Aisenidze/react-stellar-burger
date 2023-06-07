import React from 'react';
import { createPortal } from "react-dom";
import { useEffect, useCallback } from "react";
import styles from './Modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";

const modalRootElement = document.querySelector('#modal');

const Modal = (props) => {
  const { open, closeModal } = props;
  const closeByEsc = ((e) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  });
  
  const handleClose = useCallback(() => {
    closeModal()
  },[closeModal])
  useEffect(() => {
    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc)
  }, []);
  
  if(!open) {
    return null;
  } else {
  }
  

  return createPortal(
    <>
      <ModalOverlay closeModal={closeModal} onClick={handleClose} onMouseDown={closeByEsc}></ModalOverlay>
      <div className={styles.modal_card} >
        <div className={styles.close_icon}>
        <CloseIcon type="primary" onClick={closeModal}/>
        </div>
        {props.children}
      </div>
    </>,
    modalRootElement,
  );  
};



export default Modal;
