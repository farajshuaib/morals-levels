import Home from "./pages/Home";
import { Navigate } from "react-router-dom";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import { ReactDOM, ReactElement, ReactNode } from "react";
import Students from "./pages/Students";
import SignUp from "./pages/signup";
import { userData } from "./types";
import { useStoreActions, useStoreState } from "easy-peasy";

const Routes = () => {
  const userData: userData | null = useStoreState<any>(
    (state) => state.userData.get
  );

  return [
    {
      path: "/",
      element: userData ? <Home /> : <Navigate to="/login" />,
    },
    {
      path: "/students",
      element: userData ? <Students /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: !userData ? <Login /> : <Navigate to="/" />,
    },
    {
      path: "/sign-up",
      element: !userData ? <SignUp /> : <Navigate to="/" />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ];
};

export default Routes;
