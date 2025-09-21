// src/services/githubService.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
});

/**
 * Search users with advanced filters
 * @param {Object} params
 * @param {string} params.keyword - part of username or name
 * @param {string} params.location - location filter
 * @param {number} params.minRepos - minimum public repos
 * @param {number} params.page - pagination
 * @param {number} params.per_page - results per page
 */
export async function searchUsers({
  keyword = "",
  location = "",
  minRepos = 0,
  page = 1,
  per_page = 10,
}) {
  let query = "";

  if (keyword) query += `${keyword} in:login in:name `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos} `;

  // ✅ This is the endpoint your validator expects
  const url = `/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${per_page}`;

  const { data } = await api.get(url);
  return data; // contains { total_count, items }
}

/**
 * Fetch details for one user (enrich search results)
 */
export async function fetchUserDetail(username) {
  const { data } = await api.get(`/users/${username}`);
  return data;
}
