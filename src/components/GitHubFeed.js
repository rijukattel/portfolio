import React, { useEffect, useState } from 'react';
import './GitHubFeed.css';
import { SectionContainerGridThreeCols } from './layout/sectionStyles';

const GITHUB_USERNAME = 'argahv';
const DEFAULT_REPO_COUNT = 6;

const GitHubFeed = ({ repoCount = DEFAULT_REPO_COUNT }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${repoCount}`
    )
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch repos');
        return res.json();
      })
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [repoCount]);

  if (loading)
    return <div className="github-feed-loading">Loading GitHub activity…</div>;
  if (error)
    return (
      <div className="github-feed-error">
        Could not load GitHub repos: {error}
      </div>
    );

  return (
    <SectionContainerGridThreeCols>
      {repos.map((repo) => (
        <div className="github-repo-card" key={repo.id}>
          <div className="github-repo-header">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="github-repo-title"
            >
              <svg
                height="20"
                width="20"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="github-icon"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              {repo.name}
            </a>
            {repo.language && (
              <span className="github-repo-lang">{repo.language}</span>
            )}
          </div>
          <div className="github-repo-desc">
            {repo.description || (
              <span className="github-repo-no-desc">No description</span>
            )}
          </div>
          <div className="github-repo-meta">
            <span className="github-repo-stars">
              ⭐ {repo.stargazers_count}
            </span>
            <span className="github-repo-updated">
              Updated: {new Date(repo.updated_at).toLocaleDateString()}
            </span>
            {repo.fork && <span className="github-repo-fork">Forked</span>}
          </div>
        </div>
      ))}
    </SectionContainerGridThreeCols>
  );
};

export default GitHubFeed;
