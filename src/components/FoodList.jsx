import React from "react";
import FoodListItem from "./FoodListItem";

export default function FoodList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li>
          <FoodListItem item={item} />
        </li>
      ))}
    </ul>
  );
}
