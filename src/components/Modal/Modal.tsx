import { useEffect, useCallback, FC, ReactElement } from "react";
import { createPortal } from "react-dom";
import styles from './Modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import { closeModal } from "../../services/ModalSlice/ModalSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/typeHook";

const modalRootElement = document.querySelector('#modal') as HTMLElement;

interface ModalProps {
  children?: ReactElement;
}

const Modal: FC<ModalProps> = (props) => {
  const { isOpen } = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch();
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
      <ModalOverlay />
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
