// src/components/GoogleTranslateSwitch.jsx
import React, { useEffect, useState } from "react";

const LANGS = [
  { code: "en", label: "English" },
  { code: "si", label: "සිංහල" },
  { code: "ta", label: "தமிழ்" },
  { code: "fr", label: "Français" },
];

function setCookie(name, value, days, domain) {
  const d = new Date();
  d.setTime(d.getTime() + days * 864e5);
  const parts = [
    `${name}=${value}`,
    `expires=${d.toUTCString()}`,
    "path=/",
    domain ? `domain=.${domain}` : "",
    "SameSite=Lax",
  ].filter(Boolean);
  document.cookie = parts.join("; ");
}
function getCookie(name) {
  const n = name + "=";
  const ca = document.cookie.split(";");
  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(n) === 0) return c.substring(n.length);
  }
  return "";
}

function hideAllGT() {
  const sel = [
    ".goog-te-banner-frame",
    ".goog-te-banner-frame.skiptranslate",
    "#goog-gt-tt",
    ".goog-te-balloon-frame",
    ".goog-te-spinner-pos",
    "body > .skiptranslate",
    "body > .skiptranslate iframe",
  ].join(",");
  document.querySelectorAll(sel).forEach((el) => (el.style.display = "none"));
  document.body.style.top = "0px";
}

export default function GoogleTranslateSwitch({
  defaultPageLanguage = "en",
  languages = LANGS,
  className,
  style,
}) {
  const [current, setCurrent] = useState(() => {
    const gv = getCookie("googtrans"); // "/en/si"
    if (gv && gv.split("/").length >= 3) return gv.split("/")[2] || defaultPageLanguage;
    return defaultPageLanguage;
  });

  useEffect(() => {
    // Inject CSS once (belt & suspenders)
    if (!document.getElementById("gt-hidebar-style")) {
      const styleEl = document.createElement("style");
      styleEl.id = "gt-hidebar-style";
      styleEl.textContent = `
        .goog-te-banner-frame,.goog-te-banner-frame.skiptranslate,
        #goog-gt-tt,.goog-te-balloon-frame,.goog-te-spinner-pos,
        body > .skiptranslate, body > .skiptranslate iframe{display:none!important}
        html body{top:0!important;position:static!important}
      `;
      document.head.appendChild(styleEl);
    }

    hideAllGT();

    // MutationObserver to immediately hide any new frames Google injects
    const mo = new MutationObserver(hideAllGT);
    mo.observe(document.documentElement, { childList: true, subtree: true });

    // Guard against double-injection in React StrictMode
    if (!window.__GT_SCRIPT_INJECTED__) {
      window.__GT_SCRIPT_INJECTED__ = true;

      window.googleTranslateElementInit = function () {
        new window.google.translate.TranslateElement(
          { pageLanguage: defaultPageLanguage, autoDisplay: false },
          "google_translate_bootstrap_mount"
        );
        hideAllGT();
      };

      if (!document.querySelector('script[src*="translate_a/element.js"]')) {
        const s = document.createElement("script");
        s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        s.async = true;
        document.body.appendChild(s);
      }
    }

    // Run a few times during first seconds (some builds inject late)
    const id = setInterval(hideAllGT, 300);
    setTimeout(() => clearInterval(id), 3000);

    return () => mo.disconnect();
  }, [defaultPageLanguage]);

  const changeLanguage = (lng) => {
    setCurrent(lng);
    const value = `/${defaultPageLanguage}/${lng}`;
    const host = window.location.hostname;
    setCookie("googtrans", value, 365);
    setCookie("googtrans", value, 365, host);
    window.location.reload();
  };

  return (
    <div className={className} style={style}>
      <div id="google_translate_bootstrap_mount" style={{ display: "none" }} />
      <select
        aria-label="Change language"
        value={current}
        onChange={(e) => changeLanguage(e.target.value)}
        style={{ padding: 8, borderRadius: 8, border: "1px solid #ddd", background: "#fff", ...style }}
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>
    </div>
  );
}
