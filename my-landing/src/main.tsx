import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import './styles/reset.scss';
import './styles/main.scss';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider
      defaultColorScheme="light"
      theme={{ fontFamily: "sans-serif" }}
    >
      <Notifications />
      <App />
    </MantineProvider>
  </React.StrictMode>
);


