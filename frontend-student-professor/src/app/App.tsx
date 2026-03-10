import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { PhoneFrame } from "./components/PhoneFrame";
import { DeviceContext, DeviceLayout } from "./contexts/DeviceContext";

function getLayout(w: number): DeviceLayout {
  if (w < 500) return "mobile";
  if (w < 768) return "phone-frame";
  if (w < 1100) return "ipad";
  return "desktop";
}

export default function App() {
  const [layout, setLayout] = useState<DeviceLayout>(() => getLayout(window.innerWidth));

  useEffect(() => {
    const handler = () => setLayout(getLayout(window.innerWidth));
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Phone-sized screens: keep the phone frame presentation
  if (layout === "mobile" || layout === "phone-frame") {
    return (
      <DeviceContext.Provider value={layout}>
        <PhoneFrame>
          <RouterProvider router={router} />
        </PhoneFrame>
      </DeviceContext.Provider>
    );
  }

  // iPad & Desktop: full web layout (handled inside RootLayout via router)
  return (
    <DeviceContext.Provider value={layout}>
      <RouterProvider router={router} />
    </DeviceContext.Provider>
  );
}
