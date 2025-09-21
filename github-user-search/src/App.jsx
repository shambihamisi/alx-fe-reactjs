// src/App.jsx
import Search from "./components/Search";

export default function App() {
  return (
    <>
      <header style={{ padding: 12, borderBottom: "1px solid #eee" }}>
        GitHub User Search
      </header>
      <Search />
    </>
  );
}
