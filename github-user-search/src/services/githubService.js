// src/services/githubService.js
import axios from 'axios';

const token = import.meta.env.VITE_GH_TOKEN; // optional, recommended
const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

/**
 * Build a GitHub Search API query string with qualifiers
 * @param {Object} opts
 * @param {string} [opts.keyword] - free-text (login/name)
 * @param {string} [opts.location] - location qualifier
 * @param {number|string} [opts.minRepos] - minimum public repos (repos:>=X)
 */
function buildQuery({ keyword = '', location = '', minRepos = '' }) {
  const parts = [];

  const trimmed = (s) => (s || '').toString().trim();

  if (trimmed(keyword)) {
    // search in login and name for better matching
    parts.push(`${keyword} in:login in:name`);
  }
  if (trimmed(location)) {
    // wrap in quotes if user typed spaces
    const loc = /\s/.test(location) ? `"${location}"` : location;
    parts.push(`location:${loc}`);
  }
  if (trimmed(minRepos) !== '' && !Number.isNaN(Number(minRepos))) {
    parts.push(`repos:>=${minRepos}`);
  }

  // If no parts, GitHub requires some query; use a broad wildcard that still returns users
  return parts.length ? parts.join(' ') : 'type:user';
}

/**
 * Search users via GitHub Search API
 * @returns {Promise<{items: Array, total_count: number}>}
 */
export async function searchUsers({
  keyword = '',
  location = '',
  minRepos = '',
  sort = '', // 'followers' | 'repositories' | 'joined' | '' (best match)
  order = 'desc',
  page = 1,
  per_page = 10,
} = {}) {
  const q = buildQuery({ keyword, location, minRepos });

  const params = { q, page, per_page, order };
  if (sort) params.sort = sort;

  const { data } = await api.get('/search/users', { params });
  // data.items contain: login, avatar_url, html_url, etc. (no repos/location)
  return { items: data.items || [], total_count: data.total_count || 0 };
}

/**
 * Fetch one user's public profile (adds location, followers, public_repos, etc.)
 */
export async function fetchUserDetail(login) {
  const { data } = await api.get(`/users/${login}`);
  return data;
}

/**
 * Batch-enrich a list of search hits with details (keeps order)
 */
export async function enrichUsers(items) {
  const results = await Promise.allSettled(
    (items || []).map((u) => fetchUserDetail(u.login))
  );
  return results.map((r, i) => (r.status === 'fulfilled' ? r.value : items[i]));
}
