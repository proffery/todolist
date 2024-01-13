import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWithReducer from './AppWithReducer';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppWithReducer />
  </React.StrictMode>
);

