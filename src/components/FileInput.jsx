import React, { useState, useEffect, useRef } from "react";
import placeholderImage from "../assets/placeholder.png";
import close from "../assets/icon_close_gray_r.png";

export default function FileInput({ name, initialPreview }) {
  const [file, setFile] = useState(); // 파일 상태 관리
  const [preview, setPreview] = useState(initialPreview); // 미리보기 이미지 URL 상태 관리
  const inputRef = useRef(null); // 파일 입력 필드 참조

  // 파일이 변경될 때마다 호출되는 핸들러
  const handleChange = (e) => {
    const nextFile = e.target.files[0];
    setFile(nextFile);
  };

  const handleClear = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = ""; // 파일 입력 필드 초기화
    }
  };

  // 파일이 변경될 때마다 미리보기 이미지 URL을 생성하고 관리하는 효과
  // useEffect를 사용하여 특정 값이 변경될 때마다 콜백함수 실행
  // 즉 file이 변경될 때마다 미리보기 이미지 URL을 생성하고, 이전 URL은 해제하여 메모리 누수 방지
  useEffect(() => {
    if (!file) {
      setPreview(initialPreview);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <>
      <input name={name} type="file" onChange={handleChange} ref={inputRef} />
      <img src={preview || placeholderImage} alt="preview" />
      <button type="button" onClick={handleClear}>
        <img src={close} />
      </button>
    </>
  );
}
