// src/hooks/useMarkdown.js
// Custom React hook — fetches a .md file from /public/data/ and parses it.
// Returns { meta, content, html, loading, error }

import { useState, useEffect } from "react";
import { parse, toHTML } from "../utils/mdParser";

/**
 * @param {string} path  - Path relative to /public, e.g. "/data/about.md"
 * @returns {{ meta: object, content: string, html: string, loading: boolean, error: string|null }}
 */
export function useMarkdown(path) {
  const [state, setState] = useState({
    meta: {},
    content: "",
    html: "",
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!path) return;

    let cancelled = false;

    setState((s) => ({ ...s, loading: true, error: null }));

    fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${path} (${res.status})`);
        return res.text();
      })
      .then((raw) => {
        if (cancelled) return;
        const { meta, content } = parse(raw);
        const html = toHTML(content);
        setState({ meta, content, html, loading: false, error: null });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({ meta: {}, content: "", html: "", loading: false, error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [path]);

  return state;
}

/**
 * Fetch multiple .md files in parallel.
 * @param {string[]} paths
 * @returns {{ results: Array<ReturnType<useMarkdown>>, loading: boolean }}
 */
export function useMarkdownMany(paths) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!paths?.length) return;

    setLoading(true);

    Promise.all(
      paths.map((p) =>
        fetch(p)
          .then((r) => r.text())
          .then((raw) => {
            const { meta, content } = parse(raw);
            return { meta, content, html: toHTML(content), error: null };
          })
          .catch((err) => ({ meta: {}, content: "", html: "", error: err.message }))
      )
    ).then((all) => {
      setResults(all);
      setLoading(false);
    });
  }, [paths.join(",")]);

  return { results, loading };
}
