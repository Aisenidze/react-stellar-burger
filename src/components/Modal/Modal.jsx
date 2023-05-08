import { createPortal } from "react-dom";
import styles from './Modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRootElement = document.querySelector('#modal');

const Modal = (props) => {
  const { open, closeModal } = props;

  if(!open) return null;

  return createPortal(
    <div className={styles.modal_background}>
      <div className={styles.overlay} onClick={closeModal}></div>
      <div className={styles.modal_card}>
        <div className={styles.close_icon}>
        <CloseIcon type="primary" onClick={closeModal}/>
        </div>
        {props.children}
      </div>
    </div>,
    modalRootElement,
  );  
};



export default Modal;