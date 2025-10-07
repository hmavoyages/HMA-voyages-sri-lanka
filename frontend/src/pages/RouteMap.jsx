// src/components/RouteMap.jsx
import React, { useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/**
 * Fix default marker icons in Vite/CRA
 * (Leaflet expects these files at runtime)
 */
import marker2x from "leaflet/dist/images/marker-icon-2x.png";
import marker1x from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker1x,
  shadowUrl: markerShadow,
});

// Minimal, curated coordinates for common Sri Lankan points
const COORDS = {
  "Airport": [7.1803, 79.8843],           // CMB area
  "Negombo": [7.2086, 79.8358],
  "Sigiriya": [7.9570, 80.7603],
  "Polonnaruwa": [7.9396, 81.0031],
  "Matale": [7.4675, 80.6234],
  "Kandy": [7.2906, 80.6337],
  "Nuwara Eliya": [6.9497, 80.7891],
  "Ella": [6.8667, 81.0460],
  "Koslanda": [6.7597, 81.0020],
  "Udawalawe": [6.4411, 80.8889],
  "Tissamaharama": [6.2776, 81.2853],
  "Mirissa": [5.9485, 80.4580],
  "Galle": [6.0329, 80.2168],
  "Ahungalla": [6.3457, 80.0377],
  "Colombo": [6.9271, 79.8612],
  "Hotel": null,             // fallback to Colombo
  "—": null,
};

// Friendly alias → canonical key
const ALIASES = {
  "Udawalawe/Tissa": "Udawalawe",
  "Udawalawe / Tissamaharama": "Udawalawe",
  "Tissa": "Tissamaharama",
  "Ahungalla/Negombo": "Ahungalla",
  "Around Mirissa": "Mirissa",
  "Mirissa Area": "Mirissa",
  "Airport Drop": "Airport",
  "Hotel": "Hotel",
};

function normalizeStop(raw) {
  if (!raw) return null;
  let s = raw
    .replace(/\(.*?\)/g, "")  // remove parenthetical notes like (~3h)
    .replace(/\s+/g, " ")
    .trim();

  // Split “Udawalawe/Tissa” → take first
  if (s.includes("/")) s = s.split("/")[0].trim();

  // Map aliases
  if (ALIASES[s]) s = ALIASES[s];

  // Title-case keys to match COORDS
  // (or just keep as-is if already correct)
  return s;
}

function splitRoute(routeStr) {
  if (!routeStr) return [];
  // Split on common arrows / separators
  return routeStr
    .split(/→|↔|–|-|>/g)
    .map(s => normalizeStop(s))
    .filter(Boolean);
}

function toLatLng(name) {
  if (!name) return null;
  const key = COORDS[name] ? name : null;
  return key ? COORDS[key] : null;
}

function BuildBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    const valid = points.filter(Boolean);
    if (valid.length) {
      const b = L.latLngBounds(valid.map(([lat, lng]) => [lat, lng]));
      map.fitBounds(b, { padding: [30, 30] });
    }
  }, [points, map]);
  return null;
}

/**
 * RouteMap
 * @param {Array} days - array of itinerary days
 * @param {number} height - css height (px)
 */
export default function RouteMap({ days = [], height = 460 }) {
  const { path, nodes, labeledStops } = useMemo(() => {
    const stops = [];
    const labeled = []; // keep one popup per day with route label

    days.forEach((d, idx) => {
      const parts = splitRoute(d.route);
      if (!parts.length) return;

      // Add parts into global sequence; only add first stop if different
      parts.forEach((p, i) => {
        if (stops.length === 0 || stops[stops.length - 1] !== p) {
          stops.push(p);
        } else if (i > 0) {
          // still push if not consecutive identical
          stops.push(p);
        }
      });

      // Remember an anchor stop for this day (first item with coords)
      const firstWithCoord = parts.find(p => toLatLng(p));
      if (firstWithCoord) labeled.push({
        idx: idx + 1,
        name: firstWithCoord,
        title: d.title || `Day ${d.day || idx + 1}`,
        stay: d.stay,
        route: d.route
      });
    });

    // Deduplicate consecutive
    const compactStops = stops.filter((s, i, arr) => i === 0 || s !== arr[i - 1]);

    const nodesLL = compactStops
      .map(s => ({ name: s, ll: toLatLng(s) }))
      .filter(n => n.ll);

    const pathLL = nodesLL.map(n => n.ll);

    return { path: pathLL, nodes: nodesLL, labeledStops: labeled };
  }, [days]);

  return (
    <div style={{ width: "100%", height }}>
      <MapContainer
        style={{ width: "100%", height: "100%", borderRadius: 16 }}
        center={[7.8731, 80.7718]} // Sri Lanka center
        zoom={7}
        scrollWheelZoom={false}
      >
        <TileLayer
          // Free OSM tiles
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {/* Fit map to bounds */}
        <BuildBounds points={path} />

        {/* Route polyline */}
        {path.length >= 2 && (
          <Polyline positions={path} weight={5} opacity={0.9} />
        )}

        {/* Markers for each stop in the sequence */}
        {nodes.map((n, i) => (
          <Marker key={`${n.name}-${i}`} position={n.ll}>
            <Popup>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>
                {i + 1}. {n.name}
              </div>
              <div style={{ fontSize: 13, opacity: 0.85 }}>
                Stop in route
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Extra popups anchored to the first stop of each day (nice context) */}
        {labeledStops.map((d, i) => {
          const ll = toLatLng(d.name);
          if (!ll) return null;
          return (
            <Marker key={`d-${i}-${d.idx}`} position={ll}>
              <Popup>
                <div style={{ fontWeight: 800 }}>Day {d.idx}: {d.title}</div>
                {d.stay && d.stay !== "—" && (
                  <div style={{ marginTop: 4, fontSize: 13 }}>Overnight: <b>{d.stay}</b></div>
                )}
                {d.route && (
                  <div style={{ marginTop: 6, fontSize: 13, opacity: 0.85 }}>
                    Route: {d.route}
                  </div>
                )}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
