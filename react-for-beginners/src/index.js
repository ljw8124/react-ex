import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // React.StrictMode 가 있으면, 개발에서 오류를 잘잡기 위해서
    // useEffect 도 두 번 찍힌다.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
