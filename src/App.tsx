import { useEffect, useState } from "react";

import { useRoutes } from "react-router-dom";
import router from "./routes";
import LoadingScreen from "./components/utils/LoadingScreen";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const routing = useRoutes(router());

  const isLoggedIn = async () => {
    try {
      //await authenticate();
      await setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
