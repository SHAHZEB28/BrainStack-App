import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// FIX: Updated the import path to be direct and match the lowercase filename.
import { Auth } from './Components/Auth/auth'
import './index.css'

// This is the core logic for handling authentication on page load.
// It checks for the presence of a token in localStorage.
const token = localStorage.getItem('token');

// Conditionally render the application based on the token's existence.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* If a token exists, the user is considered logged in, so show the main App. */}
    {/* Otherwise, show the Auth component to let them log in or sign up. */}
    {token ? <App /> : <Auth />}
  </React.StrictMode>,
)
