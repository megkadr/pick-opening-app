import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { LoadingBarProvider } from './utils/contextStore/loadingBarContext'; // Adjust import path as needed

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoadingBarProvider>
      <App />
    </LoadingBarProvider>
  </React.StrictMode>
);
