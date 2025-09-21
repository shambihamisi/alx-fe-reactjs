// src/services/githubService.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    ...(import.meta.env.VITE_APP_GITHUB_API_KEY
      ? { Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY}` }
      : {}),
  },
});

/**
 * Fetch a single GitHub user by username
 * @param {string} username
 * @returns {Promise<Object>} user data
 */
export async function fetchUserData(username) {
  if (!username) throw new Error("Username is required");
  const { data } = await api.get(`/users/${encodeURIComponent(username)}`);
  return data;
}
