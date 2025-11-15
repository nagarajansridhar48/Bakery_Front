import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import Routers from "./Routers";
import "./index.css";
import AuthProvider from "./contexts/AuthProvider";
import { UserProvider } from "./contexts/UserContext";


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>

          <Routers />

      </UserProvider>
    </AuthProvider>
  </BrowserRouter>
);
