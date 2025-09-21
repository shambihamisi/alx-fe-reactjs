// src/components/Search.jsx
import { useEffect, useMemo, useState } from "react";
import { enrichUsers, searchUsers } from "../services/githubService";
import UserCard from "./UserCard";

const PER_PAGE_OPTIONS = [10, 20, 30];

export default function Search() {
  // form state
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [sort, setSort] = useState(""); // '' | 'followers' | 'repositories' | 'joined'
  const [order, setOrder] = useState("desc");

  // results state
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(PER_PAGE_OPTIONS[0]);

  // ui state
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const totalPages = useMemo(() => Math.ceil(total / perPage) || 1, [total, perPage]);

  async function runSearch(targetPage = 1) {
    setIsLoading(true);
    setErr("");
    try {
      const { items, total_count } = await searchUsers({
        keyword,
        location,
        minRepos,
        sort,
        order,
        page: targetPage,
        per_page: perPage,
      });

      // Enrich with details (location/repos/followers)
      const enriched = await enrichUsers(items);
      setUsers(enriched);
      setTotal(Math.min(total_count, 1000)); // GitHub caps pagination around 1000 results
      setPage(targetPage);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Something went wrong.");
      setUsers([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    // reset page when new search criteria are submitted
    runSearch(1);
  }

  // re-run when perPage changes to keep things consistent
  useEffect(() => {
    if (total > 0) runSearch(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perPage]);

  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        GitHub User Search (Advanced)
      </h1>

      {/* Form */}
      <form onSubmit={onSubmit} className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white dark:bg-slate-900 rounded-2xl shadow p-4 sm:p-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="keyword" className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Username / Name
          </label>
          <input
            id="keyword"
            type="text"
            placeholder="e.g. torvalds"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="location" className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Location
          </label>
          <input
            id="location"
            type="text"
            placeholder="e.g. Nairobi, Kenya"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="minRepos" className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Min. Public Repos
          </label>
          <input
            id="minRepos"
            type="number"
            min={0}
            inputMode="numeric"
            placeholder="e.g. 10"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="sort" className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Sort by
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Best match</option>
            <option value="followers">Followers</option>
            <option value="repositories">Repositories</option>
            <option value="joined">Joined</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="order" className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Order
          </label>
          <select
            id="order"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="perPage" className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Results per page
          </label>
          <select
            id="perPage"
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {PER_PAGE_OPTIONS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3 flex items-center justify-between gap-3 pt-1">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Search
          </button>

          <button
            type="button"
            onClick={() => {
              setKeyword(""); setLocation(""); setMinRepos("");
              setSort(""); setOrder("desc"); setPage(1); setUsers([]); setTotal(0); setErr("");
            }}
            className="text-sm text-slate-600 dark:text-slate-300 hover:underline"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Status */}
      {isLoading && (
        <p className="mt-6 text-slate-600 dark:text-slate-300">Searching GitHub…</p>
      )}
      {err && (
        <p className="mt-6 text-red-600 dark:text-red-400">{err}</p>
      )}
      {!isLoading && !err && users.length === 0 && total === 0 && (
        <p className="mt-6 text-slate-600 dark:text-slate-300">Try a search to see results.</p>
      )}

      {/* Results */}
      {users.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Showing <strong>{users.length}</strong> of <strong>{total}</strong> users
            </p>
            <div className="flex items-center gap-2">
              <button
                className="rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-1.5 disabled:opacity-50"
                disabled={page <= 1 || isLoading}
                onClick={() => runSearch(page - 1)}
              >
                ← Prev
              </button>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Page {page} of {totalPages}
              </span>
              <button
                className="rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-1.5 disabled:opacity-50"
                disabled={page >= totalPages || isLoading}
                onClick={() => runSearch(page + 1)}
              >
                Next →
              </button>
            </div>
          </div>

          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {users.map((u) => (
              <li key={u.id || u.login}>
                <UserCard user={u} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
