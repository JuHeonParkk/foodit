import React from "react";
import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}) {
  const classNames = `${styles.button} ${styles[variant]} ${className} `;
  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}
