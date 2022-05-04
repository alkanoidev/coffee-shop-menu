import { Routes, Route, BrowserRouter } from "react-router-dom";
import Items from "./pages/Items";
import NewItem from "./pages/NewItem";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Items />} />
        <Route path="/newitem" index element={<NewItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
