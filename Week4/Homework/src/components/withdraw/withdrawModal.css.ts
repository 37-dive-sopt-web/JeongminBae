import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css.ts";

export const modalOverlay = style({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
});

export const modal = style({
  background: vars.color.surface,
  borderRadius: "16px",
  padding: "28px 32px",
  maxWidth: "420px",
  width: "100%",
  boxShadow: "0 20px 40px rgba(15, 23, 42, 0.25)",
});

export const modalTitle = style({
  fontSize: "18px",
  fontWeight: 700,
  color: vars.color.text,
  marginBottom: "8px",
});

export const modalText = style({
  fontSize: "14px",
  color: vars.color.muted,
  marginBottom: "24px",
});

export const modalActions = style({
  display: "flex",
  gap: "12px",
  justifyContent: "flex-end",
});

export const modalButton = style({
  flex: 1,
  padding: "12px 16px",
  borderRadius: "999px",
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 600,
  transition: "background-color 0.15s ease, transform 0.1s ease",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.background,
      transform: "translateY(-1px)",
    },
    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
      transform: "none",
    },
  },
});

export const modalButtonDanger = style({
  backgroundColor: vars.color.error,
  border: "none",
  color: vars.color.surface,
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.errorHover,
    },
  },
});

