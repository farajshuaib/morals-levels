import Home from "./pages/Home";
import { Navigate } from "react-router-dom";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import Students from "./pages/Students";
import SignUp from "./pages/Signup";
import { User } from "./types";
import { useStoreState } from "easy-peasy";

const Routes = () => {
  const userData: User | null = useStoreState<any>(
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
        userData && userData.data.role == "teacher" ? (
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
