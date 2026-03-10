import { createContext, useContext } from "react";

export type DeviceLayout = "mobile" | "phone-frame" | "ipad" | "desktop";

export const DeviceContext = createContext<DeviceLayout>("desktop");

export function useDeviceLayout() {
  return useContext(DeviceContext);
}
