import { useState } from "react";
import items from "./mock.json";
import FoodList from "./components/FoodList";

function App() {
  const [order, setOrder] = useState("createdAt");
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  return (
    <div>
      <div>
        <button onClick={() => setOrder("createdAt")}>최신순</button>
        <button onClick={() => setOrder("calorie")}>칼로리순</button>
      </div>
      <FoodList items={sortedItems} />
    </div>
  );
}

export default App;
