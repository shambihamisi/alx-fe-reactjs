import SearchBar from "../components/SearchBar.jsx";
export default function Home() {
  const handleSearch = (query) => {
    // later: navigate to /user/:username or call API directly
    console.log("search:", query);
  };
  return <div style={{padding:16}}><SearchBar onSearch={handleSearch} /></div>;
}
