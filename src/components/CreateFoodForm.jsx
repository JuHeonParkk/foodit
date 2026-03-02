import React, { useRef, useEffect } from "react";
import FileInput from "./FileInput";
import Button from "./Button";
import styles from "./CreateFoodForm.module.css";

export default function CreateFoodForm({
  initialValue = { title: "", calorie: 0, content: "" },
  onSubmit,
  isCreateFoodOpen,
}) {
  const submit = (formData) => {
    const title = formData.get("title");
    const calorie = formData.get("calorie");
    const content = formData.get("content");
    const data = { title, calorie, content };

    // 이렇게 한 꺼번에 가져올 수 있음
    // const submit = (formdata) => {
    //   const data = Object.fromEntries(formdata.entries());
    // }
    onSubmit(data);
  };
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <h2>칼로리 기록하기</h2>
        <Button variant="close" onClick={!isCreateFoodOpen}>
          X
        </Button>
      </div>

      <form action={submit} className={styles.form}>
        <FileInput name="imgUrl" initialPreview={initialValue.imgUrl} />
        <div className={styles.content}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="title"
              placeholder="이름을 입력하세요."
              ref={inputRef}
            />
            <input type="number" name="calorie" placeholder="KCal" />
          </div>
          <textarea
            className={styles.textarea}
            name="content"
            placeholder="설명을 입력하세요."
          />
          <Button className={styles.button}>작성완료</Button>
        </div>
      </form>
    </div>
  );
}
