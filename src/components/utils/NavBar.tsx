import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import { toast } from "react-toastify";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      const auth = getAuth();
      auth.signOut();
      navigate("/");
    } catch (err: any) {
      setLoading(false);
      toast.error(JSON.stringify(err));
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <nav className=" bg-primary">
      <div className="container mx-auto p-5 md:p-8 flex items-center justify-between">
        <NavLink to="/">
          <h1 className="text-3xl text-white font-bold">القيم الأخلاقية</h1>
        </NavLink>
        <div className="flex items-center gap-8 text-white font-medium text-lg">
          <NavLink to="/students">الطلبة</NavLink>
          <button onClick={logout}>تسجيل الخروج</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
