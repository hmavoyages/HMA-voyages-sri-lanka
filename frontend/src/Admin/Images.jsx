// Images.jsx
import React, { useEffect, useState } from "react";

const BASE_URL = "https://hmavoyages.com";
const API_URL = `${BASE_URL}/api/uploads`;
const UPLOADS_URL = `${BASE_URL}/uploads`;
const IMAGE_EXTS_REGEX = /[\w-]+\.(?:png|jpe?g|gif|webp|svg)/gi;

export default function Images() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(""); // helpful message / error

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setInfo("");

      try {
        const res = await fetch(API_URL, { redirect: "follow" });
        const ct = res.headers.get("content-type") || "";

        // If JSON-like, parse as JSON
        if (ct.includes("application/json") || ct.includes("text/json")) {
          if (!res.ok) throw new Error(`API returned status ${res.status}`);
          const data = await res.json();
          if (!Array.isArray(data)) throw new Error("API returned non-array JSON");
          const full = data.map((f) => (f.startsWith("http") ? f : `${UPLOADS_URL}/${f}`));
          if (mounted) {
            setUrls(full);
            setLoading(false);
            setInfo(`Loaded ${full.length} images from API endpoint.`);
          }
          return;
        }

        // Not JSON: maybe HTML. Grab text and try fallback parsing.
        const text = await res.text();
        console.warn("API response not JSON. Content-type:", ct, "Response starts:", text.slice(0, 200));
        // 1) Try to extract href/src pointing to /uploads/
        const found = new Set();
        const linkRegex = /(?:href|src)=["']([^"']+)["']/gi;
        let m;
        while ((m = linkRegex.exec(text)) !== null) {
          const link = m[1];
          if (link.includes("/uploads/")) {
            found.add(link.startsWith("http") ? link : new URL(link, UPLOADS_URL).toString());
          } else if (IMAGE_EXTS_REGEX.test(link)) {
            // relative filename or path with extension
            const maybe = link.startsWith("http") ? link : new URL(link, UPLOADS_URL).toString();
            if (maybe.startsWith(UPLOADS_URL)) found.add(maybe);
          }
        }

        // 2) If none found above, try plain filename regex on the HTML
        if (found.size === 0) {
          const fileMatches = [...text.matchAll(IMAGE_EXTS_REGEX)].map((r) => r[0]);
          fileMatches.forEach((f) => found.add(`${UPLOADS_URL}/${f}`));
        }

        if (found.size > 0) {
          const arr = Array.from(found);
          if (mounted) {
            setUrls(arr);
            setInfo(`Parsed ${arr.length} image URLs from HTML response (fallback).`);
            setLoading(false);
          }
          return;
        }

        // Nothing found
        if (mounted) {
          setInfo("Server returned HTML but no image links were found in the response.");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching/parsing uploads:", err);
        if (mounted) {
          setInfo(
            "Fetch failed. See console for details. Common causes: route not present (404), blocked by CORS, or server returned HTML instead of JSON."
          );
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={{ padding: 18, fontFamily: "system-ui, Arial" }}>
      <h2>Uploads gallery</h2>

      {loading && <div>Loading…</div>}

      {!loading && info && (
        <div style={{ marginBottom: 12, color: urls.length ? "green" : "crimson" }}>
          <strong>Status:</strong> {info}
        </div>
      )}

      {!loading && !urls.length && (
        <div style={{ color: "#b00" }}>
          No images found.
          <div style={{ marginTop: 8 }}>
            Quick checks:
            <ul>
              <li>Open <code>{API_URL}</code> in your browser — do you see JSON or a 404 HTML page?</li>
              <li>Is <code>/uploads</code> served as static files? Try a known image URL: <code>{UPLOADS_URL}/example.jpg</code></li>
              <li>If your React app runs on a different origin, ensure the backend has CORS enabled.</li>
            </ul>
          </div>
        </div>
      )}

      {urls.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 12,
            marginTop: 12,
          }}
        >
          {urls.map((u, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                overflow: "hidden",
                background: "#fff",
              }}
            >
              <img
                src={u}
                alt={`upload-${i}`}
                style={{ width: "100%", height: 140, objectFit: "cover" }}
                onError={(e) => {
                  e.currentTarget.style.opacity = 0.5;
                  e.currentTarget.alt = "Failed to load";
                }}
              />
              <div style={{ padding: 8, fontSize: 12, wordBreak: "break-all" }}>
                {u.replace(UPLOADS_URL + "/", "")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
