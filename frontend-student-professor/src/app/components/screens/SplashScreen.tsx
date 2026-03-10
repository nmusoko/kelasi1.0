import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import kelasiLogo from "../../../assets/kelasi-logo.png";
import { useDeviceLayout } from "../../contexts/DeviceContext";

export function SplashScreen() {
  const navigate = useNavigate();
  const device = useDeviceLayout();
  const isWeb = device === "ipad" || device === "desktop";
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 2, 100));
    }, 40);
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2600);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div
      className="flex flex-col items-center justify-between h-full"
      style={{
        background: "linear-gradient(160deg, #3A0CA3 0%, #4361EE 45%, #4CC9F0 100%)",
        minHeight: isWeb ? "100dvh" : undefined,
      }}
    >
      {/* Top decoration */}
      <div className="w-full flex justify-between pt-16 px-8 opacity-20">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "white",
              transform: `translateY(${i % 2 === 0 ? 0 : 16}px)`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className="flex flex-col items-center gap-6"
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: 140,
              height: 140,
              borderRadius: 36,
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255,255,255,0.4)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              padding: 8,
            }}
          >
            <img
              src={kelasiLogo}
              alt="Kelasi"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>

          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h1
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: "white",
                letterSpacing: -0.5,
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              Kelasi
            </h1>
            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.75)",
                letterSpacing: 3,
                fontWeight: 500,
                textTransform: "uppercase",
              }}
            >
              Apprends. Évolue. Réussis.
            </p>
          </motion.div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            maxWidth: 260,
            lineHeight: 1.6,
          }}
        >
          Votre plateforme d'apprentissage universitaire
        </motion.p>
      </div>

      {/* Bottom loading */}
      <div className="flex flex-col items-center gap-6 pb-20 w-full px-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="w-full"
        >
          <div
            style={{
              height: 4,
              background: "rgba(255,255,255,0.2)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "white",
                borderRadius: 2,
                transition: "width 0.05s linear",
              }}
            />
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: 1 }}
        >
          CHARGEMENT EN COURS...
        </motion.p>
      </div>
    </div>
  );
}