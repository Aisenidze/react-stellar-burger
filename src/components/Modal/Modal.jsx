import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from './Modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import { popupCurrentValue } from '../../services/ConstructorSlice/ConstructorSlice';
import { useDispatch, useSelector } from 'react-redux';
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { closeModal } from "../../services/ModalSlice/ModalSlice";

const modalRootElement = document.querySelector('#modal');

const Modal = () => {
  const { isOpen, modalType, modalContent } = useSelector(state => state.modal);
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
  console.log(isOpen)
  console.log(modalType)
  console.log(modalContent)

  return createPortal(
    <>
      <ModalOverlay open={isOpen} onClick={handleClose} onMouseDown={closeByEsc}></ModalOverlay>
      <div className={styles.modal_card} >
        <div className={styles.close_icon}>
        <CloseIcon type="primary" onClick={handleClose}/>
        </div>
        {modalType === "ingredient" && <IngredientDetails item={modalContent}/>}
        {modalType === "constructor" && <OrderDetails item={modalContent}/>}
      </div>
    </>,
    modalRootElement,
  );  
};



export default Modal;
