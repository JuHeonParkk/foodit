import React from "react";
import FoodListItem from "./FoodListItem";

export default function FoodList({ items, handleDelete }) {
  return (
    <ul>
      {items.map((item) => (
        <li>
          <FoodListItem item={item} handleDelete={handleDelete} />
        </li>
      ))}
    </ul>
  );
}
