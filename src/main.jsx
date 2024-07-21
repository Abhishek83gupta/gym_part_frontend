import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {  RouterProvider, createBrowserRouter,} from 'react-router-dom'
import { Home, Login, Signup } from './Components/index.js'
import { WorkoutContextProvider } from './context/WorkoutContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { Toaster } from 'sonner'


const router = createBrowserRouter([

  {
    path:"/",
    element: <App/>,
    children : [
      {
        path:"/",
        element :<Home/>
      },
      {
        path:"/login",
        element :<Login/>
      },
      {
        path:"/signup",
        element :<Signup/>
      },
    ]
  }, 
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
       <WorkoutContextProvider>
          <RouterProvider router={router}/>
          <Toaster position="top-center" richColors/>
       </WorkoutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import './index.css';
// import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
// import { Home, Login, Signup } from './Components/index.js';
// import { WorkoutContextProvider } from './context/WorkoutContext.jsx';
// import { AuthContextProvider } from './context/AuthContext.jsx';
// import { useAuthContext } from './Hooks/useAuthContext.js';

// // ProtectedRoute component to handle authentication
// const ProtectedRoute = ({ element }) => {
//   const { user } = useAuthContext();

//   if (user) {
//     return element;
//   }

//   return <Navigate to="/login" />;
// };

// // Define your routes
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <ProtectedRoute element={<Home />} />
//       },
//       {
//         path: "/login",
//         element: <Login />
//       },
//       {
//         path: "/signup",
//         element: <Signup />
//       },
//     ]
//   },
// ]);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <AuthContextProvider>
//       <WorkoutContextProvider>
//         <RouterProvider router={router} />
//       </WorkoutContextProvider>
//     </AuthContextProvider>
//   </React.StrictMode>
// );
