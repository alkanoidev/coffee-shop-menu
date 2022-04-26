import { Routes, Route, BrowserRouter } from "react-router-dom";
import Items from "./pages/Items";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Items />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
