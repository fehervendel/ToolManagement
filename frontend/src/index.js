import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App';
import ErrorPage from './components/ErrorPage/ErrorPage';
import MyTools from './components/myTools/MyTools';
import ManageTools from './components/manageTools/ManageTools';
import ManageUsers from './components/manageUsers/ManageUsers';
import AddNewTool from './components/addNewTool/AddNewTool';
import EditUser from './components/EditUser/EditUser';
import ToolsForUser from './components/ToolsForUser/ToolsForUser';



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
      },
      {
        path: "/addnewtool",
        element: <AddNewTool />
      },
      {
        path: "/edituser/:userId",
        element: <EditUser />
      },
      {
        path: "/toolsforuser",
        element: <ToolsForUser />
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

