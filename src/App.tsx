import { useEffect, useState } from "react";

import { useRoutes } from "react-router-dom";
import router from "./routes";
import LoadingScreen from "./components/utils/LoadingScreen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useStoreActions } from "easy-peasy";
import { getUserByEmail } from "./services/usersCRUD";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const routing = useRoutes(router());
  const setUserData = useStoreActions<any>(
    (actions) => actions.userData.setUserData
  );

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user && user.email) {
      getUserByEmail(user.email).then((userData) => {
        setUserData(userData);
        setLoading(false);
      });
    } else {
      setUserData(null);
      setLoading(false);
    }
    // onAuthStateChanged(auth, async (user) => {
    //   if (user && user.email) {
    //     const userData = await getUserByEmail(user.email);
    //     setUserData(userData);
    //     setLoading(false);
    //   } else {
    //     setUserData(null);
    //     setLoading(false);
    //   }
    // });
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div data-testid="App" className="relative">
      {routing}
    </div>
  );
};

export default App;
