import { useState, useEffect } from "react";
import axios from "./utils/axios";
import FoodList from "./components/FoodList";
import Modal from "./components/Modal";
import CreateFoodForm from "./components/CreateFoodForm";
import Layout from "./components/Layout";
import Input from "./components/Input";
import Button from "./components/Button";
import styles from "./App.module.css";

const LIMIT = 10;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [keyword, setKeyword] = useState("");
  const [isCreateFoodOpen, setIsCreateFoodOpen] = useState(false);
  const [nextCursor, setNextCursor] = useState(null);

  const handleLoad = async (orderParams, keyword) => {
    const response = await axios.get("/foods", {
      params: {
        keyword,
        order: orderParams,
        limit: LIMIT,
      },
    });
    const { foods, paging } = response.data;
    setItems(foods);
    setNextCursor(paging.nextCursor);
  };

  const handleLoadMore = async () => {
    const response = await axios.get("/foods", {
      params: {
        order,
        keyword,
        limit: LIMIT,
        cursor: nextCursor,
      },
    });
    const { foods, paging } = response.data;
    setItems((prevItems) => [...prevItems, ...foods]);
    setNextCursor(paging.nextCursor);
  };

  useEffect(() => {
    handleLoad(order, keyword);
  }, [order, keyword]);

  const sortedItems = [...items].sort((a, b) => b[order] - a[order]);
  const filteredItems = sortedItems.filter(
    (item) =>
      item.title.includes(keyword) || item.description.includes(keyword),
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
          <div className={styles.buttons}>
            <button
              className={`${styles.filter} ${order === "createdAt" ? styles.active : ""}`}
              onClick={() => setOrder("createdAt")}
            >
              최신순
            </button>
            <button
              className={`${styles.filter} ${order === "calorie" ? styles.active : ""}`}
              onClick={() => setOrder("calorie")}
            >
              칼로리순
            </button>
            <Button onClick={() => setIsCreateFoodOpen(true)}>추가하기</Button>
            <Modal
              isOpen={isCreateFoodOpen}
              onClose={() => setIsCreateFoodOpen(false)}
            >
              <CreateFoodForm onSubmit={handleCreate} />
            </Modal>
          </div>
        </div>

        <FoodList
          items={filteredItems}
          handleDelete={handleDelete}
          onUpdate={handleUpdate}
        />
        {nextCursor && <Button onClick={handleLoadMore}>불러오기</Button>}
      </Layout>
    </div>
  );
}

export default App;
