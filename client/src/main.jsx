import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import { AdminProvider } from "./contexts/adminContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AdminProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AdminProvider>
    </BrowserRouter>
  </StrictMode>
);
