// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
//import PrivateRoute from './component/PrivateRoute.jsx'
import AuthProvider from './firebase/AuthProvider.jsx'
import Root from './component/Root.jsx'
import Dashboard from './component/Dashboard/cart/Dashboard.jsx'
import Login from './component/login/Login.jsx'
import Registration from './component/login/Registration.jsx'
import AllUser from './component/Dashboard/cart/allUser/AllUser.jsx'
import AddBanner from './component/Dashboard/cart/addBanner/AddBanner.jsx'
import AddTest from './component/Dashboard/cart/addTest/AddTest.jsx'
import ManageBanner from './component/Dashboard/cart/manageBanner/ManageBanner.jsx'
import ManageTest from './component/Dashboard/cart/manageTest/ManageTest.jsx'
import UpdateTest from './component/Dashboard/cart/updateTest/UpdateTest.jsx'

const router = createBrowserRouter([
  {
    path: "/",
   element: <Root></Root>,
   // errorElement : <ErrorPage></ErrorPage> ,
    children : [
      {
        path: "/",
        //element: <Home></Home>,
      },
    
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },

    ]
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children : [

      {
        path: "allUser",
        element: <AllUser></AllUser>,
      },
      {
        path: "addBanner",
        element: <AddBanner></AddBanner>,
      },
      {
        path: "addTest",
        element: <AddTest></AddTest>,
      },
      {
        path: "manageBanner",
        element: <ManageBanner></ManageBanner>,
      },
      {
        path: "manageTest",
        element: <ManageTest></ManageTest>,
      },
      {
        path: "updateTest",
        element: <UpdateTest></UpdateTest>,
      },
    ]
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>

  </React.StrictMode>,
)
