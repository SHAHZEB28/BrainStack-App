import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Auth } from './Components/Auth/auth'
// FIX: This import statement is crucial. It ensures that all your Tailwind styles
// are loaded into the application.
import './index.css'

const token = localStorage.getItem('token');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {token ? <App /> : <Auth />}
  </React.StrictMode>,
)
