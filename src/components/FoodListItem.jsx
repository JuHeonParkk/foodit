import React from "react";
import Modal from "./Modal";
import EditFoodForm from "./EditFoodForm";
import Button from "./Button";
import styles from "./FoodListItem.module.css";

export default function FoodListItem({ item, handleDelete, onUpdate }) {
  const { imgUrl, title, calorie, content } = item;
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const handleEditFormSubmit = (data) => {
    onUpdate(item.id, data);
    setIsEditModalOpen(false);
  };

  return (
    <div className={styles.itemContent}>
      <img src={imgUrl} alt={title} className={styles.img} />
      <div className={styles.textContent}>
        <div className={styles.textTitle}>
          <div className={styles.title}>{title}</div>
          <div className={styles.calorie}>{calorie}kcal</div>
        </div>
        <div className={styles.content}>{content}</div>
        <div className={styles.textFooter}>
          <div>{new Date(item.createdAt).toLocaleString()}</div>
          <div className={styles.buttons}>
            <Button
              variant="outlinePrimary"
              onClick={() => setIsEditModalOpen(true)}
            >
              수정
            </Button>
            <Modal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
            >
              <EditFoodForm food={item} onSubmit={handleEditFormSubmit} />
            </Modal>
            <Button
              variant="outlineSecondary"
              onClick={() => handleDelete(item.id)}
            >
              삭제
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
