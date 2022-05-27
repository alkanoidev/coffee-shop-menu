import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import CategoryDetailsModal from "./components/CategoryDetailsModal/CategoryDetailsModal";
import Layout from "./components/Layout/Layout";
import NewCategoryModal from "./components/NewCategory/NewCategoryModal";
import NewItemModal from "./components/NewItemModal/NewItemModal";
import Categories from "./pages/Categories/Categories";
import Items from "./pages/Items";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
        <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Items />}>
            <Route path="new-item" element={<NewItemModal />} />
          </Route>
          <Route path="categories" element={<Categories />}>
            <Route path="new" element={<NewCategoryModal />} />
            <Route path=":name" element={<CategoryDetailsModal />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
