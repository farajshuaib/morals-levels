import Home from "./pages/Home";
import { Navigate } from "react-router-dom";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import { ReactDOM, ReactElement, ReactNode } from "react";

const Routes = () => {
  const userData = "bb";

  return [
    {
      path: "/",
      element: userData ? <Home /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: !userData ? <Login /> : <Navigate to="/" />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ];
};

export default Routes;
