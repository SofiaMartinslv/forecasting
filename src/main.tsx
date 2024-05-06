import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';
import theme from './styles/theme';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
