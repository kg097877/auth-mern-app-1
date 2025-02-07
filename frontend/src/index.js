import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

function toggleForm() {
    let loginForm = document.getElementById("login-form");
    let signupForm = document.getElementById("signup-form");

    if (loginForm.classList.contains("active")) {
        loginForm.classList.remove("active");
        signupForm.classList.add("active");
    } else {
        signupForm.classList.remove("active");
        loginForm.classList.add("active");
    }
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
