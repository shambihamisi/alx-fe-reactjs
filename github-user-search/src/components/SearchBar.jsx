export default function SearchBar({ onSearch }) {
  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSearch?.(new FormData(e.currentTarget).get('q'));}}>
      <input name="q" placeholder="Search GitHub username…" />
      <button type="submit">Search</button>
    </form>
  );
}
