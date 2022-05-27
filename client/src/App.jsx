import { Routes, Route, BrowserRouter } from "react-router-dom";
import NewItemModal from "./components/NewItemModal/NewItemModal";
import Categories from "./pages/Categories/Categories";
import Items from "./pages/Items";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Items />}>
          <Route exact path="/new-item" element={<NewItemModal />} />
        </Route>
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
