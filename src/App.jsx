import { useState } from "react";
import items from "./mock.json";
import FoodList from "./components/FoodList";

function App() {
  const [order, setOrder] = useState("createdAt");
  const [keyword, setKeyword] = useState("");

  const sortedItems = items.sort((a, b) => b[order] - a[order]);
  const searchItems = sortedItems.filter(
    (item) => item.title.includes(keyword) || item.content.includes(keyword),
  );

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div>
        <button onClick={() => setOrder("createdAt")}>최신순</button>
        <button onClick={() => setOrder("calorie")}>칼로리순</button>
      </div>
      <FoodList items={searchItems} />
    </div>
  );
}

export default App;
