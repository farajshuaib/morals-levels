import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer, toast } from "react-toastify";
import "./firebase/config";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";
import { registerSW } from "virtual:pwa-register";


if ("serviceWorker" in navigator) {
  // && !/localhost/.test(window.location)) {
  registerSW({
    onRegisterError(error) {
      console.log(error);
    },
  });
} else {
  console.info("browser does not support service worker");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
);
