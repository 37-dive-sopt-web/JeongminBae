import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css.ts";

export const page = style({
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: vars.color.background,
  padding: "80px 24px",
});

export const box = style({
  width: "100%",
  maxWidth: "640px",
  backgroundColor: vars.color.surface,
  borderRadius: "20px",
  padding: "40px 40px 32px",
  boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
  boxSizing: "border-box",
});

// 상단 ← 버튼
export const backButton = style({
  border: "none",
  background: "none",
  fontSize: "22px",
  cursor: "pointer",
  marginBottom: "12px",
});

export const title = style({
  fontSize: "26px",
  fontWeight: 700,
  marginBottom: "28px",
  color: vars.color.text,
});

export const field = style({
  marginBottom: "24px",
});

export const label = style({
  fontSize: "15px",
  marginBottom: "10px",
  color: vars.color.text,
  fontWeight: 600,
});

export const actions = style({
  marginTop: "4px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const footerText = style({
  marginTop: "16px",
  fontSize: "13px",
  textAlign: "center",
  color: vars.color.muted,
});
