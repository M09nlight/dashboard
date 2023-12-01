import { useState } from "react";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import ItemList from "./components/item-list/ItemList";

function App() {
  const [isDropable, setIsDropable] = useState(false);

  const handleUpdateDropable = (val) => {
    setIsDropable(val);
  };
  return (
    <>
      <ItemList
        isDropable={isDropable}
        handleUpdateDropable={handleUpdateDropable}
      />
      <Dashboard
        isDropable={isDropable}
        handleUpdateDropable={handleUpdateDropable}
      />
    </>
  );
}

export default App;
