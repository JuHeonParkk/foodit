import React from "react";
import logo from "../assets/foodit.png";
import logoTxt from "../assets/foodit_txt.png";

import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.content}>{children}</div>
      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <img src={logoTxt} alt="logoTxt" />
          <ul className={styles.footerMenu}>
            <li>
              <a href="#">서비스 이용약관</a>
            </li>
            <li>|</li>
            <li>
              <a href="#">개인정보 처리방침</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
