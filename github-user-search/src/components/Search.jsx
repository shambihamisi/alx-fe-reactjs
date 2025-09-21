// src/components/Search.jsx
import { useState } from "react";
import { fetchUserData } from "../services/githubService";

export default function Search() {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    setLoading(true);
    setErrorMsg("");
    setUser(null);

    try {
      const data = await fetchUserData(q);
      // keep only what we display (you can add more fields later)
      setUser({
        login: data.login,
        name: data.name || data.login,
        avatar_url: data.avatar_url,
        html_url: data.html_url,
      });
    } catch (err) {
      // Show the required error message for not found / failures
      setErrorMsg("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 16, maxWidth: 640, margin: "0 auto" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          placeholder="Enter GitHub username (e.g., octocat)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            padding: "10px 12px",
            border: "1px solid #ddd",
            borderRadius: 8,
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            border: "1px solid #0b1b2a",
            background: "#0b1b2a",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {/* Conditional rendering per spec */}
      <div style={{ marginTop: 16 }}>
        {loading && <p>Loading...</p>}

        {!loading && errorMsg && (
          <p style={{ color: "crimson" }}>{errorMsg}</p>
        )}

        {!loading && user && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: 12,
              border: "1px solid #eee",
              borderRadius: 12,
              marginTop: 8,
            }}
          >
            <img
              src={user.avatar_url}
              alt={user.name}
              width={72}
              height={72}
              style={{ borderRadius: "50%" }}
            />
            <div>
              <h3 style={{ margin: 0 }}>{user.name}</h3>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                style={{ color: "#0366d6" }}
              >
                @{user.login}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
