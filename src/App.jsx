import { useState } from "react";
import mockItems from "./mock.json";
import FoodList from "./components/FoodList";
import Modal from "./components/Modal";
import CreateFoodForm from "./components/CreateFoodForm";
import Layout from "./components/Layout";
import Input from "./components/Input";
import styles from "./App.module.css";

function App() {
  const [items, setItems] = useState(mockItems);
  const [order, setOrder] = useState("createdAt");
  const [keyword, setKeyword] = useState("");
  const [isCreateFoodOpen, setIsCreateFoodOpen] = useState(false);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);
  const searchItems = sortedItems.filter(
    (item) => item.title.includes(keyword) || item.content.includes(keyword),
  );

  const handleDelete = (id) => {
    const deletedItems = items.filter((item) => item.id !== id);
    setItems(deletedItems);
  };

  const handleCreate = (data) => {
    const newItem = {
      id: items.length + 1,
      ...data,
      createdAt: new Date().valueOf(),
      updatedAt: new Date().valueOf(),
    };
    console.log(newItem);
    setItems([newItem, ...items]);
    setIsCreateFoodOpen(false);
  };

  const handleUpdate = (id, data) => {
    const findIndex = items.findIndex((item) => item.id === id);

    const newItem = {
      ...items[findIndex],
      ...data,
      updatedAt: new Date().valueOf(),
    };

    const newItems = [
      ...items.slice(0, findIndex),
      newItem,
      ...items.slice(findIndex + 1),
    ];
    setItems(newItems);
  };

  return (
    <div>
      <Layout>
        <div className={styles.header}>
          <Input keyword={keyword} setKeyword={setKeyword} />
          <div>
            <button onClick={() => setOrder("createdAt")}>최신순</button>
            <button onClick={() => setOrder("calorie")}>칼로리순</button>
            <button onClick={() => setIsCreateFoodOpen(true)}>추가하기</button>
            <Modal
              isOpen={isCreateFoodOpen}
              onClose={() => setIsCreateFoodOpen(false)}
            >
              <CreateFoodForm onSubmit={handleCreate} />
            </Modal>
          </div>
        </div>

        <FoodList
          items={searchItems}
          handleDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </Layout>
    </div>
  );
}

export default App;
