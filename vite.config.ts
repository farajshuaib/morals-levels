import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import reactRefresh from "@vitejs/plugin-react-refresh";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    reactRefresh(),
    VitePWA({
      injectRegister: 'auto',
      registerType: "autoUpdate",
      useCredentials: true,
      workbox: {
        sourcemap: true,
        clientsClaim: true,
        skipWaiting: true,

      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'morals',
        short_name: 'morals',
        description: 'morals',
        theme_color: '#2F9AFD',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        lang: "ar",
        dir: "rtl",
      }
    }),
  ],
});
