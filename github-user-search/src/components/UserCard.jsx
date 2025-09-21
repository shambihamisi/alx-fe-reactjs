// src/components/UserCard.jsx
/* eslint-disable react/prop-types */
export default function UserCard({ user }) {
  const {
    login,
    name,
    avatar_url,
    html_url,
    bio,
    location,
    public_repos,
    followers,
  } = user;

  return (
    <article className="bg-white dark:bg-slate-900 rounded-2xl shadow p-4 sm:p-5 flex gap-4 items-start">
      <img
        src={avatar_url}
        alt={`${login} avatar`}
        className="h-16 w-16 rounded-full ring-1 ring-black/5"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-slate-900 dark:text-slate-100 hover:underline truncate"
          >
            {name || login}
          </a>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            @{login}
          </span>
        </div>

        {bio ? (
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
            {bio}
          </p>
        ) : null}

        <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
          {typeof public_repos === 'number' && (
            <span className="rounded-md border border-slate-200 dark:border-slate-700 px-2 py-1">
              Repos: <strong>{public_repos}</strong>
            </span>
          )}
          {typeof followers === 'number' && (
            <span className="rounded-md border border-slate-200 dark:border-slate-700 px-2 py-1">
              Followers: <strong>{followers}</strong>
            </span>
          )}
          {location && (
            <span className="rounded-md border border-slate-200 dark:border-slate-700 px-2 py-1">
              📍 {location}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
