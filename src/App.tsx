import { BrowserRouter, HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./@context/AuthContext";
import AuthLayout from "./@core/layout/AuthLayout";
import { NavbarProvider } from "./@context/NavbarProvider";
import { VortexTheme } from "./@core/theme/VortexTheme";

const App = () => {
  return (
    <>
      <HashRouter>
        <AuthProvider>
          <NavbarProvider>
            <ThemeProvider theme={VortexTheme}>
              <AuthLayout />
            </ThemeProvider>
          </NavbarProvider>
        </AuthProvider>
      </HashRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        theme="light"
    
      />
    </>
  );
};

export default App;
