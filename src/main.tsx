import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import { store } from "./store";
import "./firebase/config";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";
import { useRegisterSW } from "virtual:pwa-register/react";
import { registerSW } from "virtual:pwa-register";

const intervalMS = 60 * 60 * 1000;

if ("serviceWorker" in navigator) {
  // && !/localhost/.test(window.location)) {
  registerSW({
    onNeedRefresh() {
      console.log("onNeedRefresh");
    },
    onOfflineReady() {
      console.log("onOfflineReady");
    },
    onRegisterError(error) {
      console.log("onRegisterError", error);
    },
  });
} else {
  console.log("browser does not support service worker");
}
const Wrapper: React.FC = () => {
  useRegisterSW({
    onRegistered(r) {
      r &&
        setInterval(() => {
          r.update();
        }, intervalMS);
    },
  });
  return (
    <React.StrictMode>
      <BrowserRouter>
        <StoreProvider store={store}>
          <App />
          <ToastContainer />
        </StoreProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Wrapper />);
