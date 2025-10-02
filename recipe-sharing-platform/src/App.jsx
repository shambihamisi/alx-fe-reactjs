import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Placeholder for detail route */}
        <Route path="/recipe/:id" element={<div className="p-6">Recipe detail TODO</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
