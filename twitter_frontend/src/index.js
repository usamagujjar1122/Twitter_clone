import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals.js';
import * as React from 'react'
import AuthProvider from './Context/AuthContext.tsx';
import DataProvider from './Context/DataContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <DataProvider>
      <App />
    </DataProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
