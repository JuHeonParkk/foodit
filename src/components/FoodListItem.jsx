import React from "react";
import Modal from "./Modal";
import EditFoodForm from "./EditFoodForm";
import Button from "./Button";

export default function FoodListItem({ item, handleDelete, onUpdate }) {
  const { imgUrl, title, calorie, content } = item;
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const handleEditFormSubmit = (data) => {
    onUpdate(item.id, data);
    setIsEditModalOpen(false);
  };

  return (
    <div>
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}kcal</div>
      <div>{content}</div>
      <Button variant="outlinePrimary" onClick={() => setIsEditModalOpen(true)}>
        수정
      </Button>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditFoodForm food={item} onSubmit={handleEditFormSubmit} />
      </Modal>
      <Button variant="outlineSecondary" onClick={() => handleDelete(item.id)}>
        삭제
      </Button>
    </div>
  );
}
