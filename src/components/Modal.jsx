import React from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

export default function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
}
