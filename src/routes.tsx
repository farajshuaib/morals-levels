import Home from "./pages/Home";
import { Navigate } from "react-router-dom";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import { ReactDOM, ReactElement, ReactNode } from "react";
import Students from "./pages/Students";
import SignUp from "./pages/Signup";
import { Student } from "./types";
import { useStoreActions, useStoreState } from "easy-peasy";

const Routes = () => {
  const userData: Student | null = useStoreState<any>(
    (state) => state.userData.get
  );

  return [
    {
      path: "/",
      element:
        userData && userData.data.status === "approved" ? (
          <Home />
        ) : (
          <Navigate to="/login" />
        ),
    },
    {
      path: "/students",
      element:
        userData && userData.data.status === "approved" ? (
          <Students />
        ) : (
          <Navigate to="/login" />
        ),
    },
    {
      path: "/login",
      element:
        userData && userData.data.status === "approved" ? (
          <Navigate to="/" />
        ) : (
          <Login />
        ),
    },
    {
      path: "/sign-up",
      element: !userData ? (
        <SignUp />
      ) : userData.data.status !== "approved" ? (
        <Navigate to="/login" />
      ) : (
        <Navigate to="/" />
      ),
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ];
};

export default Routes;
