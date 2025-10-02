import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import RecipeDetail from "./components/RecipeDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Placeholder for detail route */}
        <Route path="/recipe/:id" element={<RecipeDetail />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
