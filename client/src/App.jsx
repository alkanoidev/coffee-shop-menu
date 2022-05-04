import { Routes, Route, BrowserRouter } from "react-router-dom";
import Categories from "./pages/Categories/Categories";
import Items from "./pages/Items";
import NewItem from "./pages/NewItem";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Items />} />
        <Route path="/newitem" element={<NewItem />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
