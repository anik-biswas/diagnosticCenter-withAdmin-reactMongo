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
import Home from './component/home/Home.jsx'
import AllTest from './component/allTest/AllTest.jsx'
import TestDetails from './component/testDetails/TestDetails.jsx'
import Payment from './component/payment/Payment.jsx'
import Appointment from './component/Dashboard/cart/appointment/Appointment.jsx'
import UserAppointment from './component/Dashboard/cart/appointment/UserAppointment.jsx'
import UserTestReport from './component/Dashboard/cart/testReport/userTestReport.jsx'
import Profile from './component/Dashboard/cart/profile/Profile.jsx'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; 
import About from './component/about/About.jsx'
import Blog from './component/blog/Blog.jsx'
import PrivateRoute from './component/PrivateRoute.jsx'
import ErrorPage from './component/errorPage/Errorpage.jsx'
import Cart from './component/Dashboard/cart/Cart.jsx'

const router = createBrowserRouter([
  {
    path: "/",
   element: <Root></Root>,
    errorElement : <ErrorPage></ErrorPage> ,
    children : [
      {
        path: "/",
        element: <Home></Home>,
      },
    
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/allTest",
        element: <AllTest></AllTest>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "testDetails/:id",
        element:<PrivateRoute> <TestDetails></TestDetails></PrivateRoute> ,
        loader : ({params}) => fetch(`https://diagnostic-server-site.vercel.app/testDetails/${params.id}`),
      },
      {
        path: "payment",
        element: <PrivateRoute><Payment></Payment></PrivateRoute> ,
        
      },

    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    errorElement : <ErrorPage></ErrorPage> ,
    children : [
       
      {
        path: "/dashboard",
        element: <Cart></Cart>,
      },
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
      {
        path: "appointment",
        element: <Appointment></Appointment>,
        loader : () => fetch(`https://diagnostic-server-site.vercel.app/reserve`),
      },
      {
        path: "userAppointment",
        element: <UserAppointment></UserAppointment>,
        loader : () => fetch(`https://diagnostic-server-site.vercel.app/reserve`),
      },
      {
        path: "userTestReport",
        element: <UserTestReport></UserTestReport>,
        loader : () => fetch(`https://diagnostic-server-site.vercel.app/reserve`),
      },
      {
        path: "profile",
        element: <Profile></Profile>,
        loader : () => fetch(`https://diagnostic-server-site.vercel.app/user`),
      },
    ]
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    {/* <App /> */}
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
</ThemeProvider>
  </React.StrictMode>,
)
