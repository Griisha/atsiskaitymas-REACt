import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CardsProvider } from "./contexts/CardsContext";
import { UsersProvider } from "./contexts/UsersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CardsProvider>
      <UsersProvider>
        <App />
      </UsersProvider>
    </CardsProvider>
  </BrowserRouter>
);
