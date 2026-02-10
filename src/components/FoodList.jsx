import React from "react";
import FoodListItem from "./FoodListItem";

export default function FoodList({ items, handleDelete, onUpdate }) {
  return (
    <ul>
      {items.map((item) => (
        <li>
          <FoodListItem
            item={item}
            handleDelete={handleDelete}
            onUpdate={onUpdate}
          />
        </li>
      ))}
    </ul>
  );
}
