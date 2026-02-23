import { useState, useEffect } from "react";
import axios from "./utils/axios";
import FoodList from "./components/FoodList";
import Modal from "./components/Modal";
import CreateFoodForm from "./components/CreateFoodForm";
import Layout from "./components/Layout";
import Input from "./components/Input";
import Button from "./components/Button";
import styles from "./App.module.css";
import moreBtnIcon from "./assets/moreview_green.png";

const LIMIT = 10;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [keyword, setKeyword] = useState("");
  const [isCreateFoodOpen, setIsCreateFoodOpen] = useState(false);
  const [cursor, setCursor] = useState();

  const handleLoad = async (orderParams, searchParams) => {
    const response = await axios.get("/foods", {
      params: {
        order: orderParams,
        search: searchParams,
        limit: LIMIT,
      },
    });
    const { foods, paging } = response.data;
    setItems(foods);
    setCursor(paging.nextCursor);
  };

  const handleLoadMore = async () => {
    const response = await axios.get("/foods", {
      params: {
        order,
        search: keyword,
        limit: LIMIT,
        cursor,
      },
    });
    const { foods, paging } = response.data;
    setItems((prevItems) => [...prevItems, ...foods]);
    setCursor(paging.nextCursor);
  };

  useEffect(() => {
    handleLoad(order, keyword);
  }, [order, keyword]);

  // 추가(post)
  const handleCreate = async (data) => {
    const response = await axios.post("/foods", data);
    const { food } = response.data;
    setItems((prevItems) => [food, ...prevItems]);
    setIsCreateFoodOpen(false);
  };

  // 수정(patch)
  const handleUpdate = async (id, data) => {
    const response = await axios.patch(`/foods/${id}`, data);
    const { food } = response.data;
    setItems((prevItems) => {
      const targetIndex = prevItems.findIndex((item) => item.id === id);
      return [
        ...prevItems.slice(0, targetIndex),
        food,
        ...prevItems.slice(targetIndex + 1),
      ];
    });
  };

  // 삭제(delete)
  const handleDelete = async (id) => {
    await axios.delete(`/foods/${id}`);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
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
          items={items}
          handleDelete={handleDelete}
          onUpdate={handleUpdate}
        />
        {cursor && (
          <Button onClick={handleLoadMore} variant="loadMore">
            더보기
            <img src={moreBtnIcon} alt="moreBtn" />
          </Button>
        )}
      </Layout>
    </div>
  );
}

export default App;
