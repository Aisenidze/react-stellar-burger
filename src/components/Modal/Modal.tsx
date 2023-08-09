import React, { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.css";

interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: FC<IModalProps> = ({ children, onClose }) => {
  const modalsContainer = document.querySelector("#modal") as HTMLElement;

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeydown);
    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, []);

  const handleEscKeydown = (e: { key: string }) => {
    e.key === "Escape" && onClose();
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.modal__closeButton} onClick={onClose} >
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalsContainer
  );
};

export default Modal;
