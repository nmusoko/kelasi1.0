import { useWebMode } from "../contexts/WebModeContext";

interface StatusBarProps {
  light?: boolean;
}

export function StatusBar({ light = false }: StatusBarProps) {
  const isWeb = useWebMode();
  if (isWeb) return null;

  const color = light ? "rgba(255,255,255,0.9)" : "#1A1D2E";
  // On real mobile devices (no phone frame), use env(safe-area-inset-top)
  return (
    <div
      className="flex items-center justify-between px-6"
      style={{ height: 44, paddingTop: 14 }}
    >
      <span style={{ fontSize: 13, fontWeight: 600, color }}>9:41</span>
      <div style={{ width: 120, height: 34 }} /> {/* notch space */}
      <div className="flex items-center gap-1.5" style={{ paddingRight: 4 }}>
        {/* Signal bars */}
        <div className="flex items-end gap-0.5">
          {[6, 9, 12, 15].map((h, i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: h,
                borderRadius: 1,
                background: i < 3 ? color : `${color}40`,
              }}
            />
          ))}
        </div>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5C8.83 9.5 9.5 10.17 9.5 11C9.5 11.83 8.83 12.5 8 12.5C7.17 12.5 6.5 11.83 6.5 11C6.5 10.17 7.17 9.5 8 9.5Z" fill={color} />
          <path d="M8 6C9.93 6 11.68 6.78 12.97 8.03L14.04 6.97C12.47 5.44 10.35 4.5 8 4.5C5.65 4.5 3.53 5.44 1.96 6.97L3.03 8.03C4.32 6.78 6.07 6 8 6Z" fill={color} fillOpacity={0.7} />
          <path d="M8 2.5C11.05 2.5 13.8 3.74 15.79 5.71L16.86 4.64C14.59 2.39 11.46 1 8 1C4.54 1 1.41 2.39 -0.86 4.64L0.21 5.71C2.2 3.74 4.95 2.5 8 2.5Z" fill={color} fillOpacity={0.4} />
        </svg>
        {/* Battery */}
        <div className="flex items-center gap-0.5">
          <div
            style={{
              width: 22,
              height: 11,
              border: `1.5px solid ${color}`,
              borderRadius: 3,
              padding: 1.5,
              display: "flex",
            }}
          >
            <div style={{ width: "80%", height: "100%", background: color, borderRadius: 1 }} />
          </div>
          <div style={{ width: 2, height: 5, background: color, borderRadius: 1, opacity: 0.5 }} />
        </div>
      </div>
    </div>
  );
}