import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft, Download, ZoomIn, ZoomOut, ChevronLeft,
  ChevronRight, Share2, BookOpen
} from "lucide-react";
import { StatusBar } from "../StatusBar";
import { courses, weeklyMaterials } from "../../data/mockData";

export function FileViewerScreen() {
  const { courseId, fileId } = useParams<{ courseId: string; fileId: string }>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);

  const course = courses.find((c) => c.id === courseId);
  const allWeeks = weeklyMaterials[courseId!] || [];
  let foundFile: { id: string; name: string; type: string; size: string; date: string } | undefined;
  let weekTitle = "";
  for (const week of allWeeks) {
    const f = week.files.find((f) => f.id === fileId);
    if (f) {
      foundFile = f;
      weekTitle = week.title;
      break;
    }
  }

  const totalPages = foundFile?.type === "pdf" ? 12 : foundFile?.type === "ppt" ? 18 : 1;

  if (!course || !foundFile) return null;

  const fileTypeConfig = {
    pdf: { color: "#EF476F", bg: "#FFF0F3", label: "PDF" },
    word: { color: "#4361EE", bg: "#EEF1FD", label: "DOC" },
    ppt: { color: "#FFB703", bg: "#FFF8E6", label: "PPT" },
    video: { color: "#06D6A0", bg: "#E6FAF5", label: "VID" },
  };
  const cfg = fileTypeConfig[foundFile.type as keyof typeof fileTypeConfig] || fileTypeConfig.pdf;

  return (
    <div className="flex flex-col h-full" style={{ background: "#1A1D2E" }}>
      {/* Header */}
      <div style={{ background: "#1A1D2E" }}>
        <StatusBar light />
        <div className="flex items-center gap-3 px-4 pb-4 pt-1">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center"
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: "rgba(255,255,255,0.1)",
            }}
          >
            <ArrowLeft size={18} style={{ color: "white" }} />
          </button>
          <div className="flex-1 min-w-0">
            <p style={{ fontSize: 13, fontWeight: 700, color: "white", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {foundFile.name}
            </p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{weekTitle}</p>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center justify-center"
              style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.1)" }}
            >
              <Share2 size={16} style={{ color: "white" }} />
            </button>
            <button
              className="flex items-center justify-center"
              style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.1)" }}
            >
              <Download size={16} style={{ color: "white" }} />
            </button>
          </div>
        </div>
      </div>

      {/* Document viewer */}
      <div className="flex-1 overflow-hidden relative">
        {foundFile.type === "video" ? (
          /* Video player */
          <div className="flex flex-col items-center justify-center h-full gap-4 px-4">
            <div
              className="w-full flex flex-col items-center justify-center gap-4 relative"
              style={{
                background: "#000",
                borderRadius: 16,
                aspectRatio: "16/9",
                overflow: "hidden",
              }}
            >
              <img
                src={course.thumbnail}
                alt=""
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }}
              />
              {/* Play button */}
              <div
                className="flex items-center justify-center z-10"
                style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: "rgba(255,255,255,0.9)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                <div style={{ width: 0, height: 0, borderStyle: "solid", borderWidth: "10px 0 10px 18px", borderColor: "transparent transparent transparent #4361EE", marginLeft: 4 }} />
              </div>
              {/* Duration */}
              <div
                style={{
                  position: "absolute", bottom: 12, right: 12,
                  background: "rgba(0,0,0,0.6)", borderRadius: 6, padding: "2px 8px",
                }}
              >
                <span style={{ fontSize: 11, color: "white", fontWeight: 600 }}>42:18</span>
              </div>
            </div>
            {/* Video progress */}
            <div className="w-full flex flex-col gap-2">
              <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: "35%", height: "100%", background: "#4361EE", borderRadius: 2 }} />
              </div>
              <div className="flex justify-between">
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>14:48</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>42:18</span>
              </div>
            </div>
            {/* Video controls */}
            <div className="flex items-center gap-6">
              {[
                { icon: ChevronLeft, label: "-15s" },
                { icon: null, label: "▐▐" },
                { icon: ChevronRight, label: "+15s" },
              ].map((ctrl, i) => (
                <button
                  key={i}
                  className="flex flex-col items-center gap-1"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  <span style={{ fontSize: i === 1 ? 24 : 13, fontWeight: i === 1 ? 700 : 400 }}>{ctrl.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* PDF / PPT viewer */
          <div className="flex flex-col h-full">
            {/* Document page mockup */}
            <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
              <div
                style={{
                  width: "100%",
                  maxWidth: 320,
                  aspectRatio: foundFile.type === "ppt" ? "16/9" : "3/4",
                  background: "white",
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                  transform: `scale(${zoom / 100})`,
                  transition: "transform 0.2s",
                }}
              >
                {/* Document header */}
                <div
                  style={{
                    height: foundFile.type === "ppt" ? 80 : 60,
                    background: course.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 20px",
                  }}
                >
                  <p style={{ fontSize: foundFile.type === "ppt" ? 16 : 13, fontWeight: 700, color: "white", textAlign: "center", lineHeight: 1.3 }}>
                    {foundFile.type === "ppt"
                      ? `Diapositive ${currentPage}`
                      : `${course.shortName} — Page ${currentPage}`}
                  </p>
                </div>
                {/* Document body */}
                <div className="p-4 flex flex-col gap-3">
                  <div style={{ height: 12, background: "#E5E7EB", borderRadius: 4, width: "90%" }} />
                  <div style={{ height: 12, background: "#E5E7EB", borderRadius: 4, width: "75%" }} />
                  <div style={{ height: 12, background: "#F0F2FA", borderRadius: 4, width: "85%" }} />
                  <div style={{ height: 8, background: "#F0F2FA", borderRadius: 4, width: "60%" }} />
                  <div style={{ height: 64, background: "#F8F9FF", borderRadius: 10, margin: "4px 0" }} />
                  <div style={{ height: 8, background: "#E5E7EB", borderRadius: 4, width: "95%" }} />
                  <div style={{ height: 8, background: "#E5E7EB", borderRadius: 4, width: "80%" }} />
                  <div style={{ height: 8, background: "#F0F2FA", borderRadius: 4, width: "70%" }} />
                  <div style={{ height: 8, background: "#F0F2FA", borderRadius: 4, width: "90%" }} />
                  {foundFile.type !== "ppt" && (
                    <>
                      <div style={{ height: 8, background: "#E5E7EB", borderRadius: 4, width: "55%" }} />
                      <div style={{ height: 48, background: "#F0F2FA", borderRadius: 10, margin: "4px 0" }} />
                      <div style={{ height: 8, background: "#E5E7EB", borderRadius: 4, width: "85%" }} />
                      <div style={{ height: 8, background: "#F0F2FA", borderRadius: 4, width: "65%" }} />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Controls bar */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(10px)" }}
            >
              {/* Zoom */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom((z) => Math.max(50, z - 10))}
                  className="flex items-center justify-center"
                  style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.1)" }}
                >
                  <ZoomOut size={14} style={{ color: "white" }} />
                </button>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", width: 40, textAlign: "center" }}>
                  {zoom}%
                </span>
                <button
                  onClick={() => setZoom((z) => Math.min(150, z + 10))}
                  className="flex items-center justify-center"
                  style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.1)" }}
                >
                  <ZoomIn size={14} style={{ color: "white" }} />
                </button>
              </div>

              {/* Page navigation */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center"
                  style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: currentPage === 1 ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)",
                  }}
                >
                  <ChevronLeft size={16} style={{ color: currentPage === 1 ? "rgba(255,255,255,0.2)" : "white" }} />
                </button>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center"
                  style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: currentPage === totalPages ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)",
                  }}
                >
                  <ChevronRight size={16} style={{ color: currentPage === totalPages ? "rgba(255,255,255,0.2)" : "white" }} />
                </button>
              </div>

              {/* File info */}
              <div
                className="flex items-center gap-1.5"
                style={{
                  background: cfg.bg,
                  borderRadius: 8,
                  padding: "4px 10px",
                }}
              >
                <BookOpen size={12} style={{ color: cfg.color }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: cfg.color }}>{cfg.label}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
