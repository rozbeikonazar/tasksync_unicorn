import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { LoginForm } from './components/LoginForm.jsx'
import { RegistrationForm } from './components/RegistrationForm.jsx'
import { LogoutButton } from './components/LogoutButton.jsx'
import { AlertProvider } from './utils/contexts/AlertContext.jsx'
import AlertPopup from './components/AlertPopup.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: (
    <>
        <App/>
        <AlertPopup/>

    </>

  ),
    children: [{
      path: "/login",
      element: <LoginForm/>,
    },
      {
        path: "/registration",
        element: <RegistrationForm/>,
      },
      {
        path: "/logout",
        element: <LogoutButton/>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <AlertProvider>
        <RouterProvider router={router}/> 
        </AlertProvider>
  </React.StrictMode>
)

