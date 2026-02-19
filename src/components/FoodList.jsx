import React from "react";
import FoodListItem from "./FoodListItem";
import styles from "./FoodList.module.css";

export default function FoodList({ items, handleDelete, onUpdate }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li className={styles.item}>
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
