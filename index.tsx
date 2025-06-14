
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';

// This is a workaround for the prompt's requirement of process.env.API_KEY in a browser environment.
// In a real build setup (Vite, CRA), this would be handled by the build tool.
// For a pure static setup, the API key would ideally be fetched from a secure backend or configured differently.
if (!process) {
  // @ts-ignore
  window.process = { env: {} };
}
// Ensure API_KEY is at least an empty string if not set, to prevent crashes.
// The app should handle the case where the key is missing or invalid.
// @ts-ignore
process.env.API_KEY = process.env.API_KEY || '';


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
