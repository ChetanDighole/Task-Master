import React from 'react'
import Auth from './components/Auth'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home';

const App = () => {

  const appLayout = createBrowserRouter([
    {
      path:'/',
      element: <Auth />,
    },
    {
      path:'/home',
      element: <Home />
    }
  ])

  return (
    <div>

      <RouterProvider router={appLayout} />
      
    </div>
  )
}

export default App