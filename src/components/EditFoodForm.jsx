import React, { useRef, useEffect } from "react";

export default function EditFoodForm({ food, onSubmit }) {
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
    <form action={submit}>
      <input
        type="text"
        name="title"
        placeholder="이름을 입력하세요."
        ref={inputRef}
        defaultValue={food.title}
      />
      <input
        type="number"
        name="calorie"
        placeholder="KCal"
        defaultValue={food.calorie}
      />
      <textarea
        name="content"
        placeholder="설명을 입력하세요."
        defaultValue={food.content}
      />
      <button>작성완료</button>
    </form>
  );
}
