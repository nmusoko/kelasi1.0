import React, { useEffect, useState } from "react";
import kelasiLogo from "../../assets/kelasi-logo.png";

interface PhoneFrameProps {
  children: React.ReactNode;
}

type ScreenSize =
  | "mobile"
  | "small-tablet"
  | "ipad"
  | "desktop";

export function PhoneFrame({ children }: PhoneFrameProps) {
  const [screenSize, setScreenSize] =
    useState<ScreenSize>("desktop");
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (w < 500) {
        // Full-screen on phones
        setScreenSize("mobile");
        setScale(1);
      } else if (w < 768) {
        // Small tablets / large phones — scaled phone frame
        setScreenSize("small-tablet");
        const scaleW = (w - 48) / 390;
        const scaleH = (h - 48) / 844;
        setScale(Math.min(scaleW, scaleH, 0.85));
      } else if (w < 1200) {
        // iPad (portrait & landscape) — phone at natural size or scaled to fit
        setScreenSize("ipad");
        const scaleW = (w - 80) / 390;
        const scaleH = (h - 80) / 844;
        setScale(Math.min(scaleW, scaleH, 1));
      } else {
        // Desktop — phone frame centered with half-width constraint
        setScreenSize("desktop");
        const scaleW = (w * 0.45) / 390;
        const scaleH = (h - 80) / 844;
        setScale(Math.min(scaleW, scaleH, 1));
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile: full screen, no frame
  if (screenSize === "mobile") {
    return (
      <div
        className="w-full flex flex-col overflow-hidden"
        style={{ height: "100dvh", background: "#F0F2FA" }}
      >
        {children}
      </div>
    );
  }

  const showDecorations =
    screenSize === "ipad" || screenSize === "desktop";
  const showLabel =
    screenSize === "ipad" || screenSize === "desktop";

  // iPad & Desktop: centered phone frame with dark background
  return (
    <div
      className="flex items-center justify-center"
      style={{
        minHeight: "100dvh",
        background:
          "linear-gradient(135deg, #0f0c29 0%, #1a1a3e 50%, #24243e 100%)",
        padding: screenSize === "ipad" ? 40 : 24,
      }}
    >
      {/* Decorative blobs */}
      {showDecorations && (
        <>
          <div
            style={{
              position: "fixed",
              top: "10%",
              left: "8%",
              width: screenSize === "ipad" ? 400 : 320,
              height: screenSize === "ipad" ? 400 : 320,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(67,97,238,0.18) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "fixed",
              bottom: "10%",
              right: "8%",
              width: screenSize === "ipad" ? 360 : 280,
              height: screenSize === "ipad" ? 360 : 280,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(114,9,183,0.18) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          {/* Extra blob for iPad */}
          {screenSize === "ipad" && (
            <div
              style={{
                position: "fixed",
                top: "40%",
                right: "15%",
                width: 200,
                height: 200,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(6,214,160,0.1) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
          )}
        </>
      )}

      {/* Scaled phone wrapper */}
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          width: 390,
          height: 844,
          flexShrink: 0,
        }}
      >
        {/* Phone outer frame */}
        <div
          style={{
            width: 390,
            height: 844,
            borderRadius: 48,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow:
              "0 60px 120px rgba(0,0,0,0.7), 0 0 0 2px rgba(255,255,255,0.12), 0 0 0 6px rgba(255,255,255,0.04), inset 0 0 0 1px rgba(255,255,255,0.08)",
            background: "#F0F2FA",
          }}
        >
          {/* Volume up */}
          <div
            style={{
              position: "absolute",
              left: -3,
              top: 160,
              width: 3,
              height: 36,
              background: "rgba(255,255,255,0.15)",
              borderRadius: "2px 0 0 2px",
              zIndex: 200,
            }}
          />
          {/* Volume down */}
          <div
            style={{
              position: "absolute",
              left: -3,
              top: 210,
              width: 3,
              height: 36,
              background: "rgba(255,255,255,0.15)",
              borderRadius: "2px 0 0 2px",
              zIndex: 200,
            }}
          />
          {/* Power button */}
          <div
            style={{
              position: "absolute",
              right: -3,
              top: 180,
              width: 3,
              height: 60,
              background: "rgba(255,255,255,0.15)",
              borderRadius: "0 2px 2px 0",
              zIndex: 200,
            }}
          />

          {/* Top notch */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 120,
              height: 34,
              background: "#1A1D2E",
              borderRadius: "0 0 20px 20px",
              zIndex: 100,
            }}
          />

          {/* Screen content */}
          <div
            className="flex-1 overflow-hidden relative"
            style={{ borderRadius: 48 }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* App label */}
      {showLabel && (
        <div
          style={{
            position: "fixed",
            bottom: screenSize === "ipad" ? 20 : 24,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <img
            src={kelasiLogo}
            alt="Kelasi"
            style={{
              width: 22,
              height: 22,
              objectFit: "contain",
              opacity: 0.5,
            }}
          />
          <span
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: 1,
            }}
          >
            KELASI · University App
          </span>
        </div>
      )}
    </div>
  );
}