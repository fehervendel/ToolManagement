import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App';
import ErrorPage from './components/ErrorPage/ErrorPage';
import MyTools from './components/myTools/MyTools';
import ManageTools from './components/manageTools/ManageTools';
import ManageUsers from './components/manageUsers/ManageUsers';




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/mytools",
        element: <MyTools />
      },
      {
        path: "/managetools",
        element: <ManageTools />
      },
      {
        path: "/manageusers",
        element: <ManageUsers />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

