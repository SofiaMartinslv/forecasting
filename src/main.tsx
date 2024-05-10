import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import * as Toast from '@radix-ui/react-toast'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import GlobalStyle from './styles/global'
import theme from './styles/theme'
import { queryClient } from './lib/react-query'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/signup',
    element: <SignUp />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Toast.Provider swipeDirection="right">
          <GlobalStyle />
          <RouterProvider router={router} />
        </Toast.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
