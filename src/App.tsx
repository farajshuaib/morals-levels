import { useEffect, useState } from "react";

import { useRoutes } from "react-router-dom";
import router from "./routes";
import LoadingScreen from "./components/utils/LoadingScreen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useStoreActions } from "easy-peasy";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const routing = useRoutes(router());
  const setUserData = useStoreActions<any>(
    (actions) => actions.userData.setUserData
  );

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
        setLoading(false);
      } else {
        setUserData(null);
        setLoading(false);
      }
    });
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
