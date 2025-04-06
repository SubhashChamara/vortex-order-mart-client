import React, { ReactNode, createContext, useContext, useReducer } from "react";

type InitialStateProps = {
  open: boolean;
  mobileOpen: boolean;
  foldedOpen: boolean;
};

type Action =
  | { type: "NAVBAR_TOGGLE_FOLDED" }
  | { type: "NAVBAR_OPEN_FOLDED" }
  | { type: "NAVBAR_CLOSE_FOLDED" }
  | { type: "NAVBAR_TOGGLE_MOBILE" }
  | { type: "NAVBAR_OPEN_MOBILE" }
  | { type: "NAVBAR_CLOSE_MOBILE" }
  | { type: "NAVBAR_CLOSE" }
  | { type: "NAVBAR_OPEN" }
  | { type: "NAVBAR_TOGGLE" };

type NavbarContextType = {
  state: InitialStateProps;
  dispatch: React.Dispatch<Action>;
};

const initialState: InitialStateProps = {
  open: true,
  mobileOpen: false,
  foldedOpen: false,
};

const navbarReducer = (
  state: InitialStateProps,
  action: Action
): InitialStateProps => {
  switch (action.type) {
    case "NAVBAR_TOGGLE_FOLDED":
      return { ...state, foldedOpen: !state.foldedOpen };
    case "NAVBAR_OPEN_FOLDED":
      return { ...state, foldedOpen: true };
    case "NAVBAR_CLOSE_FOLDED":
      return { ...state, foldedOpen: false };
    case "NAVBAR_TOGGLE_MOBILE":
      return { ...state, mobileOpen: !state.mobileOpen };
    case "NAVBAR_OPEN_MOBILE":
      return { ...state, mobileOpen: true };
    case "NAVBAR_CLOSE_MOBILE":
      return { ...state, mobileOpen: false };
    case "NAVBAR_CLOSE":
      return { ...state, open: false };
    case "NAVBAR_OPEN":
      return { ...state, open: true };
    case "NAVBAR_TOGGLE":
      return { ...state, open: !state.open };
    default:
      return state;
  }
};

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

interface NavbarProviderProps {
  children: ReactNode;
}

export const NavbarProvider: React.FC<NavbarProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(navbarReducer, initialState);

  return (
    <NavbarContext.Provider value={{ state, dispatch }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbarState = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbarState must be used within a NavbarProvider");
  }
  return context.state;
};

export const useNavbarDispatch = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbarDispatch must be used within a NavbarProvider");
  }
  return context.dispatch;
};
