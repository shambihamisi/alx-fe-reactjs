import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import User from "./pages/User.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <nav style={{padding:12}}>
        <Link to="/">Home</Link>{" | "}
        <Link to="/user/demo">User (demo)</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}
