// src/components/GoogleRouteMap.jsx
import React from "react";
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from "@react-google-maps/api";

// keep a STABLE libraries array (prevents loader reload warning)
const LIBRARIES = ["places"];

const SRI_LANKA_BOUNDS = { north: 10.1, south: 5.7, west: 79.5, east: 82.1 };
const containerStyle = { width: "100%", height: "100%", borderRadius: 16 };

// --- Parse days[].route into a simple stops list (strings) ---
const ALIASES = {
  "Udawalawe/Tissa": "Udawalawe",
  "Udawalawe / Tissamaharama": "Udawalawe",
  Tissa: "Tissamaharama",
  "Ahungalla/Negombo": "Ahungalla",
  "Around Mirissa": "Mirissa",
  "Airport Drop": "Airport",
  Hotel: "Colombo",
  "—": null,
};
function normalizeStop(raw) {
  if (!raw) return null;
  let s = raw.replace(/\(.*?\)/g, "").replace(/\s+/g, " ").trim();
  if (s.includes("/")) s = s.split("/")[0].trim();   // take first of A/B
  if (ALIASES[s]) s = ALIASES[s];
  return s;
}
function splitRoute(routeStr) {
  if (!routeStr) return [];
  return routeStr
    .split(/→|↔|–|-|>/g)
    .map((s) => normalizeStop(s))
    .filter(Boolean);
}
function stopsFromDays(days = []) {
  const seq = [];
  days.forEach((d) => {
    const parts = splitRoute(d.route);
    if (!parts.length) return;
    parts.forEach((p, i) => {
      if (seq.length === 0 || seq[seq.length - 1] !== p) seq.push(p);
      else if (i > 0) seq.push(p);
    });
  });
  return seq.filter((s, i, arr) => i === 0 || s !== arr[i - 1]);
}

// --- Utility: trim to Google’s 25-point limit (origin+dest+23 waypoints) ---
function trimForWaypointLimit(points) {
  if (points.length <= 25) return points;
  const first = points[0];
  const last = points[points.length - 1];
  const mids = points.slice(1, -1);
  const step = Math.max(1, Math.floor(mids.length / 23));
  const sampled = [first, ...sampleEvery(mids, step), last].slice(0, 25);
  return sampled;
}
function sampleEvery(arr, step) {
  if (step <= 1) return arr;
  const out = [];
  for (let i = 0; i < arr.length; i += step) out.push(arr[i]);
  return out;
}

export default function GoogleRouteMap({ days = [], height = 480 }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "gmap-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  const [directions, setDirections] = React.useState(null);
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState("");
  const [totals, setTotals] = React.useState({ distanceText: "", durationText: "" });

  const onLoadMap = (map) => {
    map.setCenter({ lat: 7.8731, lng: 80.7718 });
    map.setZoom(7);
  };

  // Build route with plain TEXT locations (", Sri Lanka" bias)
  React.useEffect(() => {
    if (!isLoaded) return;

    const doRoute = async () => {
      setStatus("routing");
      setError("");
      setDirections(null);

      const rawStops = stopsFromDays(days);
      const stops = rawStops.map((s) =>
        s.toLowerCase().includes("airport") ? "Bandaranaike International Airport, Sri Lanka" : `${s}, Sri Lanka`
      );

      if (stops.length < 2) {
        setStatus("idle");
        setError("No valid route stops found.");
        return;
      }

      const trimmed = trimForWaypointLimit(stops);

      try {
        const svc = new window.google.maps.DirectionsService();
        const res = await new Promise((resolve, reject) => {
          svc.route(
            {
              origin: trimmed[0],
              destination: trimmed[trimmed.length - 1],
              waypoints: trimmed.slice(1, -1).map((loc) => ({ location: loc, stopover: true })),
              optimizeWaypoints: true,
              travelMode: window.google.maps.TravelMode.DRIVING,
              provideRouteAlternatives: false,
              region: "LK",
            },
            (r, s) => (s === "OK" && r ? resolve(r) : reject(new Error(`Directions failed: ${s}`)))
          );
        });
        setDirections(res);
        setStatus("done");
      } catch (e) {
        setStatus("idle");
        setError(e.message || "Failed to get directions.");
      }
    };

    doRoute();
  }, [isLoaded, days]);

  // Compute totals from Directions legs
  React.useEffect(() => {
    if (!directions) return;
    const route = directions.routes?.[0];
    const legs = route?.legs || [];
    const meters = legs.reduce((s, l) => s + (l.distance?.value || 0), 0);
    const secs = legs.reduce((s, l) => s + (l.duration?.value || 0), 0);
    const km = (meters / 1000).toFixed(0);
    const h = Math.floor(secs / 3600);
    const m = Math.round((secs % 3600) / 60);
    setTotals({ distanceText: `${km} km`, durationText: `${h}h ${m}m` });
  }, [directions]);

  if (loadError) {
    return <div style={{ height, display: "grid", placeItems: "center" }}>Failed to load Google Maps.</div>;
  }
  const ready = isLoaded && typeof window !== "undefined" && !!window.google?.maps;
  if (!ready) {
    return <div style={{ height, display: "grid", placeItems: "center" }}>Loading map…</div>;
  }

  return (
    <div style={{ width: "100%", height }}>
      <GoogleMap
        onLoad={onLoadMap}
        mapContainerStyle={containerStyle}
        options={{
          draggableCursor: "grab",
          restriction: { latLngBounds: SRI_LANKA_BOUNDS, strictBounds: false },
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {directions && (
          <DirectionsRenderer
            options={{
              directions,
              preserveViewport: false,
              suppressMarkers: false,
              polylineOptions: {
                strokeWeight: 5,
                strokeOpacity: 0.95,
                strokeColor: "#0078FF", // 🔵 bright blue path
              },
            }}
          />

        )}
      </GoogleMap>

      <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>
        {status === "routing" && "Calculating route…"}
        {status === "done" && totals.distanceText && (
          <>Total: <b>{totals.distanceText}</b> • ~<b>{totals.durationText}</b></>
        )}
        {error && <span style={{ color: "#d32f2f" }}> {error}</span>}
      </div>
    </div>
  );
}
