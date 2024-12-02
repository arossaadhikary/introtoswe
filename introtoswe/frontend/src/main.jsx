import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Record from "./components/Record";
import RecordList from "./components/RecordList";
import Login from "./components/Login";
import Register from "./components/Register";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // This should include the Navbar and an Outlet for child routes
    children: [
      {
        path: "/",
        element: <RecordList />,
      },
      {
        path: "/create",
        element: <Record />,
      },
      {
        path: "/edit/:id",
        element: <Record />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);