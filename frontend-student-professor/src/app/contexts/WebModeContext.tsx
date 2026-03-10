import { createContext, useContext } from "react";

export const WebModeContext = createContext<boolean>(false);

export function useWebMode() {
  return useContext(WebModeContext);
}
