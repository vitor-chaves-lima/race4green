import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import PageNotFound from './pages/PageNotFound.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'


const router = createBrowserRouter([

      {path: '/', element: <Login/>},
      {path: 'reset-password', element: <ForgotPassword/>},
      {path: 'register', element: <Register/>},
      {path: '*', element: <PageNotFound/>}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
