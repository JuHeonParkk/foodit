import React from "react";
import styles from "./Button.module.css";

export default function Button({ children, variant = "primary", className }) {
  const classNames = `${styles.button} ${styles[variant]} ${className}`;
  return <button className={classNames}>{children}</button>;
}
