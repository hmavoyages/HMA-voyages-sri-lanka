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
    <GoogleOAuthProvider clientId="400890388867-birpo9rqf2867h0trm2ad7e4fgpcro0s.apps.googleusercontent.com">
      <React.Suspense fallback={<div />}>
        <App />
      </React.Suspense>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
