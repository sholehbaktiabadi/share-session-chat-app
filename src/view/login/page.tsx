import React from 'react'
import ReactDOM from 'react-dom'
import Login from './login'
import { CookiesProvider } from 'react-cookie'

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
    <Login />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
