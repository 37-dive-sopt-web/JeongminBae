import { createTheme } from "@vanilla-extract/css";

export const [themeClass, vars] = createTheme({
  color: {
    background: "#F9FAFB",
    surface: "#FFFFFF",
    text: "#111827",
    muted: "#9CA3AF",
    primary: "#7CE1C5",
    primaryHover: "#65C9B0",
    border: "#E5E7EB",
    error: "#EF4444",
  },
  font: {
    body: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
});
