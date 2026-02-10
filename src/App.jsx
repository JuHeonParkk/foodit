import items from "./mock.json";
import FoodList from "./components/FoodList";

function App() {
  return (
    <div>
      <FoodList items={items} />
    </div>
  );
}

export default App;
