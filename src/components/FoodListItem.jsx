import React from "react";

export default function FoodListItem({ item }) {
  const { imgUrl, title, calorie, content } = item;
  return (
    <div>
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}kcal</div>
      <div>{content}</div>
    </div>
  );
}
