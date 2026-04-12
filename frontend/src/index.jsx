import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from "@react-oauth/google";
import "leaflet/dist/leaflet.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="713904488947-poeoobuoo3octn3inkr4n71t4aqbn3ni.apps.googleusercontent.com">
      <React.Suspense fallback={<div />}>
        <App />
      </React.Suspense>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
