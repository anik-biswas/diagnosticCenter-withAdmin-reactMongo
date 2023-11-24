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
        //element: <Login></Login>,
      },
      {
        path: "/registration",
       // element: <Registration></Registration>,
      },

    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>

  </React.StrictMode>,
)
