import React from 'react'
import ReactDOM from 'react-dom'
import Home from './home'
import { CookiesProvider } from 'react-cookie'

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
    <Home />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
