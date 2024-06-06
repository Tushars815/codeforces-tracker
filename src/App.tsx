import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./components/LandingPage";
import ErrorPage from "./components/ErrorPage";
import DashboardWrapper from "./components/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardWrapper />,
    // errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
