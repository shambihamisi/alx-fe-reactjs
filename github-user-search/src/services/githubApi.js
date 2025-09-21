import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    // If you add a token, axios will include it:
    ...(import.meta.env.VITE_APP_GITHUB_API_KEY
      ? { Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY}` }
      : {})
  }
});

export const getUser = (username) => api.get(`/users/${username}`);
export const getUserRepos = (username, params={ per_page: 30, sort: "updated" }) =>
  api.get(`/users/${username}/repos`, { params });
