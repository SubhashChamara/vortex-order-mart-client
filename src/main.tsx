// import {StrictMode} from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from './@config/authConfig.js';

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <MsalProvider instance={msalInstance}>
  <App />
 </MsalProvider>
  // </StrictMode>
);
