import React from "react";
import styles from "./Input.module.css";

export default function Input({ keyword, setKeyword }) {
  return (
    <>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색어를 입력해주세요"
        className={styles.input}
      />
    </>
  );
}
