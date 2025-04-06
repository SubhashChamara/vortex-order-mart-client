import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { UserDetailDto } from "../app/core/types/UserDetailDto";
import EdgeLoading from "../@core/ui/EdgeLoading";
import Logger from "../@helpers/Logger";
import { Api } from "../api/Api";
import { isNonAuthRoutes } from "../@helpers/AuthRouteFilter";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserDetailDto | null;
  setSession: (user: UserDetailDto, accessToken: string) => void;
  signout: () => void;
  handleAutoLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserDetailDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();

  const setSession = (user: UserDetailDto, accessToken: string) => {
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("token", accessToken);
  };

  const signout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("taskpadFilters");
    toast.success("Successfully Signed Out");
    navigate("/sign-in");
  };

  const handleAutoLogin = async () => {
    const { data, err } = await Api.performRequest((r) => r.auth.me());
    Logger.debug(
      "(Auto Login) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );
    if (data !== null) {
      setUser(data);
      setIsAuthenticated(true);
    } else {
      signout();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    // setIsLoading(true);
    if (token) {
      // handled auto login when refresh page and revisiting page
      if (!isAuthenticated) {
        handleAutoLogin();
      }
      setTimeout(() => setIsLoading(false), 1000);
    } else {
      setIsLoading(false);
      if (!isNonAuthRoutes(location.pathname)) {
        navigate("/sign-in");
      }
    }
  }, [location.pathname, navigate]);

  return (
    <>
      {isLoading ? (
        <EdgeLoading />
      ) : (
        <AuthContext.Provider
          value={{
            isAuthenticated,
            user,
            setSession,
            signout,
            handleAutoLogin
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuthContext };
